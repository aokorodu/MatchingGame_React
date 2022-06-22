import React, { useState, useEffect } from "react";

const Timer = ({ xpos, ypos, duration=60 }) => {
  let x = xpos;
  let y = ypos;
  const [seconds, setSeconds] = useState(duration);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <>
      <g transform={`translate(${x}, ${y})`}>
        <text
          x="0"
          y="0"
          fill={seconds < 11 ? "red" : "white"}
          stroke={seconds < 11 ? "red" : "black"}
          strokeWidth="2"
          fontSize="60"
          fontWeight="900"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {seconds < 10 ? "0" : ""}
          {seconds}
        </text>
      </g>
    </>
  );
};

export default Timer;
