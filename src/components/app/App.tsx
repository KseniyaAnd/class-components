// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import SearchHero from '../pages/SearchHero';
import { Provider } from 'react-redux';
import store from '../store/Store';
import { ThemeProvider } from '../contexts/ThemeContext';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<SearchHero />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
