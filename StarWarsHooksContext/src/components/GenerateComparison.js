import React, { useContext } from 'react';
import SWContext from '../context/starWarsContext';

const GenerateComparison = () => {
  const {
    changeNewNumericValues,
  } = useContext(SWContext);

  const comparison = ['more than', 'equal to', 'less than'];
  return (
    <div>
      <select data-testid="comparisonSelector" onChange={(e) => changeNewNumericValues('comparison', e)}>
        <option value="">Select Comparison</option>
        {comparison.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
      <input
        data-testid="numberSelector"
        type="number"
        placeholder="type a number here!"
        onChange={(e) => changeNewNumericValues('value', e)}
      />
    </div>
  );
};
export default GenerateComparison;
