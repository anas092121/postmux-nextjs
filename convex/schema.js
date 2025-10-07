import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.optional(v.string()),
    tokenIdentifier: v.string(), // clerk user ID for auth
    imageUrl: v.optional(v.string()),
    username: v.optional(v.string()),

    // timestamps
    createdAt: v.number(),
    lastActiveAt: v.number(),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_email", ["email"])
    .index("by_username", ["username"])
    .searchIndex("search_name", { searchField: "name" })
    .searchIndex("search_email", { searchField: "email" }),

  posts: defineTable({
    title: v.string(),
    content: v.string(), // Rich text content (JSON string or HTML)
    status: v.union(v.literal("draft"), v.literal("published")),

    // Author relationship
    authorId: v.id("users"),

    // Content metadata
    tags: v.array(v.string()),
    category: v.optional(v.string()), // Single category
    featuredImage: v.optional(v.string()), // ImageKit URL

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
    publishedAt: v.optional(v.number()),
    scheduledFor: v.optional(v.number()), // For scheduled publishing

    // Analytics
    viewCount: v.number(),
    likeCount: v.number(),
  })
    .index("by_author", ["authorId"])
    .index("by_status", ["status"])
    .index("by_published", ["status", "publishedAt"])
    .index("by_author_status", ["authorId", "status"])
    .searchIndex("search_content", { searchField: "title" }),
});
