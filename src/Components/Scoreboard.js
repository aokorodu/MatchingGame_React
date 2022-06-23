import React from "react";
import { gsap } from "gsap";
import "./Scoreboard.css";

class Scoreboard extends React.Component {
  constructor({makes, misses, winningScore }) {
    super();

    this.state = {
      makes: makes,
      misses: misses,
      winningScore: winningScore
    };
  }

  addMake = ()=>{
    this.setState({makes: this.state.makes + 1})
  }

  addMiss = ()=>{
    this.setState({misses: this.state.misses + 1})
  }

  render() {
    return <div className="scoreboardText">{this.state.makes}:{this.state.misses}</div>;
  }
}

export default Scoreboard;
