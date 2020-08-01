export const GENERATE_FILTER = 'GENERATE_FILTER';
export const ERASE_FILTER = 'ERASE_FILTER';

export const generateFilter = (newNumericValues) => (
  { type: GENERATE_FILTER, newNumericValues }
);

export const eraseFilter = (array, column) => (
  {
    type: ERASE_FILTER,
    array: array.filter(({ numericValues }) => (numericValues.column !== column)),
    column,
  }
);
