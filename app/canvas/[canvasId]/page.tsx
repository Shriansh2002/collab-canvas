import { NextPage } from "next";
import { Canvas } from "./_components/main-canvas";
import { CanvasIdPageProps } from "@/types";

const CanvasIdPage: NextPage<CanvasIdPageProps> = ({ params }) => {
	return <Canvas canvasId={params.canvasId} />;
};

export default CanvasIdPage;
