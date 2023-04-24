import { get, post } from "./request";
const BASE_URL = "http://localhost:4000/api/content";

export const getUserContents = id => get(`${BASE_URL}/getusercontents/${id}`);
export const getContent = id => get(`${BASE_URL}/getcontent/${id}`);
export const getContents = () => get(`${BASE_URL}/getallcontents`);
export const addContent = data => post(`${BASE_URL}/add`, data);

