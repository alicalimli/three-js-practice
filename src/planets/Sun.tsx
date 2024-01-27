import "./App.css";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";

const Earth = () => {
  const [sunTexture] = useTexture(["/sun_texture.jpg"]);

  const circleRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!circleRef.current) return;

    circleRef.current.rotation.y += 0.004;
  });

  return (
    <mesh ref={circleRef} position={[0, 0, 0]}>
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
  );
};

export default Earth;
