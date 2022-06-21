import "./MatchingGame.css";
import Card from "./Card";
import React from "react";
import { useRef } from "react";

function MatchingGame({
  svgWidth,
  svgHeight,
  rows,
  columns,
  cardWidth,
  cardHeight,
}) {
  // svg variables
  let w = svgWidth;
  let h = svgHeight;
  let vb = `0 0 ${w} ${h}`;

  // game variables
  let r = rows | 4;
  let c = columns | 4;
  let cWidth = cardWidth | 50;
  let cHeight = cardHeight | 50;
  let gap = 10;
  let rowWidth = c * (cWidth + gap) - gap;
  let columnHeight = r * (cHeight + gap) - gap;
  let totalCards = r * c;

  // symbols
  let str = "AABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQRRSSTTUUVVWWXXYYZZ";
  str = str.substring(0, totalCards);
  let symbols = str.split("");

  // card click handler
  const onClick = (e) => {
    if(!gameStarted ) {
        console.log('game not yet started');
        return;
    }

    handleCardClick(e);
  };

  // game stats
  let selectedCards = [];
  let matches = 0;
  let misses = 0;
  let gameStarted = false;
  let gameOver = false;

  const cardRefs = useRef([]);
  cardRefs.current = [];

  const addToRefs = (el) => {
    
    if(el && ! cardRefs.current.includes(el)) {
        cardRefs.current.push(el);
    }
  };

  const handleCardClick = (index) => {
    if (gameOver) return;
    if (selectedCards.length >= 2) return;

    console.log("handleCardClick: ", index);

    // if (!timer.isRunning()) timer.start();

    selectCard(index);
    checkIfMatching();

    //if (theyWon()) end();
  };

  const selectCard = (cardIndex) => {
    // console.log("cardComponentArray length: ", cardComponentArray.length);
    const newCard = cardRefs.current[cardIndex];
     console.log("newcard:", newCard);
    newCard.show();
    selectedCards.push(newCard);
    // console.log("selectedCards", selectedCards.toString());
  };

  const checkIfMatching = ()=>{
    if (selectedCards.length == 2) {
      if (isMatching()) {
        console.log('matching')
        //collectWinnings();
      } else {
        //putEmBack();
        console.log('not matching')
      }
    }
  }

  function isMatching() {
    let matching = false;
    const symbol_0 = selectedCards[0].getSymbol();
    const symbol_1 = selectedCards[1].getSymbol();

    console.log('symbols: ', symbol_0, symbol_1)
    if (symbol_0 == symbol_1) {
      matching = true;
    }

    return matching;
  }

  return (
    <div className="gameContainer">
      <svg width={w + "px"} height={h + "px"} viewBox={vb}>
        {symbols.map((symbol, index) => {
          return (
            <Card
              ref={addToRefs}
              key={index}
              x={25 + index * 10}
              y={h / 2 - index * 10}
              w={cardWidth}
              h={cardHeight}
              index={index}
              symbol={symbol}
              onClick={onClick}
            />
          );
        })}
      </svg>
      <div>
        rows: {r} columns: {c} cardWidth: {cWidth} cardHeight: {cHeight}
      </div>
      <div>
        rowWidth:{rowWidth} columnHeight:{columnHeight}
      </div>
      <div>totalCards:{totalCards}</div>
      <div>{symbols.toString()}</div>
    </div>
  );
}

export default MatchingGame;
