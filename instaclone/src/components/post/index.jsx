import { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaRegPaperPlane,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import "./index.css";

function Post({ post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [text, setText] = useState("");

  const addComment = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setComments([...comments, { user: "you", text }]);
    setText("");
  };

  return (
    <article className="post">
      <header className="post-header">
        <div className="avatar-ring small">
          <img src={post.avatar} alt={post.username} />
        </div>
        <div className="post-user">
          <strong>{post.username}</strong>
          {post.verified && <MdVerified className="verified" />}
          <span className="dot">•</span>
          <span className="time">{post.time}</span>
        </div>
        <FiMoreHorizontal className="more" />
      </header>

      <img
        className="post-image"
        src={post.image}
        alt="post"
        onDoubleClick={() => setLiked(true)}
      />

      <div className="post-actions">
        <div className="left">
          <span
            className={liked ? "liked" : ""}
            onClick={() => setLiked(!liked)}
          >
            {liked ? <FaHeart /> : <FaRegHeart />}
          </span>
          <FaRegComment />
          <FaRegPaperPlane />
        </div>
        <span onClick={() => setSaved(!saved)}>
          {saved ? <FaBookmark /> : <FaRegBookmark />}
        </span>
      </div>

      <p className="likes">
        {(post.likes + (liked ? 1 : 0)).toLocaleString()} likes
      </p>
      <p className="caption">
        <strong>{post.username}</strong> {post.caption}
      </p>

      <div className="comments">
        {comments.map((c, i) => (
          <p key={i}>
            <strong>{c.user}</strong> {c.text}
          </p>
        ))}
      </div>

      <form className="comment-form" onSubmit={addComment}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {text.trim() && <button type="submit">Post</button>}
      </form>
    </article>
  );
}

export default Post;
