import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
//import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import axios from "axios";

const USER = [
  { 
    name: "Иван", 
    id_user: "1",
    id_location: "31", 
    city: "Вашингтон",
    location: "Приемная",
    session_token: '7i5ptrc24ef8skod',
    type: "user"
  }
];

export default class HomePage extends Component{
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

  componentDidMount() {
    axios({
      method: 'post',
      url: 'http://localhost/3/Lunch/api_lunch_system.php?mode=get_orders',
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

  render(){
    const activeOrder = this.state.activeOrder;
    const orders = this.state.orders;
    if (!orders) {
      return (<div>Loading</div>);
    }
    console.log(orders);
    return (
      <Container>
        <Container>
          <Row>
            <Col xs={12} md={8}>
              <Navbar className="my-1 px-0">
                <Form inline>
                  <ButtonGroup>
                    <DropdownButton as={ButtonGroup}
                      title="Фильтр"
                      variant="success"
                      id="bg-nested-dropdown"
                      className="pr-1"
                    >
                      <Dropdown.Item eventKey="1">Дата</Dropdown.Item>
                      <Dropdown.Item eventKey="2">Состояние</Dropdown.Item>
                    </DropdownButton>
                  </ButtonGroup>
                  <FormControl type="text" placeholder="Введите данные" className="mr-sm-2" />
                  <Button type="button" variant="success">Применить</Button>
                  <Button href="/users/newOrder" type="button" className="mx-1" variant="warning">Создать заявку</Button>
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
                          <td>{order.status}</td>
                          <td>
                            <ButtonToolbar>
                              <Button size="sm" variant="light" className="mr-1">
                                <img src="http://s1.iconbird.com/ico/2013/1/569/w23h231389814869187pencil.png" />
                              </Button>
                              <Button
                                size="sm"
                                variant="light"
                                className="mr-1"
                                onClick={this.setItem.bind(this, index)}
                              >
                                <img src="http://s1.iconbird.com/ico/2013/1/569/w24h16138981479612eye.png" />
                              </Button>
                              <Button size="sm" variant="light">
                                <img src="http://s1.iconbird.com/ico/2013/1/569/w22h24138981480321skull.png" />
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
              <Card bg="success" text="white" style={{ width: '18rem' }}>
                <Card.Header>Заявка № {orders[activeOrder].id_order}</Card.Header>
                <Card.Body>
                  <Card.Title>Состав заявки</Card.Title>
                    <Table striped bordered hover size="sm" className="table-primary">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Позиция</th>
                          <th>Количество</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders[activeOrder].ordercontent.map((product, index) => (
                          <tr key={index}>
                            <td>{index}</td>
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
