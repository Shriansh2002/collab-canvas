import { LayerType } from "@/enums";
import { Color } from "./base";

type RectangleLayer = {
	type: LayerType.Rectangle;
	x: number;
	y: number;
	height: number;
	width: number;
	fill: Color;
	value?: string;
};

type EllipseLayer = {
	type: LayerType.Ellipse;
	x: number;
	y: number;
	height: number;
	width: number;
	fill: Color;
	value?: string;
};

type PathLayer = {
	type: LayerType.Path;
	x: number;
	y: number;
	height: number;
	width: number;
	fill: Color;
	points: number[][];
	value?: string;
};

type TextLayer = {
	type: LayerType.Text;
	x: number;
	y: number;
	height: number;
	width: number;
	fill: Color;
	value?: string;
};

type NoteLayer = {
	type: LayerType.Note;
	x: number;
	y: number;
	height: number;
	width: number;
	fill: Color;
	value?: string;
};

type Layer =
	| RectangleLayer
	| EllipseLayer
	| TextLayer
	| NoteLayer
	| PathLayer;

export type {
	EllipseLayer,
	Layer,
	NoteLayer,
	PathLayer,
	RectangleLayer,
	TextLayer,
};
