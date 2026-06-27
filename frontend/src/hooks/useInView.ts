import { useState, useEffect, useRef, useCallback } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Detects when an element enters the viewport.
 * Used for reveal animations — content is always visible in the DOM (opacity/transform only).
 */
export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.15, rootMargin = '0px', once = true } = options;
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el == null) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}

/**
 * Animated counter — counts up from 0 to `target`.
 */
export function useCountUp(target: number, duration = 2000, shouldStart = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  const start = useCallback(() => {
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  useEffect(() => {
    if (!shouldStart) return;
    const cancel = start();
    return cancel;
  }, [shouldStart, start]);

  return count;
}
