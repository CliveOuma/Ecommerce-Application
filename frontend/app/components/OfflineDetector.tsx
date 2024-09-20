"use client"
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

const OfflineDetector: React.FC = () => {
  useEffect(() => {
    const handleOnline = () => {
      toast.dismiss('offline-toast');
    };

    const handleOffline = () => {
      toast.error("You are currently offline", {
        id: 'offline-toast',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check the initial status on mount
    if (!navigator.onLine) {
      handleOffline();
    }

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      toast.dismiss('offline-toast');
    };
  }, []);

  return null;
};

export default OfflineDetector;
