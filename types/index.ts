import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
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

interface CanvasCardProps {
	id: string;
	title: string;
	imageUrl: string;
	authorId: string;
	authorName: string;
	createdAt: number;
	orgId: string;
	isFavorite: boolean;
}

interface FooterProps {
	title: string;
	authorLabel: string;
	createdAtLabel: string;
	isFavorite: boolean;
	onClick: () => void;
	disabled: boolean;
}

interface NewCanvasButtonProps {
	orgId: string;
	disabled?: boolean;
}

interface ActionProps {
	children: React.ReactNode;
	side?: DropdownMenuContentProps["side"];
	sideOffset?: DropdownMenuContentProps["sideOffset"];
	id: string;
	title: string;
}

interface ConfirmModalProps {
	children: React.ReactNode;
	onConfirm: () => void;
	disabled?: boolean;
	header: string;
	description?: string;
}

interface CanvasProps {
	canvasId: string;
}

interface CanvasIdPageProps {
	params: CanvasProps;
}

interface RoomProps {
	children: React.ReactNode;
	roomId: string;
	fallback: NonNullable<React.ReactNode> | null;
}

interface UserAvatarProps {
	src?: string;
	name?: string;
	fallback?: string;
	borderColor?: string;
}

export type {
	LayoutProps,
	BoardListProps,
	ItemProps,
	HintProps,
	DashboardPageProps,
	CanvasCardProps,
	FooterProps,
	NewCanvasButtonProps,
	ActionProps,
	ConfirmModalProps,
	CanvasProps,
	CanvasIdPageProps,
	RoomProps,
	UserAvatarProps,
};
