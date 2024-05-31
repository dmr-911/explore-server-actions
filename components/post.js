import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import { togglePostLikeStatus } from "@/actions/formActions";
export default function Post({ post, updatePost }) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {/* {formatDate(post.createdAt)} */}
              </time>
            </p>
          </div>
          <div>
            <form
              //   action={togglePostLikeStatus.bind(null, post.id)}
              action={updatePost.bind(null, post.id)}
              className={post.isLiked ? "liked" : undefined}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}
