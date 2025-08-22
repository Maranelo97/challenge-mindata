import { Injectable } from '@angular/core';
import * as THREE from 'three';
import html2canvas from 'html2canvas';

@Injectable({ providedIn: 'root' })
export class ThanosEffectService {
  async snapElement(element: HTMLElement) {
    // Capturamos el elemento como imagen
    const canvas = await html2canvas(element, { backgroundColor: null });
    const texture = new THREE.CanvasTexture(canvas);

    // Escena, cámara, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, element.clientWidth / element.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(element.clientWidth, element.clientHeight);
    document.body.appendChild(renderer.domElement); // Temporal: luego se puede poner en overlay

    // Crear geometría de partículas
    const particles = 5000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particles * 3);
    const uvs = new Float32Array(particles * 2);

    for (let i = 0; i < particles; i++) {
      const x = (Math.random() - 0.5) * 2;
      const y = (Math.random() - 0.5) * 3;
      const z = (Math.random() - 0.5) * 0.5;
      positions.set([x, y, z], i * 3);
      uvs.set([Math.random(), Math.random()], i * 2);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      map: texture,
      transparent: true,
      alphaTest: 0.1
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let t = 0;
    function animate() {
      requestAnimationFrame(animate);
      t += 0.01;
      const pos = geometry.attributes['position'] as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        pos.array[i * 3] += (Math.random() - 0.5) * 0.02;
        pos.array[i * 3 + 1] += (Math.random() - 0.5) * 0.02 + t * 0.02;
      }
      pos.needsUpdate = true;
      material.opacity = 1 - t * 0.5;
      renderer.render(scene, camera);
      if (material.opacity <= 0) {
        renderer.domElement.remove();
      }
    }
    animate();
  }
}
