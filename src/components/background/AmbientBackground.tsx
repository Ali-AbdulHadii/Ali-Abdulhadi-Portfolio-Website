import { memo, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Points } from 'three';

function ParticleField() {
  const pointsRef = useRef<Points>(null);

  const { positions, sizes } = useMemo(() => {
    const count = 320;
    const positionArray = new Float32Array(count * 3);
    const sizeArray = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;

      positionArray[i3] = (Math.random() - 0.5) * 16;
      positionArray[i3 + 1] = (Math.random() - 0.5) * 12;
      positionArray[i3 + 2] = (Math.random() - 0.5) * 12;

      sizeArray[i] = 0.4 + Math.random() * 1.2;
    }

    return { positions: positionArray, sizes: sizeArray };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (!pointsRef.current) return;

    pointsRef.current.rotation.y = t * 0.015;
    pointsRef.current.rotation.x = Math.sin(t * 0.08) * 0.05;
    pointsRef.current.position.y = Math.sin(t * 0.1) * 0.15;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color="#26d9ff"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.24}
        depthWrite={false}
      />
    </points>
  );
}

function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen overflow-hidden">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#020510']} />
        <fog attach="fog" args={['#020510', 6, 18]} />
        <ambientLight intensity={0.2} />
        <ParticleField />
      </Canvas>
    </div>
  );
}

export default memo(AmbientBackground);
