import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Songs from "./pages/Songs";
import "./App.css"; // optional component styles

const App = () => {
  return (
    <Router>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>
          Home
        </Link>
        <Link to="/songs">Playlist</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/songs" element={<Songs />} />
      </Routes>
    </Router>
  );
};

export default App;
