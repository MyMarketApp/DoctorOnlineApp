const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
// import { createStore, applyMiddleware,  } from 'redux';
const thunkMiddleware = require('redux-thunk').default
// import axios from 'axios'
const axios = require('axios')
const URI = 'https://genkisalud.azurewebsites.net';

const initialState = {
    user: {},
    profiles: [],
    appointments: [],
    specialties: [],
  };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SetUser':
      return {
        ...state,
        user: action.user,
      };
    case 'UpdatePatient':
      return {
        ...state,
        profiles: state.profiles.map((profile) => {
          if (profile.id == action.patient.id) return action.patient;
          return profile;
        }),
      };
    case 'AddPatient':
      return {
        ...state,
        profiles: [...state.profiles, action.patient],
      };
    case 'SetAppointments':
      return {
        ...state,
        appointments: action.appointments,
      };
    case 'AddAppointment':
      return {
        ...state,
        appointments: [...state.appointments, action.appointment],
      };
    case 'SetSpecialties':
        return {
          ...state,
          specialties: action.specialties,
        };
    }
    return state;
  };

  const fetchSpecialties = () => {
      return function(dispatch) {
        axios.get(URI + '/api/Specialty/all')
        .then(response => {
            dispatch({ type: "SetSpecialties", specialties:response.body })
        })
      }
  }

  const store = createStore(reducer,applyMiddleware(thunkMiddleware))
  store.dispatch(fetchSpecialties()) 

  export {store};