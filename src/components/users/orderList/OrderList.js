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
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Image from 'react-bootstrap/Image';

//сверстать блок фильтра
//сверстать таблицу заявок на динамическое заполнение
//добавить в странице заявок кнопки редактировать и удалить(лучше маленьким карандашиком и крестиком)
//активна только для state new, в остальных случаях должна быть неактивна или не показываться
//подумать куда перенести кнопку создать заявку и ее стиль
//пагинацию не трогать

const ORDERCONTENT0 = [
  { name: "Кофе", kol: "31" },
  { name: "Чай", kol: "21" },
  { name: "Печенье", kol: "4" },
  { name: "Зефир", kol: "3" },
  { name: "Сахар", kol: "2" },
];

const ORDERCONTENT1 = [
  { name: "Кофе1", kol: "31" },
  { name: "Чай2", kol: "21" },
  { name: "Печенье2", kol: "4" },
  { name: "Зефир2", kol: "3" },
  { name: "Сахар2", kol: "2" },
];

const ORDERCONTENT2 = [
  { name: "Кофе2", kol: "31" },
  { name: "Чай2", kol: "21" },
  { name: "Печенье2", kol: "4" },
  { name: "Зефир2", kol: "3" },
  { name: "Сахар2", kol: "2" },
];

const ORDERCONTENT3 = [
  { name: "Кофе3", kol: "31" },
  { name: "Чай2", kol: "21" },
  { name: "Печенье2", kol: "4" },
  { name: "Зефир2", kol: "3" },
  { name: "Сахар2", kol: "2" },
];

const ORDERCONTENT4 = [
  { name: "Кофе4", kol: "31" },
  { name: "Чай2", kol: "21" },
  { name: "Печенье2", kol: "4" },
  { name: "Зефир2", kol: "3" },
  { name: "Сахар2", kol: "2" },
];

const ORDER = [
  { id:"234", date: "10.10.2019", state: "new", city: "Москва", number: "201", ordercontent: ORDERCONTENT0 },
  { id:"654", date: "04.10.2019", state: "new", city: "Ульяновск", number: "534", ordercontent: ORDERCONTENT1 },
  { id:"45", date: "03.10.2019", state: "processing", city: "Москва", number: "101", ordercontent: ORDERCONTENT2 },
  { id:"654", date: "22.10.2019", state: "done", city: "Вашингтон", number: "323", ordercontent: ORDERCONTENT3 },
  { id:"665", date: "21.10.2019", state: "processing", city: "Москва", number: "323", ordercontent: ORDERCONTENT4 },
  { id:"423", date: "31.10.2019", state: "done", city: "Вашингтон", number: "231", ordercontent: ORDERCONTENT0 },
  { id:"32", date: "23.10.2019", state: "cancelled", city: "Ульяновск", number: "354", ordercontent: ORDERCONTENT1 },
  { id:"4353", date: "17.10.2019", state: "done", city: "Москва", number: "402", ordercontent: ORDERCONTENT2 },
];

export default class HomePage extends Component{
  constructor() {
    super();
    this.signIn = this.signIn.bind(this);
    this.state = {
      activeOrder: 1,
    };
  }

  signIn(index){
    this.setState({ activeOrder: index });
    console.log(index );
  }

  render(){
    const activeOrder = this.state.activeOrder;
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
                      {ORDER.map((order, index) => (
                        <tr key={index}>
                          <td>{order.id}</td>
                          <td>{order.date}</td>
                          <td>{order.city}</td>
                          <td>{order.number}</td>
                          <td>{order.state}</td>
                          <td>
                            <ButtonToolbar>
                              <Button size="sm" variant="light" className="mr-1">
                                <img src="http://s1.iconbird.com/ico/2013/1/569/w23h231389814869187pencil.png" />
                              </Button>
                              <Button size="sm" variant="light"  className="mr-1" onClick={this.signIn.bind(this, index)}>
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
                <Card.Header>Заявка № {ORDER[activeOrder].id}</Card.Header>
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
                        {ORDER[activeOrder].ordercontent.map((product, index) => (
                          <tr key={index}>
                            <td>{index}</td>
                            <td>{product.name}</td>
                            <td>{product.kol}</td>
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
