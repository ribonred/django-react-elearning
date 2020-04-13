'using strict';

const initialState = {
  lknTableData:[],
  userTableData:[],
  error: false,
  lknCreated: false,
};

const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_LKN_TABLE_DATA':
      return {
        ...state,
        lknTableData: action.data,
      };
    case 'RECEIVE_USER_TABLE_DATA':
      return {
        ...state,
        userTableData: action.data,
      };
    case 'RECEIVE_LKN_CREATED_SUCCESSFULL':
      return {
        ...state,
        lknCreated: true,
        error: false,
      }
    case 'RECEIVE_ERROR':
      return {
        ...state,
        error: action.error,
      }
    case 'RECEIVE_LKN_CREATED_SUCCESSFULL':
      return {
        ...state,
        error: false,
        lknCreated: false,
      }
    case 'RECEIVE_ERROR':
      return {
        ...state,
        error: true,
      }
    default:
      return state;

  }
};

export default dashboard;
