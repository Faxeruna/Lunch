import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
//import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from "react-bootstrap/FormControl";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
//import Image from 'react-bootstrap/Image';
import { setRemove } from "../../../actions/RemoveItem";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      activeOrder: 1
    };
  }

  signIn = index => {
    this.setState({ activeOrder: index });
    console.log(index);
    console.log(this.props);
  };

  handleDelete = index => {
    // const pos = this.props.order.indexOf(index);
    // this.props.order.splice(pos, 1);
    console.log(this.props.order);
    console.log(index);
    this.props.order.indexOf(index);
    if (index > -1) {
      this.props.order.splice(index, 1);
    }
    console.log(this.props.order);

    // console.log(this.props.order);
    // this.props.setRemoveItem(this.props.order);
  };

  handleCounter = index => {
    console.log(index);
  };

  render() {
    const activeOrder = this.state.activeOrder;
    return (
      <Container>
        <Container>
          <Row>
            <Col xs={12} md={8}>
              <p>
                Привет {localStorage.getItem("Current")} ваш Город{" "}
                {localStorage.getItem("City")}, ваш Кабинет{" "}
                {localStorage.getItem("Cabinet")}
              </p>
              <Navbar className="my-1 px-0">
                <Form inline>
                  <ButtonGroup>
                    <DropdownButton
                      as={ButtonGroup}
                      title="Фильтр"
                      variant="success"
                      id="bg-nested-dropdown"
                      className="pr-1"
                    >
                      <Dropdown.Item eventKey="1">Дата</Dropdown.Item>
                      <Dropdown.Item eventKey="2">Состояние</Dropdown.Item>
                    </DropdownButton>
                  </ButtonGroup>
                  <FormControl
                    type="text"
                    placeholder="Введите данные"
                    className="mr-sm-2"
                  />
                  <Button type="button" variant="success">
                    Применить
                  </Button>
                  <Button
                    href="/users/newOrder"
                    type="button"
                    className="mx-1"
                    variant="warning"
                  >
                    Создать заявку
                  </Button>
                </Form>
              </Navbar>
              <Container>
                <Row className="my-1">
                  <Table
                    striped
                    bordered
                    hover
                    size="sm"
                    className="table-success"
                  >
                    <thead>
                      <tr>
                        <th>№</th>
                        <th>Дата</th>
                        <th>Город</th>
                        <th>Кабинет</th>
                        <th>Статус</th>
                        <th>Действие</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.order.map((order, index) => (
                        <tr key={index}>
                          <td>{order.id}</td>
                          <td>{order.date}</td>
                          <td>{order.city}</td>
                          <td>{order.number}</td>
                          <td>{order.state}</td>
                          <td>
                            <ButtonToolbar>
                              <Button
                                size="sm"
                                variant="light"
                                className="mr-1"
                              >
                                <img
                                  src="http://s1.iconbird.com/ico/2013/1/569/w23h231389814869187pencil.png"
                                  alt=""
                                />
                              </Button>
                              <Button
                                size="sm"
                                variant="light"
                                className="mr-1"
                                onClick={this.signIn.bind(this, index)}
                              >
                                <img
                                  src="http://s1.iconbird.com/ico/2013/1/569/w24h16138981479612eye.png"
                                  alt=""
                                />
                              </Button>
                              <Button size="sm" variant="light">
                                <img
                                  src="http://s1.iconbird.com/ico/2013/1/569/w22h24138981480321skull.png"
                                  alt=""
                                  onClick={this.handleDelete.bind(this, index)}
                                />
                              </Button>
                            </ButtonToolbar>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Row>
              </Container>
              <Container>
                <Row className="my-1">
                  <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item active>{1}</Pagination.Item>
                    <Pagination.Ellipsis />
                    <Pagination.Item>{20}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                  </Pagination>
                </Row>
              </Container>
            </Col>
            <Col className="my-1 mt-3 h-25" xs={6} md={4}>
              <Card bg="success" text="white" style={{ width: "18rem" }}>
                <Card.Header>
                  Заявка № {this.props.order[activeOrder].id}
                </Card.Header>
                <Card.Body>
                  <Card.Title>Состав заявки</Card.Title>
                  <Table
                    striped
                    bordered
                    hover
                    size="sm"
                    className="table-primary"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Позиция</th>
                        <th>Количество</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.order[activeOrder].ordercontent.map(
                        (product, index) => (
                          <tr key={index}>
                            <td>{index}</td>
                            <td>{product.name}</td>
                            <td>
                              {product.kol}
                              <input
                                min="0"
                                type="number"
                                size="sm"
                                variant="light"
                                style={{ width: "100px", float: "right" }}
                              />
                              <input
                                value="save changes"
                                type="button"
                                onClick={this.handleCounter.bind(this, index)}
                                className="mr-1"
                                size="sm"
                                variant="light"
                                style={{ float: "right" }}
                              />
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = store => {
  console.log("store", store);
  return {
    order: store.order
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRemoveItem: item => dispatch(setRemove(item))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
