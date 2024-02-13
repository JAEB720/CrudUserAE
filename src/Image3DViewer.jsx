import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Image3DViewer = () => {
  const containerRef = useRef();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 2;

  const renderer = new THREE.WebGLRenderer();

  useEffect(() => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const texture = new THREE.TextureLoader().load('/ola3.avif');
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const geometry = new THREE.PlaneGeometry(14, 8, 15, 9);

    const imageMesh = new THREE.Mesh(geometry, material);
    scene.add(imageMesh);

    camera.position.z = 5;

    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      for (let i = 0; i < geometry.attributes.position.count; i++) {
        const x = geometry.attributes.position.getX(i);
        const y = geometry.attributes.position.getY(i);
        const animl = 0.25 * Math.sin(x + time * 0.7);

        geometry.attributes.position.setZ(i, animl);
      }

      geometry.computeVertexNormals();
      geometry.attributes.position.needsUpdate = true;

      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };

    animate();

    
    return () => {
      scene.remove(imageMesh);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default Image3DViewer;
