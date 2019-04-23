import React, { Component } from "react";

import Beers from "./components/beers";
import Header from "./components/header";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Beers />
      </div>
    );
  }
}
