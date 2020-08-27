import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndPoint = apiUrl + "/login";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
   const { data: jwt } = await http.post(apiEndPoint, { email, password });
   console.log(jwt.token);
   localStorage.setItem(tokenKey, jwt.token);
}

export function loginWithJwt(jwt) {
   localStorage.setItem(tokenKey, jwt);
}

export function logout() {
   localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
   try {
      const jwt = localStorage.getItem(tokenKey);
      return jwtDecode(jwt);
   } catch (error) {
      return null;
   }
}

export function userLoggedIn() {
   try {
      const jwt = localStorage.getItem(tokenKey);
      return jwt ? true : false;
   } catch (error) {
      return false;
   }
}

export function getJwt() {
   return localStorage.getItem(tokenKey);
}

export default {
   login,
   logout,
   getCurrentUser,
   userLoggedIn,
   loginWithJwt,
   getJwt,
};
