import { LayerType } from "@/enums";
import { Color, XYWH } from "./base";

interface SimpleLayer extends XYWH {
	fill: Color;
	value?: string;
}

interface RectangleLayer extends SimpleLayer {
	type: LayerType.Rectangle;
}

interface EllipseLayer extends SimpleLayer {
	type: LayerType.Ellipse;
}

interface PathLayer extends SimpleLayer {
	type: LayerType.Path;
	points: number[][]; // [x, y]
}

interface TextLayer extends SimpleLayer {
	type: LayerType.Text;
}

interface NoteLayer extends SimpleLayer {
	type: LayerType.Note;
}

export type {
	SimpleLayer,
	RectangleLayer,
	EllipseLayer,
	PathLayer,
	TextLayer,
	NoteLayer,
};
