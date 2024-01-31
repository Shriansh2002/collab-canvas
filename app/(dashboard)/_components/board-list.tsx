"use client";
import { BoardListProps } from "@/types";

import { EmptyBoards } from "./empty-boards";
import { EmptyFavorites } from "./empty-favorites";
import { EmptySearch } from "./empty-search";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { CanvasCard } from "./canvas-card";
import { NewCanvasButton } from "./new-canvas-button";

const BoardList = ({ orgId, query }: BoardListProps) => {
	const data = useQuery(api.canvases.get, { orgId });

	if (data === undefined) {
		return (
			<div>
				<p className='text-3xl'>
					{query.favorites
						? "Favorites Canvas"
						: "Team Canvas"}
				</p>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
					<NewCanvasButton orgId={orgId} disabled />
					<CanvasCard.Skeleton />
					<CanvasCard.Skeleton />
					<CanvasCard.Skeleton />
					<CanvasCard.Skeleton />
				</div>
			</div>
		);
	}

	if (!data.length && query.search) {
		return <EmptySearch />;
	}

	if (!data.length && query.favorites) {
		return <EmptyFavorites />;
	}

	if (!data.length) {
		return <EmptyBoards />;
	}

	return (
		<div>
			<p className='text-3xl'>
				{query.favorites ? "Favorites Canvas" : "Team Canvas"}
			</p>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
				<NewCanvasButton orgId={orgId} />
				{data.map((canvas) => (
					<CanvasCard
						key={canvas._id}
						id={canvas._id}
						title={canvas.title}
						imageUrl={canvas.imageUrl}
						authorId={canvas.authorId}
						authorName={canvas.authorName}
						createdAt={canvas._creationTime}
						orgId={canvas.orgId}
						isFavorite={false}
					/>
				))}
			</div>
		</div>
	);
};

export default BoardList;
