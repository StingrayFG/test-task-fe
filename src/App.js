import './App.scss';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from 'components/pages/HomePage/HomePage';
import TopMenu from 'components/layout/TopMenu/TopMenu';

export default function App() {
  return (
    <BrowserRouter>
      <TopMenu />
      <Routes>   
        <Route path='/' element={<HomePage />} />
      </Routes> 
    </BrowserRouter>    
  );
}
