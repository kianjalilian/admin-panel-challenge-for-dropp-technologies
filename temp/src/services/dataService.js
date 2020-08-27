import { apiUrl } from "../config.json";
import http from "./httpService";

export function getListUsers(page) {
   const url = apiUrl + "/users?page=" + page;
   return http.get(url);
}

export function getListResources(page) {
   const url = apiUrl + "/unknown?page=" + page;
   return http.get(url);
}

export function getUser(id) {
   const url = apiUrl + "/users/" + id;
   return http.get(url);
}

export function updateUser(user, id) {
   const url = apiUrl + "/users/edit/" + id;
   return http.put(url, user);
}

export function getResource(id) {
   const url = apiUrl + "/unknown/" + id;
   return http.get(url);
}

export function deleteUser(id) {
   const url = apiUrl + "/users/" + id;
   return http.delete(url);
}

export function createUser(user) {
   const url = apiUrl + "/users";
   return http.post(url, user);
}

export default {
   getListUsers,
   getListResources,
   getUser,
   updateUser,
   getResource,
   deleteUser,
   createUser,
};
