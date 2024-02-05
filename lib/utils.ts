import { Side } from "@/enums";
import { Camera, Color } from "@/types";
import { Point, XYWH } from "@/types/base";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const COLORS = [
	"#f54952",
	"#753bbd",
	"#009944",
	"#f5a201",
	"#ff5883",
];

export function connectionIdToColor(connectionId: number): string {
	return COLORS[connectionId % COLORS.length];
}

export function pointerEventToCanvasPoint(
	e: React.PointerEvent,
	camera: Camera
) {
	return {
		x: Math.round(e.clientX - camera.x),
		y: Math.round(e.clientY - camera.y),
	};
}

export function colorToCss(color: Color) {
	return `#${color.r.toString(16).padStart(2, "0")}${color.g
		.toString(16)
		.padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}

export function resizeBounds(
	bounds: XYWH,
	corner: Side,
	point: Point
): XYWH {
	const res = {
		x: bounds.x,
		y: bounds.y,
		width: bounds.width,
		height: bounds.height,
	};

	if ((corner & Side.Left) === Side.Left) {
		res.x = Math.min(point.x, bounds.x + bounds.width);
		res.width = Math.abs(bounds.x + bounds.width - point.x);
	}

	if ((corner & Side.Right) === Side.Right) {
		res.x = Math.min(point.x, bounds.x);
		res.width = Math.abs(point.x - bounds.x);
	}

	if ((corner & Side.Top) === Side.Top) {
		res.y = Math.min(point.y, bounds.y + bounds.height);
		res.height = Math.abs(bounds.y + bounds.height - point.y);
	}

	if ((corner & Side.Bottom) === Side.Bottom) {
		res.y = Math.min(point.y, bounds.y);
		res.height = Math.abs(point.y - bounds.y);
	}

	return res;
}
