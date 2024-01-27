import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useCallback, useRef } from "react";
import { Mesh } from "three";
import * as THREE from "three";
import Mercury from "./Mercury";
import Earth from "./Earth";
import Venus from "./Venus";

const Sun = () => {
  const [sunTexture] = useTexture(["/sun_texture.jpg"]);

  const sunRef = useRef<Mesh>(null);

  const clockRef = useRef(new THREE.Clock());

  const updatePos = useCallback(() => {
    if (!sunRef.current || !clockRef.current) return;

    sunRef.current.rotation.y += 0.004;
  }, []);

  useFrame(() => updatePos());

  return (
    <group>
      <group>
        <mesh ref={sunRef} position={[0, 0, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshPhongMaterial
            map={sunTexture}
            displacementScale={0.2}
            emissiveMap={sunTexture}
            emissiveIntensity={1}
            emissive={0xffa500}
          />

          <pointLight castShadow intensity={150} />
        </mesh>

        <mesh visible position={[0, 0, 0]} rotation={[-1.55, 0, 0]} castShadow>
          <ringGeometry args={[4, 4.05, 4000]} />
          <meshBasicMaterial attach="material" color="white" />
        </mesh>

        <mesh visible position={[0, 0, 0]} rotation={[-1.55, 0, 0]} castShadow>
          <ringGeometry args={[8, 8.05, 4000]} />
          <meshBasicMaterial attach="material" color="white" />
        </mesh>

        <mesh visible position={[0, 0, 0]} rotation={[-1.55, 0, 0]} castShadow>
          <ringGeometry args={[12, 12.05, 4000]} />
          <meshBasicMaterial attach="material" color="white" />
        </mesh>
      </group>

      <Mercury />

      <Venus />

      <Earth />
    </group>
  );
};

export default Sun;
