import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Loader2 } from 'lucide-react';

interface CesiumGlobeProps {
  zoomPath: { lat: number; lon: number; height: number }[];
  villageName: string;
  onAnimationComplete: () => void;
}

// Cesium CDN URLs
const CESIUM_VERSION = '1.114';
const CESIUM_BASE = `https://cesium.com/downloads/cesiumjs/releases/${CESIUM_VERSION}/Build/Cesium`;

// Lazy load Cesium scripts
function loadCesiumScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if ((window as any).Cesium) {
      resolve();
      return;
    }

    // Load CSS
    if (!document.querySelector('link[href*="cesium"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${CESIUM_BASE}/Widgets/widgets.css`;
      document.head.appendChild(link);
    }

    // Load JS
    const script = document.createElement('script');
    script.src = `${CESIUM_BASE}/Cesium.js`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load CesiumJS'));
    document.head.appendChild(script);
  });
}

export function CesiumGlobe({ zoomPath, villageName, onAnimationComplete }: CesiumGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const [status, setStatus] = useState<'loading' | 'animating' | 'done' | 'error'>('loading');
  const [currentStep, setCurrentStep] = useState('');
  const animationRunning = useRef(false);

  const stepLabels = [
    'Viewing continent...',
    'Zooming to country...',
    'Navigating to state...',
    'Finding district...',
    'Reaching taluka...',
    'Landing at village...',
  ];

  const initViewer = useCallback(async () => {
    if (!containerRef.current || viewerRef.current) return;

    try {
      setStatus('loading');
      setCurrentStep('Loading 3D globe...');

      await loadCesiumScript();

      const Cesium = (window as any).Cesium;
      if (!Cesium || !containerRef.current) return;

      // Create viewer with optimized settings
      const viewer = new Cesium.Viewer(containerRef.current, {
        terrainProvider: new Cesium.EllipsoidTerrainProvider(),
        timeline: false,
        animation: false,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        fullscreenButton: false,
        infoBox: false,
        selectionIndicator: false,
        creditContainer: document.createElement('div'), // Hide credits
      });

      viewerRef.current = viewer;

      // Performance optimizations
      viewer.scene.requestRenderMode = true;
      viewer.scene.maximumRenderTimeChange = Infinity;
      viewer.resolutionScale = Math.min(1.0, window.devicePixelRatio * 0.75);
      viewer.scene.postProcessStages.fxaa.enabled = false;
      viewer.scene.globe.enableLighting = true;
      viewer.scene.globe.depthTestAgainstTerrain = false;
      viewer.scene.skyAtmosphere.show = true;

      // Force render on camera change
      viewer.camera.changed.addEventListener(() => {
        viewer.scene.requestRender();
      });

      // Remove default imagery and add ArcGIS
      viewer.imageryLayers.removeAll();

      viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        })
      );

      // Add labels layer
      const labelsLayer = viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
        })
      );
      viewer.imageryLayers.raiseToTop(labelsLayer);
      labelsLayer.minificationFilter = Cesium.TextureMinificationFilter.LINEAR;
      labelsLayer.magnificationFilter = Cesium.TextureMagnificationFilter.LINEAR;

      // Set initial world view
      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(0, 0, 30000000),
      });

      viewer.scene.requestRender();

      // Start animation
      setStatus('animating');
      await runAnimation(viewer, Cesium);
    } catch (err) {
      console.error('Cesium init error:', err);
      setStatus('error');
    }
  }, [zoomPath, villageName]);

  const runAnimation = useCallback(
    async (viewer: any, Cesium: any) => {
      if (animationRunning.current) return;
      animationRunning.current = true;

      // Disable request render mode during animation
      viewer.scene.requestRenderMode = false;

      const flyTo = (lon: number, lat: number, height: number, duration: number): Promise<void> => {
        return new Promise((resolve) => {
          viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
            duration,
            easingFunction: Cesium.EasingFunction.CUBIC_IN_OUT,
            complete: () => resolve(),
            cancel: () => resolve(),
          });
        });
      };

      // Initial pause
      await new Promise((r) => setTimeout(r, 800));

      // Fly through each zoom level
      for (let i = 0; i < zoomPath.length; i++) {
        const step = zoomPath[i];
        const label = stepLabels[Math.min(i, stepLabels.length - 1)];
        setCurrentStep(label);

        // Faster for early zooms, slower for final approach
        const duration = i === zoomPath.length - 1 ? 3.5 : i === 0 ? 2.5 : 3;
        await flyTo(step.lon, step.lat, step.height, duration);
        
        // Brief pause between steps
        if (i < zoomPath.length - 1) {
          await new Promise((r) => setTimeout(r, 600));
        }
      }

      // Place marker at final location
      const finalPos = zoomPath[zoomPath.length - 1];
      
      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(finalPos.lon, finalPos.lat),
        point: {
          pixelSize: 14,
          color: Cesium.Color.RED,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 3,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
        label: {
          text: villageName,
          font: '16px Inter, system-ui, sans-serif',
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          outlineColor: Cesium.Color.BLACK,
          fillColor: Cesium.Color.WHITE,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -20),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          showBackground: true,
          backgroundColor: new Cesium.Color(0, 0, 0, 0.7),
          backgroundPadding: new Cesium.Cartesian2(8, 5),
        },
      });

      viewer.scene.requestRender();

      setCurrentStep('Welcome to ' + villageName + '!');
      setStatus('done');

      // Re-enable request render mode
      viewer.scene.requestRenderMode = true;

      // Wait then complete
      await new Promise((r) => setTimeout(r, 2500));
      onAnimationComplete();
    },
    [zoomPath, villageName, onAnimationComplete]
  );

  useEffect(() => {
    initViewer();

    return () => {
      if (viewerRef.current) {
        try {
          viewerRef.current.destroy();
        } catch {
          // Ignore cleanup errors
        }
        viewerRef.current = null;
      }
    };
  }, [initViewer]);

  return (
    <div className="fixed inset-0 z-[9998] bg-black">
      {/* Cesium container */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Status overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 pointer-events-none">
        <div
          className="inline-flex items-center gap-3 rounded-xl px-5 py-3 text-sm text-white backdrop-blur-md"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          {status !== 'done' && status !== 'error' && (
            <Loader2 className="w-4 h-4 animate-spin text-primary flex-shrink-0" />
          )}
          {status === 'done' && (
            <span className="w-3 h-3 rounded-full bg-green-400 flex-shrink-0 animate-pulse" />
          )}
          {status === 'error' && (
            <span className="w-3 h-3 rounded-full bg-red-400 flex-shrink-0" />
          )}
          <span className="font-medium">
            {status === 'error' ? 'Failed to load globe. Redirecting...' : currentStep}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      {status === 'animating' && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
          <div
            className="h-full bg-primary transition-all duration-1000 ease-out"
            style={{
              width: `${((stepLabels.indexOf(currentStep) + 1) / stepLabels.length) * 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}
