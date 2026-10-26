import { useState } from "react";
import { currentUser, suggestions } from "../../Data/feedData";

function Suggestions() {
  const [following, setFollowing] = useState([]);

  const toggleFollow = (id) =>
    setFollowing((f) =>
      f.includes(id) ? f.filter((x) => x !== id) : [...f, id],
    );

  return (
    <aside className="suggestions">
      <div className="sg-row">
        <img src={currentUser.avatar} alt="you" />
        <div className="sg-info">
          <strong>{currentUser.username}</strong>
          <span>{currentUser.name}</span>
        </div>
        <button className="sg-link">Switch</button>
      </div>

      <div className="sg-head">
        <span>Suggested for you</span>
        <a>See all</a>
      </div>

      {suggestions.map((s) => (
        <div className="sg-row" key={s.id}>
          <img src={s.avatar} alt={s.username} />
          <div className="sg-info">
            <strong>{s.username}</strong>
            <span>{s.info}</span>
          </div>
          <button
            className={`sg-link ${following.includes(s.id) ? "following" : ""}`}
            onClick={() => toggleFollow(s.id)}
          >
            {following.includes(s.id) ? "Following" : "Follow"}
          </button>
        </div>
      ))}

      <footer className="sg-footer">
        About · Help · Press · API · Jobs · Privacy · Terms · Locations ·
        Language · Meta Verified
        <p>© 2026 INSTAGRAM FROM META</p>
      </footer>
    </aside>
  );
}

export default Suggestions;
