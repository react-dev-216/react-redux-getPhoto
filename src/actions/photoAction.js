import axios from 'axios';
import moment from 'moment';
import {
  GET_PHOTOS,
  GET_PHOTOS_SUCCESS,
  GET_ERRORS,
  CLEAR_PHOTOS,
  TOGGLE_MENU,
  GO_HOME
} from './types';
import { API_ROOT, CLIENT_ID } from '../constants/service-info';

export const onGetPhotos = (options) => async (dispatch) => {
  dispatch({
    type: GET_PHOTOS
  });
  const { query, page, per_page, url } = options;
  const clientID = `client_id=${CLIENT_ID}`
  const photoQuery = clientID + '' 
              + `&page=${page ? page : 1}`
              + `&per_page=${per_page ? per_page : 10}`;

  try {
  ///  console.log('API : ',`${API_ROOT}/${url}?${photoQuery}`);
    const res = await axios.get(`${API_ROOT}/${url}?${photoQuery}`);
    const { data } = res;
  //  console.log('photo = ',data);
    dispatch(setBuildingsStore(data, page));
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: null
    });
  }
}

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

export const onClearPhotos = () => dispatch => {
  dispatch({
    type: CLEAR_PHOTOS
  })
}
export const onToggleMenu = () => dispatch => {
  dispatch({
    type: TOGGLE_MENU
  })
}

export const setBuildingsStore = (decoded, page) => {
  return {
    type: GET_PHOTOS_SUCCESS,
    payload: decoded,
    page: page + 1
  }
}
