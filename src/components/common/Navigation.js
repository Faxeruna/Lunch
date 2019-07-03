import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';

export default class Navigation extends Component {
  render() {
    const {location} = this.props;
    return (
      <div>
        <Container>
          <Navbar bg="primary">
            <Col md={10} sm={10}>
              <Navbar.Brand>
                <Link to="/" className="navbar-brand"><h2><b>Ланч</b></h2></Link>
                  <small>
                    Привет {localStorage.getItem("Current")} ваш Город{" "}
                    {localStorage.getItem("City")}, ваш Кабинет{" "}
                    {localStorage.getItem("Cabinet")}
                  </small>
              </Navbar.Brand>
            </Col>
            <Col md={2} sm={2}>
              <Nav activeKey={location}>
                <Nav.Item>
                  <NavDropdown title="Меню" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/users">Profile page</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/users/newOrder">New order</NavDropdown.Item>
                    <NavDropdown.Item href="/users/orderList">Order list</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/admin/newOrderAdmin">New order(admin)</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/orderListAdmin">Order list(admin)</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/reportAdmin">Report(admin)</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/">Login</NavDropdown.Item>
                    <NavDropdown.Item href="/registration">Registration</NavDropdown.Item>
                    <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav.Item>
              </Nav>
            </Col>
          </Navbar>
        </Container>
      </div>
    );
  }
}
