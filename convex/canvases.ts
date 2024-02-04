import { v } from "convex/values";
import { getAllOrThrow } from "convex-helpers/server/relationships";

import { query } from "./_generated/server";

export const get = query({
	args: {
		orgId: v.string(),
		search: v.optional(v.string()),
		favorites: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new Error("Unauthorized");
		}

		if (args.favorites) {
			const favoritedCanvases = await ctx.db
				.query("userFavorites")
				.withIndex("by_user_org", (q) =>
					q
						.eq("userId", identity.subject)
						.eq("orgId", args.orgId)
				)
				.order("desc")
				.collect();

			const ids = favoritedCanvases.map((b) => b.canvasId);

			const canvases = await getAllOrThrow(ctx.db, ids);

			return canvases.map((canvas) => ({
				...canvas,
				isFavorite: true,
			}));
		}

		const title = args.search as string;
		let canvases = [];

		if (title) {
			canvases = await ctx.db
				.query("canvas")
				.withSearchIndex("search_title", (q) =>
					q.search("title", title).eq("orgId", args.orgId)
				)
				.collect();
		} else {
			canvases = await ctx.db
				.query("canvas")
				.withIndex("by_org", (q) => q.eq("orgId", args.orgId))
				.order("desc")
				.collect();
		}

		const canvasWithFavoriteRelation = canvases.map((canvas) => {
			return ctx.db
				.query("userFavorites")
				.withIndex("by_user_canvas", (q) =>
					q
						.eq("userId", identity.subject)
						.eq("canvasId", canvas._id)
				)
				.unique()
				.then((favorite) => {
					return {
						...canvas,
						isFavorite: !!favorite,
					};
				});
		});

		const canvasWithFavoriteBoolean = Promise.all(
			canvasWithFavoriteRelation
		);

		return canvasWithFavoriteBoolean;
	},
});
