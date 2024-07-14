import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from '../Pages/NotFound.tsx';
import SearchHero from '../Pages/SearchHero.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<SearchHero />} />
      </Routes>
    </Router>
  );
};

export default App;
