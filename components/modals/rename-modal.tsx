"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
} from "@/components/ui/dialog";
import { useRenameModal } from "@/store/use-rename-modal";
import { DialogTitle } from "@radix-ui/react-dialog";

export const RenameModal = () => {
	const { isOpen, initialValues, onClose, onOpen } =
		useRenameModal();

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Canvas title</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					Enter a new title for this board
				</DialogDescription>
			</DialogContent>
		</Dialog>
	);
};
