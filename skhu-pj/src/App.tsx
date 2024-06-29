import React from "react";
import BestPage from "./component/BestPage";
import MainPage from "./component/MainPage";
import StartPage from "./component/StartPage";
import DetailPage from "./component/DetailPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhotoWrite from "./component/Upload";
import Signup from "./component/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Upload" element={<PhotoWrite />} />
        <Route path="/" element={<StartPage />} />
        <Route path="/Main" element={<MainPage />} />
        <Route path="/BestSnap" element={<BestPage />} />
        <Route path="/SignUp" element={<Signup onRegister={() => { }} />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
