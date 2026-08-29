'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Hero3DCanvasProps {
  className?: string;
}

export function Hero3DCanvas({ className = '' }: Hero3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
        precision: 'highp',
        stencil: false,
        depth: true,
      });
    } catch (e) {
      console.warn('WebGL not supported', e);
      return;
    }

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0, 9.8);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const frontKeyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    frontKeyLight.position.set(0, 2, 6);
    scene.add(frontKeyLight);

    const cursorLight = new THREE.PointLight(0xffffff, 4.5, 18);
    cursorLight.position.set(2, 2, 5);
    scene.add(cursorLight);

    const rimLight = new THREE.DirectionalLight(0xe2e8f0, 4.0);
    rimLight.position.set(-4, 4, 4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x94a3b8, 2.5);
    fillLight.position.set(4, -3, 3);
    scene.add(fillLight);

    const emblemGroup = new THREE.Group();
    scene.add(emblemGroup);

    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
    const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget);
    const envScene = new THREE.Scene();
    const envL1 = new THREE.DirectionalLight(0xffffff, 4.0);
    envL1.position.set(1, 2, 2);
    envScene.add(envL1);
    const envL2 = new THREE.DirectionalLight(0xcfd8dc, 3.0);
    envL2.position.set(-2, -1, -1);
    envScene.add(envL2);
    const envL3 = new THREE.DirectionalLight(0x94a3b8, 2.0);
    envL3.position.set(0, -2, 2);
    envScene.add(envL3);
    cubeCamera.update(renderer, envScene);
    scene.environment = cubeRenderTarget.texture;

    const LOGO_SRC = '/RAYN.PNG';
    let gyroRingMesh: THREE.Mesh | null = null;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      LOGO_SRC,
      (logoTexture) => {
        logoTexture.colorSpace = THREE.SRGBColorSpace;
        logoTexture.generateMipmaps = true;
        logoTexture.minFilter = THREE.LinearMipmapLinearFilter;
        logoTexture.magFilter = THREE.LinearFilter;
        const maxAniso = renderer.capabilities.getMaxAnisotropy();
        logoTexture.anisotropy = Math.min(maxAniso, 16);
        logoTexture.needsUpdate = true;

        const logoGeo = new THREE.CircleGeometry(2.26, 128);
        const logoMat = new THREE.MeshStandardMaterial({
          map: logoTexture,
          color: 0xffffff,
          metalness: 0.95,
          roughness: 0.12,
          envMapIntensity: 2.8,
          side: THREE.FrontSide,
        });
        const logoMesh = new THREE.Mesh(logoGeo, logoMat);
        logoMesh.position.z = 0.082;
        emblemGroup.add(logoMesh);

        const chassisGeo = new THREE.CylinderGeometry(2.32, 2.32, 0.16, 128);
        const chassisMat = new THREE.MeshStandardMaterial({
          color: 0x141417,
          metalness: 0.95,
          roughness: 0.18,
          envMapIntensity: 2.0,
        });
        const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
        chassisMesh.rotation.x = Math.PI / 2;
        emblemGroup.add(chassisMesh);

        const bezelGeo = new THREE.TorusGeometry(2.32, 0.02, 24, 160);
        const bezelMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 1.0,
          roughness: 0.06,
          envMapIntensity: 3.5,
        });
        const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
        bezelMesh.position.z = 0.08;
        emblemGroup.add(bezelMesh);

        const ringMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 1.0,
          roughness: 0.06,
          envMapIntensity: 3.2,
        });

        const outerRingGeo = new THREE.TorusGeometry(2.55, 0.032, 24, 160);
        const outerRing = new THREE.Mesh(outerRingGeo, ringMat);
        emblemGroup.add(outerRing);

        const innerRingGeo = new THREE.TorusGeometry(2.36, 0.018, 24, 160);
        const innerRing = new THREE.Mesh(innerRingGeo, ringMat);
        emblemGroup.add(innerRing);

        const gyroGeo = new THREE.TorusGeometry(2.9, 0.022, 24, 160);
        const gyroMat = new THREE.MeshStandardMaterial({
          color: 0xd4d4d8,
          metalness: 0.98,
          roughness: 0.12,
          transparent: true,
          opacity: 0.88,
        });
        const gyroRing = new THREE.Mesh(gyroGeo, gyroMat);
        gyroRing.rotation.x = Math.PI / 3.5;
        gyroRingMesh = gyroRing;
        emblemGroup.add(gyroRing);
      },
      undefined,
      (err) => {
        console.error('Error loading 3D logo texture', err);
      }
    );

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

    let animationFrameId: number | undefined;

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = time * 0.001;

      emblemGroup.rotation.y += (targetRotY - emblemGroup.rotation.y) * 0.08;
      emblemGroup.rotation.x += (targetRotX - emblemGroup.rotation.x) * 0.08;
      emblemGroup.position.y = Math.sin(elapsed * 1.2) * 0.12;

      particles.rotation.y = elapsed * 0.02;

      if (gyroRingMesh) {
        gyroRingMesh.rotation.z = elapsed * 0.18;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    const stopLoop = () => {
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = undefined;
      }
    };

    const startLoop = () => {
      if (animationFrameId === undefined) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    let isOnScreen = true;
    const syncLoop = () => {
      if (isOnScreen && !document.hidden) startLoop();
      else stopLoop();
    };

    const visibilityObserver =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            ([entry]) => {
              isOnScreen = entry.isIntersecting;
              syncLoop();
            },
            { threshold: 0 }
          )
        : null;
    visibilityObserver?.observe(container);

    document.addEventListener('visibilitychange', syncLoop);

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
      stopLoop();
      visibilityObserver?.disconnect();
      document.removeEventListener('visibilitychange', syncLoop);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleDragMove);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry?.dispose();
          const material = object.material;
          for (const m of Array.isArray(material) ? material : [material]) {
            m?.map?.dispose();
            m?.dispose();
          }
        }
      });

      cubeRenderTarget.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className={`relative w-full ${className || 'h-[380px] sm:h-[480px] lg:h-[580px]'} flex items-center justify-center select-none`}
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
