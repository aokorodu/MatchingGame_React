import React from "react";
import { gsap } from "gsap";
import "./Card.css";

class Card extends React.Component {
  constructor({ x, y, width, height, index, symbol, onClick }) {
    super();

    this.position = {
      x: x,
      y: y,
    };
    this.w = width;
    this.h = height;
    this.i = index | 0;
    this.s = symbol;
    this.onClick = onClick;

    this.locked = false;
  }

  clickHandler = () => {
    console.log("symbol", this.s, " clicked");

    if (this.locked) {
      console.log("this card is locked");
      return;
    }
    this.onClick(this.i);
  };

  show = () => {
    console.log("show");
    const face = document.querySelector(`#face_${this.i}`);
    gsap.to(face, {
      duration: 0.22,
      opacity: 0,
      ease: "power4.inOut",
    });

    // const face = document.querySelector(`#face_${this.i}`);
    // face.setAttribute("opacity", 0)
  };

  hide = (delay) => {
    console.log("hide delay:", delay);
    const face = document.querySelector(`#face_${this.i}`);
    gsap.to(face, {
      duration: 0.67,
      opacity: 1,
      delay: delay,
      ease: "power4.inOut",
    });

    // const face = document.querySelector(`#face_${this.i}`);
    // face.setAttribute("opacity", 1)
  };

  move_orig = (x, y, delay) => {
    //console.log("move to: ", x, y, "delay:", delay);
    const holder = document.querySelector(`#holder_${this.i}`);
    const str = `translate(${x}, ${y})`;
    holder.setAttribute("transform", str);
  };

  move = (newX, newY, delay = 0) => {
    const holder = document.querySelector(`#holder_${this.i}`);
    gsap.to(holder, {
      duration: 0.67,
      x: newX,
      y: newY,
      delay: delay,
      ease: "power4.inOut",
    });
  };

  lock = () => {
    this.locked = true;
  };

  getSymbol = () => {
    console.log("show");

    return this.s;
  };

  render() {
    return (
      <>
        <g
          id={`holder_${this.i}`}
          transform={`translate(${
            parseInt(this.position.x) + this.w / 2
          }, ${parseInt(this.position.y + this.h / 2)})`}
        >
          <g className="card_holder">
            <circle
              cx="0"
              cy="0"
              r={this.w / 2}
              stroke="#212121"
              strokeWidth="3"
              fill="white"
            ></circle>
            {/* <rect
              x={-this.w / 2}
              y={-this.h / 2}
              width={this.w}
              height={this.h}
              rx="10"
              ry="10"
              stroke="#212121"
              fill="white"
            ></rect> */}
            <text
            className="cardText"
              x={0}
              y={0}
              fill="#212121"
              stroke="#212121"
              fontSize="45"
              fontWeight="900"
              dominantBaseline="middle"
              textAnchor="middle"
            >
              {this.s}
            </text>
            <circle
            id={`face_${this.i}`}
            onClick={this.clickHandler}
              cx="0"
              cy="0"
              r={this.w / 2}
              stroke="#212121"
              strokeWidth="3"
              fill="#288DDD"
              opacity="0"
            ></circle>
            {/* <rect
              id={`face_${this.i}`}
              onClick={this.clickHandler}
              x={-this.w / 2}
              y={-this.h / 2}
              width={this.w}
              height={this.h}
              rx="10"
              ry="10"
              stroke="#212121"
              fill="#288DDD"
              opacity="0"
            ></rect> */}
          </g>
        </g>
      </>
    );
  }
}

export default Card;
