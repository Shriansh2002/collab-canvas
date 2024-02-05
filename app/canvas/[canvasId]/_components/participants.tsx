"use client";

import { useOthers, useSelf } from "@/liveblocks.config";
import { UserAvatar } from "./user-avatar";
import { connectionIdToColor } from "@/lib/utils";

const MAX_PARTICIPANTS = 2;

export const Participants = () => {
	const users = useOthers();
	const currentUser = useSelf();
	const hasMoreParticipants = users.length > MAX_PARTICIPANTS;

	return (
		<div className='absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md'>
			<div className='flex gap-x-2'>
				{users
					.slice(0, MAX_PARTICIPANTS)
					.map(({ connectionId, info }) => {
						return (
							<UserAvatar
								key={connectionId}
								src={info?.picture}
								name={info?.name}
								fallback={info?.name?.[0] || "A"}
								borderColor={connectionIdToColor(
									connectionId
								)}
							/>
						);
					})}

				{currentUser && (
					<UserAvatar
						src={currentUser.info?.picture}
						name={`${currentUser.info?.name} (You)`}
						fallback={currentUser.info?.name?.[0]}
						borderColor={connectionIdToColor(
							currentUser.connectionId
						)}
					/>
				)}

				{hasMoreParticipants && (
					<UserAvatar
						name={`${
							users.length - MAX_PARTICIPANTS
						} More`}
						fallback={`+${
							users.length - MAX_PARTICIPANTS
						}`}
					/>
				)}
			</div>
		</div>
	);
};

export const ParticipantsSkeleton = () => {
	return (
		<div className='absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]' />
	);
};
