import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import ManageAccess from "./pages/ManageAccess";
import DownloadPlugin from "./pages/DownloadPlugin";
import Market from "./pages/Market";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import UploadFile from "./pages/UploadFile";
import YourFiles from "./pages/YourFiles";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Market />} />
          <Route path="help" element={<FAQ />} />
          <Route path="plugin" element={<DownloadPlugin />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="profile" element={<Profile />} />
          <Route path="uploadFile" element={<UploadFile />} />
          <Route path="yourFiles" element={<YourFiles />} />
          <Route path="manageAccess" element={<ManageAccess />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);