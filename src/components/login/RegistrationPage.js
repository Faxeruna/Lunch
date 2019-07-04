import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: "",
      inputPassword: "",
      inputPasswordRepeat: "",
      value: "Ульяновск",
      cabinet: "1",
      firstname: "Василий",
      lastname: "Крылов",
      surname: "Аркадьевич"
    };
  }

  handleChange = e => {
    e.preventDefault();
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
  };

  handleSubmit(event) {
    alert("Your favorite flavor is: " + this.state.value);
    event.preventDefault();
  }

  signUp = e => {
    e.preventDefault();
    localStorage.setItem("City", this.state.value);
    localStorage.setItem("Cabinet", this.state.cabinet);
    localStorage.setItem("Firstname", this.state.firstname);
    localStorage.setItem("Lastname", this.state.lastname);
    localStorage.setItem("Surname", this.state.surname);

    function validateEmail(email) {
      var res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return res.test(String(email).toLowerCase());
    }
    const { inputEmail, inputPassword, inputPasswordRepeat } = this.state;
    if (
      inputEmail.trim() &&
      inputPassword.trim() === inputPasswordRepeat.trim() &&
      validateEmail(inputEmail) === true &&
      localStorage.getItem(inputEmail, inputPassword) === null
    ) {
      this.props.user.push(localStorage.setItem(inputEmail, inputPassword));
      this.props.history.push("/");
    } else if (validateEmail(inputEmail) === false) {
      alert("домен почты указан неверно");
    } else if (inputPassword.trim() !== inputPasswordRepeat.trim()) {
      alert("Пароль не совпадает");
    } else alert("Учётная запись уже есть");
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md={4} sm={4} />
          <Col md="auto" sm={4}>
            <form className="form-signin">
              <h2 className="form-signin-heading">Please Registration</h2>
              <input
                value={this.state.inputEmail}
                type="email"
                onChange={this.handleChange}
                id="inputEmail"
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
              <label htmlFor="inputEmail" className="sr-only">
                Email address
              </label>
              <input
                value={this.state.inputPassword}
                type="password"
                onChange={this.handleChange}
                id="inputPassword"
                className="form-control"
                placeholder="Password"
                required
              />
              <label htmlFor="inputPassword" className="sr-only">
                Password
              </label>
              <input
                value={this.state.inputPasswordRepeat}
                type="password"
                onChange={this.handleChange}
                id="inputPasswordRepeat"
                className="form-control"
                placeholder="Repeat Password"
                required
              />
              <label htmlFor="inputPasswordRepeat" className="sr-only">
                Repeat Password
              </label>
            </form>
            <form>
              <label>
                Укажите Город
                <select
                  value={this.state.value}
                  onChange={this.handleChange}
                  className="form-control"
                >
                  <option value="Москва">Москва</option>
                  <option value="Ульяновск">Ульяновск</option>
                  <option value="Вашингтон">Вашингтон</option>
                </select>
              </label>
              <label>
                Укажите Кабинет
                <input
                  min="1"
                  max="300"
                  type="number"
                  className="form-control"
                  id="cabinet"
                  onChange={this.handleChange}
                  value={
                    this.state.cabinet.length === 0
                      ? 1
                      : this.state.cabinet.length === 4
                      ? this.state.cabinet.slice(0, -2)
                      : this.state.cabinet
                  }
                />
              </label>
            </form>
            <form>
              <label>Укажите Имя, Фамилию, Отчество</label>
              <input
                id="firstname"
                onChange={this.handleChange}
                value={
                  this.state.firstname.trim().length === 0
                    ? "Введите не пустое значение"
                    : this.state.firstname
                }
                className="form-control"
              />
              <input
                id="lastname"
                onChange={this.handleChange}
                value={
                  this.state.lastname.trim().length === 0
                    ? "Введите не пустое значение"
                    : this.state.lastname
                }
                className="form-control"
              />
              <input
                id="surname"
                onChange={this.handleChange}
                value={
                  this.state.surname.trim().length === 0
                    ? "Введите не пустое значение"
                    : this.state.surname
                }
                className="form-control"
              />
              <br />
              <button
                className="btn btn-lg btn-primary btn-block"
                onClick={this.signUp}
                type="button"
              >
                Sign up
              </button>
            </form>
          </Col>
          <Col md={4} sm={4} />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = store => {
  return {
    user: store.user
  };
};

export default connect(mapStateToProps)(HomePage);
