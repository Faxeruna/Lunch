import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { setUser } from "../../actions/UserAction";

class ContactPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      authToken: 0
    };
  }

  handleChange = e => {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
  };

  signIn = () => {
    console.log("this state", this.state);

    localStorage.setItem(this.state.authToken, "");
    console.log(this.state);
    if (
      this.state.email === "admin@list.ru" &&
      this.state.password === "secretKey"
    ) {
      localStorage.removeItem("user");
      localStorage.setItem("admin", "adminRoot");
      this.props.history.push("/admin/newOrderAdmin");
    } else if (
      localStorage.getItem(this.state.email) != null &&
      localStorage.getItem(this.state.email, this.state.password) ===
        this.state.password
    ) {
      localStorage.removeItem("admin");
      localStorage.setItem("user", "userRoot");
      this.props.history.push("/users/newOrder");
    } else {
      alert("Вы не зарегистрировались");
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md={4} sm={4} />
          <Col md="auto" sm={4}>
            <form className="form-signin">
              <h2 className="form-signin-heading">Please sign in</h2>

              <input
                value={this.state.email}
                type="email"
                onChange={this.handleChange}
                id="email"
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
              <label htmlFor="inputEmail" className="sr-only">
                Email address
              </label>

              <input
                value={this.state.password}
                type="password"
                onChange={this.handleChange}
                id="password"
                className="form-control"
                placeholder="Password"
                required
              />
              <label htmlFor="inputPassword" className="sr-only">
                Password
              </label>
              <button
                className="btn btn-lg btn-primary btn-block"
                onClick={this.signIn}
                type="button"
              >
                Sign in
              </button>
            </form>
            <Link to="/registration">{"Registration"}</Link>
          </Col>
          <Col md={4} sm={4} />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = store => {
  console.log(store);
  return {
    user: store.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserAction: auth => dispatch(setUser(auth))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactPage);
