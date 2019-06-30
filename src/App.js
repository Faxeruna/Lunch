import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import PrivateAdmin from "./helpers/PrivateRoute";
import PrivateUser from "./helpers/PrivateRoute2";
import { connect } from "react-redux";
//import logo from './logo.svg';
import "./App.css";
import "bootswatch/dist/minty/bootstrap.css";
import Layout from "./components/common/Layout";
import RegistrationPage from "./components/login/RegistrationPage";
import UsersPage from "./components/users/UsersPage";
import LoginPage from "./components/login/LoginPage";
import NewOrder from "./components/users/newOrder/NewOrder";
import OrderList from "./components/users/orderList/OrderList";
import NewOrderAdmin from "./components/admin/newOrderAdmin/NewOrderAdmin";
import OrderListAdmin from "./components/admin/orderListAdmin/OrderListAdmin";
import ReportAdmin from "./components/admin/reportAdmin/ReportAdmin";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={Layout} />
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/registration" component={RegistrationPage} />
        <PrivateUser
          exact
          path="/users"
          component={UsersPage}
          auth={this.props.auth}
        />
        <PrivateUser
          exact
          path="/users/newOrder"
          component={NewOrder}
          auth={this.props.auth}
        />
        <PrivateUser
          exact
          path="/users/orderList"
          component={OrderList}
          auth={this.props.auth}
        />
        <PrivateAdmin
          exact
          path="/admin/newOrderAdmin"
          component={NewOrderAdmin}
          auth={this.props.auth}
        />
        <PrivateAdmin
          exact
          path="/admin/orderListAdmin"
          component={OrderListAdmin}
          auth={this.props.auth}
        />
        <PrivateAdmin
          exact
          path="/admin/reportAdmin"
          component={ReportAdmin}
          auth={this.props.auth}
        />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = store => ({ store: store.auth });

export default connect(mapStateToProps)(App);
