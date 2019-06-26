import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
//import logo from './logo.svg';
import './App.css';
import "bootswatch/dist/minty/bootstrap.css";
import Layout from './components/common/Layout';
import RegistrationPage from './components/login/RegistrationPage';
import UsersPage from './components/users/UsersPage';
import LoginPage from './components/login/LoginPage';
import NewOrder from './components/users/newOrder/NewOrder';
import OrderList from './components/users/orderList/OrderList';
import NewOrderAdmin from './components/admin/newOrderAdmin/NewOrderAdmin';
import OrderListAdmin from './components/admin/orderListAdmin/OrderListAdmin';
import ReportAdmin from './components/admin/reportAdmin/ReportAdmin';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={Layout} />
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/registration" component={RegistrationPage} />
        <Route exact path="/users" component={UsersPage} />
        <Route exact path="/users/newOrder" component={NewOrder} />
        <Route exact path="/users/orderList" component={OrderList} />
        <Route exact path="/admin/newOrderAdmin" component={NewOrderAdmin} />
        <Route exact path="/admin/orderListAdmin" component={OrderListAdmin} />
        <Route exact path="/admin/reportAdmin" component={ReportAdmin} />
      </BrowserRouter>
    );
  }
}

export default App;
