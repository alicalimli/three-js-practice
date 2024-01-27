import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Earth from "./planets/Earth";
import Sun from "./planets/Sun";

function SolarSystem() {
  return (
    <>
      <color attach="background" args={["black"]} />

      <Sun />

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
