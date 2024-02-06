import { Side } from "@/enums";
import { Camera, Color, XYWH } from "./base";

import { EllipseLayer, RectangleLayer } from "@/types";

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

interface EllipseLayerProps {
	id: string;
	layer: EllipseLayer;
	onPointerDown: (e: React.PointerEvent, id: string) => void;
	selectionColor?: string;
}

export type {
	RectangleLayerProps,
	SelectionBoxProps,
	SelectionToolsProps,
	ColorPickerProps,
	ColorButtonProps,
	EllipseLayerProps,
};
