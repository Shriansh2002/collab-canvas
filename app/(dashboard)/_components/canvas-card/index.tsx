"use client";
import React from "react";
import Link from "next/link";

import { CanvasCardProps } from "@/types";
import Image from "next/image";
import { Overlay } from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import Footer from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";

import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export const CanvasCard = ({
	id,
	title,
	authorId,
	authorName,
	createdAt,
	imageUrl,
	isFavorite,
	orgId,
}: CanvasCardProps) => {
	const { userId } = useAuth();

	const authorLabel = userId == authorId ? "You" : authorName;
	const createdAtLabel = formatDistanceToNow(createdAt, {
		addSuffix: true,
	});

	const { mutate: onFavorite, pending: pendingFavorite } =
		useApiMutation(api.canvas.favorite);
	const { mutate: onUnfavorite, pending: pendingUnfavorite } =
		useApiMutation(api.canvas.unfavorite);

	const toggleFavorite = () => {
		if (isFavorite) {
			onUnfavorite({ id }).catch(() =>
				toast.error("Failed to unfavorite")
			);
		} else {
			onFavorite({ id, orgId }).catch(() =>
				toast.error("Failed to favorite")
			);
		}
	};

	return (
		<Link href={`/canvas/${id}`}>
			<div className='group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden'>
				<div className='relative flex-1 bg-amber-50'>
					<Image
						src={imageUrl}
						alt='Doodle'
						fill
						className='object-fit'
					/>
					<Overlay />
					<Actions id={id} title={title} side='right'>
						<button className='absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none'>
							<MoreHorizontal className='text-white opacity-75 hover:opacity-100 transition-opacity' />
						</button>
					</Actions>
				</div>

				<Footer
					isFavorite={isFavorite}
					title={title}
					authorLabel={authorLabel}
					createdAtLabel={createdAtLabel}
					onClick={toggleFavorite}
					disabled={pendingFavorite || pendingUnfavorite}
				/>
			</div>
		</Link>
	);
};

CanvasCard.Skeleton = function CanvasCardSkeleton() {
	return (
		<div className='aspect-[100/127] rounded-lg justify-between overflow-hidden'>
			<Skeleton className='h-full w-full' />
		</div>
	);
};
