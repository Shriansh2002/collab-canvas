"use client";

import React, { useCallback, useState } from "react";
import { nanoid } from "nanoid";
import {
	useHistory,
	useCanRedo,
	useCanUndo,
	useMutation,
	useStorage,
} from "@/liveblocks.config";
import { LiveObject } from "@liveblocks/client";

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { CursorsPresence } from "./cursors-presence";

import {
	Camera,
	CanvasProps,
	CanvasState,
	Color,
	Point,
} from "@/types";
import { CanvasMode, LayerType } from "@/enums";
import { pointerEventToCanvasPoint } from "@/lib/utils";

const MAX_LAYERS = 100;

export const Canvas = ({ canvasId }: CanvasProps) => {
	const layerIds = useStorage((root) => root.layerIds);

	const [canvasState, setCanvasState] = useState<CanvasState>({
		mode: CanvasMode.None,
	});

	const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

	const [lastUsedColor, setLastUsedColor] = useState<Color>({
		r: 0,
		g: 0,
		b: 0,
	});

	const history = useHistory();
	const canUndo = useCanUndo();
	const canRedo = useCanRedo();

	const insertLayer = useMutation(
		(
			{ storage, setMyPresence },
			layerType:
				| LayerType.Ellipse
				| LayerType.Rectangle
				| LayerType.Text
				| LayerType.Note,
			position: Point
		) => {
			const liveLayers = storage.get("layers");
			if (liveLayers.size >= MAX_LAYERS) {
				return;
			}

			const liveLayerIds = storage.get("layerIds");
			const layerId = nanoid();

			const layer = new LiveObject({
				type: layerType,
				x: position.x,
				y: position.y,
				height: 100,
				width: 100,
				fill: lastUsedColor,
			});

			liveLayerIds.push(layerId);
			liveLayers.set(layerId, layer);

			setMyPresence(
				{ selection: [layerId] },
				{ addToHistory: true }
			);

			setCanvasState({ mode: CanvasMode.None });
		},
		[lastUsedColor]
	);

	const onWheel = useCallback((e: React.WheelEvent) => {
		setCamera((camera) => ({
			x: camera.x + e.deltaX,
			y: camera.y + e.deltaY,
		}));
	}, []);

	const onPointerMove = useMutation(
		({ setMyPresence }, e: React.PointerEvent) => {
			e.preventDefault();

			const current = pointerEventToCanvasPoint(e, camera);

			setMyPresence({ cursor: current });
		},
		[]
	);

	const onPointerLeave = useMutation(({ setMyPresence }) => {
		setMyPresence({ cursor: null });
	}, []);

	return (
		<div className='h-full w-full relative bg-neutral-100 touch-none'>
			<Info canvasId={canvasId} />
			<Participants />
			<Toolbar
				canvasState={canvasState}
				setCanvasState={setCanvasState}
				canRedo={canRedo}
				canUndo={canUndo}
				redo={history.redo}
				undo={history.undo}
			/>

			<svg
				className='h-[100vh] w-[100vw]'
				onWheel={onWheel}
				onPointerMove={onPointerMove}
				onPointerLeave={onPointerLeave}
			>
				<g
					style={{
						transform: `translate(${camera.x}px, ${camera.y}px)`,
					}}
				>
					<CursorsPresence />
				</g>
			</svg>
		</div>
	);
};
