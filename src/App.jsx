import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Detail from "./pages/Detail";
import MyVault from "./pages/MyVault";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import MoreExplore from "./pages/MoreExplore";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/explore"
        element={
          <ProtectedRoute>
            <Explore />
          </ProtectedRoute>
        }
      />

      <Route
        path="/explore/:type"
        element={
          <ProtectedRoute>
            <MoreExplore />
          </ProtectedRoute>
        }
      />

      <Route
        path="/explore/:id"
        element={
          <ProtectedRoute>
            <Detail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-list"
        element={
          <ProtectedRoute>
            <MyVault />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
