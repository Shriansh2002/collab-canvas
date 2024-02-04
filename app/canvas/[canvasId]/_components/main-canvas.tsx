"use client";

import React from "react";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { CanvasProps } from "@/types";

import { useSelf } from "@/liveblocks.config";

export const Canvas = ({ canvasId }: CanvasProps) => {
	const info = useSelf((me) => me.info);

	return (
		<div className='h-full w-full relative bg-neutral-100 touch-none'>
			<Info />
			<Participants />
			<Toolbar />
		</div>
	);
};
