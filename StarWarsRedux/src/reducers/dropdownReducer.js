import { GENERATE_FILTER, ERASE_FILTER } from '../actions/dropdownActions';

const initialFilter = {
  filters: [{
    numericValues: {
      column: '',
      comparison: '',
      value: '',
    },
  },
  ],
  columns: ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
};

const dropdownReducer = (state = initialFilter, action) => {
  switch (action.type) {
    case GENERATE_FILTER: {
      return {
        ...state,
        filters:
          state.filters[0].numericValues.column === ''
            ? [action.newNumericValues]
            : state.filters.concat(action.newNumericValues),
        columns: state.columns
          .filter((criteria) => criteria !== action.newNumericValues.numericValues.column),
      };
    }
    case ERASE_FILTER: {
      return {
        columns: [...state.columns, action.column],
        filters: action.array.length === 0 ? [initialFilter.filters[0]] : action.array,
      };
    }
    default: return state;
  }
};

export default dropdownReducer;
