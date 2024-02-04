import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
	args: {
		orgId: v.string(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Unauthorized");
		}

		const canvases = await ctx.db
			.query("canvas")
			.withIndex("by_org", (q) => q.eq("orgId", args.orgId))
			.order("desc")
			.collect();

		const canvasesWithFavoritesRelation = canvases.map(
			(canvas) => {
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
			}
		);

		const canvasesWithFavoritesBoolean = await Promise.all(
			canvasesWithFavoritesRelation
		);

		return canvasesWithFavoritesBoolean;
	},
});
