import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import ToolList from "./pages/Tools/List/index.tsx";
import CreateTool from "./pages/Tools/Create/index.tsx";
import EditTool from "./pages/Tools/Edit/index.tsx";
import { ErrorPopup } from "./components/ErrorPopup.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ToastContainer position="top-center" autoClose={5000} />
    <ErrorPopup />

    <Routes>
      <Route path="/">
        <Route index element={<ToolList />} />
        <Route path="create" element={<CreateTool />} />
        <Route path="edit/:id" element={<EditTool />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
