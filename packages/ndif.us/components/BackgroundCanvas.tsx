"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BackgroundCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();

    // Fog to blend particles into the dark background
    scene.fog = new THREE.FogExp2(0x020617, 0.001);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;
    camera.position.y = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create particles to represent the "Fabric"
    const geometry = new THREE.BufferGeometry();
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Create a wavelike distribution
      const x = (Math.random() - 0.5) * 150;
      const z = (Math.random() - 0.5) * 100;
      const y = Math.sin(x * 0.1) * 5 + (Math.random() - 0.5) * 10;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      scales[i] = Math.random();
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    // Custom shader material for glowing dots
    const material = new THREE.PointsMaterial({
      color: 0x38bdf8, // Sky blue brand color
      size: 0.4,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    // Add a secondary color system (Purple accents)
    const geometry2 = new THREE.BufferGeometry();
    const count2 = 500;
    const positions2 = new Float32Array(count2 * 3);
    for (let i = 0; i < count2; i++) {
      positions2[i * 3] = (Math.random() - 0.5) * 150;
      positions2[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions2[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    geometry2.setAttribute("position", new THREE.BufferAttribute(positions2, 3));
    const material2 = new THREE.PointsMaterial({
      color: 0x8b5cf6, // Violet accent
      size: 0.5,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    const particles2 = new THREE.Points(geometry2, material2);

    scene.add(particles);
    scene.add(particles2);

    // Lines connecting particles (simplified for performance)
    const planeGeo = new THREE.PlaneGeometry(200, 200, 40, 40);
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x0f172a,
      wireframe: true,
      transparent: true,
      opacity: 0.05,
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -10;
    scene.add(plane);

    // Animation Loop
    let time = 0;
    let animationId: number;

    function animate() {
      animationId = requestAnimationFrame(animate);
      time += 0.001;

      // Rotate particle systems slightly
      particles.rotation.y = time * 0.5;
      particles2.rotation.y = time * 0.3;

      // Waving motion for the main particle field
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const x = positions[i * 3];
        // Sine wave based on x position and time
        positions[i * 3 + 1] += Math.sin(x * 0.1 + time * 10) * 0.02;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Subtle camera movement
      camera.position.x = Math.sin(time) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    animate();

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      // Clean up Three.js resources if needed
      geometry.dispose();
      material.dispose();
      geometry2.dispose();
      material2.dispose();
      planeGeo.dispose();
      planeMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div id="canvas-container" ref={containerRef} />;
}
