import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { useAuth } from "./contexts/auth";
import Add from "./pages/add";
import Extras from "./pages/extras";
import HomePage from "./pages/homePage";
import Homes from "./pages/homes";
import Login from "./pages/login";
import Signup from "./pages/signup";

function App() {
  const { loadStatus, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadStatus && user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [user, loadStatus]);

  if (loadStatus) return <p>...</p>;

  return (
    <Routes>
      {!user && (
        <>
          <Route index path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </>
      )}

      {user && (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<Add />} />
          <Route path="/homes" element={<Homes />} />
          <Route path="/extras" element={<Extras />} />
        </>
      )}
    </Routes>
  );
}

export default App;
