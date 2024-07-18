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

  const handleSelect = (item: { name: string; description: string }) => {
    if (isSelected(item)) {
      dispatch(unselectItem(item.name));
    } else {
      dispatch(selectItem(item));
    }
  };

  const isSelected = (item: { name: string; description: string }) => {
    return selectedItems.some(selected => selected.name === item.name);
  };

  return (
    <div>
      {results.map((result, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={isSelected(result)}
            onChange={() => handleSelect(result)}
          />
          <h3>{result.name}</h3>
          <p>{result.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultsComponent;
