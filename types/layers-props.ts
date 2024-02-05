import { RectangleLayer } from "@/types";

interface RectangleLayerProps {
	id: string;
	layer: RectangleLayer;
	onPointerDown: (event: React.PointerEvent, id: string) => void;
	selectionColor?: string;
}

export type { RectangleLayerProps };
