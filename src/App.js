import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { OrbitControls, Stars } from "drei";
import { Physics } from "use-cannon";
import "./styles.css";
import * as THREE from 'three';
import Hurricane from "./Hurricane.json";

function Letter() {
  const mesh = useRef(null)
  const font = new THREE.FontLoader().parse(Hurricane);
  const textOptions = {
    font, 
    size: 4,
    height: 1,
  }

  return(
    <points position={[-2, -1.5, 0.5]} ref={mesh}>
      <textGeometry attach="geometry" args={['S', textOptions]} />
      <pointsMaterial attach='material' size={0.06} color={"white"} transparent={true} />
    </points>
  )
}

function Letter2() {
  const mesh = useRef(null)

  const font = new THREE.FontLoader().parse(Hurricane);
  const textOptions = {
    font, 
    size: 4,
    height: 1,
  }

  return (
    <points position={[-2, -1.5, 0.5]} ref={mesh}>
      <textGeometry attach="geometry" args={['S', textOptions]} />
      <pointsMaterial attach='material' size={0.06} color={"white"} transparent={true} />
    </points>
  )
}

function Sphere() {
  const ball = useRef(null)

  useFrame(() => {
    ball.current.rotation.y += 0.0001
    ball.current.rotation.z += 0.0001
  })

  return (
    <points position={[0, 0, 0]} ref={ball} >
      <sphereGeometry attach="geometry" args={[8, 60, 40]} />
      <pointsMaterial attach='material' size={0.06} color={"white"} />
    </points>
  )
}

function Sphere2() {
  const ball = useRef(null)

  useFrame(() => {
    ball.current.rotation.y += -0.0001
    ball.current.rotation.z += -0.0001
  })

  return (
    <points position={[0, 0, 0]} ref={ball} >
      <sphereGeometry attach="geometry" args={[7, 60, 40]} />
      <pointsMaterial attach='material' size={0.06} color={"white"} />
    </points>
  )
}

function Sphere3() {
  const ball = useRef(null)

  useFrame(() => {
    ball.current.rotation.y += 0.001
    ball.current.rotation.z += 0.0001
  })

  return (
    <points position={[0, 0, 0]} ref={ball} >
      <sphereGeometry attach="geometry" args={[6, 60, 40]} />
      <pointsMaterial attach='material' size={0.06} color={"white"} />
    </points>
  )
}

function CameraMovement({children}) {
  const { camera, mouse } = useThree()
  const vec = new THREE.Vector3()
  const cam = useRef(null)

  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * -1, 0, -1.5), -0.001)
    cam.current.position.lerp(vec.set(mouse.x * -0.001, mouse.y * -0.001, 0), -0.001)
  })

  return <group ref={cam}>{children}</group>
}

export default function App() {
  return (
    <Canvas camera={{fov: 15, position: [0, 0, 20]}}>
      <OrbitControls />
      <Stars saturation={10} radius={5} fade={true} />
      <Physics>
        <CameraMovement>
          <Letter />
          <Letter2 />
        </CameraMovement>
        <Sphere />
        <Sphere2 />
        <Sphere3 />
      </Physics>
    </Canvas>
  );
}
