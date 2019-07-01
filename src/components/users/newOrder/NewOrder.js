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



export default class HomePage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      catalog: '',
      new_order: ''
    };
  }

  componentDidMount() {
    axios({
      method: 'post',
      url: 'http://localhost/3/Lunch/api_lunch_system.php?mode=get_catalog',
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
    if (!catalog) return <div>Loading</div>;
    console.log(this.state.catalog);
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
                                  placeholder="1"
                                  aria-label="1"
                                  aria-describedby="basic-addon2"
                                />
                                <InputGroup.Append>
                                  <Button variant="outline-secondary">Ok</Button>
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
                        <tr>
                          <td>#</td>
                          <td>Позиция</td>
                          <td>Количество</td>
                        </tr>
                        <tr>
                          <td>#</td>
                          <td>Позиция</td>
                          <td>Количество</td>
                        </tr> 
                        <tr>
                          <td>#</td>
                          <td>Позиция</td>
                          <td>Количество</td>
                        </tr>                         
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

