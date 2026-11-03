import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { sound } from '../../utils/audio';

const TECH_LIST = [
  { name: 'LangGraph', color: '#00f0ff', level: '98%' },
  { name: 'Azure OpenAI', color: '#0078d4', level: '96%' },
  { name: 'Google ADK', color: '#4285f4', level: '92%' },
  { name: 'AWS Bedrock', color: '#ff9900', level: '94%' },
  { name: 'Gemini 2.5', color: '#38bdf8', level: '95%' },
  { name: 'Claude 3.5', color: '#d97706', level: '94%' },
  { name: 'MCP Protocol', color: '#a855f7', level: '90%' },
  { name: 'Hybrid RAG', color: '#10b981', level: '96%' },
  { name: 'Azure AI Search', color: '#0284c7', level: '95%' },
  { name: 'Vertex AI', color: '#ea4335', level: '92%' },
  { name: 'FastAPI', color: '#059669', level: '96%' },
  { name: 'Python Asyncio', color: '#eab308', level: '97%' },
  { name: 'OpenTelemetry', color: '#f97316', level: '94%' },
  { name: 'Docker / CI/CD', color: '#3b82f6', level: '92%' },
  { name: 'Vector Search', color: '#ec4899', level: '95%' },
  { name: 'FAISS / Pinecone', color: '#14b8a6', level: '90%' },
  { name: 'Azure Container Apps', color: '#6366f1', level: '93%' },
  { name: 'Pydantic Schemas', color: '#e11d48', level: '96%' }
];

interface TagProps {
  position: [number, number, number];
  name: string;
  color: string;
  level: string;
  onHover: (name: string | null) => void;
  isHovered: boolean;
}

const TechTag: React.FC<TagProps> = ({ position, name, color, level, onHover, isHovered }) => {
  return (
    <group position={position}>
      {/* 3D point node */}
      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? 1.5 : 0.6}
        />
      </mesh>

      {/* HTML Tag Billboard */}
      <Html
        center
        distanceFactor={6}
        style={{
          transition: 'all 0.2s ease',
          pointerEvents: 'auto',
          userSelect: 'none'
        }}
      >
        <div
          onMouseEnter={() => {
            onHover(name);
            sound.playBlip(920, 0.025);
          }}
          onMouseLeave={() => onHover(null)}
          className={`cursor-pointer px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 backdrop-blur-md border ${
            isHovered
              ? 'scale-125 bg-slate-900/95 shadow-lg shadow-cyan-500/50 z-50'
              : 'bg-slate-950/70 hover:scale-110'
          }`}
          style={{
            borderColor: isHovered ? color : `${color}55`,
            color: '#f8fafc',
            boxShadow: isHovered ? `0 0 15px ${color}` : 'none'
          }}
        >
          <span className="mr-1.5" style={{ color }}>●</span>
          {name}
          {isHovered && (
            <span className="ml-1.5 text-[10px] text-cyan-300 font-mono">
              {level}
            </span>
          )}
        </div>
      </Html>
    </group>
  );
};

const RotatingSphereGroup = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  // Fibonacci Sphere coordinates distribution
  const tagsWithCoords = useMemo(() => {
    const radius = 2.4;
    const count = TECH_LIST.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    return TECH_LIST.map((tech, i) => {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY * radius;
      const z = Math.sin(theta) * radiusAtY * radius;

      return {
        ...tech,
        position: [x, y * radius, z] as [number, number, number]
      };
    });
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Slow rotation unless hovering over a tag
      if (!hoveredTag) {
        groupRef.current.rotation.y += delta * 0.25;
        groupRef.current.rotation.x += delta * 0.08;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Inner subtle wireframe sphere cage */}
      <mesh>
        <sphereGeometry args={[2.2, 16, 16]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* Render each tag */}
      {tagsWithCoords.map((item) => (
        <TechTag
          key={item.name}
          position={item.position}
          name={item.name}
          color={item.color}
          level={item.level}
          onHover={setHoveredTag}
          isHovered={hoveredTag === item.name}
        />
      ))}
    </group>
  );
};

export const TechSphere3D: React.FC = () => {
  return (
    <div className="relative w-full h-[380px] sm:h-[450px] rounded-2xl overflow-hidden glass-panel border border-cyan-500/20 shadow-2xl">
      <div className="absolute top-4 left-4 z-10">
        <span className="text-[11px] font-mono tracking-wider uppercase px-2.5 py-1 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
          3D Interactive Tag Cloud
        </span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#a855f7" />

        <RotatingSphereGroup />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.8}
          dampingFactor={0.05}
        />
      </Canvas>

      <div className="absolute bottom-3 right-4 z-10 text-[11px] font-mono text-slate-400 pointer-events-none">
        Drag to spin • Hover to inspect
      </div>
    </div>
  );
};
