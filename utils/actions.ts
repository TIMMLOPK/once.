"use server"

import { revalidatePath } from "next/cache";
import { PublishPostDataToSend } from "./fetchHook";

export async function deletePost(postId: number) {
    try {
        await fetch(process.env.API_URL + "/posts/" + postId, {
            method: "DELETE",
            headers: {
                password: process.env.API_PASSWORD || "",
            },
        });
    } catch (e: any) {
        console.error(e);
    }

    return revalidatePath("/")
}

async function publishPost(post: PublishPostDataToSend) {
    try {
        const res = await fetch(process.env.API_URL + "/posts", {
            method: "POST",
            headers: {
                password: process.env.API_PASSWORD || "",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        });

        const data = await res.json();

        if (!data.success) {
            throw new Error(data.error);
        }

        return data.postID;
    } catch (e: any) {
        console.error(e);
    }
}

export async function getPosts() {
    const res = await fetch(process.env.API_URL + "/posts");

    const data = await res.json();

    return data;
}