'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { heroDetails } from '@/data/hero';

const OVERLAY_DELAY_MS = 8000;

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const pauseTimerRef = useRef<number | null>(null);

  const [showOverlay, setShowOverlay] = useState(false);

  const clearPauseTimer = () => {
    if (pauseTimerRef.current) {
      window.clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }
  };

  const startPauseTimer = () => {
    clearPauseTimer();
    pauseTimerRef.current = window.setTimeout(() => {
      // si sigue pausado al cabo de 8s, mostramos overlay (Víctor)
      const v = videoRef.current;
      if (v && v.paused) setShowOverlay(true);
    }, OVERLAY_DELAY_MS);
  };

  const handlePlay = () => {
    setShowOverlay(false);
    clearPauseTimer();
  };

  const handlePause = () => {
    startPauseTimer();
  };

  const handleOverlayClick = () => {
    // Hacemos click en la imagen, quitamos overlay y reproducimos
    setShowOverlay(false);
    clearPauseTimer();
    videoRef.current?.play();
  };

  useEffect(() => {
    return () => {
      clearPauseTimer();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center pb-0 pt-32 md:pt-40 px-5"
    >
      <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
        <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <div className="absolute left-0 right-0 bottom-0 backdrop-blur-[2px] h-40 bg-gradient-to-b from-transparent via-[rgba(233,238,255,0.5)] to-[rgba(202,208,230,0.5)]" />

      <div className="text-center w-full max-w-4xl">
        <h1 className="text-4xl md:text-6xl md:leading-tight font-bold text-foreground mx-auto">
          {heroDetails.heading}
        </h1>

        <p className="mt-4 text-foreground max-w-2xl mx-auto">
          {heroDetails.subheading}
        </p>

        {/* Search box */}
        <div className="mt-10 bg-white/90 backdrop-blur rounded-xl shadow-lg p-4 md:p-6 flex flex-col md:flex-row gap-3 items-stretch">
          <input
            type="text"
            placeholder="Ciudad de recogida"
            className="flex-1 border rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="date"
            className="border rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="date"
            className="border rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          />

          <button className="bg-primary text-white rounded-md px-6 py-3 text-sm font-medium hover:opacity-90 transition">
            Buscar coche
          </button>
        </div>

        {/* VIDEO con overlay */}
        <div className="relative mt-12 md:mt-16 mx-auto z-10 rounded-xl overflow-hidden w-full max-w-[720px]">
          <video
            ref={videoRef}
            src="/videos/hero.mp4"
            controls
            playsInline
            preload="metadata"
            onPlay={handlePlay}
            onPause={handlePause}
            className="w-full h-auto block"
          />

          {showOverlay && (
            <button
              type="button"
              onClick={handleOverlayClick}
              className="absolute inset-0 w-full h-full"
              aria-label="Reproducir vídeo"
              title="Reproducir"
            >
              <Image
                src="/images/hero-poster.webp"
                alt="Vista previa"
                fill
                priority={false}
                className="object-cover"
              />
              {/* opcional: un pequeño degradado para que se vea más pro */}
              <div className="absolute inset-0 bg-black/10" />
              {/* opcional: icono play “pro” */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur rounded-full px-5 py-3 font-semibold shadow">
                  ▶ Reproducir
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
