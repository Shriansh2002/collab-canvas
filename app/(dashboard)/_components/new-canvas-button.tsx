"use client";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { NewCanvasButtonProps } from "@/types";
import { Plus } from "lucide-react";
import React from "react";

export const NewCanvasButton = ({
	orgId,
	disabled,
}: NewCanvasButtonProps) => {
	const { mutate, pending } = useApiMutation(api.canvas.create);

	const onClick = () => {
		mutate({
			orgId,
			title: "Simple Board",
		})
			.then((id) => {
				toast.success("Canvas created!");
				// TODO: Navigate to canvas
			})
			.catch(() => toast.error("Failed to create canvas"));
	};

	return (
		<button
			disabled={pending || disabled}
			onClick={onClick}
			className={cn(
				"col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
				(pending || disabled) &&
					"opacity-75 hover:bg-blue-600 cursor-not-allowed"
			)}
		>
			<div />
			<Plus className='h-12 w-12 text-white stroke-1' />
			<p className='text-sm text-white font-light'>New Board</p>
		</button>
	);
};
