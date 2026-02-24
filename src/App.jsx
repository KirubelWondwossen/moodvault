import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Detail from "./pages/Detail";
import MyList from "./pages/MyList";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/explore/:id" element={<Detail />} />
      <Route path="/my-list" element={<MyList />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
