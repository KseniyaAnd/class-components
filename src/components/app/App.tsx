import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import SearchHero from '../pages/SearchHero';
import { Provider } from 'react-redux';
import store from '../store/Store.tsx';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<SearchHero />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
