'use client';

import { useState, useEffect } from 'react';

export const ClientOnlyTime = () => {
  const [time, setTime] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString());
    };

    // Update immediately
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Don't render anything until mounted on client
  if (!mounted) {
    return <span>--:--:--</span>;
  }

  return <span>{time}</span>;
};
