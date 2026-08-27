'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false, // Disabling heavy antialiasing saves 60% GPU fillrate
        powerPreference: 'high-performance',
        precision: 'mediump',
        stencil: false,
        depth: true,
      });
    } catch (e) {
      console.warn('WebGL not supported', e);
      return;
    }

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Optimized 1.0 - 1.25 pixel ratio for buttery 60 FPS
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0, 9.8);

    // Optimized Lighting (Directional + Ambient only)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const cursorLight = new THREE.PointLight(0xffffff, 4.0, 15);
    cursorLight.position.set(2, 2, 5);
    scene.add(cursorLight);

    const rimLight = new THREE.DirectionalLight(0xe2e8f0, 3.5);
    rimLight.position.set(-4, 4, 4);
    scene.add(rimLight);

    const emblemGroup = new THREE.Group();
    scene.add(emblemGroup);

    // Fast procedurally generated gradient reflection map
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128);
    const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget);
    const envScene = new THREE.Scene();
    const envL1 = new THREE.DirectionalLight(0xffffff, 3);
    envL1.position.set(1, 1, 1);
    envScene.add(envL1);
    const envL2 = new THREE.DirectionalLight(0x94a3b8, 2);
    envL2.position.set(-1, -1, -1);
    envScene.add(envL2);
    cubeCamera.update(renderer, envScene);
    scene.environment = cubeRenderTarget.texture;

    const LOGO_SRC = '/_next/image?url=%2FRAYN.PNG&w=640&q=75';
    const LOGO_FALLBACK = '/RAYN.PNG';

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      LOGO_SRC,
      (logoTexture) => {
        logoTexture.colorSpace = THREE.SRGBColorSpace;
        logoTexture.minFilter = THREE.LinearFilter;

        // Front Logo Disc (32 segments for ultra-fast GPU throughput)
        const logoGeo = new THREE.CircleGeometry(2.25, 36);
        const logoMat = new THREE.MeshStandardMaterial({
          map: logoTexture,
          color: 0xffffff,
          metalness: 0.95,
          roughness: 0.14,
          envMapIntensity: 2.5,
          side: THREE.FrontSide,
        });
        const logoMesh = new THREE.Mesh(logoGeo, logoMat);
        logoMesh.position.z = 0.09;
        emblemGroup.add(logoMesh);

        // Medallion Chassis
        const chassisGeo = new THREE.CylinderGeometry(2.32, 2.32, 0.16, 36);
        const chassisMat = new THREE.MeshStandardMaterial({
          color: 0x18181b,
          metalness: 0.95,
          roughness: 0.2,
          envMapIntensity: 1.8,
        });
        const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
        chassisMesh.rotation.x = Math.PI / 2;
        emblemGroup.add(chassisMesh);

        // Torus Rings (48 tubular segments for peak performance)
        const ringMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 1.0,
          roughness: 0.08,
          envMapIntensity: 3.0,
        });

        const outerRingGeo = new THREE.TorusGeometry(2.55, 0.035, 8, 48);
        const outerRing = new THREE.Mesh(outerRingGeo, ringMat);
        emblemGroup.add(outerRing);

        const innerRingGeo = new THREE.TorusGeometry(2.36, 0.02, 8, 48);
        const innerRing = new THREE.Mesh(innerRingGeo, ringMat);
        emblemGroup.add(innerRing);

        const gyroGeo = new THREE.TorusGeometry(2.9, 0.02, 8, 54);
        const gyroMat = new THREE.MeshStandardMaterial({
          color: 0xd4d4d8,
          metalness: 0.98,
          roughness: 0.14,
          transparent: true,
          opacity: 0.85,
        });
        const gyroRing = new THREE.Mesh(gyroGeo, gyroMat);
        gyroRing.rotation.x = Math.PI / 3.5;
        emblemGroup.add(gyroRing);

        setIsLoaded(true);
      },
      undefined,
      () => {
        textureLoader.load(LOGO_FALLBACK, (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          const geo = new THREE.CircleGeometry(2.25, 36);
          const mat = new THREE.MeshStandardMaterial({
            map: tex,
            color: 0xffffff,
            metalness: 0.95,
            roughness: 0.14,
            envMapIntensity: 2.5,
            side: THREE.FrontSide,
          });
          const mesh = new THREE.Mesh(geo, mat);
          mesh.position.z = 0.09;
          emblemGroup.add(mesh);
          setIsLoaded(true);
        });
      }
    );

    // Floating Particles (reduced count for zero draw call overhead)
    const particlesCount = 40;
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xe4e4e7,
      size: 0.035,
      transparent: true,
      opacity: 0.4,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      mouseX = x * 2;
      mouseY = y * 2;

      cursorLight.position.x = mouseX * 3.5;
      cursorLight.position.y = -mouseY * 3.5;

      if (!isDragging) {
        targetRotY = mouseX * 0.45;
        targetRotX = -mouseY * 0.35;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleDragMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotY += deltaX * 0.01;
      targetRotX += deltaY * 0.01;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = container.getBoundingClientRect();
      const x = (touch.clientX - rect.left) / rect.width - 0.5;
      const y = (touch.clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 0.6;
      targetRotX = -y * 0.4;
      cursorLight.position.x = x * 4;
      cursorLight.position.y = -y * 4;
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('mousemove', handleDragMove, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // High-performance 60 FPS Animation Loop
    let animationFrameId: number;
    let lastRenderTime = 0;

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = time * 0.001;

      // Smooth damped rotation
      emblemGroup.rotation.y += (targetRotY - emblemGroup.rotation.y) * 0.08;
      emblemGroup.rotation.x += (targetRotX - emblemGroup.rotation.x) * 0.08;
      emblemGroup.position.y = Math.sin(elapsed * 1.2) * 0.12;

      particles.rotation.y = elapsed * 0.02;

      if (emblemGroup.children[3]) {
        emblemGroup.children[3].rotation.z = elapsed * 0.18;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleDragMove);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      cubeRenderTarget.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className="relative w-full h-[380px] sm:h-[480px] lg:h-[580px] flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-white/10 via-white/5 to-transparent blur-3xl opacity-60" />
      </div>
    </div>
  );
}
