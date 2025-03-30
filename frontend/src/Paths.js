import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import MainPage from "./MainPage";
import {UserProvider} from "./contexts/UserContext";

function Paths() {
  return (
    <UserProvider>
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path={"/register"} element={<RegisterPage />} />
                <Route path={"/main"} element={<MainPage />} />
            </Routes>
        </Router>
    </UserProvider>
  );
}

export default Paths;