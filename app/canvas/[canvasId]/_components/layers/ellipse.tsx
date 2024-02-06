import { colorToCss } from "@/lib/utils";
import { EllipseLayerProps } from "@/types";

export const Ellipse = ({
	id,
	layer,
	onPointerDown,
	selectionColor,
}: EllipseLayerProps) => {
	return (
		<ellipse
			className='drop-shadow-md'
			onPointerDown={(e) => onPointerDown(e, id)}
			style={{
				transform: `translate(${layer.x}px, ${layer.y}px)`,
			}}
			cx={layer.width / 2}
			cy={layer.height / 2}
			rx={layer.width / 2}
			ry={layer.height / 2}
			fill={layer.fill ? colorToCss(layer.fill) : "#000"}
			stroke={selectionColor || "transparent"}
			strokeWidth={1}
		/>
	);
};
