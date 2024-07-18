import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { selectItem, unselectItem } from '../reducers/SearchSlice';

interface ResultsComponentProps {
  results: Array<{ name: string; description: string }>;
}

const ResultsComponent: React.FC<ResultsComponentProps> = ({ results }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.search.selectedItems);

  const handleSelect = (name: string) => {
    if (selectedItems.includes(name)) {
      dispatch(unselectItem(name));
    } else {
      dispatch(selectItem(name));
    }
  };

  return (
    <div>
      {results.map((result, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={selectedItems.includes(result.name)}
            onChange={() => handleSelect(result.name)}
          />
          <h3>{result.name}</h3>
          <p>{result.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultsComponent;
