import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { memo, useCallback, useRef } from "react";
import * as THREE from "three";

const Earth = () => {
  const [earthTexture, earthNormal, earthNight] = useTexture([
    "/earth_day.jpg",
    "/earth_normal.jpg",
    "/earth_night.jpg",
  ]);

  const circleRef = useRef<THREE.Mesh>(null);
  const clockRef = useRef(new THREE.Clock());

  const updatePos = useCallback(() => {
    if (!circleRef.current || !clockRef.current) return;

    circleRef.current.position.x =
      Math.sin(clockRef.current.getElapsedTime() * 0.7) * 12;
    circleRef.current.position.z =
      Math.cos(clockRef.current.getElapsedTime() * 0.7) * 12;

    circleRef.current.rotation.y += 0.002;
  }, []);

  useFrame(() => updatePos());

  return (
    <mesh ref={circleRef} castShadow receiveShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhongMaterial
        map={earthTexture}
        normalMap={earthNormal}
        shininess={1000}
        emissiveMap={earthNight}
        emissiveIntensity={1.5}
        emissive={0xffffff}
      />
    </mesh>
  );
};

export default memo(Earth);
