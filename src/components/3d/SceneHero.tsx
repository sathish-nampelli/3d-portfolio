import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, MeshDistortMaterial, Html } from '@react-three/drei';
import * as THREE from 'three';
import { sound } from '../../utils/audio';

// Dynamic Color Palette mapped to theme
interface SceneHeroProps {
  theme: 'cyberpunk' | 'matrix' | 'synthwave' | 'minimal';
}

const THEME_COLORS = {
  cyberpunk: {
    primary: '#00f0ff',
    secondary: '#ff007f',
    accent: '#8a2be2',
    ambient: '#090d16',
    lamp: '#00f0ff',
    screenText: '#00f0ff'
  },
  matrix: {
    primary: '#00ff66',
    secondary: '#00aa33',
    accent: '#003311',
    ambient: '#041008',
    lamp: '#00ff66',
    screenText: '#00ff66'
  },
  synthwave: {
    primary: '#ff7700',
    secondary: '#ff0055',
    accent: '#9d00ff',
    ambient: '#14081c',
    lamp: '#ff7700',
    screenText: '#ff9900'
  },
  minimal: {
    primary: '#ffffff',
    secondary: '#94a3b8',
    accent: '#475569',
    ambient: '#0f172a',
    lamp: '#ffffff',
    screenText: '#e2e8f0'
  }
};

// Procedural Starfield / Particle Nebula
const ParticleNebula = ({ color }: { color: string }) => {
  const count = 400;
  const meshRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const baseColor = new THREE.Color(color);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 26;
      pos[i3 + 1] = (Math.random() - 0.5) * 16 + 2;
      pos[i3 + 2] = (Math.random() - 0.5) * 20 - 4;

      col[i3] = baseColor.r * (0.5 + Math.random() * 0.5);
      col[i3 + 1] = baseColor.g * (0.5 + Math.random() * 0.5);
      col[i3 + 2] = baseColor.b * (0.5 + Math.random() * 0.5);
    }
    return [pos, col];
  }, [color]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Steaming Coffee Mug
const SteamingCoffeeMug = ({ position }: { position: [number, number, number] }) => {
  const steamRef = useRef<THREE.Points>(null);
  const particleCount = 28;

  const [steamPositions] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.08;
      pos[i * 3 + 1] = Math.random() * 0.4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
    }
    return [pos];
  }, []);

  useFrame((state) => {
    if (steamRef.current) {
      const posAttr = steamRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const t = state.clock.getElapsedTime();
      for (let i = 0; i < particleCount; i++) {
        let y = posAttr.getY(i) + 0.003;
        if (y > 0.45) y = 0.02;
        posAttr.setY(i, y);
        posAttr.setX(i, Math.sin(t * 2 + i) * 0.04);
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group position={position}>
      {/* Mug Cylinder */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.08, 0.07, 0.22, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.1, 0.12, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.06, 0.015, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} />
      </mesh>
      {/* Liquid Surface */}
      <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.07, 16]} />
        <meshStandardMaterial color="#3b1d11" roughness={0.2} />
      </mesh>
      {/* Rising Steam */}
      <points ref={steamRef} position={[0, 0.22, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[steamPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#cbd5e1"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

// Audio Visualizer Bars on Desk
const AudioVisualizer = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const barsRef = useRef<THREE.Group>(null);
  const barCount = 12;

  useFrame((state) => {
    if (barsRef.current) {
      const t = state.clock.getElapsedTime();
      barsRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const scale = 0.05 + Math.abs(Math.sin(t * 3.5 + i * 0.8)) * 0.25;
        mesh.scale.setY(scale);
        mesh.position.y = scale / 2;
      });
    }
  });

  return (
    <group position={position} ref={barsRef}>
      {Array.from({ length: barCount }).map((_, i) => (
        <mesh key={i} position={[(i - barCount / 2) * 0.06, 0, 0]}>
          <boxGeometry args={[0.035, 1, 0.035]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.6}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

// Floating Holographic Tech Orbs that rotate around the workstation
interface FloatingTechOrbProps {
  name: string;
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  heightOffset: number;
  initialAngle: number;
}

const FloatingTechOrb: React.FC<FloatingTechOrbProps> = ({
  name,
  color,
  orbitRadius,
  orbitSpeed,
  heightOffset,
  initialAngle
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime() * orbitSpeed + initialAngle;
      const x = Math.cos(t) * orbitRadius;
      const z = Math.sin(t) * orbitRadius;
      const y = heightOffset + Math.sin(state.clock.getElapsedTime() * 1.5 + initialAngle) * 0.18;

      groupRef.current.position.set(x, y, z);
      groupRef.current.rotation.y += 0.015;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          sound.playBlip(750, 0.03);
        }}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.35 : 1}
      >
        <octahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.2 : 0.6}
          roughness={0.2}
          wireframe={false}
        />
      </mesh>
      {/* Outer energy wireframe cage */}
      <mesh scale={hovered ? 1.6 : 1.25} rotation={[0.5, 0.5, 0]}>
        <icosahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={hovered ? 0.9 : 0.4}
        />
      </mesh>
      {hovered && (
        <Html center distanceFactor={8} position={[0, 0.35, 0]}>
          <div className="px-2 py-0.5 rounded bg-slate-900/90 text-cyan-300 font-mono text-[11px] whitespace-nowrap border border-cyan-500/50 pointer-events-none shadow-lg">
            {name}
          </div>
        </Html>
      )}
    </group>
  );
};

// Interactive 3D Workstation Scene
const CyberWorkstation = ({ themeColors }: { themeColors: typeof THEME_COLORS['cyberpunk'] }) => {
  const [lampOn, setLampOn] = useState(true);
  const pcFanRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (pcFanRef.current) {
      pcFanRef.current.rotation.z += delta * 12;
    }
  });

  const handleLampClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setLampOn(!lampOn);
    sound.playGlitch();
  };

  return (
    <group position={[0, -0.6, 0]}>
      {/* Modern Sleek Desk Surface */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[4.4, 0.1, 2.2]} />
        <meshStandardMaterial color="#0b0f19" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Desk LED Edge Glow */}
      <mesh position={[0, 0.045, 1.09]}>
        <boxGeometry args={[4.38, 0.02, 0.03]} />
        <meshBasicMaterial color={themeColors.primary} />
      </mesh>

      {/* Desk Legs */}
      <mesh position={[-1.9, -1.1, -0.8]}>
        <boxGeometry args={[0.08, 2.1, 0.08]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} />
      </mesh>
      <mesh position={[1.9, -1.1, -0.8]}>
        <boxGeometry args={[0.08, 2.1, 0.08]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} />
      </mesh>
      <mesh position={[-1.9, -1.1, 0.8]}>
        <boxGeometry args={[0.08, 2.1, 0.08]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} />
      </mesh>
      <mesh position={[1.9, -1.1, 0.8]}>
        <boxGeometry args={[0.08, 2.1, 0.08]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} />
      </mesh>

      {/* Ultra-wide Curved Monitor Stand */}
      <mesh position={[0, 0.35, -0.6]}>
        <cylinderGeometry args={[0.035, 0.035, 0.7, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.06, -0.6]}>
        <cylinderGeometry args={[0.3, 0.35, 0.03, 24]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} />
      </mesh>

      {/* Curved Screen Frame */}
      <group position={[0, 0.9, -0.55]}>
        {/* Main Center Display */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.5, 1.25, 0.06]} />
          <meshStandardMaterial color="#05070e" roughness={0.1} metalness={0.9} />
        </mesh>

        {/* Screen Display Panel with glowing code matrix aesthetic */}
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[2.42, 1.17]} />
          <meshStandardMaterial
            color="#080c18"
            emissive={themeColors.screenText}
            emissiveIntensity={0.25}
            roughness={0.2}
          />
        </mesh>

        {/* Angled Left Screen Wing */}
        <group position={[-1.25, 0, 0.12]} rotation={[0, 0.35, 0]}>
          <mesh position={[-0.55, 0, 0]}>
            <boxGeometry args={[1.1, 1.25, 0.06]} />
            <meshStandardMaterial color="#05070e" roughness={0.1} metalness={0.9} />
          </mesh>
          <mesh position={[-0.55, 0, 0.035]}>
            <planeGeometry args={[1.04, 1.17]} />
            <meshStandardMaterial
              color="#090f1f"
              emissive={themeColors.secondary}
              emissiveIntensity={0.2}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Angled Right Screen Wing */}
        <group position={[1.25, 0, 0.12]} rotation={[0, -0.35, 0]}>
          <mesh position={[0.55, 0, 0]}>
            <boxGeometry args={[1.1, 1.25, 0.06]} />
            <meshStandardMaterial color="#05070e" roughness={0.1} metalness={0.9} />
          </mesh>
          <mesh position={[0.55, 0, 0.035]}>
            <planeGeometry args={[1.04, 1.17]} />
            <meshStandardMaterial
              color="#090f1f"
              emissive={themeColors.secondary}
              emissiveIntensity={0.2}
              roughness={0.2}
            />
          </mesh>
        </group>
      </group>

      {/* Mechanical Keyboard with backlighting */}
      <group position={[0, 0.08, 0.25]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.3, 0.05, 0.45]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Glow underglow */}
        <mesh position={[0, -0.015, 0]}>
          <boxGeometry args={[1.34, 0.01, 0.49]} />
          <meshBasicMaterial color={themeColors.primary} />
        </mesh>
      </group>

      {/* Cyber Mouse on mousepad */}
      <mesh position={[1.0, 0.06, 0.25]}>
        <boxGeometry args={[0.55, 0.01, 0.65]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
      <mesh position={[1.0, 0.09, 0.25]} rotation={[0.05, 0, 0]}>
        <boxGeometry args={[0.13, 0.05, 0.22]} />
        <meshStandardMaterial color="#020617" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* PC Tower Chassis on right side */}
      <group position={[1.6, 0.6, -0.2]}>
        {/* Main Case */}
        <mesh>
          <boxGeometry args={[0.55, 1.1, 1.1]} />
          <meshStandardMaterial color="#0a0f1d" roughness={0.3} metalness={0.85} />
        </mesh>
        {/* Tempered Glass Window */}
        <mesh position={[-0.28, 0, 0]}>
          <planeGeometry args={[1.0, 0.95]} />
          <meshStandardMaterial
            color="#0f172a"
            transparent
            opacity={0.45}
            roughness={0.05}
            metalness={0.95}
          />
        </mesh>
        {/* Glowing Internal Components */}
        <mesh position={[-0.1, 0.1, 0]}>
          <boxGeometry args={[0.25, 0.35, 0.45]} />
          <meshStandardMaterial
            color={themeColors.secondary}
            emissive={themeColors.secondary}
            emissiveIntensity={0.8}
          />
        </mesh>
        {/* Rotating Front Fan */}
        <group position={[0, 0, 0.56]} ref={pcFanRef}>
          <mesh>
            <cylinderGeometry args={[0.18, 0.18, 0.02, 16]} />
            <meshStandardMaterial
              color={themeColors.primary}
              emissive={themeColors.primary}
              emissiveIntensity={0.9}
              wireframe
            />
          </mesh>
        </group>
      </group>

      {/* Steaming Coffee Mug */}
      <SteamingCoffeeMug position={[-1.3, 0.05, 0.3]} />

      {/* Audio Visualizer on Left */}
      <AudioVisualizer position={[-1.3, 0.06, -0.4]} color={themeColors.primary} />

      {/* Interactive Desk Lamp */}
      <group position={[-1.7, 0.05, -0.5]} onClick={handleLampClick}>
        {/* Lamp Base */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.16, 0.18, 0.04, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        {/* Lamp Arm */}
        <mesh position={[0.1, 0.45, 0]} rotation={[0, 0, -0.2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.9, 12]} />
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </mesh>
        {/* Lamp Hood */}
        <mesh position={[0.28, 0.85, 0]} rotation={[0, 0, -1.2]}>
          <coneGeometry args={[0.18, 0.28, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        {/* Light Cone Emissive */}
        {lampOn && (
          <pointLight
            position={[0.32, 0.78, 0]}
            color={themeColors.lamp}
            intensity={2.2}
            distance={4.5}
          />
        )}
      </group>

      {/* Interactive Floating Tech Orbs circling the workstation */}
      <FloatingTechOrb
        name="LangGraph"
        color="#00f0ff"
        orbitRadius={2.4}
        orbitSpeed={0.5}
        heightOffset={1.2}
        initialAngle={0}
      />
      <FloatingTechOrb
        name="Azure OpenAI"
        color="#0078d4"
        orbitRadius={2.6}
        orbitSpeed={0.45}
        heightOffset={1.5}
        initialAngle={Math.PI * 0.35}
      />
      <FloatingTechOrb
        name="Google ADK"
        color="#4285f4"
        orbitRadius={2.2}
        orbitSpeed={0.6}
        heightOffset={0.9}
        initialAngle={Math.PI * 0.7}
      />
      <FloatingTechOrb
        name="AWS Bedrock"
        color="#ff9900"
        orbitRadius={2.5}
        orbitSpeed={0.55}
        heightOffset={1.4}
        initialAngle={Math.PI * 1.05}
      />
      <FloatingTechOrb
        name="FastAPI"
        color="#10b981"
        orbitRadius={2.7}
        orbitSpeed={0.4}
        heightOffset={1.0}
        initialAngle={Math.PI * 1.4}
      />
      <FloatingTechOrb
        name="MCP Protocol"
        color="#a855f7"
        orbitRadius={2.3}
        orbitSpeed={0.5}
        heightOffset={1.6}
        initialAngle={Math.PI * 1.75}
      />
    </group>
  );
};

// Main Exported Hero Scene Component
export const SceneHero: React.FC<SceneHeroProps> = ({ theme }) => {
  const activeColors = THEME_COLORS[theme] || THEME_COLORS.cyberpunk;

  return (
    <div className="relative w-full h-[540px] sm:h-[620px] lg:h-[700px] select-none">
      <Canvas
        camera={{ position: [0, 1.8, 4.4], fov: 46 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-4, 3, -2]} intensity={1.5} color={activeColors.secondary} />
        <pointLight position={[3, 4, 2]} intensity={1.8} color={activeColors.primary} />

        {/* Orbit controls with bounded rotation so the user stays in view */}
        <OrbitControls
          enableZoom={true}
          minDistance={2.8}
          maxDistance={6.5}
          maxPolarAngle={Math.PI / 2 + 0.05} // don't go below floor
          minPolarAngle={Math.PI / 6}
          enablePan={false}
          dampingFactor={0.05}
          rotateSpeed={0.6}
        />

        {/* Starfield / Nebula in background */}
        <ParticleNebula color={activeColors.primary} />

        {/* Floating Abstract Cyber Core Above Monitor */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8} position={[0, 1.7, -0.6]}>
          <Sphere args={[0.32, 32, 32]}>
            <MeshDistortMaterial
              color={activeColors.primary}
              attach="material"
              distort={0.4}
              speed={2.2}
              roughness={0.15}
              metalness={0.9}
            />
          </Sphere>
        </Float>

        {/* Main 3D Workstation */}
        <CyberWorkstation themeColors={activeColors} />
      </Canvas>

      {/* Interactive Controls Overlay Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 text-xs text-slate-300 pointer-events-none shadow-lg">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>🖱️ Drag to rotate 3D station • Scroll to zoom • Click lamp for lighting</span>
      </div>
    </div>
  );
};
