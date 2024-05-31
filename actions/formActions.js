"use server";

import { redirect } from "next/navigation";
import { storePost, updatePostLikeStatus } from "../lib/posts";
import { uploadImage } from "@/lib/cloudinary";

export const createPostAction = async (prevState, formData) => {
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  let errors = [];

  if (!title && title.trim().length === 0) {
    errors.push("Title is required!");
  }
  if (!content && content.trim().length === 0) {
    errors.push("Content is required");
  }
  if (!image || image.size === 0) {
    errors.push("image is required");
  }

  if (errors.length > 0) {
    return { errors };
  }

  let url;
  try {
    url = await uploadImage(image);
  } catch (error) {
    throw new Error("Image upload failed, post was not crated.");
  }
  await storePost({
    imageUrl: url,
    title,
    content,
    userId: 1,
  });

  redirect("/feed");
};

export const togglePostLikeStatus = async (postId, formData) => {
  // postId is from bind method
  const response = updatePostLikeStatus(postId, 2);
};
