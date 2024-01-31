"use client";
import { Button } from "@/components/ui/button";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";

export const EmptyBoards = () => {
	const { organization } = useOrganization();
	const { mutate, pending } = useApiMutation(api.canvas.create);

	const onClick = () => {
		if (!organization) return;

		mutate({
			title: "My Canvas",
			orgId: organization.id,
		})
			.then((id) => {
				toast.success("Canvas created!");
				// TODO: Navigate to canvas
			})
			.catch(() => toast.error("Failed to create canvas!"));
	};

	return (
		<div className='h-full flex flex-col items-center justify-center'>
			<Image
				src='/note.svg'
				alt='Empty'
				width={110}
				height={110}
			/>
			<p className='text-2xl font-semibold mt-6'>
				Create your canvas
			</p>
			<p className='text-muted-foreground text-sm mt-2'>
				Start by creating a canvas for your organization.
			</p>
			<div className='mt-6'>
				<Button
					size='lg'
					onClick={onClick}
					disabled={pending}
				>
					Create Canvas
				</Button>
			</div>
		</div>
	);
};
