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

const new_order_const = [
  { name: "0", count: "0" }
];

export default class HomePage extends Component{
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.handleCountChange = this.handleCountChange.bind(this);
    this.state = {
      catalog: '',
      new_order: {},
      count: {}
    };
  }

  handleCountChange(e){
    var temp = this.state.count;
    var id = e.target.id;
    var value = e.target.value;
    temp[id] = value;
    this.setState({ count: temp });
  }

  addItem(product){
    var temp_order = this.state.new_order;
    var id_product = product.id_product;
    var name = product.product;
    var countProduct = this.state.count[product.id_product];
    temp_order[id_product] = { name: name, count:countProduct };
    this.setState({ new_order: temp_order });
    console.log(this.state.new_order);
  }

  componentDidMount() {
    axios({
      method: 'post',
      url: 'http://localhost/Lunch/api_lunch_system.php?mode=get_catalog',
      data: {
        session_token: 'ccwe67fr6er76erfeyr'
      }
    })
    .then(res => {
      const catalog= res.data;
      this.setState({ catalog});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render(){
    const catalog = this.state.catalog;
    var new_order_tr = new_order_const;
    const new_order = this.state.new_order;
    if (!catalog) return <div>Loading</div>;
    if (new_order) new_order_tr = new_order;
    //console.log(this.state.catalog);
    return (
      <Container>
        <Container>
          <Row className="border">
            <Col className="border">
             <Accordion size="sm" className="my-2 px-0" defaultActiveKey="0">
                {catalog.map((item_catalog, index) => (
                  <Card key={index}>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                        {item_catalog.name}
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
            <Col className="border">
              <div>
                <Container>
                  <Row className="border my-2 px-0">
                    <h3>Cостав заявки</h3>
                    <Table striped bordered hover size="sm" className="table-primary">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Позиция</th>
                          <th>Количество</th>
                        </tr>
                      </thead>
                      <tbody>
                          {new_order_tr.map((item, index) => (
                              <tr key={index}>
                                <td>{index}</td>
                                <td>{item.name}</td>
                                <td>{item.count}</td>
                              </tr>
                          ))};
                      </tbody>
                    </Table>
                  </Row>
                </Container>
              </div>
            </Col>
            <Col className="border">
              <div>
                <Container>
                  <Row className="border my-2 px-0">
                    <Card bg="success" text="white" style={{ width: '18rem' } }>
                      <Card.Header> <h4>Информация о заявке</h4> </Card.Header>
                      <Card.Body>
                        <Card.Title>Заявка: Новая</Card.Title>
                        <Card.Title>Пользователь: Ваня</Card.Title>
                        <Card.Title>Город: Сан-франциско</Card.Title>
                        <Card.Title>Кабинет: 666</Card.Title>
                        <Card.Title>Дата: 12.12.2012 </Card.Title>
                      </Card.Body>
                    </Card>
                  </Row>
                  <Row className="border my-2 px-0 float-right">
                    <Button type="button" className="align-right" >Отправить заказ</Button>
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

