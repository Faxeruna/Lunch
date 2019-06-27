import { connect } from "react-redux";
import ContactPage from "./LoginPage";

const mapStateToProps = store => {
  console.log(store);
  return {
    user: store.user
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactPage);
