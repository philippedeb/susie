import "./css/App.css";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import { useState } from "react";
import NotFound from "./components/NotFound";

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Router>
      <div // Standard styling for the app
        className="App"
        style={{ background: "#292a2d", color: "#fff", minHeight: "100vh" }}
      >
        <Header />
        <Routes>
          <Route path="/susie/" element={<Home onChange={setSearchValue} />} />
          <Route
            path="/susie/dashboard"
            element={<Dashboard repoLink={searchValue} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
