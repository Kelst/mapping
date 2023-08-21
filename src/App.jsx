import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Home from './components/Mapping/Mapping';
import Mapping from './components/Mapping/Mapping';
import LoginPage from './components/Login/Login';

function App() {
  return (
   
     <Routes>
        <Route path="/" element={<Layout />}>
          <Route   path="/" element={<Mapping />} />
          <Route path="/mapping" element={<Mapping />} />
         
        </Route>
 <Route path="/login" element={<LoginPage/>} />
      </Routes>
      
   
  )
}

export default App
