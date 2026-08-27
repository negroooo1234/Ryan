'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface ChosoConfig {
  renderMode: 'cross' | 'dither';
  fitMode: 'cover' | 'contain';
  cellSize: number;
  gamma: number;
  edgeEmphasis: number;
  removeStudioBg: boolean;
  brightness: number;
  contrast: number;
  chromatic: boolean;
  animated: boolean;
  baseFill: number;
  horizontalAlign: number;
  scaleMultiplier: number;
}

// User-locked signature configuration
export const SIGNATURE_CONFIG: ChosoConfig = {
  renderMode: 'cross',
  fitMode: 'cover',
  cellSize: 3,
  gamma: 1.5,
  edgeEmphasis: 13,
  removeStudioBg: false,
  brightness: 4,
  contrast: 45,
  chromatic: true,
  animated: false,
  baseFill: 12,
  horizontalAlign: 65,
  scaleMultiplier: 1,
};

interface ChosoAsciiCanvasProps {
  imageSrc?: string;
  className?: string;
  opacity?: number;
}

export function ChosoAsciiCanvas({
  imageSrc = '/ascii-background.png',
  className = '',
  opacity = 1,
}: ChosoAsciiCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Load Image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = `${imageSrc}?v=${Date.now()}`;
    img.onload = () => {
      imgRef.current = img;
      setIsLoaded(true);
    };
    return () => {
      imgRef.current = null;
    };
  }, [imageSrc]);

  // High-Quality GPU Accelerated Static Bake Render
  const renderBake = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;

    if (width === 0 || height === 0) return;

    canvas.width = width;
    canvas.height = height;

    const cellSize = Math.max(2, SIGNATURE_CONFIG.cellSize);
    const cols = Math.ceil(width / cellSize);
    const rows = Math.ceil(height / cellSize);

    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = cols;
    sampleCanvas.height = rows;
    const sampleCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });
    if (!sampleCtx) return;

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    sampleCtx.clearRect(0, 0, cols, rows);

    // Smart Cover: Anchored to top (close-up size) with subtle right shift for Hero aesthetics
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
    if (imgAspect > canvasAspect) {
      sw = img.naturalHeight * canvasAspect;
      sx = (img.naturalWidth - sw) * 0.70;
      sampleCtx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
    } else {
      sh = img.naturalWidth / canvasAspect;
      sy = 0;
      const dx = canvasAspect > 1.15 ? Math.round(cols * 0.08) : 0;
      sampleCtx.drawImage(img, sx, sy, sw, sh, dx, 0, cols, rows);
    }

    const imgData = sampleCtx.getImageData(0, 0, cols, rows);
    const pixels = imgData.data;

    const totalCells = cols * rows;
    const lumArray = new Float32Array(totalCells);
    const alphaArray = new Float32Array(totalCells);
    const edgeArray = new Float32Array(totalCells);

    const brightnessShift = (SIGNATURE_CONFIG.brightness / 100) * 255;
    const contrastFactor = 1 + (SIGNATURE_CONFIG.contrast / 100) * 1.5;
    const gammaVal = Math.max(0.2, SIGNATURE_CONFIG.gamma);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        const idx = i * 4;
        const R = pixels[idx];
        const G = pixels[idx + 1];
        const B = pixels[idx + 2];
        const A = pixels[idx + 3] / 255.0;

        if (A < 0.05) continue;
        alphaArray[i] = A;

        const rawLum = 0.299 * R + 0.587 * G + 0.114 * B;
        const norm = Math.min(1, Math.max(0, rawLum / 255.0));
        const gammaLum = Math.pow(norm, gammaVal) * 255.0;
        const adjLum = (gammaLum - 128 + brightnessShift) * contrastFactor + 128;
        lumArray[i] = Math.max(0, Math.min(1, adjLum / 255.0));
      }
    }

    // Sobel Edge Filter
    const edgeScale = SIGNATURE_CONFIG.edgeEmphasis / 100;
    for (let r = 1; r < rows - 1; r++) {
      for (let c = 1; c < cols - 1; c++) {
        const i = r * cols + c;
        const idxL = (r * cols + (c - 1)) * 4;
        const idxR = (r * cols + (c + 1)) * 4;
        const idxU = ((r - 1) * cols + c) * 4;
        const idxD = ((r + 1) * cols + c) * 4;

        const lumL = 0.299 * pixels[idxL] + 0.587 * pixels[idxL + 1] + 0.114 * pixels[idxL + 2];
        const lumR = 0.299 * pixels[idxR] + 0.587 * pixels[idxR + 1] + 0.114 * pixels[idxR + 2];
        const lumU = 0.299 * pixels[idxU] + 0.587 * pixels[idxU + 1] + 0.114 * pixels[idxU + 2];
        const lumD = 0.299 * pixels[idxD] + 0.587 * pixels[idxD + 1] + 0.114 * pixels[idxD + 2];

        const gx = lumR - lumL;
        const gy = lumD - lumU;
        edgeArray[i] = Math.sqrt(gx * gx + gy * gy) / 255.0;
      }
    }

    // Render Clean High-Definition Dither to Canvas
    ctx.clearRect(0, 0, width, height);
    ctx.save();

    const baseArm = Math.max(1, Math.round(cellSize * 0.45));
    const hasChromatic = SIGNATURE_CONFIG.chromatic;
    const fillFloor = (SIGNATURE_CONFIG.baseFill / 100);

    for (let r = 0; r < rows; r++) {
      const rowOffset = r * cols;
      const cy = r * cellSize + (cellSize >> 1);

      for (let c = 0; c < cols; c++) {
        const i = rowOffset + c;
        const A = alphaArray[i];
        if (A <= 0.05) continue;

        const baseFill = fillFloor * A;
        const computedLum = lumArray[i] + edgeArray[i] * edgeScale * 0.95;
        const normLum = Math.min(1, Math.max(baseFill, computedLum));

        if (normLum > 0.04) {
          const cx = c * cellSize + (cellSize >> 1);
          const arm = Math.max(1, Math.round(baseArm * normLum));
          const v = Math.min(255, Math.max(25, Math.round(normLum * 255)));

          ctx.fillStyle = `rgb(${v},${v},${Math.min(255, v + 8)})`;

          if (SIGNATURE_CONFIG.renderMode === 'cross') {
            // Draw Cross (+)
            ctx.fillRect(cx - arm, cy, arm * 2 + 1, 1);
            ctx.fillRect(cx, cy - arm, 1, arm * 2 + 1);
          } else {
            // Draw Dot (■)
            const dotSize = Math.max(1, Math.round(cellSize * normLum));
            ctx.fillRect(cx - (dotSize >> 1), cy - (dotSize >> 1), dotSize, dotSize);
          }

          // Subtle RGB Chromatic Aberration
          if (hasChromatic && normLum > 0.35) {
            ctx.fillStyle = 'rgba(255,0,50,0.5)';
            ctx.fillRect(cx - arm - 1, cy, 1, 1);
            ctx.fillStyle = 'rgba(0,240,255,0.5)';
            ctx.fillRect(cx + arm + 1, cy, 1, 1);
          }
        }
      }
    }

    ctx.restore();
  }, []);

  // Trigger Bake Render upon Load or Window Resize
  useEffect(() => {
    if (!isLoaded) return;
    renderBake();

    const handleResize = () => {
      renderBake();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoaded, renderBake]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none pointer-events-none ${className}`}
      style={{
        opacity,
        transform: 'translateZ(0)',
        willChange: 'opacity, transform',
      }}
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full block ${SIGNATURE_CONFIG.animated ? 'animate-choso-pulse' : ''}`}
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      />
    </div>
  );
}
