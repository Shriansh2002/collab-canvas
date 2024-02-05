type Color = {
	r: number;
	g: number;
	b: number;
};

type Point = {
	x: number;
	y: number;
};

type Camera = Point;

type XYWH = Point & {
	width: number;
	height: number;
};

export type { Color, Point, Camera, XYWH };
