import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { useEffect, useState }  from "react";
import Layout from "./pages/Layout";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import ManageAccess from "./pages/ManageAccess";
import DownloadPlugin from "./pages/DownloadPlugin";
import Market from "./pages/Market";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import UploadFile from "./pages/UploadFile";
import PageNotFound from "./pages/PageNotFound";
import SignUp from "./pages/SignUp";
import ViewAd from "./pages/ViewAd";
import Buy from "./pages/Buy";




export default function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const theUser = localStorage.getItem("user");

    if (theUser && !theUser.includes("undefined")) {
      setUser(JSON.parse(theUser));
    }
  }, []);
  return (
    <GoogleOAuthProvider clientId="806567474256-hvk21nftsgd4ahi76gdvugji84pkugp1.apps.googleusercontent.com">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Market />} />
              <Route path="help" element={<FAQ />} />
              <Route path="plugin" element={<DownloadPlugin />} />
              <Route path="contact" element={<Contact />} />
              <Route path="viewAd" element={<ViewAd/>} />
              <Route path="login" element={<Login />} />
              <Route
                path="profile"
                element={user?.email ? <Profile user={user} /> : <Navigate to="/login" />}
              />
              <Route
                path="buy"
                element={user?.email ? <Buy user={user} /> : <Navigate to="/login" />}
              />
              <Route
                path="signup"
                element={<SignUp />}
              />
              <Route
                path="login"
                element={<Login />}
              />
              <Route
                path="uploadFile"
                element={user?.email ? <UploadFile user={user} /> : <Navigate to="/login" />}
              />
              <Route
                path="manageAccess"
                element={user?.email ? <ManageAccess user={user} /> : <Navigate to="/login" />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);