import { Camera } from "@/types";
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
