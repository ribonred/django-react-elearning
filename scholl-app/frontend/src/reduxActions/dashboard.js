import { request } from '../helper/requestHelper'


export function transitionTo(route) {
  return {
    type: 'RECEIVE_RECENT_ROUTE',
    route,
  };
}
export function registeruser(token, data) {
  return dispatch => {
    return request('/api/users/', data, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => console.log(response))
  }
}

export function fetchalluser(token) {
  return dispatch => {
    return request('/api/users/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => console.log(response))
  }
}
export function get_lkn_by_penyidik(token) {
  return dispatch => {
    return request('/api/lkn/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => console.log(response))
  }
}
export function post_lkn_by_penyidik(token, data) {
  return dispatch => {
    return request('/api/lkn/', data, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => console.log(response))
  }
}