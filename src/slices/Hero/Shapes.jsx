"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <Geometries />
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={9}
          />
          <Environment preset="dawn" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Geometries() {
  const geometries = [
    {
      position: [0, 0, 0],
      r: 0.3,
      geometry: new THREE.IcosahedronGeometry(3),
    },
    {
      position: [-2, 1.5, 0],
      r: 0.9,
      geometry: new THREE.OctahedronGeometry(0.7),
    },
    {
      position: [2.2, 1, 0.7],
      r: 0.5,
      geometry: new THREE.DodecahedronGeometry(0.8),
    },
    {
      position: [-2.2, -0.8, 0.7],
      r: 0.8,
      geometry: new THREE.TorusGeometry(0.8),
    },
    {
      position: [1.4, -1.2, 2.3],
      r: 0.7,
      geometry: new THREE.ConeGeometry(0.6, 1.5, 5),
    },
  ];

  const materials = [
    new THREE.MeshStandardMaterial({
      color: 0x1976d2,
      roughness: 0,
      metalness: 0.8,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x2196f3,
      roughness: 0,
      metalness: 0.8,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x29b6f6,
      roughness: 0,
      metalness: 0.8,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x81d4fa,
      roughness: 0,
      metalness: 0.8,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x0d47a1,
      roughness: 0,
      metalness: 0.8,
    }),
  ];

  const sounds = [
    new Audio("/sounds/knock1.ogg"),
    new Audio("/sounds/knock2.ogg"),
    new Audio("/sounds/knock3.ogg"),
    new Audio("/sounds/knock4.ogg"),
  ];

  return geometries.map(({ position, r, geometry }) => (
    <Geometry
      key={JSON.stringify(position)}
      position={position.map((p) => p * 2)}
      geometry={geometry}
      materials={materials}
      r={r}
      soundEffects={sounds}
    />
  ));
}

function Geometry({ r, position, geometry, materials, soundEffects }) {
  const meshRef = useRef();
  const [visible, setVisible] = useState(false);

  const startingMaterial = getRandomMaterial();

  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }

  function handleClick(e) {
    const mesh = e.object;

    gsap.utils.random(soundEffects).play();

    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 2)}`,
      y: `+=${gsap.utils.random(0, 2)}`,
      z: `+=${gsap.utils.random(0, 2)}`,
      duration: 1.3,
      ease: "elastic.out(1,0.3)",
    });

    mesh.material = getRandomMaterial();
  }

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true);
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
        delay: 0.3,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <group position={position} ref={meshRef}>
      <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visible={visible}
          material={startingMaterial}
        ></mesh>
      </Float>
    </group>
  );
}
