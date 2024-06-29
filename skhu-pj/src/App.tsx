import React from "react";
import BestPage from "./component/BestPage";
import MainPage from "./component/MainPage";
import StartPage from "./component/StartPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhotoWrite from "./component/Upload";
import Signup from "./component/Signup";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Navigate } from 'react-router'; // Not sure if this is needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Upload" element={<PhotoWrite/>}/>
        <Route path="/" element={<StartPage />} />
        <Route path="/Main" element={<MainPage />} />
        <Route path="/BestSnap" element={<BestPage />} />
        <Route path="/SignUp" element={<Signup onRegister={function (): void {
          throw new Error("Function not implemented.");
        } } />}/>
      </Routes>
    </Router>
  );
}

export default App;
