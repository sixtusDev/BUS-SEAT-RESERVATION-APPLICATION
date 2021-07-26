let apiUrl;
if (process.env.NODE_ENV === "development") {
  apiUrl = "http://localhost:5000/api";
} else {
  apiUrl = "https://bus-seat-reservation-api.herokuapp.com/api";
}

export default apiUrl;
