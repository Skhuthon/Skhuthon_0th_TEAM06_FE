import React from "react";
import BestPage from "./component/BestPage";
import MainPage from "./component/MainPage";
import StartPage from "./component/StartPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhotoWrite from "./component/Upload";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Upload" element={<PhotoWrite/>}/>
        <Route path="/" element={<StartPage />} />
        <Route path="/Main" element={<MainPage />} />
        <Route path="/BestSnap" element={<BestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
