"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
} from "@/components/ui/dialog";
import { useRenameModal } from "@/store/use-rename-modal";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export const RenameModal = () => {
	const { isOpen, initialValues, onClose, onOpen } =
		useRenameModal();

	const { mutate, pending } = useApiMutation(api.canvas.update);

	const [title, setTitle] = useState(initialValues.title);

	useEffect(() => {
		setTitle(initialValues.title);
	}, [initialValues.title]);

	const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		mutate({
			id: initialValues.id,
			title,
		})
			.then(() => {
				toast.success("Canvas renamed");
				onClose();
			})
			.catch(() => {
				toast.error("Failed to rename canvas");
			});
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Canvas title</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					Enter a new title for this board
				</DialogDescription>
				<form onSubmit={onSubmit} className='space-y-4'>
					<Input
						disabled={pending}
						required
						maxLength={60}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Canvas title'
					/>
					<DialogFooter>
						<DialogClose asChild>
							<Button type='button' variant='outline'>
								Cancel
							</Button>
						</DialogClose>
						<Button disabled={pending} type='submit'>
							Save
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
