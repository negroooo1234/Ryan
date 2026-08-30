'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { chosoSourceUrl } from '@/lib/imageUrl';

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
  chromatic: false,
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

  useEffect(() => {
    const img = new Image();
    img.src = chosoSourceUrl(imageSrc);
    img.decoding = 'async';
    img.fetchPriority = 'high';
    img.onload = () => {
      imgRef.current = img;
      setIsLoaded(true);
    };
    return () => {
      imgRef.current = null;
    };
  }, [imageSrc]);

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

    const isMobile = width < 768;
    const cellSize = isMobile ? 2.0 : Math.max(2, SIGNATURE_CONFIG.cellSize);
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
    sampleCtx.imageSmoothingEnabled = true;
    sampleCtx.imageSmoothingQuality = 'high';

    if (isMobile) {
      const zoomFactor = 1.32;
      const cropW = img.naturalWidth / zoomFactor;
      const cropH = img.naturalHeight / zoomFactor;
      const cropX = (img.naturalWidth - cropW) * 0.50;
      const cropY = 0;
      const drawW = cols;
      const drawH = Math.round(cols * (cropH / cropW));
      const topOffset = Math.round(rows * 0.008);
      sampleCtx.drawImage(img, cropX, cropY, cropW, cropH, 0, topOffset, drawW, drawH);
    } else if (imgAspect > canvasAspect) {
      const sw = img.naturalHeight * canvasAspect;
      const sx = (img.naturalWidth - sw) * 0.90;
      sampleCtx.drawImage(img, sx, 0, sw, img.naturalHeight, 0, 0, cols, rows);
    } else {
      const sh = img.naturalWidth / canvasAspect;
      const dx = canvasAspect > 1.15 ? Math.round(cols * 0.22) : 0;
      sampleCtx.drawImage(img, 0, 0, img.naturalWidth, sh, dx, 0, cols, rows);
    }

    const imgData = sampleCtx.getImageData(0, 0, cols, rows);
    const pixels = imgData.data;

    const totalCells = cols * rows;
    const lumArray = new Float32Array(totalCells);
    const alphaArray = new Float32Array(totalCells);
    const edgeArray = new Float32Array(totalCells);

    const brightnessShift = ((isMobile ? 3 : SIGNATURE_CONFIG.brightness) / 100) * 255;
    const contrastFactor = 1 + ((isMobile ? 45 : SIGNATURE_CONFIG.contrast) / 100) * 1.5;
    const gammaVal = isMobile ? 1.5 : Math.max(0.2, SIGNATURE_CONFIG.gamma);

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

    const edgeScale = (isMobile ? 18 : SIGNATURE_CONFIG.edgeEmphasis) / 100;
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

    ctx.clearRect(0, 0, width, height);
    ctx.save();

    const baseArm = Math.max(1, Math.round(cellSize * 0.42));
    const minLumThreshold = isMobile ? 0.055 : 0.075;

    for (let r = 0; r < rows; r++) {
      const rowOffset = r * cols;
      const cy = r * cellSize + (cellSize >> 1);

      for (let c = 0; c < cols; c++) {
        const i = rowOffset + c;
        const A = alphaArray[i];
        if (A <= 0.05) continue;

        const normLum = Math.min(1, Math.max(0, (lumArray[i] + edgeArray[i] * edgeScale * 0.9)));

        if (normLum > minLumThreshold) {
          const cx = c * cellSize + (cellSize >> 1);
          const arm = Math.max(1, Math.round(baseArm * Math.min(1, normLum * 0.95)));
          const v = Math.min(255, Math.round(normLum * 255));

          ctx.fillStyle = `rgb(${v},${v},${v})`;

          if (SIGNATURE_CONFIG.renderMode === 'cross') {
            ctx.fillRect(cx - arm, cy, arm * 2 + 1, 1);
            ctx.fillRect(cx, cy - arm, 1, arm * 2 + 1);
          } else {
            const dotSize = Math.max(1, Math.round(cellSize * normLum));
            ctx.fillRect(cx - (dotSize >> 1), cy - (dotSize >> 1), dotSize, dotSize);
          }
        }
      }
    }

    ctx.restore();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    renderBake();

    let resizeTimer: number | undefined;
    let lastWidth = window.innerWidth;

    const handleResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(renderBake, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.clearTimeout(resizeTimer);
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
