
function mapStateToProps(state) {
  return {
    user: state.user,
    profiles: state.profiles,
    appointments: state.appointments,
    specialties: state.specialties,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => dispatch({ type: "SetUser", user }),
    updatePatient: (patient) => dispatch({ type: "UpdatePatient", patient }),
    addPatient: (patient) => dispatch({ type: "AddPatient", patient }),
    setAppointments: (appointments) =>
      dispatch({ type: "SetAppointments", appointments }),
    addAppointment: (appointment) =>
      dispatch({ type: "AddAppointment", appointment }),
  };
}

export { mapStateToProps, mapDispatchToProps };
