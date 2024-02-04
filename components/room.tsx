"use client";

import { ClientSideSuspense } from "@liveblocks/react";

import { RoomProvider } from "@/liveblocks.config";
import { RoomProps } from "@/types";

export const Room = ({ children, roomId, fallback }: RoomProps) => {
	return (
		<RoomProvider id={roomId} initialPresence={{}}>
			<ClientSideSuspense fallback={fallback}>
				{() => children}
			</ClientSideSuspense>
		</RoomProvider>
	);
};
