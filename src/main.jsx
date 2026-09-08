import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup.jsx';
import Login from './Pages/Login.jsx';
import Layout from './Layout.jsx';
import Home from './Pages/Home.jsx';
import CreatePost from './components/CreatePost.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
  <Layout>
     <Routes>
    <Route path='/' element={<App />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/login' element={<Login />} />
    <Route path='/home' element={<Home />} />
    <Route path='/create-post' element={<CreatePost />} />
    {/* <Route path='/home' element={<Home />} /> */}
    {/* <Route path='/home' element={<Home />} /> */}
   </Routes>
  </Layout>
   </BrowserRouter>

  <ToastContainer
            position="top-right"
            autoClose={3000}
        />

  </StrictMode>,
)
