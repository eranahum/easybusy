import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setIsIntersecting(true);
        setHasAnimated(true);
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hasAnimated, options]);

  return [elementRef, isIntersecting];
};

export const useStaggeredAnimation = (items, options = {}) => {
  const [animatedItems, setAnimatedItems] = useState(new Set());
  const itemRefs = useRef([]);

  useEffect(() => {
    const observers = [];
    
    itemRefs.current.forEach((item, index) => {
      if (!item) return;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !animatedItems.has(index)) {
          setTimeout(() => {
            setAnimatedItems(prev => new Set([...prev, index]));
          }, index * 100); // Stagger by 100ms
        }
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options
      });

      observer.observe(item);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [animatedItems, options]);

  return [itemRefs, animatedItems];
};

