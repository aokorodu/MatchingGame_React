import React from "react";
import { gsap } from "gsap";
import "./Scoreboard.css";

class Scoreboard extends React.Component {
  constructor({makes, misses }) {
    super();

    this.state = {
      makes: makes,
      misses: misses,
    };
  }

  render() {
    return <div>{this.state.makes}:{this.state.misses}</div>;
  }
}

export default Scoreboard;
