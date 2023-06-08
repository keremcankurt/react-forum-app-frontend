import { get, post } from "./request";
const BASE_URL = "https://kckforumapi.herokuapp.com/api/comment";

export const getComments = id => get(`${BASE_URL}/${id}`);
export const addComment = (data, id) => post(`${BASE_URL}/${id}`, data); 

