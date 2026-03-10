"use client";

import { useCallback } from 'react';

export type TagEvent = {
  event: string;
  ecommerce?: any;
  [key: string]: any;
};

export function useTagging() {
  const trackEvent = useCallback((data: TagEvent) => {
    // In a real app, this would be window.dataLayer.push(data)
    console.log('%c[TAG EVENT]', 'color: #4C33CC; font-weight: bold; font-size: 12px;', data);
    
    // We'll also dispatch a custom event so our UI Tag Monitor can catch it
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('app:tag-event', { detail: data });
      window.dispatchEvent(event);
    }
  }, []);

  return { trackEvent };
}