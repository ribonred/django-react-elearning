'using strict';

const initialState = {
  lknTableData:[],
  userTableData:[],
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
    default:
      return state;

  }
};

export default dashboard;
