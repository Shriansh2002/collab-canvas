import { auth, currentUser } from "@clerk/nextjs";

import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(
	process.env.NEXT_PUBLIC_CONVEX_URL!
);

const liveblocks = new Liveblocks({
	secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: Request) {
	const authorization = await auth();
	const user = await currentUser();

	if (!authorization || !user) {
		return new Response("Unauthorized", { status: 403 });
	}

	const { room } = await req.json();
	const canvas = await convex.query(api.canvas.get, {
		id: room,
	});

	if (canvas?.orgId !== authorization.orgId) {
		return new Response("Unauthorized", { status: 403 });
	}

	const userInfo = {
		name: user.firstName || "Anonymous",
		picture: user.imageUrl,
	};

	const session = liveblocks.prepareSession(user.id, { userInfo });

	if (room) {
		session.allow(room, session.FULL_ACCESS);
	}

	const { status, body } = await session.authorize();
	return new Response(body, { status });
}