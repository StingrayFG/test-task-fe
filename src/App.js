import './App.scss';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from 'components/pages/HomePage/HomePage';
import ProjectPage from 'components/pages/ProjectPage/ProjectPage';
import TopMenu from 'components/layout/TopMenu/TopMenu';

export default function App() {
  return (
    <BrowserRouter>
      <TopMenu />
      <Routes>   
        <Route path='/' element={<HomePage />} />
        <Route path='/project/:name' element={<ProjectPage />} />
      </Routes> 
    </BrowserRouter>    
  );
}
