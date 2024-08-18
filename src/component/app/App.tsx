import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MainPage from '../../page/MainPage';
import UncontrolledFormPage from '../../page/UncontrolledFormPage';
import HookFormPage from '../../page/HookFormPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/uncontrolled-form" element={<UncontrolledFormPage />} />
        <Route path="/hook-form" element={<HookFormPage />} />
      </Routes>
    </div>
  );
}

export default App;
