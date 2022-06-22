import React from "react";

class Card extends React.Component {
  constructor({ x, y, width, height, index, symbol, onClick }) {
    super();

    this.position = {
      x: x,
      y: y,
    };
    this.w = width | 50;
    this.h = height | 50;
    this.i = index | 0;
    this.s = symbol;
    this.onClick = onClick;

    this.locked = false;
  }

  clickHandler = () => {
    console.log("symbol", this.s, ' clicked');

    if(this.locked){
      console.log('this card is locked')
      return
    }
    this.onClick(this.i);
  };

  show = () => {
    console.log("show");
    const face = document.querySelector(`#face_${this.i}`);
    face.setAttribute("opacity", 0)
  };

  hide = () => {
    console.log("hide");
    const face = document.querySelector(`#face_${this.i}`);
    face.setAttribute("opacity", .2)
  };

  move = (x, y, delay) => {
    console.log("move to: ", x, y, "delay:", delay);
    const holder = document.querySelector(`#holder_${this.i}`);
    const str = `translate(${x}, ${y})`
    holder.setAttribute("transform", str)
  };

  lock = ()=>{
    this.locked = true;
  }

  getSymbol = () => {
    console.log("show");

    return this.s;
  };

  render() {
    return (
      <>
        <g id={`holder_${this.i}`}
          transform={`translate(${
            parseInt(this.position.x) + this.w / 2
          }, ${parseInt(this.position.y + this.h / 2)})`}
        >
          <rect
            x={-this.w / 2}
            y={-this.h / 2}
            width={this.w}
            height={this.h}
            rx="10"
            ry="10"
            stroke="black"
            fill="white"
          ></rect>
          <text
            x={0}
            y={0}
            fill="black"
            fontSize="30"
            fontWeight="900"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {this.s}
          </text>
          <rect
          id={`face_${this.i}`}
            onClick={this.clickHandler}
            x={-this.w / 2}
            y={-this.h / 2}
            width={this.w}
            height={this.h}
            rx="10"
            ry="10"
            stroke="black"
            fill="#288DDD"
            opacity=".2"
          ></rect>
        </g>
      </>
    );
  }
}

export default Card;
