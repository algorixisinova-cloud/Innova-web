import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface Module3DCardProps {
  color: string;
  onExplore: () => void;
  title: string;
  description: string;
}

function AnimatedSphere({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere 
        ref={meshRef} 
        args={[1, 64, 64]} 
        scale={hovered ? 1.2 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial 
          color={color} 
          attach="material" 
          distort={0.4} 
          speed={2} 
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

export default function Module3DCard({ color, onExplore, title, description }: Module3DCardProps) {
  return (
    <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-gray-900 to-black group transition-all duration-300 hover:border-[#00d4ff]/50 hover:shadow-2xl hover:shadow-blue-500/10">
      {/* Escena 3D de fondo */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color={color} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
          <AnimatedSphere color={color} />
          <ContactShadows opacity={0.4} scale={10} blur={2.5} far={4} />
        </Canvas>
      </div>

      {/* Overlay de Información (siempre encima del 3D) */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none">
        <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">{title}</h3>
        <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-3 drop-shadow-md">{description}</p>
        
        <button 
          onClick={onExplore}
          className="pointer-events-auto w-full py-3 bg-[#0066ff] hover:bg-[#00d4ff] text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transform hover:-translate-y-1"
        >
          Explorar Módulo & Acceso Profesional →
        </button>
      </div>
    </div>
  );
}
