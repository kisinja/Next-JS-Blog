import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const GET = async () => {
    try {
        const posts = await prisma.blogPost.findMany({});
        if (!posts) {
            return NextResponse.json({ error: "No posts found" }, { status: 404 });
        }

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });

    }
};