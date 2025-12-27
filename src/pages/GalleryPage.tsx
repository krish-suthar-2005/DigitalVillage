import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, Filter } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
  date: string;
}

const mockGallery: GalleryImage[] = [
  { id: 1, src: 'https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?w=600', title: 'Republic Day Celebration', category: 'events', date: '2024-01-26' },
  { id: 2, src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600', title: 'Village Temple', category: 'heritage', date: '2024-02-15' },
  { id: 3, src: 'https://images.unsplash.com/photo-1585222515068-7201a72c4181?w=600', title: 'Farming Fields', category: 'nature', date: '2024-03-10' },
  { id: 4, src: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600', title: 'Holi Festival', category: 'events', date: '2024-03-25' },
  { id: 5, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600', title: 'Sunset View', category: 'nature', date: '2024-04-05' },
  { id: 6, src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', title: 'Independence Day', category: 'events', date: '2024-08-15' },
  { id: 7, src: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600', title: 'Ancient Well', category: 'heritage', date: '2024-05-20' },
  { id: 8, src: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600', title: 'Green Fields', category: 'nature', date: '2024-06-10' },
  { id: 9, src: 'https://images.unsplash.com/photo-1514222709107-a180c68d72b4?w=600', title: 'Gram Sabha Meeting', category: 'events', date: '2024-07-01' },
  { id: 10, src: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600', title: 'Historical Building', category: 'heritage', date: '2024-07-15' },
  { id: 11, src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600', title: 'Mountain View', category: 'nature', date: '2024-08-01' },
  { id: 12, src: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=600', title: 'Diwali Celebration', category: 'events', date: '2024-10-31' },
];

const categories = ['all', 'events', 'heritage', 'nature'];

export default function GalleryPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = selectedCategory === 'all' 
    ? mockGallery 
    : mockGallery.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goNext = () => setLightboxIndex(prev => prev !== null ? (prev + 1) % filteredImages.length : null);
  const goPrev = () => setLightboxIndex(prev => prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null);

  return (
    <MainLayout>
      <main id="main-content" className="page-container">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('gallery')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('gallerySubtitle')}</p>
        </header>

        {/* Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <Filter className="w-5 h-5 text-muted-foreground" />
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'all' ? t('all') : cat === 'events' ? t('galleryEvents') : cat === 'heritage' ? t('galleryHeritage') : t('galleryNature')}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <img
                src={image.src}
                alt={image.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-left opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-sm font-medium text-primary-foreground truncate">{image.title}</p>
                <p className="text-xs text-primary-foreground/80">{new Date(image.date).toLocaleDateString()}</p>
              </div>
            </button>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">{t('noPhotosFound')}</p>
          </div>
        )}

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-full"
              aria-label={t('close')}
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={goPrev}
              className="absolute left-4 p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-full"
              aria-label={t('previous')}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="max-w-4xl max-h-[80vh] relative">
              <img
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent rounded-b-lg">
                <h3 className="text-lg font-semibold text-primary-foreground">{filteredImages[lightboxIndex].title}</h3>
                <p className="text-sm text-primary-foreground/80">
                  {new Date(filteredImages[lightboxIndex].date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <button
              onClick={goNext}
              className="absolute right-4 p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-full"
              aria-label={t('next')}
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-primary-foreground text-sm">
              {lightboxIndex + 1} / {filteredImages.length}
            </div>
          </div>
        )}
      </main>
    </MainLayout>
  );
}
