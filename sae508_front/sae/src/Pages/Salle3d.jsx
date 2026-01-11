import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage } from "@react-three/drei";
import "../css/Salle3D.css";

// Composant pour charger le modèle GLB
function ClassroomModel() {
  const { scene } = useGLTF("/models/salle_classe.hopglb.glb");

  // On ajuste l'échelle et la position pour qu'il s'adapte à notre rectangle
  return (
    <primitive
      object={scene}
      scale={1.2}        // Ajuste la taille du modèle
      position={[0, -1, 0]} // Ajuste la hauteur
    />
  );
}

export default function Salle3D() {
  return (
    <div className="salle3d-page">
      <h1>Salle de classe immersive</h1>
      <p className="salle3d-subtitle">
        Explorez votre environnement de formation en 3D
      </p>

      <div className="salle3d-card">
        <Canvas
          camera={{ position: [0, 2, 6], fov: 50 }}
          shadows
        >
          {/* Lumières améliorées */}
          <ambientLight intensity={0.6} />
          <directionalLight 
            position={[5, 10, 5]} 
            intensity={1} 
            castShadow 
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          {/* Modèle dans un Stage pour un rendu plus réaliste */}
          <Stage
            adjustCamera={false}  // On garde notre caméra
            intensity={0.6}
            environment="city"    // Optionnel: lumière réaliste HDR
          >
            <ClassroomModel />
          </Stage>

          {/* Contrôles orbit améliorés */}
          <OrbitControls
            enableZoom={true}
            enableRotate={true}
            enablePan={true}
            minDistance={3}   // distance minimale
            maxDistance={10}  // distance maximale
            target={[0, 0, 0]} // centre du modèle
          />
        </Canvas>
      </div>
    </div>
  );
}
