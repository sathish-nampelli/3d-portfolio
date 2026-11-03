import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { sound } from '../../utils/audio';
import { Play, Pause } from 'lucide-react';

interface HolographicPortraitProps {
  theme: 'cyberpunk' | 'matrix' | 'synthwave' | 'minimal';
}

const THEME_ACCENTS = {
  cyberpunk: { rim: '#ff8800', glow: '#00f0ff', ambient: '#0a0d18' },
  matrix: { rim: '#00ff66', glow: '#00cc44', ambient: '#041008' },
  synthwave: { rim: '#ff5500', glow: '#ff00aa', ambient: '#14081c' },
  minimal: { rim: '#e2e8f0', glow: '#94a3b8', ambient: '#0f172a' }
};

// 3D Portrait Plane with Dynamic Shaders & Texture
const PortraitPlane = ({ autoPlay }: { autoPlay: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const portraitSrc = `${import.meta.env.BASE_URL}sathish-portrait.png`;
  const texture = useLoader(THREE.TextureLoader, portraitSrc);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      if (autoPlay) {
        // Cinematic gentle breathing / float
        meshRef.current.position.y = Math.sin(t * 1.2) * 0.05;
        meshRef.current.rotation.y = Math.sin(t * 0.8) * 0.06;
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Back glow plate */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[4.4, 2.6]} />
        <meshBasicMaterial color="#ff7700" transparent opacity={0.12} />
      </mesh>

      {/* Main Photographic Image Mesh */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[4.2, 2.45]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Holographic Scanning Laser Beam */}
      <HoloScanline />
    </group>
  );
};

// Scanning line beam that sweeps vertically over the portrait
const HoloScanline = () => {
  const beamRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (beamRef.current) {
      const t = (state.clock.getElapsedTime() * 0.9) % 2.6 - 1.3;
      beamRef.current.position.y = t;
    }
  });

  return (
    <mesh ref={beamRef} position={[0, 0, 0.02]}>
      <planeGeometry args={[4.2, 0.04]} />
      <meshBasicMaterial
        color="#ff9900"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

// 3D Geometric Objects from Sathish's Photo that orbit in real 3D
const FloatingArtifacts = ({ rimColor }: { rimColor: string }) => {
  const cubeRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Floating 3D Cube (top-left near forehead)
    if (cubeRef.current) {
      cubeRef.current.rotation.x = t * 0.6;
      cubeRef.current.rotation.y = t * 0.8;
      cubeRef.current.position.y = 0.6 + Math.sin(t * 1.5) * 0.08;
      cubeRef.current.position.z = 0.4 + Math.cos(t * 1.2) * 0.1;
    }

    // Floating 3D Torus / Ring (mid-left near shoulder)
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.9;
      torusRef.current.rotation.z = t * 0.7;
      torusRef.current.position.y = -0.15 + Math.cos(t * 1.6) * 0.08;
      torusRef.current.position.z = 0.5 + Math.sin(t * 1.4) * 0.12;
    }

    // Floating 3D Sphere (right side with glowing rim)
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(t * 1.3) * 0.1;
      sphereRef.current.position.z = 0.4 + Math.sin(t * 1.1) * 0.15;
    }
  });

  return (
    <group>
      {/* 1. Floating 3D Cube */}
      <mesh ref={cubeRef} position={[-0.1, 0.6, 0.4]} scale={0.22}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#121216"
          metalness={0.9}
          roughness={0.2}
          emissive={rimColor}
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* 2. Floating 3D Torus / Ring */}
      <mesh ref={torusRef} position={[-0.15, -0.15, 0.5]} scale={0.24}>
        <torusGeometry args={[0.7, 0.22, 16, 32]} />
        <meshStandardMaterial
          color="#14141a"
          metalness={0.95}
          roughness={0.15}
          emissive={rimColor}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* 3. Floating 3D Sphere */}
      <mesh ref={sphereRef} position={[1.85, 0.05, 0.4]} scale={0.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#0f0f14"
          metalness={0.95}
          roughness={0.1}
          emissive={rimColor}
          emissiveIntensity={0.45}
        />
      </mesh>
    </group>
  );
};

// Depth Parallax Camera Controller
const MouseParallaxCamera = ({ autoPlay }: { autoPlay: boolean }) => {
  useFrame((state) => {
    if (autoPlay) {
      const t = state.clock.getElapsedTime();
      state.camera.position.x = THREE.MathUtils.lerp(
        state.camera.position.x,
        Math.sin(t * 0.5) * 0.6 + state.pointer.x * 0.4,
        0.05
      );
      state.camera.position.y = THREE.MathUtils.lerp(
        state.camera.position.y,
        Math.cos(t * 0.4) * 0.25 + state.pointer.y * 0.3,
        0.05
      );
      state.camera.lookAt(0, 0, 0);
    }
  });

  return null;
};

// Main Exported Component
export const HolographicPortrait3D: React.FC<HolographicPortraitProps> = ({ theme }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const activeTheme = THEME_ACCENTS[theme] || THEME_ACCENTS.cyberpunk;

  const togglePlay = () => {
    sound.playBlip(800, 0.03);
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-[540px] sm:h-[620px] lg:h-[700px] select-none rounded-3xl overflow-hidden glass-panel border border-amber-500/30 shadow-2xl bg-black">
      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 3.4], fov: 48 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#050508']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 5, 4]} intensity={1.5} color="#fff" />
        <pointLight position={[-3, 2, 2]} intensity={2.5} color={activeTheme.rim} />
        <pointLight position={[3, -2, 2]} intensity={1.5} color={activeTheme.glow} />

        {/* Cinematic Auto-Parallax Camera */}
        <MouseParallaxCamera autoPlay={isPlaying} />

        {/* The 3D Photo & Floating Geometric Meshes */}
        <React.Suspense fallback={null}>
          <PortraitPlane autoPlay={isPlaying} />
          <FloatingArtifacts rimColor={activeTheme.rim} />
        </React.Suspense>

        {/* Orbit controls when manually interacting */}
        <OrbitControls
          enableZoom={true}
          minDistance={2.2}
          maxDistance={5.5}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 4}
          dampingFactor={0.06}
          rotateSpeed={0.6}
        />
      </Canvas>

      {/* Cybernetic HUD Overlays */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-amber-400 font-mono text-xs font-semibold shadow-lg">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>3D HOLOGRAPHIC VIDEO • 60 FPS</span>
        </span>
      </div>

      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="p-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-amber-400 transition-colors shadow-lg"
          title={isPlaying ? 'Pause 3D cinematic motion' : 'Play 3D cinematic motion'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>

      {/* HUD Corner Tech Brackets */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none text-left font-mono text-[11px] text-slate-400 hidden sm:block bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
        <div className="text-amber-400 font-bold">NAMPELLI SATHISH</div>
        <div className="text-slate-500">GENAI AGENTIC CORE v2.5</div>
        <div className="text-slate-400">DEPTH PARALLAX: ACTIVE</div>
      </div>

      <div className="absolute bottom-4 right-4 z-10 pointer-events-none text-[11px] font-mono text-slate-400 bg-slate-950/80 px-3 py-1.5 rounded-full border border-slate-800">
        🖱️ Drag to orbit • Scroll to zoom
      </div>
    </div>
  );
};
