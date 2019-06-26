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
  { date: "10.10.2019", state: "new", city: "Москва", number: "201", ordercontent: ORDERCONTENT0 },
  { date: "04.10.2019", state: "new", city: "Ульяновск", number: "534", ordercontent: ORDERCONTENT1 },
  { date: "03.10.2019", state: "processing", city: "Москва", number: "101", ordercontent: ORDERCONTENT2 },
  { date: "22.10.2019", state: "done", city: "Вашингтон", number: "323", ordercontent: ORDERCONTENT3 },
  { date: "21.10.2019", state: "processing", city: "Москва", number: "323", ordercontent: ORDERCONTENT4 },
  { date: "31.10.2019", state: "done", city: "Вашингтон", number: "231", ordercontent: ORDERCONTENT0 },
  { date: "23.10.2019", state: "cancelled", city: "Ульяновск", number: "354", ordercontent: ORDERCONTENT1 },
  { date: "17.10.2019", state: "done", city: "Москва", number: "402", ordercontent: ORDERCONTENT2 },
];

export default class HomePage extends Component{
  constructor() {
    super();
    this.state = {
      activeOrder: 0,
    };
  }

  render(){
    const activeOrder = this.state.activeOrder;
    return (
      <Container>
        {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
        <Container>
          <Row>
            <Col xs={5} md={3}>
              <ButtonGroup>
                <DropdownButton as={ButtonGroup} title="Фильтр  " id="bg-nested-dropdown">
                  <Dropdown.Item eventKey="1">Дата</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Состояние</Dropdown.Item>
                </DropdownButton>
              </ButtonGroup>
            </Col>
            <Col xs={9} md={7}>
              <input
                type="text"
                onChange={this.handlePasswordChange}
                id="inputFilter"
                className="form-control"
                placeholder="Фильтр"
              />
              <label htmlFor="inputFilter" className="sr-only">Фильтр</label>
            </Col>
            <Col xs={4} md={2}>
              <button
                className="btn btn-primary btn-block"
                onClick={this.signIn}
                type="button"
              >
                Применить
              </button>
            </Col>
          </Row>
        </Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <Container>
        <Row>
          <Col xs={12} md={8}>
            <Row>
              <Table striped bordered hover size="sm" className="table-primary">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>0</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
            <Row>
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
          </Col>
          <Col xs={6} md={4}>
            <Card bg="success" text="white" style={{ width: '18rem' }}>
              <Card.Header>Заявка № 345</Card.Header>
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
                      {ORDER[0].ordercontent.map((product, index) => (
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
        {/* Columns are always 50% wide, on mobile and desktop */}
        <Row>
          <Col xs={6}>
            <ButtonGroup>
              <Button>Создать заявку</Button>
            </ButtonGroup>
          </Col>
          <Col xs={6}></Col>
        </Row>
      </Container>
    );
  }
}
