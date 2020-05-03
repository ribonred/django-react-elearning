'using strict';

const initialState = {
  lknTableData:[],
  userTableData:[],
  userData: [],
  prosesTersangka: [],
  error: false,
  lknData: [],
  lknCreated: false,
  penangkapanData: [],
  statusTersangkaDataByPnkp: [],
  penangkapanSelectedData: {},
  tersangkaTableData: [],
  tersangkaTableDataByLkn: [],
  tersangkaData: {},
  isSiderCollapse: false,
  bbTableData: [],
  bbData: [],
  bbDataByPnkp: [],
  prosesIndex: [],
};
const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case 'COLLAPSED_SIDER':
      return {
        ...state,
        isSiderCollapse: action.collapsed,
      }
    case 'RECEIVE_LKN_TABLE_DATA':
      return {
        ...state,
        lknTableData: action.data,
      };
    case 'RECEIVE_LKN_DATA':
      return {
        ...state,
        lknData: action.data,
      };
    case 'RECEIVE_PROSES':
      return {
        ...state,
        prosesIndex: action.data,
      };
    case 'RECEIVE_PENANGKAPAN_BY_NO_LKN_DATA':
      return {
        ...state,
        penangkapanData: action.data,
      }
    case 'RECEIVE_PENANGKAPAN_BY_ID':
      return {
        ...state,
        penangkapanSelectedData: action.data,
      }
    case 'RECEIVE_TERSANGKA_TABLE_DATA':
      return {
        ...state,
        tersangkaTableData: action.data,
      };
    case 'RECEIVE_TERSANGKA_TABLE_DATA_BY_LKN':
      return {
        ...state,
        tersangkaTableDataByLkn: action.data,
      };
    case 'RECEIVE_TERSANGKA_DATA':
      return {
        ...state,
        tersangkaData: action.data,
      }
    case 'RECEIVE_BB_TABLE_DATA':
      return {
        ...state,
        bbTableData: action.data,
      };
    case 'RECEIVE_BB_DATA':
      return {
        ...state,
        bbData: action.data,
      };
    case 'RECEIVE_STATUS_BB':
      return {
        ...state,
        bbDataByPnkp: action.data,
      };
    case 'RECEIVE_STATUS_TERSANGKA':
      return {
        ...state,
        statusTersangkaDataByPnkp: action.data,
      };
    case 'RECEIVE_PROSES_TERSANGKA':
      return {
        ...state,
        prosesTersangka: action.data,
      };
    case 'RECEIVE_USER_TABLE_DATA':
      return {
        ...state,
        userTableData: action.data,
      };
    case 'RECEIVE_USER_DATA':
      return {
        ...state,
        userData: action.data,
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
        error: true,
      }
    case 'RECEIVE_LKN_BY_NO_LKN_DATA':
      return {
        ...state,
        lknData: action.data,
      }
    case 'RECEIVE_PENANGKAPAN':
      return {
        ...state,
        penangkapanData: action.data,
      };
    default:
      return state;

  }
};

export default dashboard;
