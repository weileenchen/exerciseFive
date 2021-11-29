import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Header from "./components/Header";
import CreateUser from "./pages/CreateUser";
import UserProfile from "./pages/UserProfile";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/create" element={<CreateUser />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
