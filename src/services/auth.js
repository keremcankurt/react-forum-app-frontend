import { get, post, put } from "./request";

const BASE_URL = "http://localhost:4000/api/auth";

export const login = data => post(`${BASE_URL}/login`, data);
export const register = data => post(`${BASE_URL}/register`,data);
export const confirmAccount = id => put(`${BASE_URL}/confirmaccount?id=${id}`);
export const forgotPassword = data => put(`${BASE_URL}/forgotpassword`,data);
export const changePassword = data => put(`${BASE_URL}/forgotpassword/change/?forgotPasswordToken=${data.token}`,data);
export const logout = () => get(`${BASE_URL}/logout`);