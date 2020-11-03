import fetchWrapper from "./fetchWrapper";

var ServiceClient = {
  login: async function (data) {
    return this.postDataToApi("/login", data);
  },

  register: async function (data) {
    return this.postDataToApi("/register", data);
  },

  test: async function () {
    return this.getDataFromApi("/express_backend");
  },

  events: async function () {
    return this.getDataFromApi("/events");
  },

  event: async function (eventId) {
    return this.getDataFromApi(`/events/${eventId}`);
  },

  getDataFromApi: async function (url) {
    let headers = {
      Accept: "application/json"
    };
    const params = {
      method: "GET"
    };
    return fetchWrapper(url, params, headers);
  },

  postDataToApi: async function (url, data) {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    const params = {
      method: "POST",
      data
    };
    return fetchWrapper(url, params, headers);
  }
};

export default ServiceClient;
