import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

export default class Navigation extends Component {
  render(){
    const { location } = this.props;
    return (
      <Navbar bg="primary">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="navbar-brand">Lunch</Link>
          </Navbar.Brand>
          <Nav activeKey={location}>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href="/registration">Registration</Nav.Link>
            <Nav.Link href="/users/newOrder">New order</Nav.Link>
            <Nav.Link href="/users/orderList">Order list</Nav.Link>
            <Nav.Link href="/admin/newOrderAdmin">New order admin</Nav.Link>
            <Nav.Link href="/admin/orderListAdmin">Order list admin</Nav.Link>
            <Nav.Link href="/admin/reportAdmin">Report admin</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}
