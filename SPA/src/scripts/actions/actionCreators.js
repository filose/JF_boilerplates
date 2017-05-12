const api = '/data';

function requestInitialData() {
  return {
    type: 'INITIAL_DATA_REQUEST',
    loading: true,
  };
}

function initialDataFail(error) {
  return {
    type: 'INITIAL_DATA_FAIL',
    loading: false,
    error,
  };
}

function receiveInitialData(data) {
  return {
    type: 'INITIAL_DATA_SUCCESS',
    isLoading: false,
    data,
  };
}

/* eslint-disable */
export function fetchInitalData() {
  return (dispatch, getState) => {
    dispatch(requestInitialData());
    fetch(`${api}/app.json`)
      .then((response) => {
        if (response.status >= 400) {
          dispatch(initialDataFail());
        }
        return response.json();
      })
      .then((json) => {
        dispatch(receiveInitialData(json));
      });
  };
}
