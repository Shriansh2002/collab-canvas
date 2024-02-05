import { Side } from "@/enums";
import { XYWH } from "./base";

import { RectangleLayer } from "@/types";

interface RectangleLayerProps {
	id: string;
	layer: RectangleLayer;
	onPointerDown: (event: React.PointerEvent, id: string) => void;
	selectionColor?: string;
}

interface SelectionBoxProps {
	onResizeHandlePointerDown: (
		corner: Side,
		initialBounds: XYWH
	) => void;
}

export type { RectangleLayerProps, SelectionBoxProps };
