import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Feed from "./components/Feed";
import Inbox from "./components/Inbox";
import Reels from "./components/Reels"; // 👈 add this

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/messages" element={<Inbox />} />
      <Route path="/reels" element={<Reels />} /> {/* 👈 add this */}
    </Routes>
  );
}

export default App;
