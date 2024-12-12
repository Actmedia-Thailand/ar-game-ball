import { Canvas } from '@react-three/fiber';
import { XR, ARButton } from '@react-three/xr';  // ใช้ XR จาก @react-three/xr
import { Suspense } from 'react';
import { useRef, useEffect } from "react";

// ฟังก์ชันสำหรับการแสดงผลกล้อง
const CameraBackground = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Error accessing camera: ", err);
        });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      style={{
        objectFit: "cover", // ใช้ cover เพื่อให้วิดีโอเต็มหน้าจอ
        width: "100%", // กว้างสุด
        height: "100%", // สูงสุด
        position: "absolute",
        top: "0",
        left: "0",
      }}
    />
  );
};

const ARApp = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={1} position={[5, 5, 5]} />

        <Suspense fallback={<div>Loading...</div>}>
          {/* วางวงกลมตรงกลางหน้าจอ */}
          <mesh position={[0, 0, -5]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial color="red" />
          </mesh>
        </Suspense>

        <XR> {/* ใช้งาน XR */}
          <ARButton /> {/* เพิ่มปุ่ม AR */}
        </XR>
      </Canvas>
      <CameraBackground /> {/* เพิ่มพื้นหลังเป็นกล้อง */}
    </div>
  );
};

export default ARApp;
