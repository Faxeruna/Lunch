import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

export default class Navigation extends Component {
  render() {
    const {location} = this.props;
    return (
      <div>
        <Container>
          <Navbar bg="primary">
            <Navbar.Brand>
              <Link to="/" className="navbar-brand">Lunch</Link>
            </Navbar.Brand>
            
            <Nav flex="column sm-row" activeKey={location}>
              <Nav.Item>
                <Dropdown>
                  <Dropdown.Toggle drop='left' id="dropdown-basic">
                    Menu
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/users">Profile page</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/users/newOrder">New order</Dropdown.Item>
                    <Dropdown.Item href="/users/orderList">Order list</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/admin/newOrderAdmin">New order(admin)</Dropdown.Item>
                    <Dropdown.Item href="/admin/orderListAdmin">Order list(admin)</Dropdown.Item>
                    <Dropdown.Item href="/admin/reportAdmin">Report(admin)</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/">Login</Dropdown.Item>
                    <Dropdown.Item href="/registration">Registration</Dropdown.Item>
                    <Dropdown.Item href="/">Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>
            </Nav>
          </Navbar>
        </Container>
      </div>
    );
  }
}
