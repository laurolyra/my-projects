import { SORT_COLUMN, CHANGE_ORDER } from '../actions/sortActions';

const initialSort = {
  filters: [
    {
      column: 'Name',
      order: 'ASC',
    },
  ],
};

const sortReducer = (state = initialSort, action) => {
  switch (action.type) {
    case SORT_COLUMN:
      return {
        ...state,
        filters: [
          {
            ...state.filters[0],
            column: action.column,
          },
        ],
      };
    case CHANGE_ORDER:
      return {
        ...state,
        filters: [
          {
            ...state.filters[0],
            order: action.order,
          },
        ],
      };
    default: return state;
  }
};

export default sortReducer;
