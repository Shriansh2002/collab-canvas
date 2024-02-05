"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { LiveMap, LiveList, LiveObject } from "@liveblocks/client";

import { RoomProvider } from "@/liveblocks.config";
import { Layer, RoomProps } from "@/types";

export const Room = ({ children, roomId, fallback }: RoomProps) => {
	return (
		<RoomProvider
			id={roomId}
			initialPresence={{ cursor: null, selection: [] }}
			initialStorage={{
				layers: new LiveMap<string, LiveObject<Layer>>(),
				layerIds: new LiveList<string>(),
			}}
		>
			<ClientSideSuspense fallback={fallback}>
				{() => children}
			</ClientSideSuspense>
		</RoomProvider>
	);
};
