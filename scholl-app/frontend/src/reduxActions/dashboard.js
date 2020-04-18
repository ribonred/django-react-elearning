import { request } from '../helper/requestHelper'

function receive_lkn_table(data) {
  return {
    type: "RECEIVE_LKN_TABLE_DATA",
    data
  }
}

function receive_lkn_by_no_lkn(data) {
  return {
    type: "RECEIVE_LKN_BY_NO_LKN_DATA",
    data
  }
}

function receive_penangkapan(data) {
  return {
    type: "RECEIVE_PENANGKAPAN",
    data
  }
}

function receive_user_table(data) {
  return {
    type: "RECEIVE_USER_TABLE_DATA",
    data
  }
}

function receive_error(error){
  return {
    type: "RECEIVE_ERROR",
    error
  }
}

function receive_lkn_created_successfull(){
  return {
    type: "RECEIVE_LKN_CREATED_SUCCESSFULL",
  }
}

export function reset_error(){
  return {
    type: "RESET_ERROR_AND_CREATED_STATE",
  }
}

export function createLKN(token, data){
  return async dispatch => {
      const result = await request('/api/lkn/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }, data)
      if(result instanceof Error){
        if(data['LKN'] !== undefined){
          dispatch(receive_error('LKN gagal dibuat , no LKN anda sudah ada'))
        } else {
          dispatch(receive_error('error created LKN , please complete all required form'))
        }
        return;
      }
      dispatch(receive_lkn_created_successfull(result.data))
  }
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
  return async dispatch => {
    try {
      const result = await request('/api/users/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      dispatch(receive_user_table(result.data))
    } catch(e){
      console.log(e)
    }
  }
}

export function get_lkn_by_penyidik(token) {
  return async dispatch => {
    try {
      const result = await request('/api/lkn/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      dispatch(receive_lkn_table(result.data))
    } catch(e){
      console.log(e)
    }
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

export function get_lkn_by_no_lkn(token, data) {
  return async dispatch => {
    try {
      const result = await request(`/api/lkn/?LKN=${data}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      dispatch(receive_lkn_by_no_lkn(result.data))
    } catch(e){
      console.log(e)
    }
  }
}

export function get_penangkapan(token) {
  return async dispatch => {
    try {
      const result = await request(`/api/pnkp/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      dispatch(receive_penangkapan(result.data))
    } catch(e){
      console.log(e)
    }
  }
}