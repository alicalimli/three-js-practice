import "./App.css";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { memo, useCallback, useRef } from "react";
import Moon from "./Moon";
import * as THREE from "three";

const Earth = () => {
  const [
    earthTexture,
    earthNormal,
    earthSpecular,
    earthDisplacement,
    earthNight,
  ] = useTexture([
    "/earth_day.jpg",
    "/earth_normal.jpg",
    "/earth_specular.jpg",
    "/earth_displacement.jpg",
    "/earth_night.jpg",
  ]);

  const earthRef = useRef<THREE.Group>(null);
  const earthPositionRef = useRef(new THREE.Vector3(8, 0, 0));
  const clockRef = useRef(new THREE.Clock());

  const updateEarthPos = useCallback(() => {
    if (!earthRef.current || !clockRef.current) return;

    const angle = clockRef.current.getElapsedTime() * 0.5;
    const distance = 6;

    const x = Math.sin(angle) * distance;
    const z = Math.cos(angle) * distance;

    earthRef.current.position.set(x, 0, z);
    earthRef.current.rotation.y += 0.004;

    earthPositionRef.current = earthRef.current.position;
  }, []);

  useFrame(() => updateEarthPos());

  return (
    <group ref={earthRef}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial
          map={earthTexture}
          normalMap={earthNormal}
          shininess={1000}
          displacementMap={earthDisplacement}
          specularMap={earthSpecular}
          displacementScale={0.2}
          emissiveMap={earthNight}
          emissiveIntensity={1.5}
          emissive={0xffffff}
        />
      </mesh>

      <Moon />
    </group>
  );
};

export default memo(Earth);
