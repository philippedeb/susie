import "./css/App.css";
import "./css/fonts.css";
import Header from "./components/structure/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  HashRouter,
} from "react-router-dom";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import Guides from "./components/pages/Guides/GuideMenu";
import GuidePages from "./components/pages/Guides/GuidePages";

function App() {
  return (
    <HashRouter>
      <div
        className="App"
        style={{
          background: "#292a2d",
          color: "#fff",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/guide" element={<GuidePageRoute />} />
          <Route path="*" element={<NotFound item={"page"} />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

function GuidePageRoute() {
  const location = useLocation();
  const guideKey = new URLSearchParams(location.search).get("name");
  if (guideKey === null) {
    return <NotFound item="guide" />;
  }
  return <GuidePages guideKey={guideKey} />;
}

export default App;
