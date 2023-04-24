import { del, get, put } from "./request";
const BASE_URL = "http://localhost:4000/api/user";

export const getProfile = () => get(`${BASE_URL}/profile`);
export const editProfile = data => put(`${BASE_URL}/edit`,data);
export const changePassword = data => put(`${BASE_URL}/resetPassword`,data);
export const deleteAccount = () => del(`${BASE_URL}/delete`);
export const getContents = () => get(`${BASE_URL}/contents`);
export const getUserProfile = id => get(`${BASE_URL}/profile/${id}`);

