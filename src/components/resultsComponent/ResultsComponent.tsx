import React from 'react';

interface ResultsComponentProps {
  results: Array<{ name: string; description: string }>;
}

const ResultsComponent: React.FC<ResultsComponentProps> = ({ results }) => {
  return (
    <div>
      {results.map((result, index) => (
        <div key={index}>
          <h3>{result.name}</h3>
          <p>{result.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultsComponent;
