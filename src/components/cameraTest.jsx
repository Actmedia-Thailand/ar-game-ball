import { useEffect, useRef } from "react";

const CameraTest = () => {
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
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
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
    </div>
  );
};

export default CameraTest;
