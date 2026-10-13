"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { CATEGORY_META, CATEGORY_ORDER } from "@/lib/site";

function Core({ color }: { color: string }) {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial & { color: THREE.Color }>(null);
  const target = useMemo(() => new THREE.Color(), []);
  useFrame((s, dt) => {
    if (outer.current) {
      outer.current.rotation.y += dt * 0.18;
      outer.current.rotation.x += dt * 0.07;
    }
    if (inner.current) inner.current.rotation.y -= dt * 0.25;
    if (mat.current) mat.current.color.lerp(target.set(color), 0.05);
  });
  return (
    <group>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.9, 1]} />
        <meshBasicMaterial color="#12b862" wireframe transparent opacity={0.45} />
      </mesh>
      <mesh rotation={[0.4, 0.2, 0]}>
        <icosahedronGeometry args={[2.35, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.08} />
      </mesh>
      <mesh ref={inner}>
        <sphereGeometry args={[1.15, 64, 64]} />
        <MeshDistortMaterial ref={mat as never} color={color} distort={0.45} speed={2.2} roughness={0.15} metalness={0.6} emissive={color} emissiveIntensity={0.35} />
      </mesh>
    </group>
  );
}

function Orbiters() {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (g.current) g.current.rotation.y += dt * 0.35;
  });
  return (
    <group ref={g} rotation={[0.35, 0, 0.15]}>
      {CATEGORY_ORDER.map((c, i) => {
        const a = (i / CATEGORY_ORDER.length) * Math.PI * 2;
        return (
          <Float key={c} speed={2} floatIntensity={0.6}>
            <mesh position={[Math.cos(a) * 3.3, Math.sin(a * 2) * 0.5, Math.sin(a) * 3.3]}>
              <octahedronGeometry args={[0.28, 0]} />
              <meshStandardMaterial color={CATEGORY_META[c].color} emissive={CATEGORY_META[c].color} emissiveIntensity={1.2} />
            </mesh>
          </Float>
        );
      })}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.3, 0.008, 8, 160]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function Particles({ count = 900 }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    let seed = 1337; // deterministic PRNG keeps render pure
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    for (let i = 0; i < count; i++) {
      const r = 5 + rnd() * 9;
      const t = rnd() * Math.PI * 2;
      const ph = Math.acos(2 * rnd() - 1);
      p[i * 3] = r * Math.sin(ph) * Math.cos(t);
      p[i * 3 + 1] = r * Math.sin(ph) * Math.sin(t);
      p[i * 3 + 2] = r * Math.cos(ph);
    }
    return p;
  }, [count]);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#9fe8c0" transparent opacity={0.8} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Rig({ children, offsetX, offsetY, scale }: { children: React.ReactNode; offsetX: number; offsetY: number; scale: number }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!g.current) return;
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, s.pointer.x * 0.5, 0.05);
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, -s.pointer.y * 0.3, 0.05);
    g.current.position.x = THREE.MathUtils.lerp(g.current.position.x, offsetX, 0.06);
    g.current.position.y = THREE.MathUtils.lerp(g.current.position.y, offsetY, 0.06);
    g.current.scale.setScalar(THREE.MathUtils.lerp(g.current.scale.x, scale, 0.06));
  });
  return <group ref={g}>{children}</group>;
}

export default function Hero3D({ color, x = 0, y = 0, scale = 1 }: { color: string; x?: number; y?: number; scale?: number }) {
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 45 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 6, 6]} intensity={60} color="#ffffff" />
      <pointLight position={[-6, -3, 4]} intensity={40} color={color} />
      <Rig offsetX={x} offsetY={y} scale={scale}>
        <Core color={color} />
        <Orbiters />
      </Rig>
      <Particles />
    </Canvas>
  );
}
