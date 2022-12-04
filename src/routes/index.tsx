import App from "../App";
import { ReportPage } from "../pages/report/";
import { ClientPage } from "../pages/clients";
import { Login } from "../components/modalLogin";
import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export const RouterApp = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/criarcontato" element={<App />} />
        <Route
          path="/clients"
          element={
            <ClientPage
              openModal={openModal}
              setShowModal={setShowModal}
              showModal={showModal}
            />
          }
        />
        <Route
          path=":id"
          element={
            <ReportPage
              setShowModal={setShowModal}
              openModal={openModal}
              showModal={showModal}
            />
          }
        />
      </Routes>
    </Router>
  );
};
