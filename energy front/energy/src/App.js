import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import ChatRoom from "./components/AdminChat/ChatRoom";
import EditDevices from "./components/EditDevices";
import EditUsers from "./components/EditUsers";
import Login from "./components/Login";
import Uuser from "./components/Uuser";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<Uuser />} />
          <Route path="/edtDev" element={<EditDevices />} />
          <Route path="/editUsers" element={<EditUsers />} />
          <Route path="/chat" element={<ChatRoom />} />
        </Routes>
    </Router>
  );
}

export default App;
