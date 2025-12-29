import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LatLongRecorder from "./apps/tools/pages/LatLongRecorder";
import SinglePage from "./pages/SinglePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SinglePage />} />
        <Route path="/paddling" element={<SinglePage />} />
        <Route path="/running" element={<SinglePage />} />
        <Route path="/about" element={<SinglePage />} />
        <Route path="/latlongrecorder" element={<LatLongRecorder />} />
      </Routes>
    </Router>
  );
}

export default App;
