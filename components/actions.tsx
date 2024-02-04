"use client";

import { ActionProps } from "@/types";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

export const Actions = ({
	children,
	id,
	title,
	side,
	sideOffset,
}: ActionProps) => {
	const { mutate, pending } = useApiMutation(api.canvas.remove);
	const { onOpen } = useRenameModal();

	const onCopyLink = () => {
		navigator.clipboard
			.writeText(`${window.location.origin}/canvas/${id}`)
			.then(() => toast.success("Link Copied!"))
			.catch(() => toast.error("Failed to Copy Link!"));
	};

	const onDelete = () => {
		mutate({ id })
			.then(() => toast.success("Canvas Deleted!"))
			.catch(() => toast.error("Failed to Delete Canvas!"));
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				{children}
			</DropdownMenuTrigger>
			<DropdownMenuContent
				side={side}
				sideOffset={sideOffset}
				className='w-60'
				onClick={(e) => e.stopPropagation()}
			>
				<DropdownMenuItem
					className='p-3 cursor-pointer'
					onClick={onCopyLink}
				>
					<Link2 className='w-4 h-4 mr-2' />
					Copy Canvas Link
				</DropdownMenuItem>

				<DropdownMenuItem
					className='p-3 cursor-pointer'
					onClick={() => onOpen(id, title)}
				>
					<Pencil className='w-4 h-4 mr-2' />
					Rename Canvas
				</DropdownMenuItem>

				<ConfirmModal
					header='Delete Canvas'
					description='This will delete the canvas and all of its contents.'
					disabled={pending}
					onConfirm={onDelete}
				>
					<Button
						variant={"ghost"}
						className='p-3 text-sm w-full justify-start cursor-pointer'
					>
						<Trash2 className='w-4 h-4 mr-2' />
						Delete
					</Button>
				</ConfirmModal>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
