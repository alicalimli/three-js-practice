import "./App.css";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { memo, useCallback, useRef } from "react";
import { Mesh } from "three";
import * as THREE from "three";

const Mercury = () => {
  const [mercuryTexture] = useTexture(["/mercury.jpeg"]);

  const circleRef = useRef<Mesh>(null);
  const clockRef = useRef(new THREE.Clock());

  const updateMoonPos = useCallback(() => {
    if (!circleRef.current || !clockRef.current) return;

    circleRef.current.position.x =
      Math.sin(clockRef.current.getElapsedTime() * 0.8) * 4;
    circleRef.current.position.z =
      Math.cos(clockRef.current.getElapsedTime() * 0.8) * 4;

    circleRef.current.rotation.y += 0.002;
  }, []);

  useFrame(() => updateMoonPos());

  return (
    <mesh receiveShadow castShadow ref={circleRef} position={[4, 0, 0]}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshPhongMaterial
        map={mercuryTexture}
        emissiveMap={mercuryTexture}
        emissiveIntensity={0.1}
        emissive={0xffffff}
      />
    </mesh>
  );
};

export default memo(Mercury);
