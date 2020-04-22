import { request } from '../helper/requestHelper'

function receive_lkn_table(data) {
  return {
    type: "RECEIVE_LKN_TABLE_DATA",
    data
  }
}

function receive_tersangka_table(data) {
  return {
    type: "RECEIVE_TERSANGKA_TABLE_DATA",
    data
  }
}

function receive_lkn_by_no_lkn(data) {
  return {
    type: "RECEIVE_LKN_BY_NO_LKN_DATA",
    data
  }
}

function receive_lkn_detail(data) {
  return {
    type: "RECEIVE_LKN_DETAIL",
    data
  }
}

function receive_penangkapan_by_no_lkn(data) {
  return {
    type: "RECEIVE_PENANGKAPAN_BY_NO_LKN_DATA",
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

function receive_error(error) {
  return {
    type: "RECEIVE_ERROR",
    error
  }
}

function receive_lkn_created_successfull() {
  return {
    type: "RECEIVE_LKN_CREATED_SUCCESSFULL",
  }
}

export function reset_error() {
  return {
    type: "RESET_ERROR_AND_CREATED_STATE",
  }
}

export function createLKN(token, data) {
  return async dispatch => {
    const result = await request('/api/lkn/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }, data)
    if (result instanceof Error) {
      if (data['LKN'] !== undefined) {
        dispatch(receive_error('LKN gagal dibuat , no LKN anda sudah ada'))
      } else {
        dispatch(receive_error('error created LKN , please complete all required form'))
      }
      return;
    }
    dispatch(receive_lkn_created_successfull(result.data))
  }
}

export function editLKN(token, data, id) {
  return async dispatch => {
    const result = await request(`/api/lkn/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }, data)
    if (result instanceof Error) {
      if (data['LKN'] !== undefined) {
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

export function fetchalluser(token, id = null) {
  return async dispatch => {
    try {
      let url = ''
      if (id) {
        url = `/api/users/${id}`
      }
      else {
        url = `/api/users/`
      }
      const result = await request(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      dispatch(receive_user_table(result.data))
    } catch (e) {
      console.log(e)
    }
  }
}
// LKN CRUD
export function get_lkn_by_penyidik(token, id = null) {
  return async dispatch => {
    try {
      let url = ''
      if (id) {
        url = `/api/lkn/${id}`
      }
      else {
        url = `/api/lkn/`
      }
      const result = await request(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      dispatch(receive_lkn_table(result.data))
    } catch (e) {
      console.log(e)
    }
  }
}

export function verify_token(token) {
  return async dispatch => {
    const result = await request('/get-token/token-verify/', {
      method: 'POST',
    }, {
      'token': token,
    })
    if (result instanceof Error) {
      return 'error'
    }
    return result.status
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
    } catch (e) {
      console.log(e)
    }
  }
}

// penangkapan CRUD

export function createpenangkapan(token, data) {
  return dispatch => {
    return request('/api/pnkp/', data, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => console.log(response))
  }
}

export function getpenangkapan(token, id = null, LKN = null) {
  return dispatch => {
    let url = ''
    if (id) {
      url = `/api/pnkp/${id}`;
    } else if(LKN){
      url = `/api/pnkp/?LKN=${LKN}`;
    } else {
      url = `/api/pnkp/`
    }

    return request(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => dispatch(receive_penangkapan_by_no_lkn(response.data)))
  }
}

export function deletepenangkapan(token, id) {
  return dispatch => {
    return request(`/api/pnkp/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => console.log(response))
  }
}
export function editpenangkapan(data, token, id) {
  return dispatch => {
    return request(`/api/pnkp/${id}`, data, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => console.log(response))
  }
}

// Proses tersangka Edit and list
export function get_tersangka_list(token, id = null) {
  return dispatch => {
    let url = ''
    if (id) {
      url = `/api/tsk-edit/${id}`
    }
    else {
      url = `/api/tsk-edit/`
    }
    return request(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response =>dispatch(receive_tersangka_table(response.data)))
  }
}

export function edit_tersangka(data, token, id) {
  return dispatch => {
    return request(`/api/tsk-edit/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }, data)
      .then(response => console.log(response))
  }
}
export function deletetersangka(data, token, id) {
  return dispatch => {
    return request(`/api/tsk-edit/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => console.log(response))
  }
}

// Proses barangbukti Edit and list

export function get_bb_list(token, id = null) {
  return dispatch => {
    let url = ''
    if (id) {
      url = `/api/bb-edit/${id}`
    }
    else {
      url = `/api/bb-edit/`
    }
    return request(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => console.log(response))
  }
}
export function editbb(data, token, id) {
  return dispatch => {
    return request(`/api/bb-edit/${id}`, data, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => console.log(response))
  }
}
export function deletebb(token, id) {
  return dispatch => {
    return request(`/api/bb-edit/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => console.log(response))
  }
}



// LKN all detail view

//LKN GET ALL OR LIST VIEW

export function get_lkn_detail(token, data) {
  return async dispatch => {
    try {
      const result = await request(`/api/lkn-detail/?LKN=${data}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      dispatch(receive_lkn_detail(result.data))
    } catch (e) {
      console.log(e)
    }
  }
}
