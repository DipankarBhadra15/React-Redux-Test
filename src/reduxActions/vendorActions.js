import { GET_VENDORS } from './types';

export const getVendorsSorted = vendors => async dispatch => {
  const sortedVendors = await vendors.sort((a, b) => {
    return a.index - b.index;
  });
  dispatch({
    type: GET_VENDORS,
    payload: sortedVendors
  });
};
