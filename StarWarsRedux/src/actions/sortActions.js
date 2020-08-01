export const SORT_COLUMN = 'SORT_COLUMN';
export const CHANGE_ORDER = 'CHANGE_ORDER';

export const sortColumn = (column) => (
  { type: SORT_COLUMN, column }
);

export const changeOrder = (order) => (
  { type: CHANGE_ORDER, order }
);
