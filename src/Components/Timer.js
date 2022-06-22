import React, { useState, useEffect } from "react";

class Timer extends React.Component {
  constructor({ xpos, ypos, dur, isActive, onComplete }) {
    super();

    this.state = {
      duration: dur,
      remainingTime: dur,
      active: isActive,
      complete: false,
    };
    this.x = xpos;
    this.y = ypos;
    this.onComplete = onComplete;
    this.interval = null;

    if(isActive) this.start();
  }

  start() {
    this.setState({remainingTime: this.state.duration, active: true, complete: false});
    this.interval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  end() {
    this.onComplete();
  }


  reset(){
    clearInterval(this.interval);
    this.setState({remainingTime: 0, active: false, complete: false})
  }

  tick() {
    this.setState({ remainingTime: this.state.remainingTime - 1 });
    if (this.state.remainingTime <= 0) {
      this.setState({remainingTime: 0, active: false, complete: true})
      clearInterval(this.interval);
      this.end();
    }
  }

  render() {
    return (
      <>
        <g transform={`translate(${this.x}, ${this.y})`}>
          <text
            x="0"
            y="0"
            fill={this.state.remainingTime < 11 ? "red" : "black"}
            strokeWidth="1"
            fontSize="60"
            fontWeight="900"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {this.state.remainingTime < 10 ? "0" : ""}
            {this.state.remainingTime}
          </text>
        </g>
      </>
    );
  }
}

export default Timer;
