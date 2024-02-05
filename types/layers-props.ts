import { Side } from "@/enums";
import { Camera, Color, XYWH } from "./base";

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

interface SelectionToolsProps {
	camera: Camera;
	setLastUsedColor: (color: Color) => void;
}

interface ColorPickerProps {
	onChange: (color: Color) => void;
}

interface ColorButtonProps {
	onClick: (color: Color) => void;
	color: Color;
}

export type {
	RectangleLayerProps,
	SelectionBoxProps,
	SelectionToolsProps,
	ColorPickerProps,
	ColorButtonProps,
};
