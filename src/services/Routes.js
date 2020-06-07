// const URI = "http://localhost:8000";
const URI = "https://doctoronlineapp.azurewebsites.net";
const postRequestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};
const getRequestOptions = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

export default {
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

  async addUser(
    name,
    email,
    password,
    lastName,
    idGender,
    idType,
    dni,
    phone,
    birthdate
  ) {
    try {
      postRequestOptions.body = JSON.stringify({
        name,
        email,
        password,
        lastName,
        idGender,
        idType,
        dni,
        phone,
        birthdate,
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
};
