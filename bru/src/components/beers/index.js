import React, { Component } from "react";
import request from "superagent";
import styled from "styled-components";

import Beer from "./beer";
import BeerButton from "./beer-button";

class Beers extends Component {
  constructor() {
    super();
    this.state = {
      beers: [],
      currentPage: 1,
      disableButton: false
    };
  }

  async getBeers(page = 1) {
    const result = await request(`http://localhost:8080/beers?page=${page}`);

    if (result.body) {
      this.setState({
        beers: [...this.state.beers, ...result.body],
        currentPage: this.state.currentPage + 1
      });
    } else {
      this.setState({ disableButton: true });
    }
  }

  async componentDidMount() {
    await this.getBeers(this.currentPage);
  }

  render() {
    return (
      <BeersContainer>
        {this.state.beers.map(data => Beer({ ...data }))}
        <BeerButton
          onclick={() => this.getBeers(this.state.currentPage)}
          disableButton={this.state.disableButton}
        />
      </BeersContainer>
    );
  }
}

const BeersContainer = styled.div`
  display: flex;
  border: 1px solid black;
  height: 100%;
  flex-flow: row wrap;
`;

export default Beers;
