import { GET_VENDORS } from '../reduxActions/types';

const initialState = {
  vendors: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_VENDORS:
      return {
        ...state,
        vendors: payload
      };
    default:
      return state;
  }
}
