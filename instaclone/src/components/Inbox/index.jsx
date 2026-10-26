import { useState, useRef, useEffect } from "react";
import Sidebar from "../sidebar";
import { currentUser, conversations } from "../../Data/feedData";
import "./index.css";

function Inbox() {
  const [chats, setChats] = useState(conversations);
  const [activeId, setActiveId] = useState(conversations[0].id);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  const active = chats.find((c) => c.id === activeId);

  // Scroll to the newest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, active.messages.length]);

  const openChat = (id) => {
    setActiveId(id);
    setChats(chats.map((c) => (c.id === id ? { ...c, unread: false } : c)));
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setChats(
      chats.map((c) =>
        c.id === activeId
          ? {
              ...c,
              messages: [
                ...c.messages,
                { id: Date.now(), from: "me", text, time: now },
              ],
            }
          : c,
      ),
    );
    setText("");
  };

  return (
    <div className="inbox">
      <Sidebar />
      <div className="inbox-main">
        <aside className="inbox-list">
          <h2 className="inbox-title">{currentUser.username}</h2>
          <p className="inbox-sub">Messages</p>

          {chats.map((c) => {
            const last = c.messages[c.messages.length - 1];
            return (
              <div
                key={c.id}
                className={`inbox-item ${c.id === activeId ? "active" : ""}`}
                onClick={() => openChat(c.id)}
              >
                <img src={c.avatar} alt={c.username} />
                <div className="inbox-info">
                  <strong>{c.username}</strong>
                  <span>
                    {last.from === "me" ? "You: " : ""}
                    {last.text} · {last.time}
                  </span>
                </div>
                {c.unread && c.id !== activeId && (
                  <span className="inbox-dot" />
                )}
              </div>
            );
          })}
        </aside>

        <section className="chat">
          <header className="chat-header">
            <img src={active.avatar} alt={active.username} />
            <strong>{active.username}</strong>
          </header>

          <div className="chat-body">
            {active.messages.map((m) => (
              <div
                key={m.id}
                className={`bubble ${m.from === "me" ? "me" : "them"}`}
                title={m.time}
              >
                {m.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <form className="chat-form" onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" disabled={!text.trim()}>
              Send
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Inbox;
