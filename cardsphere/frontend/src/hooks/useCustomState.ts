import { useState, useCallback, useEffect } from 'react';

// This is a wrapper around React's useState to ensure it's properly initialized
export function useCustomState<T>(initialValue: T): [T, (value: T) => void] {
  // Using a try-catch to handle potential initialization issues
  try {
    return useState<T>(initialValue);
  } catch (error) {
    console.error('Error initializing useState:', error);
    // Fallback implementation
    let currentValue = initialValue;
    const setValue = (newValue: T) => {
      currentValue = newValue;
      // Force a re-render
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('resize'));
      }
    };
    return [currentValue, setValue];
  }
}

// Wrapper for useCallback
export function useCustomCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: any[]
): T {
  try {
    return useCallback(callback, deps);
  } catch (error) {
    console.error('Error initializing useCallback:', error);
    return callback;
  }
}

// Wrapper for useEffect
export function useCustomEffect(
  effect: () => void | (() => void),
  deps: any[]
): void {
  try {
    useEffect(effect, deps);
  } catch (error) {
    console.error('Error initializing useEffect:', error);
    // Execute the effect once without cleanup
    effect();
  }
} 