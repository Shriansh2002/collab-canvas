"use client";
import React from "react";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { CanvasProps } from "@/types";

export const Canvas = ({ canvasId }: CanvasProps) => {
	return (
		<div className='h-full w-full relative bg-neutral-100 touch-none'>
			<Info />
			<Participants />
			<Toolbar />
		</div>
	);
};
