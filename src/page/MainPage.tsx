import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

function MainPage() {
  const { uncontrolled, hookForm } = useSelector((state: RootState) => state.formData);

  return (
    <div>
      <h1>Main Page</h1>
      <div>
        <h2>Uncontrolled Form Data:</h2>
        {uncontrolled ? (
          <div>
            <p>Username: {uncontrolled.username}</p>
            <p>Email: {uncontrolled.email}</p>
          </div>
        ) : (
          <p>No data from uncontrolled form</p>
        )}
      </div>
      <div>
        <h2>Hook Form Data:</h2>
        {hookForm ? (
          <div>
            <p>Username: {hookForm.username}</p>
            <p>Email: {hookForm.email}</p>
          </div>
        ) : (
          <p>No data from hook form</p>
        )}
      </div>
    </div>
  );
}

export default MainPage;
