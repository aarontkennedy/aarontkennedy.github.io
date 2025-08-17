import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./apps/portfolio/pages/Home";
import Paddling from "./apps/canoe/pages/Paddling";
import LatLongRecorder from "./apps/tools/pages/LatLongRecorder";
import Kwanyama from "./apps/kwanyama/Kwanyama";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Paddling />} />
        <Route path="/paddling" element={<Paddling />} />
        <Route path="/about" element={<Home />} />
        <Route path="/latlongrecorder" element={<LatLongRecorder />} />
        <Route path="/kwanyama/*" element={<Kwanyama />} />
      </Routes>
    </Router>
  );
}

export default App;
