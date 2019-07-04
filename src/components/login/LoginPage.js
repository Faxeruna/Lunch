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

  handleChange = e => {
    e.preventDefault();
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
  };

  signIn = () => {
    if (
      this.state.email === "admin@list.ru" &&
      this.state.password === "secretKey"
    ) {
      localStorage.setItem("Current", this.state.email);
      localStorage.removeItem("user");
      localStorage.setItem("admin", "adminRoot");
      this.props.history.push("/admin/orderListAdmin");
    } else if (
      localStorage.getItem(this.state.email) != null &&
      localStorage.getItem(this.state.email, this.state.password) ===
        this.state.password
    ) {
      localStorage.setItem("Current", this.state.email);
      localStorage.removeItem("admin");
      localStorage.setItem("user", "userRoot");
      this.props.history.push("/users/orderList");
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
  return {
    user: store.user
  };
};

export default connect(mapStateToProps)(ContactPage);
