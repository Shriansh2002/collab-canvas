import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const images = [
	"/placeholders/1.svg",
	"/placeholders/2.svg",
	"/placeholders/3.svg",
	"/placeholders/4.svg",
	"/placeholders/5.svg",
	"/placeholders/6.svg",
	"/placeholders/7.svg",
	"/placeholders/8.svg",
	"/placeholders/9.svg",
	"/placeholders/10.svg",
];

export const create = mutation({
	args: {
		orgId: v.string(),
		title: v.string(),
	},
	handler: async (ctx, orgs) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Unauthorized");
		}

		const randomImage =
			images[Math.floor(Math.random() * images.length)];

		const canvas = await ctx.db.insert("canvas", {
			title: orgs.title,
			orgId: orgs.orgId,
			authorId: identity.subject,
			authorName: identity.name!,
			imageUrl: randomImage,
		});

		return canvas;
	},
});

export const remove = mutation({
	args: {
		id: v.id("canvas"),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Unauthorized");
		}

		const userId = identity.subject;

		const existingFavorite = await ctx.db
			.query("userFavorites")
			.withIndex("by_user_canvas", (q) =>
				q.eq("userId", userId).eq("canvasId", args.id)
			)
			.unique();

		if (existingFavorite) {
			await ctx.db.delete(existingFavorite._id);
		}

		await ctx.db.delete(args.id);
	},
});

export const update = mutation({
	args: {
		id: v.id("canvas"),
		title: v.string(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Unauthorized");
		}

		const title = args.title.trim();
		if (!title) {
			throw new Error("Title is required");
		}
		if (title.length > 50) {
			throw new Error("Title is too long");
		}

		const canvas = await ctx.db.patch(args.id, {
			title: args.title,
		});

		return canvas;
	},
});

export const favorite = mutation({
	args: { id: v.id("canvas"), orgId: v.string() },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Unauthorized");
		}

		const canvas = await ctx.db.get(args.id);
		if (!canvas) {
			throw new Error("Canvas not found");
		}

		const userId = identity.subject;

		const existingFavorite = await ctx.db
			.query("userFavorites")
			.withIndex("by_user_canvas_org", (q) =>
				q
					.eq("userId", userId)
					.eq("canvasId", canvas._id)
					.eq("orgId", args.orgId)
			)
			.unique();

		if (existingFavorite) {
			throw new Error("Already favorited");
		}

		await ctx.db.insert("userFavorites", {
			userId,
			canvasId: canvas._id,
			orgId: args.orgId,
		});

		return canvas;
	},
});

export const unfavorite = mutation({
	args: { id: v.id("canvas") },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Unauthorized");
		}

		const canvas = await ctx.db.get(args.id);
		if (!canvas) {
			throw new Error("Canvas not found");
		}

		const userId = identity.subject;

		const existingFavorite = await ctx.db
			.query("userFavorites")
			.withIndex("by_user_canvas", (q) =>
				q.eq("userId", userId).eq("canvasId", canvas._id)
			)
			.unique();

		if (!existingFavorite) {
			throw new Error("Favorite canvas not found");
		}

		await ctx.db.delete(existingFavorite._id);

		return canvas;
	},
});

export const get = query({
	args: { id: v.id("canvas") },
	handler: async (ctx, args) => {
		const canvas = await ctx.db.get(args.id);
		// if (!canvas) {
		// 	throw new Error("Canvas not found");
		// }

		return canvas;
	},
});
