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
    const newScore = this.state.makes + 1
    
    this.setState({makes: newScore});
    if(newScore== this.state.winningScore) console.log("you win!");
  }

  addMiss = ()=>{
    this.setState({misses: this.state.misses + 1})
  }

  isWinner = ()=>{
    return this.state.makes == this.state.winningScore;
  }

  render() {
    return <div className="scoreboardText">{this.state.makes}:{this.state.misses}</div>;
  }
}

export default Scoreboard;
