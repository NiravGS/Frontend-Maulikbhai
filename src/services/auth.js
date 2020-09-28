import axios from 'axios';
import { setHeadersWithAccessToken } from './index';

const API_BASE = process.env.REACT_APP_APIBASE_1;

export const UserAuth = (type, params) => {
  return axios
    .post(`${API_BASE}/auth/${type}`, params)
    .then(e => e)
    .catch(e => e);
}

export const getProfile = (token, role) => {
  setHeadersWithAccessToken(token);
  return axios
    .get(`${API_BASE}/${role}`)
    .then(e => e)
    .catch(e => e);
};

export const VerifyProfile = token => {
  return axios
    .post(`${API_BASE}/auth/verify-profile/${token}`)
    .then(e => e)
    .catch(e => e);
};

export const changePassword = (token, data) => {
  setHeadersWithAccessToken(token);
  return axios
    .post(`${API_BASE}/auth/change-password`, data)
    .then(e => e)
    .catch(e => e);
};

export const userForgotPassword = params => {
  return axios
    .post(`${API_BASE}/auth/forgot-password`, params)
    .then(e => e)
    .catch(e => e);
};

export const checkResetToken = token => {
  return axios
    .get(`${API_BASE}/auth/reset-password/${token}`)
    .then(e => e)
    .catch(e => e);
};

export const userResetPassword = (token, params) => {
  console.log("params", params);
  return axios
    .post(`${API_BASE}/auth/reset-password/${token}`, params)
    .then(e => e)
    .catch(e => e);
};