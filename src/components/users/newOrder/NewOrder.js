import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import axios from "axios";

const USER = [
  {
    name: "Иван",
    id_user: "1",
    id_location: "1",
    city: "Вашингтон",
    location: "Приемная",
    session_token: 'ccwe67fr6er76erfeyr',
    type: "user"
  }
];

export default class HomePage extends Component{
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.handleCountChange = this.handleCountChange.bind(this);
    this.state = {
      catalog: '',
      new_order: [],
      count: [],
      date: ''
    };
  }

  handleCountChange(e){
    if (e.target.value) {
      var temp = this.state.count;
      var id = e.target.id;
      var value = e.target.value;
      temp[id] = value;
      this.setState({ count: temp });
    };
  }

  addItem(product){
    if (this.state.count[product.id_product]) {
      var temp_order = this.state.new_order;
      var id_product = product.id_product;
      var name = product.product;
      var countProduct = this.state.count[product.id_product];
      temp_order[id_product] = { name: name, count:countProduct };
      this.setState({ new_order: temp_order });
    }
  }

  createOrder(e){
    if (this.state.new_order) {
      axios({
        method: 'post',
        url: 'http://localhost/Lunch/api_lunch_system.php?mode=create_order',
        data: {
          session_token: USER[0].session_token,
          order_data: this.state.new_order,
          user_data: USER[0],
          date: this.state.date
        }
      })
      .then(res => {
        if (res.data === 'denied') {
          alert("Ошибка авторизации");
          this.setState({ auth: 'false' });
          this.props.history.push("/");
        } else {
          const status_order = res.data;
          console.log(status_order);
          if (status_order) {
            alert("Заявка создана");
          } else {
            alert("Заявка не создана");
          }
          this.props.history.push("/users/orderList");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  componentDidMount() {
    axios({
      method: 'post',
      url: 'http://localhost/Lunch/api_lunch_system.php?mode=get_catalog',
      data: {
        session_token: USER[0].session_token
      }
    })
    .then(res => {
      if (res.data === 'denied') {
        alert("Ошибка авторизации");
        this.props.history.push("/");
      } else {
        const catalog = res.data;
        this.setState({ catalog });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    var dateNow = new Date();
    var timeString = dateNow.getFullYear()+'-'+(dateNow.getMonth()+1<10?'0'+(dateNow.getMonth()+1):dateNow.getMonth()+1)+'-'+(dateNow.getDate()<10?'0'+dateNow.getDate():dateNow.getDate());
    this.setState({ date: timeString});
  }

  render(){
    const catalog = this.state.catalog;
    const new_order = this.state.new_order;
    const date = this.state.date;
    if (!catalog) return <div>Loading</div>;
    return (
      <Container>
        <Container>
          <Row>
            <Col>
             <Accordion
              size="sm"
              className="my-2 px-0"
              defaultActiveKey="0"
            >
                {catalog.map((item_catalog, index) => (
                  <Card bg="link" style={{ width: '22rem' } } key={index}>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                        <b>{item_catalog.name}</b> Лимит: {item_catalog.count}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={index}>
                      <Card.Body>
                        {catalog[index].products.map((item_product, index1) => (
                          <Row key={index1}>
                            <Col>
                              {item_product.product}
                            </Col>
                            <Col>
                              <InputGroup size="sm" className="mb-1">
                                <FormControl
                                  id={item_product.id_product}
                                  placeholder="0"
                                  aria-label="1"
                                  aria-describedby="basic-addon2"
                                  onChange={this.handleCountChange}
                                />
                                <InputGroup.Append>
                                  <Button
                                    onClick={this.addItem.bind(this, item_product)}
                                  >
                                    Ok
                                  </Button>
                                </InputGroup.Append>
                              </InputGroup>
                            </Col>
                          </Row>
                        ))}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
              </Accordion>
            </Col>
            <Col >
              <div>
                <Container>
                  <Row className="my-2 px-0">
                    <h3>Cостав заявки</h3>
                    <Table striped bordered hover size="sm" className="table-success">
                      <thead>
                        <tr>
                          <th>№</th>
                          <th>Позиция</th>
                          <th>Количество</th>
                        </tr>
                      </thead>
                      <tbody>
                          {new_order.map((item, index) => (
                              <tr key={index}>
                                <td>{index}</td>
                                <td>{item.name}</td>
                                <td>{item.count}</td>
                              </tr>
                          ))}
                      </tbody>
                    </Table>
                  </Row>
                </Container>

              </div>
            </Col>
            <Col >
              <div>
                <Container>
                  <Row className="border my-2 px-0">
                    <Card bg="success" text="dark" style={{ width: '22rem' } }>
                      <Card.Header> <h4>Информация о заявке</h4> </Card.Header>
                      <Card.Body>
                        <Card.Title><b>Заявка:</b> Новая</Card.Title>
                        <Card.Title><b>Пользователь:</b> {USER[0].name}</Card.Title>
                        <Card.Title><b>Город: </b> {USER[0].city}</Card.Title>
                        <Card.Title><b>Кабинет:</b>  {USER[0].location}</Card.Title>
                        <Card.Title><b>Дата: </b> {date}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Row>
                  <Row className="border my-2 px-0 float-right">
                    <Button
                      type="button"
                      onClick={this.createOrder}
                      className="align-right"
                      variant="warning"
                    >
                      Отправить заказ
                    </Button>
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}
