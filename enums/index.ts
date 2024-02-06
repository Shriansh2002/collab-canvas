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

export { Side, LayerType, CanvasMode };

// Testing
