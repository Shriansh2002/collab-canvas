import React from "react";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { LucideIcon } from "lucide-react";

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

interface ToolButtonProps {
	label: string;
	icon: LucideIcon;
	onClick: () => void;
	isActive?: boolean;
	isDisabled?: boolean;
}

interface ToolbarProps {
	canvasState: CanvasState;
	setCanvasState: (newState: CanvasState) => void;
	undo: () => void;
	redo: () => void;
	canUndo: boolean;
	canRedo: boolean;
}

enum Side {
	Top = 1,
	Bottom = 2,
	Left = 4,
	Right = 8,
}

enum LayerType {
	Rectangle,
	Ellipse,
	Path,
	Text,
	Note,
}

enum CanvasMode {
	None,
	Pressing,
	SelectionNet,
	Translating,
	Inserting,
	Resizing,
	Pencil,
}

type Color = {
	r: number;
	g: number;
	b: number;
};

type Point = {
	x: number;
	y: number;
};

type Camera = Point;

type XYWH = Point & {
	width: number;
	height: number;
};

interface SimpleLayer extends XYWH {
	fill: Color;
	value?: string;
}

interface RectangleLayer extends SimpleLayer {
	type: LayerType.Rectangle;
}

interface EllipseLayer extends SimpleLayer {
	type: LayerType.Ellipse;
}

interface PathLayer extends SimpleLayer {
	type: LayerType.Path;
	points: number[][]; // [x, y]
}

interface TextLayer extends SimpleLayer {
	type: LayerType.Text;
}

interface NoteLayer extends SimpleLayer {
	type: LayerType.Note;
}

type CanvasState =
	| { mode: CanvasMode.None }
	| {
			mode: CanvasMode.SelectionNet;
			origin: Point;
			current?: Point;
	  }
	| { mode: CanvasMode.Translating; current: Point }
	| {
			mode: CanvasMode.Inserting;
			layerType:
				| LayerType.Ellipse
				| LayerType.Rectangle
				| LayerType.Text
				| LayerType.Note;
	  }
	| { mode: CanvasMode.Pencil }
	| { mode: CanvasMode.Pressing; origin: Point }
	| {
			mode: CanvasMode.Resizing;
			initialBounds: XYWH;
			corner: Side;
	  };

export { Side, LayerType, CanvasMode };

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
	ToolButtonProps,
	CanvasState,
	ToolbarProps,
	Color,
	RectangleLayer,
	EllipseLayer,
	PathLayer,
	TextLayer,
	NoteLayer,
	Camera,
	Point,
	XYWH,
};
