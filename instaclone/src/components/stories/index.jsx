import { stories } from "../../Data/feedData";

function Stories() {
  return (
    <div className="stories">
      {stories.map((s) => (
        <div className="story" key={s.id}>
          <div className="avatar-ring">
            <img src={s.avatar} alt={s.username} />
          </div>
          <span>{s.username}</span>
        </div>
      ))}
    </div>
  );
}

export default Stories;
