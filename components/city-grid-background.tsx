"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type CityGridBackgroundProps = {
  onReady?: () => void
}

export default function CityGridBackground({ onReady }: CityGridBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rafRef = useRef<number>(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.Fog(0x050505, 8, 25);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 3, 8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Notify parent that the background has been initialized and the canvas is attached
    // Use a microtask to ensure the DOM append has completed before signaling ready
    Promise.resolve().then(() => onReady?.());

    // Material
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0xccff00,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    // Building generator
    function createBuilding(x: number, z: number, type: number) {
      const height = 1 + Math.random() * 4;
      const group = new THREE.Group();

      if (type === 0) {
        const geometry = new THREE.BoxGeometry(0.4, height, 0.4);
        const mesh = new THREE.Mesh(geometry, gridMaterial);
        mesh.position.y = height / 2;
        group.add(mesh);
      } else if (type === 1) {
        const geometry = new THREE.BoxGeometry(1.5, 0.2, 1);
        const mesh = new THREE.Mesh(geometry, gridMaterial);
        mesh.position.y = 0.1;
        group.add(mesh);
      } else if (type === 2) {
        const geometry = new THREE.BoxGeometry(0.8, height * 0.6, 0.8);
        const mesh = new THREE.Mesh(geometry, gridMaterial);
        mesh.position.y = (height * 0.6) / 2;
        group.add(mesh);

        const roofGeo = new THREE.PlaneGeometry(0.8, 0.8, 4, 4);
        const roof = new THREE.Mesh(roofGeo, gridMaterial);
        roof.rotation.x = -Math.PI / 4;
        roof.position.y = height * 0.6 + 0.3;
        group.add(roof);
      }

      group.position.set(x, 0, z);
      return group;
    }

    // City generation
    function generateCity() {
      const cityGroup = new THREE.Group();
      const rangeI = isMobile ? 8 : 15;
      const rangeJ = isMobile ? 4 : 8;

      for (let i = -rangeI; i < rangeI; i++) {
        for (let j = -rangeJ; j < rangeJ; j++) {
          const x = i * 0.8;
          const z = j * 0.6;
          const type = Math.floor(Math.random() * 3);
          const building = createBuilding(x, z, type);
          if (Math.abs(i) > 2 || Math.abs(j) > 2) {
            building.position.y = -Math.random() * 0.5;
          }
          cityGroup.add(building);
        }
      }
      scene.add(cityGroup);
      return cityGroup;
    }

    generateCity();

    // Ground plane
    const groundGeo = new THREE.PlaneGeometry(60, 60);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.6,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    scene.add(ground);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x111111, 1.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(5, 10, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const neonLight = new THREE.PointLight(0xccff00, 0.3, 20);
    neonLight.position.set(0, 5, 0);
    scene.add(neonLight);

    // Animation
    function animate(time: number) {
      if (!isVisibleRef.current) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      const t = time * 0.0003;
      camera.position.x = Math.sin(t) * 10;
      camera.position.z = Math.cos(t) * 10;
      camera.lookAt(0, 1, 0);
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);

    // Resize
    function onResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener('resize', onResize);

    // Visibility observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      renderer.dispose();
      gridMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
