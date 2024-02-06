import ContentEditable, {
	ContentEditableEvent,
} from "react-contenteditable";
import { useMutation } from "@/liveblocks.config";

import { cn, colorToCss } from "@/lib/utils";
import { kalam as font } from "@/fonts";
import { TextLayerProps } from "@/types";

const calculateFontSize = (width: number, height: number): number => {
	const maxFontSize = 96;
	const scaleFont = 0.5;

	const fontSizeBasedOnHeight = height * scaleFont;
	const fontSizeBasedOnWidth = width * scaleFont;

	return Math.min(
		fontSizeBasedOnHeight,
		fontSizeBasedOnWidth,
		maxFontSize
	);
};

export const Text = ({
	id,
	layer,
	onPointerDown,
	selectionColor,
}: TextLayerProps) => {
	const { x, y, width, height, fill, value } = layer;

	const updateValue = useMutation(({ storage }, newValue) => {
		const liveLayers = storage.get("layers");

		liveLayers.get(id)?.set("value", newValue);
	}, []);

	const handleContentChange = (e: ContentEditableEvent) => {
		updateValue(e.target.value);
	};

	return (
		<foreignObject
			x={x}
			y={y}
			width={width}
			height={height}
			onPointerDown={(e) => onPointerDown(e, id)}
			style={{
				outline: selectionColor
					? `1px solid ${selectionColor}`
					: "none",
			}}
		>
			<ContentEditable
				html={value || "Text"}
				onChange={handleContentChange}
				className={cn(
					"h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
					font.className
				)}
				style={{
					fontSize: calculateFontSize(width, height),
					color: fill ? colorToCss(fill) : "#000",
				}}
			/>
		</foreignObject>
	);
};
