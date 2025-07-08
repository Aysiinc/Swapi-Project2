import {useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Switch, Link } from 'react-router-dom';
import  Characters from './pages/Characters';
import Character from './pages/Character';
import Planet from './pages/Planet';
import Film from './pages/Film';

function App() {
  const [data, setData] = useState([]);
  
 return (

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Characters/>} />
      <Route path="/characters/:id" element={<Character/>} />
      <Route path="/planets/:id" element={<Planet/>} />
      <Route path="/films/:id" element={<Film/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
