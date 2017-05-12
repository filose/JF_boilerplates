const app = (state = {}, action) => {
  switch (action.type) {
    case 'INITIAL_DATA_REQUEST': {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case 'INITIAL_DATA_FAIL': {
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };
    }
    case 'INITIAL_DATA_SUCCESS': {
      return {
        ...state,
        loading: action.loading,
        data: action.data,
      };
    }
    default:
      return state;
  }
};

export default app;
