import { v } from "convex/values";
import { mutation } from "./_generated/server";

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

		// TODO: Check to delete favourite relation also

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
