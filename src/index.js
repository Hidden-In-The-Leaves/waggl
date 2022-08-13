import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import LogIn from './components/LogIn.jsx';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    //The whole App is wrapped in a browser router component
  //which holds all of the "routes" which are basically endpoints
  <BrowserRouter>
    <Routes>
      {/* to create a route you use a Route component
      and set the "endpoint" name with the attribute "path"
      and point it to a component acting as a page with the element attribute
       */}
      <Route path="/" element={<App />} />
      <Route path="/LogIn" element={<LogIn />} />
    </Routes>
  </BrowserRouter>
)
