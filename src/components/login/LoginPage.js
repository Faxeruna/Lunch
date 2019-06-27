import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class ContactPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  handleEmailChange = event => {
    event.preventDefault();
    this.setState({ email: event.currentTarget.value });
  };

  handlePasswordChange = event => {
    event.preventDefault();
    this.setState({ password: event.currentTarget.value });
  };

  signIn = event => {
    event.preventDefault();
    const users = this.props.user;
    let check = users.some(
      index =>
        this.state.email === index.email &&
        this.state.password === index.password
    );

    if (this.state.email === "admin" && this.state.password === "secretKey") {
      this.props.history.push("/admin/newOrderAdmin");
      setTimeout(() => {
        alert("Вы зашли за администратора");
      }, 100);
    } else if (check) {
      this.props.history.push("/users/newOrder");
      setTimeout(() => {
        alert("Вы зашли за пользователя");
      }, 100);
    } else alert("Вы не зарегистрировались");
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md={4} sm={4} />
          <Col md="auto" sm={4}>
            <form className="form-signin">
              <h2 className="form-signin-heading">Please sign in</h2>
              <label for="inputEmail" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                onChange={this.handleEmailChange}
                value={this.state.email}
                id="inputEmail"
                className="form-control"
                placeholder="Email address"
                required
                autofocus
              />
              <label for="inputPassword" className="sr-only">
                Password
              </label>
              <input
                type="password"
                onChange={this.handlePasswordChange}
                value={this.state.password}
                id="inputPassword"
                className="form-control"
                placeholder="Password"
                required
              />
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

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactPage);
