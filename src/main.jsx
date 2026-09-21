import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { store } from "./app/store";

import App from "./App.jsx";
import Layout from "./Layout.jsx";
import Signup from "./Pages/Signup.jsx";
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import CreatePost from "./components/CreatePost.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<App />} />

            <Route
              path="/signup"
              element={<Signup />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/home"
              element={<Home />}
            />

            <Route
              path="/create-post"
              element={<CreatePost />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </Provider>
  </React.StrictMode>
);