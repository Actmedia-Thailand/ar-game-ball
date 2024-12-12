import { Canvas } from "@react-three/fiber";
import { XR, ARButton } from "@react-three/xr";
import { Suspense } from "react";

const ARApp = () => {
	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<ARButton
				sessionInit={{
					requiredFeatures: ["hit-test"],
					optionalFeatures: ["dom-overlay"],
					domOverlay: { root: document.body },
				}}
			/>

			<Canvas>
				<Suspense fallback={null}>
					<XR>
						<ambientLight intensity={0.5} />
						{/* เพิ่มวัตถุทดสอบ */}
						<mesh position={[0, 0, -1]}>
							<boxGeometry />
							<meshStandardMaterial color="orange" />
						</mesh>
					</XR>
				</Suspense>
			</Canvas>
		</div>
	);
};

export default ARApp;
