import type {
	ActionProps,
	BoardListProps,
	CanvasCardProps,
	CanvasIdPageProps,
	CanvasProps,
	ConfirmModalProps,
	DashboardPageProps,
	FooterProps,
	HintProps,
	ItemProps,
	LayoutProps,
	NewCanvasButtonProps,
	RoomProps,
	ToolButtonProps,
	UserAvatarProps,
	CursorProps,
	LayerPreviewProps,
} from "./component-props";

import {
	EllipseLayer,
	NoteLayer,
	PathLayer,
	RectangleLayer,
	TextLayer,
	Layer,
} from "./layers";

import {
	RectangleLayerProps,
	SelectionBoxProps,
	SelectionToolsProps,
	ColorPickerProps,
	ColorButtonProps,
	EllipseLayerProps,
} from "./layers-props";

import { CanvasMode, LayerType, Side } from "@/enums";
import { Point, XYWH, Camera, Color } from "./base";

interface ToolbarProps {
	canvasState: CanvasState;
	setCanvasState: (newState: CanvasState) => void;
	undo: () => void;
	redo: () => void;
	canUndo: boolean;
	canRedo: boolean;
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

export type {
	ActionProps,
	BoardListProps,
	CanvasCardProps,
	CanvasIdPageProps,
	CanvasProps,
	CanvasState,
	ConfirmModalProps,
	DashboardPageProps,
	EllipseLayer,
	FooterProps,
	HintProps,
	ItemProps,
	LayoutProps,
	NewCanvasButtonProps,
	NoteLayer,
	PathLayer,
	RectangleLayer,
	RoomProps,
	TextLayer,
	ToolButtonProps,
	ToolbarProps,
	UserAvatarProps,
	CursorProps,
	Camera,
	Color,
	Layer,
	Point,
	LayerPreviewProps,
	RectangleLayerProps,
	SelectionBoxProps,
	SelectionToolsProps,
	ColorPickerProps,
	ColorButtonProps,
	EllipseLayerProps,
};
