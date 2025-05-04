import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import MainPage from "./MainPage";
import {UserProvider} from "./contexts/UserContext";
import {ModuleProvider} from "./contexts/ModuleContext";
import ForgotPasswordPage from "./ForgotPasswordPage";
import ResetPasswordPage from "./ResetPasswordPage";
import LearnPage from "./LearnPage";
import UserPage from "./UserPage";
import PassGame from "./PassGame";
import { EmailCardProvider } from "./contexts/EmailCardContext";
import EmailGame from "./EmailGame";
import AdminPage from "./AdminPage";

function Paths() {
  return (
    <EmailCardProvider>
        <UserProvider>
            <ModuleProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path={"/register"} element={<RegisterPage />} />
                        <Route path={"/main"} element={<MainPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path={"/reset-password/:token"} element={<ResetPasswordPage />} />
                        <Route path={"/learn/:id"} element={<LearnPage />} />
                        <Route path={"/user"} element={<UserPage />} />
                        <Route path={"/game/password"} element={<PassGame/>} />
                        <Route path={"/game/email"} element={<EmailGame/>} />
                        <Route path={"/admin"} element={<AdminPage />} />
                    </Routes>
                </Router>
            </ModuleProvider>
        </UserProvider>
    </EmailCardProvider>
  );
}

export default Paths;