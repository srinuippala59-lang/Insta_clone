import { useNavigate } from "react-router-dom";
import { FiSend } from "react-icons/fi";

function MessagesButton() {
  const navigate = useNavigate();

  return (
    <button className="messages-btn" onClick={() => navigate("/messages")}>
      <span className="icon-wrap">
        <FiSend />
        <span className="badge">4</span>
      </span>
      <span>Messages</span>
      <span className="mini-avatars">
        <img src="https://i.pravatar.cc/50?img=11" alt="" />
        <img src="https://i.pravatar.cc/50?img=22" alt="" />
        <img src="https://i.pravatar.cc/50?img=44" alt="" />
      </span>
    </button>
  );
}

export default MessagesButton;
