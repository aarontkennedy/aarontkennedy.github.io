import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LatLongRecorder from "./apps/tools/pages/LatLongRecorder";
import ImageUrlViewer from "./apps/tools/pages/ImageUrlViewer";
import SinglePage from "./pages/SinglePage";
import Parks from "./apps/tools/pages/parksTool/Parks";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SinglePage />} />
        <Route path="/paddling" element={<SinglePage />} />
        <Route path="/running" element={<SinglePage />} />
        {/* <Route path="/about" element={<SinglePage />} /> */}
        <Route path="/latlongrecorder" element={<LatLongRecorder />} />
        <Route path="/imageurlviewer" element={<ImageUrlViewer />} />
        <Route path="/parks" element={<Parks />} />
      </Routes>
    </Router>
  );
}

export default App;
