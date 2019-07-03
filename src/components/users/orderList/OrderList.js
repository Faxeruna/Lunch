import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { setRemove } from "../../../actions/RemoveItem";
import axios from "axios";

const USER = [
  { 
    name: "Иван", 
    id_user: "1",
    id_location: "1", 
    city: "Вашингтон",
    location: "Приемная",
    session_token: '8yths104fk9uzr62',
    type: "user"
  }
];

const STATUS = {
  new: "Новая"
}

class HomePage extends Component {
  constructor() {
    super();
    this.setItem = this.setItem.bind(this);
    this.state = {
      activeOrder: 0,
      orders: '',
      auth: true
    };
  }

  setItem(index){
    this.setState({ activeOrder: index });
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

  componentDidMount() {
    axios({
      method: 'post',
      url: 'http://localhost/4/Lunch/api_lunch_system.php?mode=get_orders',
      data: {
        session_token: USER[0].session_token
      }
    })
    .then(res => {
      if (res.data === 'denied') {
        alert("Ошибка авторизации");
        this.setState({ auth: 'false' });
        this.props.history.push("/");
      } else {
        const orders = res.data; 
        this.setState({ orders });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const activeOrder = this.state.activeOrder;
    const orders = this.state.orders;
    if (!orders) {
      return (<div>Loading</div>);
    }
    return (
      <Container>
        <Container>
          <Row>
            <Col xs={8} md={8}>
              <Navbar className="my-1 px-0">
                <Form inline>
                  <ButtonGroup>
                    <DropdownButton as={ButtonGroup}
                      title="Фильтр"
                      variant="success"
                      id="bg-nested-dropdown"
                      className="pr-1"
                      disabled
                    >
                      <Dropdown.Item eventKey="1">Дата</Dropdown.Item>
                      <Dropdown.Item eventKey="2">Состояние</Dropdown.Item>
                    </DropdownButton>
                  </ButtonGroup>
                  <FormControl type="text" placeholder="Введите данные" className="mr-sm-2" disabled />
                  <Button type="button" variant="success" disabled>Применить</Button>
                  <Button href="/users/newOrder" type="button" className="ml-1 pb=2" variant="warning">Создать заявку</Button>
                </Form>
              </Navbar>
              <Container>
                <Row className="my-1">
                  <Table striped bordered hover size="sm" className="table-success">
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
                      {orders.map((order, index) => (
                        <tr key={index}>
                          <td>{order.id_order}</td>
                          <td>{order.date}</td>
                          <td>{order.city}</td>
                          <td>{order.number}</td>
                          <td>{STATUS[order.status]}</td>
                          <td>
                            <ButtonToolbar>
                              <Button
                                size="sm"
                                variant="light"
                                className="mr-1"
                                onClick={this.setItem.bind(this, index)}
                              >
                                <img src="http://s1.iconbird.com/ico/2013/1/569/w24h16138981479612eye.png" />
                              </Button>
                            </ButtonToolbar>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Row>
              </Container>
            </Col>
            <Col className="my-1 mt-3 h-25" xs={4} md={4}>
              <Card bg="success" text="white" style={{ width: '22rem' }}>
                <Card.Header>Заявка № {orders[activeOrder].id_order}</Card.Header>
                <Card.Body>
                  <Card.Title>Состав заявки</Card.Title>
                    <Table striped bordered hover size="sm" className="table-primary">
                      <thead>
                        <tr>
                          <th>№</th>
                          <th>Позиция</th>
                          <th>Количество</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders[activeOrder].ordercontent.map((product, index) => (
                          <tr key={index}>
                            <td>{index+1}</td>
                            <td>{product.name}</td>
                            <td>{product.count}</td>
                          </tr>
                        ))}
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
