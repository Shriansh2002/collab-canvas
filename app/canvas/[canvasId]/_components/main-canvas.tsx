"use client";

import React, { useState } from "react";
import {
	useHistory,
	useCanRedo,
	useCanUndo,
} from "@/liveblocks.config";

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

import { CanvasProps, CanvasState } from "@/types";
import { CanvasMode } from "@/enums";

export const Canvas = ({ canvasId }: CanvasProps) => {
	const [canvasState, setCanvasState] = useState<CanvasState>({
		mode: CanvasMode.None,
	});

	const history = useHistory();
	const canUndo = useCanUndo();
	const canRedo = useCanRedo();

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
		</div>
	);
};
