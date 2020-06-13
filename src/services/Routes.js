// const URI = "http://localhost:8000";
const URI = "https://genkisalud.azurewebsites.net";
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

  async updatePatient(
    id,
    name,
    lastName,
    idGender,
    idUser,
    dni,
    birthdate,
    imageUrl
  ) {
    try {
      postRequestOptions.body = JSON.stringify({
        id,
        name,
        lastName,
        idGender,
        idUser,
        dni,
        birthdate,
        imageUrl,
      });
      let response = await fetch(
        URI + "/api/Patient/update",
        postRequestOptions
      );
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

  async doctorsSpecialty(id) {
    try {
      let response = await fetch(
        URI + "/api/Specialty/" + id + "/doctors",
        getRequestOptions
      );
      let responseJsonData = await response.json();
      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  },

  async schedulesDoctor(id) {
    try {
      let response = await fetch(
        URI + "/api/Doctor/" + id + "/schedules",
        getRequestOptions
      );
      let responseJsonData = await response.json();
      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  },

  async addAppointment(
    diagnostic,
    prescription,
    comment,
    score,
    date,
    idDoctor,
    idStatus,
    idPatient,
    idSchedule
  ) {
    try {
      postRequestOptions.body = JSON.stringify({
        diagnostic,
        prescription,
        comment,
        score,
        date,
        idDoctor,
        idStatus,
        idPatient,
        idSchedule,
      });
      let response = await fetch(
        URI + "/api/Appointment/add",
        postRequestOptions
      );
      let responseJsonData = await response.json();
      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  },

  async updateAppointment(
    diagnostic,
    prescription,
    comment,
    score,
    date,
    idDoctor,
    idStatus,
    idPatient,
    idSchedule
  ) {
    try {
      postRequestOptions.body = JSON.stringify({
        diagnostic,
        prescription,
        comment,
        score,
        date,
        idDoctor,
        idStatus,
        idPatient,
        idSchedule,
      });
      let response = await fetch(
        URI + "/api/Appointment/update",
        postRequestOptions
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
};
