import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Earth from "./Earth";
import Sun from "./Sun";
import { Perf } from "r3f-perf";

function SolarSystem() {
  return (
    <>
      <color attach="background" args={["black"]} />

      <Sun />

      <Earth />

      <Stars />

      <OrbitControls />
    </>
  );
}

function App() {
  return (
    <Canvas shadows camera={{ position: [0, 20, 0] }}>
      {/* <Perf /> */}

      <SolarSystem />
    </Canvas>
  );
}

export default App;
