// const URI = "http://localhost:8000";
const URI = "https://mymarketappbackend.azurewebsites.net";
const postRequestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};
const getRequestOptions = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

export default {
  async allStores() {
    try {
      let response = await fetch(URI + "/api/Store/all", getRequestOptions);
      let responseJsonData = await response.json();
      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  },

  async loginUser(email, password) {
    try {
      postRequestOptions.body = JSON.stringify({ email, password });
      let response = await fetch(URI + "/api/User/login", postRequestOptions);
      let responseJsonData = await response.json();
      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  },

  async verifyUser(email) {
    try {
      let response = await fetch(
        URI + "/api/User/" + email + "/verify",
        getRequestOptions
      );
      let responseJsonData = await response.json();
      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  },

  async addUser(email, password, name, lastName, phone, coordinates, adress) {
    try {
      postRequestOptions.body = JSON.stringify({
        email,
        password,
        name,
        lastName,
        phone,
        coordinates,
        adress,
      });
      let response = await fetch(URI + "/api/User/add", postRequestOptions);
      let responseJsonData = await response.json();
      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  },

  async updateUser(
    email,
    password,
    name,
    lastName,
    phone,
    coordinates,
    adress
  ) {
    try {
      postRequestOptions.body = JSON.stringify({
        email,
        password,
        name,
        lastName,
        phone,
        coordinates,
        adress,
      });
      let response = await fetch(URI + "/api/User/update", postRequestOptions);
      let responseJsonData = await response.json();
      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  },

  async storeProducts(id) {
    try {
      let response = await fetch(
        URI + "/api/Store/" + id + "/products",
        getRequestOptions
      );
      let responseJsonData = await response.json();
      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  },

  async addOrder(quantity, idStore, idProduct, idState, idUser) {
    try {
      postRequestOptions.body = JSON.stringify({
        quantity,
        idStore,
        idProduct,
        idState,
        idUser,
      });
      let response = await fetch(URI + "/api/Order/add", postRequestOptions);
      let responseJsonData = await response.json();
      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  },

  async deleteOrder(id) {
    try {
      let response = await fetch(
        URI + "/api/Order/" + id + "/delete",
        getRequestOptions
      );
      let responseJsonData = await response.json();
      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  },
};
