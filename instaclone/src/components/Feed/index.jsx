import Sidebar from "../Sidebar";
import Stories from "../stories";
import Post from "../Post";
import Suggestions from "../Suggestions";
import MessagesButton from "../Message";
import { posts } from "../../Data/feedData";
import "./index.css";

function Feed() {
  return (
    <div className="home">
      <Sidebar />
      <main className="home-main">
        <section className="home-center">
          <Stories />
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </section>
        <Suggestions />
      </main>
      <MessagesButton />
    </div>
  );
}

export default Feed;
