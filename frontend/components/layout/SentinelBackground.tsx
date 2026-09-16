"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
  depth: number;
};

const BASE_PARTICLE_COUNT = 140;

export default function SentinelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const particles: Particle[] = [];

    let width = 0;
    let height = 0;
    let animationFrame = 0;

    let mouseX = 0;
    let mouseY = 0;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const resize = () => {
      const devicePixelRatio = Math.min(
        window.devicePixelRatio || 1,
        2,
      );

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0,
      );
    };

    const getParticleCount = () => {
      if (width < 768) {
        return 70;
      }

      if (width < 1280) {
        return 100;
      }

      return BASE_PARTICLE_COUNT;
    };

    const createParticle = (): Particle => {
      const depth = Math.random();

      return {
        x: Math.random() * width,
        y: Math.random() * height,

        radius:
          depth > 0.8
            ? Math.random() * 1.8 + 0.8
            : Math.random() * 1.1 + 0.25,

        speedX:
          (Math.random() - 0.5) *
          (0.04 + depth * 0.16),

        speedY:
          (Math.random() - 0.5) *
          (0.04 + depth * 0.16),

        opacity:
          depth > 0.8
            ? Math.random() * 0.45 + 0.4
            : Math.random() * 0.3 + 0.08,

        depth,
      };
    };

    const initializeParticles = () => {
      particles.length = 0;

      const count = getParticleCount();

      for (let index = 0; index < count; index += 1) {
        particles.push(createParticle());
      }
    };

    const drawParticle = (particle: Particle) => {
      const parallaxX =
        reducedMotion ? 0 : mouseX * particle.depth * 4;

      const parallaxY =
        reducedMotion ? 0 : mouseY * particle.depth * 4;

      const x = particle.x + parallaxX;
      const y = particle.y + parallaxY;

      context.beginPath();

      context.arc(
        x,
        y,
        particle.radius,
        0,
        Math.PI * 2,
      );

      context.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;

      context.fill();

      /*
       * Larger particles get a subtle atmospheric glow.
       */
      if (particle.radius > 1.2) {
        const gradient = context.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          particle.radius * 6,
        );

        gradient.addColorStop(
          0,
          `rgba(255, 255, 255, ${
            particle.opacity * 0.18
          })`,
        );

        gradient.addColorStop(
          1,
          "rgba(255, 255, 255, 0)",
        );

        context.beginPath();

        context.arc(
          x,
          y,
          particle.radius * 6,
          0,
          Math.PI * 2,
        );

        context.fillStyle = gradient;

        context.fill();
      }
    };

    const render = () => {
      context.clearRect(
        0,
        0,
        width,
        height,
      );

      for (const particle of particles) {
        if (!reducedMotion) {
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          if (particle.x < -10) {
            particle.x = width + 10;
          }

          if (particle.x > width + 10) {
            particle.x = -10;
          }

          if (particle.y < -10) {
            particle.y = height + 10;
          }

          if (particle.y > height + 10) {
            particle.y = -10;
          }
        }

        drawParticle(particle);
      }

      if (!reducedMotion) {
        animationFrame =
          requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (
      event: MouseEvent,
    ) => {
      mouseX =
        event.clientX / width - 0.5;

      mouseY =
        event.clientY / height - 0.5;
    };

    resize();
    initializeParticles();
    render();

    window.addEventListener(
      "resize",
      () => {
        resize();
        initializeParticles();
      },
    );

    window.addEventListener(
      "mousemove",
      handleMouseMove,
    );

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        "mousemove",
        handleMouseMove,
      );
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#030405]"
    >
      {/* Atmospheric light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.07),transparent_32%)]" />

      {/* Particle field */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-90"
      />

      {/* Edge falloff */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.72)_100%)]" />

      {/* Very subtle top atmosphere */}
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.035),transparent_70%)]" />
    </div>
  );
}