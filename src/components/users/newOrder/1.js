import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

export default class HomePage extends Component{
  render(){
    return (
    <div id="newOrder">
      <Container>
      <div>
        <Container>
          <Row className="border">
            <Col className="border">Метка город</Col>
            <Col className="border">Метка кабинет</Col>
            <Col className="border">Метка логин</Col>
            <Col>
            <Button>Exit</Button>
            </Col>
          </Row>
        </Container>      
          <div>
            <Table striped bordered hover size="sm">
              <thead>
              <tr>
              <th>Товар</th>
              <th>Количество</th>
              <th>Заказано</th>
              <th>Дата последнего заказа</th>
              </tr>
              </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
            </Table> 
          </div>          
    </div> 
    <Button>Отправить заказ</Button> 
    </Container>   
  
    </div>
    );
  }
}
