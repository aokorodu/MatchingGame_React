import React from "react";
import { gsap } from "gsap";
import "./Card.css";

class Card extends React.Component {
  constructor({ x, y, width, height, index, symbol, onClick }) {
    super();

    this.position = {
      x: x,
      y: y,
      rotation: 0,
    };

    this.velocity = {
      x: 1 - Math.random() * 2,
      y: 0,
    };

    this.accel = {
      x: 0,
      y: 1,
    };

    this.elasticity = 0.75 + Math.random() * 0.2;

    this.max = 500 - width / 2;

    this.w = width;
    this.h = height;
    this.i = index | 0;
    this.s = symbol;
    this.onClick = onClick;

    this.locked = false;
  }

  update() {
    //if(this.locked) return;

    this.velocity.x += this.accel.x;
    this.velocity.y += this.accel.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.position.rotation += ((this.velocity.x / 2) * Math.PI * this.w) / 40;

    if (this.position.x > this.max) {
      this.position.x = this.max;
      this.velocity.x *= -1;
    } else if (this.position.x < this.w / 2) {
      this.position.x = this.w / 2;
      this.velocity.x *= -1;
    }

    this.velocity.x *= 0.997;

    if (this.position.y > this.max) {
      this.position.y = this.max;
      this.velocity.y *= -this.elasticity;
    } else if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y *= -this.elasticity;
    }

    const holder = document.querySelector(`#holder_${this.i}`);
    gsap.set(holder, {
      x: this.position.x,
      y: this.position.y,
    });

    if (!this.locked) return;
    const innerHolder = document.querySelector(`#inner_holder_${this.i}`);
    innerHolder.setAttribute("transform", `rotate(${this.position.rotation})`);
  }

  clickHandler = () => {
    if (this.locked) {
      console.log("this card is locked");
      return;
    }
    this.onClick(this.i);
  };

  show = () => {
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
    const face = document.querySelector(`#face_${this.i}`);
    gsap.to(face, {
      duration: 0.67,
      opacity: .5,
      delay: delay,
      ease: "power4.inOut",
    });

    // const face = document.querySelector(`#face_${this.i}`);
    // face.setAttribute("opacity", 1)
  };

  move = (newX, newY, delay = 0) => {
    const holder = document.querySelector(`#holder_${this.i}`);
    gsap.to(holder, {
      duration: 0.67,
      x: newX,
      y: newY,
      delay: delay,
      ease: "power4.inOut",
      onComplete: () => {
        this.position.x = newX;
        this.position.y = newY;
      },
    });
  };

  lock = () => {
    this.locked = true;
  };

  getSymbol = () => {
    
    return this.s;
  };

  render() {
    return (
      <>
        <g
          id={`holder_${this.i}`}
          transform={`translate(${parseInt(this.position.x)}, ${parseInt(
            this.position.y
          )})`}
        >
          <circle cx="0" cy="0" r="10" fill="black"></circle>
          <g id={`inner_holder_${this.i}`} className="card_holder">
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
