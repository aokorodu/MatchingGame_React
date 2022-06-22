import React from "react";
import { gsap } from "gsap";

class Bumper extends React.Component {
  constructor({width, height, message}) {
    super();
    this.w = width;
    this.h = height;
    this.message = message;
  }

  show(){

  }

  render() {
    return (
      <>
        <rect
          x="0"
          y="0"
          width={this.w}
          height={this.h}
          stroke="none"
          fill="black"
          fillOpacity={0.5}
        ></rect>
        <text
          x={this.w/2}
          y={this.h/2}
          fill="white"
          stroke="white"
          strokeWidth="1"
          fontSize="60"
          fontWeight="900"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {this.message}
        </text>
      </>
    );
  }
}

export default Bumper