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
  async addUser(email, password, phone, score, idType) {
    try {
      postRequestOptions.body = JSON.stringify({
        email,
        password,
        phone,
        score,
        idType,
      });
      let response = await fetch(URI + "/api/User/add", postRequestOptions);
      let responseJsonData = await response.json();
      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  },

  async dataFromReniec(dni) {
    try {
      let response = await fetch(
        "https://api.reniec.cloud/dni/" + dni,
        getRequestOptions
      );
      let responseJsonData = await response.json();
      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  },

  async addPatient(name, lastName, idGender, idUser, dni, birthdate, imageUrl) {
    try {
      postRequestOptions.body = JSON.stringify({
        name,
        lastName,
        idGender,
        idUser,
        dni,
        birthdate,
        imageUrl,
      });
      let response = await fetch(URI + "/api/Patient/add", postRequestOptions);
      let responseJsonData = await response.json();
      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  },

  async findUser(id) {
    try {
      let response = await fetch(
        URI + "/api/User/find/" + id,
        getRequestOptions
      );
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

  async Specialties() {
    try {
      let response = await fetch(URI + "/api/Specialty/all", getRequestOptions);
      let responseJsonData = await response.json();
      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  },
};
