"use client";

import { useEffect, useState } from "react";
import { RenameModal } from "@/components/modals/rename-modal";

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false);

	// Will only render on client, it will not render on server
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<RenameModal />
		</>
	);
};
