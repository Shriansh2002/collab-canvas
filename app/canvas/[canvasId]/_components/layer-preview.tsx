"use client";
import { memo } from "react";
import { useStorage } from "@/liveblocks.config";

import { LayerPreviewProps } from "@/types";
import { LayerType } from "@/enums";
import { Rectangle } from "./layers/rectangle";

export const LayerPreview = memo(
	({
		id,
		onLayerPointerDown,
		selectionColor,
	}: LayerPreviewProps) => {
		const layer = useStorage((root) => root.layers.get(id));
		if (!layer) {
			return null;
		}

		switch (layer.type) {
			case LayerType.Rectangle:
				return (
					<Rectangle
						id={id}
						layer={layer}
						onPointerDown={onLayerPointerDown}
						selectionColor={selectionColor}
					/>
				);
			default:
				console.warn("Unknown layer type", layer.type);
				return null;
		}
	}
);

LayerPreview.displayName = "LayerPreview";
