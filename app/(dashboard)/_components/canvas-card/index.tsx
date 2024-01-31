"use client";
import React from "react";
import Link from "next/link";

import { CanvasCardProps } from "@/types";
import Image from "next/image";
import { Overlay } from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import Footer from "./footer";
import { Skeleton } from "@/components/ui/skeleton";

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
				</div>

				<Footer
					isFavorite={isFavorite}
					title={title}
					authorLabel={authorLabel}
					createdAtLabel={createdAtLabel}
					onClick={() => {}}
					disabled={false}
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
