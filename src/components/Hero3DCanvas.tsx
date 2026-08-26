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

    // Check WebGL support
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL not supported', e);
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.8);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Mouse-tracking cursor point light
    const cursorLight = new THREE.PointLight(0xffffff, 5.0, 18);
    cursorLight.position.set(2, 2, 5);
    scene.add(cursorLight);

    // Rim light for silver specular sheen
    const rimLight = new THREE.DirectionalLight(0xe2e8f0, 3.8);
    rimLight.position.set(-4, 4, 4);
    scene.add(rimLight);

    const bottomFillLight = new THREE.PointLight(0x71717a, 2.5, 12);
    bottomFillLight.position.set(0, -3, 3);
    scene.add(bottomFillLight);

    // Group for all interactive objects
    const emblemGroup = new THREE.Group();
    scene.add(emblemGroup);

    // Create procedural environment texture for chrome reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    const envLight1 = new THREE.DirectionalLight(0xffffff, 2);
    envLight1.position.set(1, 1, 1);
    envScene.add(envLight1);
    const envLight2 = new THREE.DirectionalLight(0x94a3b8, 1.5);
    envLight2.position.set(-1, -1, -1);
    envScene.add(envLight2);

    const envTexture = pmremGenerator.fromScene(envScene).texture;
    scene.environment = envTexture;

    // Load the official RAYN.PNG logo texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      '/RAYN.PNG',
      (logoTexture) => {
        logoTexture.colorSpace = THREE.SRGBColorSpace;
        logoTexture.generateMipmaps = true;
        logoTexture.minFilter = THREE.LinearMipmapLinearFilter;

        // Front Logo Disc with crisp 1:1 UV mapping
        const logoGeo = new THREE.CircleGeometry(2.25, 64);
        const logoMat = new THREE.MeshStandardMaterial({
          map: logoTexture,
          color: 0xffffff,
          metalness: 0.95,
          roughness: 0.12,
          envMapIntensity: 2.8,
          bumpMap: logoTexture,
          bumpScale: 0.05,
          side: THREE.FrontSide,
        });
        const logoMesh = new THREE.Mesh(logoGeo, logoMat);
        logoMesh.position.z = 0.09;
        emblemGroup.add(logoMesh);

        // Backing Medallion Chassis (Brushed Titanium / Polished Chrome)
        const chassisGeo = new THREE.CylinderGeometry(2.32, 2.32, 0.16, 64);
        const chassisMat = new THREE.MeshStandardMaterial({
          color: 0x18181b,
          metalness: 0.98,
          roughness: 0.18,
          envMapIntensity: 2.0,
        });
        const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
        chassisMesh.rotation.x = Math.PI / 2;
        emblemGroup.add(chassisMesh);

        // Surrounding Sculptural Outer Rings (Architectural Chrome)
        const outerRingGeo = new THREE.TorusGeometry(2.55, 0.035, 16, 100);
        const ringMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 1.0,
          roughness: 0.06,
          envMapIntensity: 3.2,
        });
        const outerRing = new THREE.Mesh(outerRingGeo, ringMat);
        emblemGroup.add(outerRing);

        const innerRingGeo = new THREE.TorusGeometry(2.36, 0.02, 16, 100);
        const innerRing = new THREE.Mesh(innerRingGeo, ringMat);
        emblemGroup.add(innerRing);

        // Floating Kinetic Gyro Orbit Ring
        const gyroGeo = new THREE.TorusGeometry(2.9, 0.02, 16, 120);
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
      (err) => console.error('Error loading RAYN logo texture', err)
    );

    // Floating Atmospheric Chrome/Dust Particles
    const particlesCount = 90;
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
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Interaction & Inertia
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

    // Touch support for mobile devices
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

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleDragMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth damped rotation towards target
      emblemGroup.rotation.y += (targetRotY - emblemGroup.rotation.y) * 0.07;
      emblemGroup.rotation.x += (targetRotX - emblemGroup.rotation.x) * 0.07;

      // Gentle floating oscillation
      emblemGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.12;

      // Particle atmospheric movement
      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = elapsedTime * 0.01;

      // Rotate extra gyro rings if present
      if (emblemGroup.children[3]) {
        emblemGroup.children[3].rotation.z = elapsedTime * 0.18;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleDragMove);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      pmremGenerator.dispose();
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
      {/* 3D Canvas Mount */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      {/* Subtle Glow Behind the 3D Medallion */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-white/10 via-white/5 to-transparent blur-3xl opacity-60" />
      </div>

      {/* Interactive Helper Hint */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-300 opacity-70 hover:opacity-100">
        <div className="px-3 py-1 bg-black/70 backdrop-blur-md border border-white/15 rounded-full flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <span className="text-[10px] font-mono text-[#CBD5E1] uppercase tracking-widest">
            {isHovered ? 'Arrastra para rotar en 3D' : 'Monograma RN Interactivo 3D'}
          </span>
        </div>
      </div>
    </div>
  );
}
