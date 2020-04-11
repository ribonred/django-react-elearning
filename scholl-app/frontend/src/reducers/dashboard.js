'using strict';

const initialState = {
  route:['Home']
};

const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_RECENT_ROUTE':
      return {
        ...state,
        route: ['LKN'],
      };
    default:
      return state;

  }
};

export default dashboard;
