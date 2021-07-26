import http from "./httpService";
import apiUrl from "../config";

const apiEndPoint = apiUrl + "/ticket";

// API call to save a new ticket after payment is successful
export function saveTicket(payload) {
  return http.post(apiEndPoint, payload);
}
