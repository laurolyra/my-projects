import React, { useContext } from 'react';
import SWContext from '../context/starWarsContext';
import Dropdowns from './Dropdowns';
import ShowFilters from './ShowFilters';
import SortFilters from './SortFilters';
import GenerateTable from './GenerateTable';
import './Table.css';

const Table = () => {
  const { setText, data } = useContext(SWContext);

  return (
    <div>
      {data && (
        <div>
          <input data-testid="inputPlanets" onChange={(e) => setText(e.target.value)} />
          <Dropdowns />
          <SortFilters />
          <h2>Filters:</h2>
          <ShowFilters />
        </div>
      )}
      <GenerateTable />
    </div>
  );
};

export default Table;
