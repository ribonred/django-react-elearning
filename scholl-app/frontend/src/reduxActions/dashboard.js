import { request } from '../helper/requestHelper'

function receive_lkn_table(data) {
  return {
    type: "RECEIVE_LKN_TABLE_DATA",
    data
  }
}

function receive_lkn_data(data) {
  return {
    type: "RECEIVE_LKN_DATA",
    data
  }
}

function receive_proses(data) {
  return {
    type: "RECEIVE_PROSES",
    data
  }
}

function receive_tersangka_table(data) {
  return {
    type: "RECEIVE_TERSANGKA_TABLE_DATA",
    data
  }
}

function receive_tersangka_data(data) {
  return {
    type: "RECEIVE_TERSANGKA_DATA",
    data
  }
}

function receive_bb_table(data) {
  return {
    type: "RECEIVE_BB_TABLE_DATA",
    data
  }
}

function receive_bb_data(data) {
  return {
    type: "RECEIVE_BB_DATA",
    data
  }
}

function receive_lkn_by_no_lkn(data) {
  return {
    type: "RECEIVE_LKN_BY_NO_LKN_DATA",
    data
  }
}

function receive_penangkapan_by_no_lkn(data) {
  return {
    type: "RECEIVE_PENANGKAPAN_BY_NO_LKN_DATA",
    data
  }
}

function receive_penangkapan_by_id(data) {
  return {
    type: "RECEIVE_PENANGKAPAN_BY_ID",
    data
  }
}

function receive_user_table(data) {
  return {
    type: "RECEIVE_USER_TABLE_DATA",
    data
  }
}

function receive_user_data(data) {
  return {
    type: "RECEIVE_USER_DATA",
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
      if(id) {
        dispatch(receive_user_data(result.data))
      } else {
        dispatch(receive_user_table(result.data))
      }
    } catch (e) {
      console.log(e)
    }
  }
}
// LKN CRUD
export function get_lkn_by_penyidik(token, id = null, filter = null) {
  return async dispatch => {
    try {
      let url = ''
      if (id) {
        url = `/api/lkn/${id}`
      }
      else if (filter){
        url = `/api/lkn/?tgl_dibuat_mulai=${filter['startDate']}&tgl_dibuat_akhir=${filter['endDate']}`
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

export function get_lkn_by_no_lkn(token, id) {
  return async dispatch => {
    try {
      const result = await request(`/api/lkn/?id=${id}`, {
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
    return request('/api/pnkp/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }, data)
      .then(response => {
        if(response instanceof Error){
          throw Error
        }
        return response
      })
      .catch((e) => {
        return 'error'
      })
  }
}

export function getpenangkapan(token, id = null, LKN = null) {
  return dispatch => {
    let url = ''
    if (id) {
      url = `/api/pnkp/${id}/`;
    } else if(LKN){
      url = `/api/pnkp/?no_lkn=${LKN}`;
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
      .then(response => {
        console.log('response', response.data)
        if(LKN){
          dispatch(receive_penangkapan_by_no_lkn(response.data))
        } else if(id){
          dispatch(receive_penangkapan_by_id(response.data))
        }

      })
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
export function editpenangkapan(token, data, id) {
  return dispatch => {
    return request(`/api/pnkp/${id}`, data, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if(response instanceof Error){
        throw Error
      }
      return response
    })
    .catch((e) => {
      return 'error'
    })
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
      .then((response) => {
        if(!id){
          dispatch(receive_tersangka_table(response.data))
        } else {
          console.log('tersangka data', response.data)
          dispatch(receive_tersangka_data(response.data))
        }
      })
  }
}

export function editersangka(data, token, id) {
  return dispatch => {
    return request(`/api/tsk-edit/${id}`, data, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
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
    .then((response) => {
      if(!id){
        dispatch(receive_bb_table(response.data))
      } else {
        dispatch(receive_bb_data(response.data))
      }
    })
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

export function get_bb_list_lkn(token, data) {
  return dispatch => {
    let url = `/api/lkn-detail/?LKN=${data}`
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


export function get_lkn_detail(token, data) {
  return dispatch => {
    let url = `/api/lkn-detail/${data}`
    return request(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        dispatch(receive_lkn_data(response.data))
      })
  }
}

// proses pengadilan
export function get_proses(token) {
  return dispatch => {
    let url = `/api/proses/`
    return request(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {dispatch(receive_proses(response.data))})
  }
}