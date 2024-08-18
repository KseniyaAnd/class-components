import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Link } from 'react-router-dom';

function MainPage() {
  const { uncontrolled, hookForm } = useSelector((state: RootState) => state.formData);

  return (
    <div id="main-page">
      <h1>Main Page</h1>
      <ul>
        <li><Link to="/uncontrolled-form">Uncontrolled Form</Link></li>
        <li><Link to="/hook-form">Hook Form</Link></li>
      </ul>
    </div>
  );
}

export default MainPage;
