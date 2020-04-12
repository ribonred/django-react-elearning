import axios from 'axios';
import Helper from './helper';
const dotenv = require('dotenv');
const env = dotenv.config().parsed;
let baseUrl = 'http://127.0.0.1:8000';




export function get_token() {
  const token = localStorage.getItem('token')
  return token
}
export function openInNewWindow(path) {
  window.open(`${baseUrl}${path}`, '_blank');
}

// Only works for one layer
export function convertDataToParams(data) {
  if (Helper.isNullOrUndefined(data)) {
    return '';
  }

  const dataKeys = Object.keys(data);
  if (dataKeys.length === 0) {
    return '';
  }

  let res = '?';

  dataKeys.forEach((key, i) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((d, j) => {
        res += `${key}[]=${d}`;
        if (j !== data[key].length - 1) {
          res += '&';
        }
      });
    } else if (data[key] != null) {
      res += `${key}=${data[key]}`;
    } else {
      res += `${key}=`;
    }
    if (i !== dataKeys.length - 1) {
      res += '&';
    }
  });

  return res;
}

export async function request(path, options, body) {

  let requestObject = null;
  if (options.method === 'GET') {
    requestObject = axios.get(`${baseUrl}${path}`, options, body)
  } else if (options.method === 'POST') {
    requestObject = axios.post(`${baseUrl}${path}`, body, options)
  } else {
    requestObject = axios.put(`${baseUrl}${path}`, body, options)
  }


  try {
    const result = await requestObject
    return result;
  } catch (e) {
    return e;
  }
}