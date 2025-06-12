
import { useEffect, useRef, MutableRefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAPAnimation = <T extends HTMLElement = HTMLDivElement>(
  animation: (element: T) => gsap.core.Timeline | void,
  dependencies: any[] = []
): MutableRefObject<T | null> => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (ref.current) {
      const tl = animation(ref.current);
      return () => {
        // Only call kill if tl exists and has the kill method
        if (tl && typeof tl.kill === 'function') {
          tl.kill();
        }
        // Clean up ScrollTriggers
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === ref.current) {
            trigger.kill();
          }
        });
      };
    }
  }, dependencies);

  return ref;
};

export const useGSAPTimeline = (
  createTimeline: () => gsap.core.Timeline,
  dependencies: any[] = []
): gsap.core.Timeline | null => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    timelineRef.current = createTimeline();
    
    return () => {
      if (timelineRef.current && typeof timelineRef.current.kill === 'function') {
        timelineRef.current.kill();
      }
    };
  }, dependencies);

  return timelineRef.current;
};

export const useGSAPScrollTrigger = <T extends HTMLElement = HTMLDivElement>(
  animation: (element: T) => void,
  triggerOptions: ScrollTrigger.Vars = {},
  dependencies: any[] = []
): MutableRefObject<T | null> => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (ref.current) {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 80%",
        end: "bottom 20%",
        ...triggerOptions,
        onEnter: () => {
          if (ref.current) {
            animation(ref.current);
          }
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === ref.current) {
          trigger.kill();
        }
      });
    };
  }, dependencies);

  return ref;
};
