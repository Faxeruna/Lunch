import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

export default class HomePage extends Component{
  render(){
    return (
    
      <Container>
      
        <Container>
          <Row className="border">
            <Col className="border">
             <Accordion defaultActiveKey="0">
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      Кофе
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>Черный</Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                      Чай
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>Гринфилд</Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="2">
                      Сахар
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="2">
                  <Card.Body>Сахар</Card.Body>
                  </Accordion.Collapse>
                </Card>
           </Accordion>   
            </Col>
        
                      <Col className="border">
                      <div>
                      <Container>
                      <Row className="border">
                        <Card bg="success" text="white" style={{ width: '18rem' }}>
                                        <Card.Header>Заявка №</Card.Header>
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
                                               
                                              </tbody>
                                            </Table>
                                        </Card.Body>
                                      </Card>
                      </Row>
                      <Row className="border">
                        
                      </Row>
                      <Button>Отправить заказ</Button>
                      </Container>
                      </div>
                      </Col>
            
        </Row>
        </Container>      
                   
    
     
    </Container>   
  
   
    );
  }
}

