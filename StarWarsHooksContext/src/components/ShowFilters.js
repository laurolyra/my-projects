import React, { useContext } from 'react';
import SWContext from '../context/starWarsContext';

const ShowFilters = () => {
  const {
    filters,
    eraseColumn,
  } = useContext(SWContext);

  return filters[0].numericValues.column && (
    <div className="filterContainer">
      {filters.map(({ numericValues }) => (
        <div className="filters" data-testid={`Show-${numericValues.column}`}>
          <p key={numericValues.column}>{numericValues.column}</p>
          <p key={numericValues.comparison}>{numericValues.comparison}</p>
          <p key={numericValues.value}>{numericValues.value}</p>
          <button
            type="button"
            data-testid="deleteFilter"
            value={numericValues.column}
            onClick={() => eraseColumn(filters, numericValues.column)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShowFilters;
