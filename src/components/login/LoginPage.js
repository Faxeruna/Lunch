import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";

export default class ContactPage extends Component{
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      email:'',
      password:'',
      authToken: 0
    };
  }

  signIn(){
    axios({
      method: 'post',
      url: 'http://localhost/lunch/api_lunch_system.php?mode=login',
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
    .then(function (response) {
      //здесь надо установить токен авторизации в глобальный стейт
      console.log(response.data);
      //console.log(window);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleEmailChange(e){
    this.setState({email:e.target.value})
  }

  handlePasswordChange(e){
    this.setState({password:e.target.value})
  }

  render(){
    return (
    <Container>
      <Row>
        <Col md={4} sm={4}>
        </Col>
        <Col md='auto' sm={4}>
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
            <label htmlFor="inputEmail" className="sr-only">Email address</label>

            <input
              type="password"
              onChange={this.handlePasswordChange}
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required
            />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <button
              className="btn btn-lg btn-primary btn-block"
              onClick={this.signIn}
              type="button"
            >
              Sign in
            </button>
          </form>
          <Link to="/registration">{'Registration'}</Link>
        </Col>
        <Col md={4} sm={4}>
        </Col>
      </Row>
    </Container>
    )
  }
}
