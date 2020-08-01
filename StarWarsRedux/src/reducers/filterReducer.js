import { FILTER_TEXT } from '../actions/APIactions';

const initialText = {
  filters: [
    {
      name: '',
    },
  ],
};

const textReducer = (state = initialText, action) => {
  switch (action.type) {
    case FILTER_TEXT:
      return {
        ...state,
        filtered: action.results,
        filters: [
          {
            name: action.name,
          },
        ],
      };
    default: return state;
  }
};

export default textReducer;
