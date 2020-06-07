function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => dispatch({ type: "SetUser", user }),
  };
}

export { mapStateToProps, mapDispatchToProps };
