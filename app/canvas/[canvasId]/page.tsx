import { NextPage } from "next";
import { Canvas } from "./_components/main-canvas";
import { CanvasIdPageProps } from "@/types";

import { Room } from "@/components/room";
import { Loading } from "./_components/loading";

const CanvasIdPage: NextPage<CanvasIdPageProps> = ({ params }) => {
	return (
		<Room roomId={params.canvasId} fallback={<Loading />}>
			<Canvas canvasId={params.canvasId} />
		</Room>
	);
};

export default CanvasIdPage;
