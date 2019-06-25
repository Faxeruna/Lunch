import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class ContactPage extends Component{
  render(){
    return (
    <Container>
      <Row>
        <Col md={4} sm={4}>
        </Col>
        <Col md='auto' sm={4}>
          <form className="form-signin">
            <h2 className="form-signin-heading">Please sign in</h2>
            <label for="inputEmail" className="sr-only">Email address</label>
            <input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
            <label for="inputPassword" className="sr-only">Password</label>
            <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Password" required />
            <button className="btn btn-lg btn-primary btn-block" onClick={this.signIn} type="button">Sign in</button>
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
