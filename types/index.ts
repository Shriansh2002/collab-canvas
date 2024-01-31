import React from "react";

interface LayoutProps {
	children: React.ReactNode;
}

interface QueryParams {
	search?: string;
	favorites?: string;
}

interface DashboardPageProps {
	searchParams: QueryParams;
}

interface BoardListProps {
	orgId: string;
	query: QueryParams;
}

interface ItemProps {
	id: string;
	name: string;
	imageUrl: string;
}

interface HintProps {
	label: string;
	children: React.ReactNode;
	side?: "left" | "right" | "top" | "bottom";
	sideOffset?: number;
	align?: "start" | "center" | "end";
	alignOffset?: number;
}

export type {
	LayoutProps,
	BoardListProps,
	ItemProps,
	HintProps,
	DashboardPageProps,
};
