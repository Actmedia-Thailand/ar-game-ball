import { Canvas } from "@react-three/fiber";
import { XR, ARButton, useXR } from "@react-three/xr";
import { Suspense, useEffect } from "react";

// Component สำหรับแสดงพื้นผิวที่ตรวจพบ
function DetectedPlanes() {
	const { detectedPlanes, isPresenting } = useXR();

	// ถ้ายังไม่ได้เริ่ม AR session หรือไม่มี detectedPlanes ให้ return null
	if (!isPresenting || !detectedPlanes) return null;

	return (
		<>
			{Array.from(detectedPlanes.values()).map((plane, index) => (
				<mesh
					key={plane.id || index}
					position={plane.position}
					rotation={plane.rotation}
				>
					<planeGeometry args={[plane.width || 1, plane.height || 1]} />
					<meshBasicMaterial
						color={`hsl(${index * 40}, 70%, 50%)`}
						transparent
						opacity={0.5}
						wireframe={true}
					/>
				</mesh>
			))}
		</>
	);
}

const ARApp = () => {
	useEffect(() => {
		if ("xr" in navigator) {
			navigator.xr
				.isSessionSupported("immersive-ar")
				.then((supported) => {
					console.log("AR Supported:", supported);
				})
				.catch((err) => console.log("Error checking AR support:", err));
		} else {
			console.log("WebXR not available");
		}
	}, []);

	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<ARButton
				sessionInit={{
					requiredFeatures: ["hit-test", "plane-detection"],
					optionalFeatures: ["dom-overlay", "light-estimation"],
					domOverlay: { root: document.body },
				}}
			/>

			<Canvas>
				<Suspense fallback={null}>
					<XR>
						<ambientLight intensity={0.5} />
						<DetectedPlanes />
					</XR>
				</Suspense>
			</Canvas>
		</div>
	);
};

export default ARApp;
