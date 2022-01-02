import Axios from 'axios';
import { api } from '../settings';

/* selectors */
export const getAll = ({ tables }) => tables.data;
export const getLoadingState = ({ tables }) => tables.loading;
export const getTable = ({ tables }) => tables.status;

/* action name creator */
const reducerName = 'tables';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const FETCH_TABLECHANGE = createActionName('FETCH_TABLECHANGE');
const FETCH_TABLECHANGESUCCESS = createActionName('FETCH_TABLECHANGESUCCESS');
const FETCH_TABLECHANGEERROR = createActionName('FETCH_TABLECHANGEERROR');


/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const fetchTableChange = payload => ({ payload, type: FETCH_TABLECHANGE });
export const fetchTableChangeSuccess = payload => ({ payload, type: FETCH_TABLECHANGESUCCESS });
export const fetchTableChangeError = payload => ({ payload, type: FETCH_TABLECHANGEERROR });


/* thunk creators */
export const fetchFromAPI = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    dispatch(fetchTableChange());

    Axios
      .get(`${api.url}/api/${api.tables}`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });

    Axios
      .get(`${api.url}/api/${api.tables}`)
      .then(response => {
        dispatch(fetchTableChangeSuccess(response.data.status));
      })
      .catch(error => {
        dispatch(fetchTableChangeError(error.message));
      });
  };
};

/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }

    default:
      return statePart;
  }
}
