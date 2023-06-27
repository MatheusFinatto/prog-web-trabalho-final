import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";

import "./index.css";
import Login from "./pages/User/Login";
import Main from "./pages/TodoList/Main";
import Navbar from "./components/Navbar";
import Register from "./pages/User/Register";
import { UserProvider } from "./contexts/UserContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </UserProvider>
  </BrowserRouter>
);
