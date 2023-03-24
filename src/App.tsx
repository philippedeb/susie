import "./css/App.css";
import Header from "./components/structure/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useLocation,
} from "react-router-dom";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import Guides from "./components/pages/Guides/GuideMenu";
import GuidePages from "./components/pages/Guides/GuidePages";

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{ background: "#292a2d", color: "#fff", minHeight: "100vh" }}
      >
        <Header />
        <Routes>
          <Route path="/susie/" element={<Home />} />
          <Route path="/susie/dashboard" element={<Dashboard />} />
          <Route path="/susie/guides" element={<Guides />} />
          <Route path="/susie/guide" element={<GuidePageRoute />} />
          <Route path="*" element={<NotFound item={"page"} />} />
        </Routes>
      </div>
    </Router>
  );
}

function GuidePageRoute() {
  console.log("Trying to render guide page");
  const location = useLocation();
  const guideKey = new URLSearchParams(location.search).get("name");
  if (guideKey === null) {
    return <NotFound item="guide" />;
  }
  return <GuidePages guideKey={guideKey} />;
}

export default App;
