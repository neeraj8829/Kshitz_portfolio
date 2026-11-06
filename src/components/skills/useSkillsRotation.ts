"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseSkillsRotationOptions {
  baseSpeed?: number; // degrees per frame (e.g. 0.18 = ~33s per 360deg at 60fps)
  friction?: number; // decay for inertia drag (e.g. 0.95)
  dragSensitivity?: number;
  containerRef?: React.RefObject<HTMLElement>;
}

export function useSkillsRotation({
  baseSpeed = 0.18,
  friction = 0.95,
  dragSensitivity = 0.35,
  containerRef,
}: UseSkillsRotationOptions = {}) {
  const [rotation, setRotation] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const rotationRef = useRef<number>(0);
  const velocityRef = useRef<number>(baseSpeed);
  const targetSpeedRef = useRef<number>(baseSpeed);
  const isHoveredRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(true);
  const dragStartRef = useRef<{ x: number; rot: number; time: number }>({ x: 0, rot: 0, time: 0 });
  const lastDragPosRef = useRef<{ x: number; time: number }>({ x: 0, time: 0 });
  const rafIdRef = useRef<number | null>(null);

  // When hovered, gently slow to a calm glide (0.3x) rather than a jarring dead halt
  useEffect(() => {
    isHoveredRef.current = isHovered;
    targetSpeedRef.current = isHovered ? baseSpeed * 0.35 : baseSpeed;
  }, [isHovered, baseSpeed]);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  // Main animation frame loop
  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let lastTime = performance.now();

    const loop = (time: number) => {
      // Clamp delta between 0.5 and 1.6 to prevent erratic jumps during scroll hitches
      const elapsed = time - lastTime;
      const delta = Math.min(Math.max(elapsed / 16.666, 0.5), 1.6);
      lastTime = time;

      if (isVisibleRef.current) {
        if (!isDraggingRef.current) {
          // Smoothly glide toward target speed
          const speedDiff = targetSpeedRef.current - velocityRef.current;
          if (Math.abs(speedDiff) > 0.002) {
            velocityRef.current += speedDiff * 0.05 * delta;
          } else {
            velocityRef.current = targetSpeedRef.current;
          }

          // Apply decay if release inertia exceeds base speed
          if (Math.abs(velocityRef.current) > baseSpeed * 1.2) {
            velocityRef.current *= Math.pow(friction, delta);
          }

          rotationRef.current = (rotationRef.current + velocityRef.current * delta) % 360;
          setRotation(rotationRef.current);
        }
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [baseSpeed, friction]);

  // Visibility & Generous Intersection Observer
  // rootMargin: "350px 0px 350px 0px" ensures the animation NEVER pauses or stutters
  // while entering, scrolling through, or exiting the viewport
  useEffect(() => {
    const handleVisibility = () => {
      isVisibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let observer: IntersectionObserver | null = null;
    const targetElement = containerRef?.current;

    if (targetElement && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]) {
            isVisibleRef.current = entries[0].isIntersecting && document.visibilityState === "visible";
          }
        },
        { rootMargin: "350px 0px 350px 0px", threshold: 0 }
      );
      observer.observe(targetElement);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      if (observer) observer.disconnect();
    };
  }, [containerRef]);

  // Pointer drag interactions
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      isDraggingRef.current = true;
      dragStartRef.current = {
        x: e.clientX,
        rot: rotationRef.current,
        time: performance.now(),
      };
      lastDragPosRef.current = {
        x: e.clientX,
        time: performance.now(),
      };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) {
        // Subtle tilt when hovering
        if (containerRef?.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const tiltX = ((e.clientY - centerY) / (rect.height / 2)) * -5;
          const tiltY = ((e.clientX - centerX) / (rect.width / 2)) * 5;
          setTilt({ x: tiltX, y: tiltY });
        }
        return;
      }

      const deltaX = e.clientX - dragStartRef.current.x;
      const now = performance.now();
      const frameDeltaX = e.clientX - lastDragPosRef.current.x;
      const frameDeltaTime = Math.max(now - lastDragPosRef.current.time, 1);

      // Instant velocity for release inertia
      velocityRef.current = (frameDeltaX / frameDeltaTime) * 16 * dragSensitivity;

      lastDragPosRef.current = { x: e.clientX, time: now };
      rotationRef.current = (dragStartRef.current.rot + deltaX * dragSensitivity) % 360;
      setRotation(rotationRef.current);
    },
    [containerRef, dragSensitivity]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (isDraggingRef.current) {
        setIsDragging(false);
        isDraggingRef.current = false;
        try {
          (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        } catch {}
      }
    },
    []
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  const rotateTo = useCallback((newRot: number) => {
    rotationRef.current = newRot % 360;
    setRotation(rotationRef.current);
  }, []);

  return {
    rotation,
    tilt,
    isHovered,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleMouseEnter,
    handleMouseLeave,
    rotateTo,
  };
}
