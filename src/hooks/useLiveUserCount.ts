import { useState, useEffect, useCallback } from 'react';

interface LiveUserCount {
  count: number;
  isLoading: boolean;
}

// Simulates a live user counter with realistic fluctuations
// In production, this would connect to a real-time backend (WebSocket/SSE)
export function useLiveUserCount(): LiveUserCount {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize with a random base count
  const getInitialCount = useCallback(() => {
    // Base count between 50-200, simulating moderate traffic
    return Math.floor(Math.random() * 150) + 50;
  }, []);

  useEffect(() => {
    // Simulate initial load
    const loadTimer = setTimeout(() => {
      setCount(getInitialCount());
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(loadTimer);
  }, [getInitialCount]);

  useEffect(() => {
    if (isLoading) return;

    // Simulate realistic user count fluctuations
    const interval = setInterval(() => {
      setCount(prev => {
        // Random change between -3 and +5 (slight upward bias)
        const change = Math.floor(Math.random() * 9) - 3;
        // Keep count between 20 and 500
        const newCount = Math.max(20, Math.min(500, prev + change));
        return newCount;
      });
    }, 3000 + Math.random() * 2000); // Random interval 3-5 seconds

    return () => clearInterval(interval);
  }, [isLoading]);

  return { count, isLoading };
}

export default useLiveUserCount;
