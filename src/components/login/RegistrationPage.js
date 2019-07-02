import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: "1",
      inputPassword: "1",
      inputPasswordRepeat: "1"
    };
  }

  handleChange = e => {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
  };

  signUp = () => {
    function validateEmail(email) {
      var res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return res.test(String(email).toLowerCase());
    }
    const { inputEmail, inputPassword, inputPasswordRepeat } = this.state;
    const { user } = this.props;
    if (
      inputEmail.trim() &&
      inputPassword.trim() === inputPasswordRepeat.trim() &&
      validateEmail(inputEmail) === true &&
      localStorage.getItem(inputEmail, inputPassword) === null
    ) {
      console.log(user);
      this.props.user.push(localStorage.setItem(inputEmail, inputPassword));
      console.log(user);
    } else if (validateEmail(inputEmail) === false) {
      alert("домен почты указан неверно");
    } else if (inputPassword.trim() !== inputPasswordRepeat.trim()) {
      alert("Пароль не совпадает");
    } else alert("Учётная запись уже есть");
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md={4} sm={4} />
          <Col md="auto" sm={4}>
            <form className="form-signin">
              <h2 className="form-signin-heading">Please Registration</h2>
              <input
                value={this.state.inputEmail}
                type="email"
                onChange={this.handleChange}
                id="inputEmail"
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
              <label htmlFor="inputEmail" className="sr-only">
                Email address
              </label>
              <input
                value={this.state.inputPassword}
                type="password"
                onChange={this.handleChange}
                id="inputPassword"
                className="form-control"
                placeholder="Password"
                required
              />
              <label htmlFor="inputPassword" className="sr-only">
                Password
              </label>
              <input
                value={this.state.inputPasswordRepeat}
                type="password"
                onChange={this.handleChange}
                id="inputPasswordRepeat"
                className="form-control"
                placeholder="Repeat Password"
                required
              />
              <label htmlFor="inputPasswordRepeat" className="sr-only">
                Repeat Password
              </label>
              <button
                className="btn btn-lg btn-primary btn-block"
                onClick={this.signUp}
                type="button"
              >
                Sign up
              </button>
            </form>
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
    // setRegisterAction: data => dispatch(setRegister(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
