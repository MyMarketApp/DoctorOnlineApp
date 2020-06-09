function mapStateToProps(state) {
  return {
    user: state.user,
    profiles: state.profiles,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => dispatch({ type: "SetUser", user }),
    updatePatient: (patient) => dispatch({ type: "UpdatePatient", patient }),
  };
}

export { mapStateToProps, mapDispatchToProps };
