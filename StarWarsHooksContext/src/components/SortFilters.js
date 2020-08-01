import React, { useContext } from 'react';
import SWContext from '../context/starWarsContext';

const SortFilters = () => {
  const {
    sFilters,
    setData,
    data,
    setSFilters,
  } = useContext(SWContext);
  const sortOrder = (e) => { setSFilters([{ ...sFilters[0], order: e.target.value }]); };
  const sortColumn = (e) => { setSFilters([{ ...sFilters[0], column: e.target.value }]); };
  const sortData = () => {
    const { column, order } = sFilters[0];
    const sortedArray = data.sort((a, b) => a[column] - b[column] || a[column]
      .toString().localeCompare(b[column].toString()));
    return order === 'DESC' ? setData(sortedArray) : setData(sortedArray.reverse());
  };
  const changeOrderandState = (e) => { sortOrder(e); sortData(); };
  return (
    <div>
      <select onClick={(e) => sortColumn(e)}>
        {Object.keys(data[0])
          .map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
      </select>
      <button type="button" value={sFilters[0].order === 'ASC' ? 'DESC' : 'ASC'} onClick={(e) => changeOrderandState(e)}>{sFilters[0].order === 'ASC' ? 'Descending' : 'Ascending'}</button>
    </div>
  );
};

export default SortFilters;
