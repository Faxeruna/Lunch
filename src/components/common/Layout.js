import React, { Component } from "react";

import Navigation from './Navigation';

export default class Layout extends Component {
  render(){
    return(
      <section className="page">
        <Navigation/>
        <section>
          {this.props.children}
        </section>
      </section>
    );
  }
}
