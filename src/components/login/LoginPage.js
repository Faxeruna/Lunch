import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { setUser } from "../../actions/UserAction";
import axios from "axios";

class ContactPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      authToken: 0
    };
  }

  signIn = () => {
    axios({
      method: "post",
      url: "http://localhost/Lunch/api_lunch_system.php?mode=login",
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(function(response) {
        //здесь надо установить токен авторизации в глобальный стейт
        console.log(response);
        //console.log(window);
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
      })
      .catch(function(error) {
        console.log("error", error);
      });
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
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
                type="email"
                onChange={this.handleEmailChange}
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
                type="password"
                onChange={this.handlePasswordChange}
                id="inputPassword"
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
