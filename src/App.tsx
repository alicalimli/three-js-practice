import { useRef, useState } from "react";
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { useSpring, animated } from "@react-spring/three";

const Cube = ({ position, size, color, onClick }) => {
  const ref = useRef<Mesh>(null);

  // useFrame((state, delta) => {
  //   if (!ref.current) return;

  //   ref.current.rotation.x += state.clock.getElapsedTime();
  // });

  return (
    <mesh ref={ref} position={position} onClick={() => onClick()}>
      <boxGeometry args={size} /> <meshStandardMaterial color={color} />
    </mesh>
  );
};

function App() {
  const [active, setactive] = useState("first");

  const { position, scale } = useSpring({
    position: active === "first" ? [0, 0, 0] : [4, 0, 0],
    scale: active === "first" ? 1.5 : 1,
  });
  const { position: pos2, scale: scale2 } = useSpring({
    position: active === "second" ? [0, 0, 0] : [4, 0, 0],
    scale: active === "second" ? 1.5 : 1,
  });

  const { position: pos3, scale: scale3 } = useSpring({
    position: active === "third" ? [0, 0, 0] : [-4, 0, 0],
    scale: active === "third" ? 1.5 : 1,
  });

  // const { scale } = useSpring({ scale: active === "first" ? 1.5 : 1 });

  return (
    <Canvas>
      <directionalLight position={[0, 0, 2]} />

      <animated.mesh
        position={position}
        scale={scale}
        onClick={() => setactive("first")}
      >
        <boxGeometry args={[2, 3, 2]} />
        <meshStandardMaterial color={"blue"} />
      </animated.mesh>

      <animated.mesh
        position={pos2}
        scale={scale2}
        onClick={() => setactive("second")}
      >
        <boxGeometry args={[2, 3, 2]} />
        <meshStandardMaterial color={"orange"} />
      </animated.mesh>

      <animated.mesh
        position={pos3}
        scale={scale3}
        onClick={() => setactive("third")}
      >
        <boxGeometry args={[2, 3, 2]} />
        <meshStandardMaterial color={"green"} />
      </animated.mesh>
    </Canvas>
  );
}

export default App;
