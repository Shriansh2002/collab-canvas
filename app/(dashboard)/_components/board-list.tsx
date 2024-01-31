"use client";
import React from "react";
import { BoardListProps } from "@/types";
import { EmptySearch } from "./empty-search";
import { EmptyFavorites } from "./empty-favorites";
import { EmptyBoards } from "./empty-boards";

const BoardList = ({ orgId, query }: BoardListProps) => {
	const data = []; // TODO: fetch data

	if (!data.length && query.search) {
		return <EmptySearch />;
	}

	if (!data.length && query.favorites) {
		return <EmptyFavorites />;
	}

	if (!data.length) {
		return <EmptyBoards />;
	}

	return <div>BoardList</div>;
};

export default BoardList;
