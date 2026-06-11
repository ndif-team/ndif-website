"use client";

import { useEffect, useState } from "react";

/**
 * Canonical debounce: returns `value` after it has been stable for `ms`.
 * On every change to `value`, restarts the timer. Cleanup cancels in-flight timer.
 */
export function useDebouncedValue<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return debounced;
}
