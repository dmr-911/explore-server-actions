"use client";
import { useOptimistic } from "react";
import Post from "./post";
import { togglePostLikeStatus } from "@/actions/formActions";

export default function Posts({ posts }) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    posts,
    (prevPosts, updatedPostId) => {
      const updatedPostIndex = prevPosts.findIndex(
        (post) => post.id === updatedPostId
      );

      if (updatedPostIndex === -1) {
        return prevPosts;
      }

      const updatedPost = { ...prevPosts[updatedPostId] };

      updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);

      updatedPost.isLiked = !updatedPost.isLiked;

      const newPostsArr = [...prevPosts];
      newPostsArr[updatedPostIndex] = updatedPost;

      return newPostsArr;
    }
  );

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  const updatePost = async (postId) => {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  };

  return (
    <ul className="posts">
      {optimisticPosts.map((post, index) => (
        <li key={index}>
          <Post post={post} updatePost={updatePost} />
        </li>
      ))}
    </ul>
  );
}
