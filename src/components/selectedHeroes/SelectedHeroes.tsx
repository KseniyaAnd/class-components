import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Store.tsx';

const SelectedHeroes: React.FC = () => {
  const selectedItems = useSelector((state: RootState) => state.search.selectedItems);

  return (
    <div>
      <h2>Selected Heroes</h2>
      {selectedItems.length === 0 ? (
        <p>No heroes selected.</p>
      ) : (
        <ul>
          {selectedItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectedHeroes;
