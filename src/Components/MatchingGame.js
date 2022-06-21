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

  const handleStartClick = ()=>{
    gameStarted = true;
    console.log(gameStarted);
    
    deal();
    shuffle();
  }

  const deal = ()=> {
    console.log("dealing");
    console.log('rows:', r, " columns:", c)
    const startX = (w - rowWidth) / 2;
    const startY = (h - columnHeight) / 2;

    console.log('startX:', startX, " startY:", startY)
    for (let row = 0; row < r; row++) {
      for (let col = 0; col < c; col++) {
        const ind = totalCards - (r * row + col);
        const xpos = startX + row * (cWidth + gap);
        const ypos = startY + col * (cHeight + gap);
        console.log('xpos:', xpos, " ypos:", ypos)
        cardRefs.current[r * row + col].move(
          xpos,
          ypos,
          ind / 20
        );
      }
    }
  }

  const shuffle = ()=> {
    console.log("shuffling");
    let indexArray = [];
    for (let i = 0; i < totalCards; i++) {
      indexArray.push(i);
    }
    indexArray = indexArray.sort((a, b) => 0.5 - Math.random());

    const startX = (w - rowWidth) / 2;
    const startY = (h - columnHeight) / 2;
    for (let i = 0; i < totalCards; i++) {
      let col = i % c;
      let row = Math.floor(i / c);
      const index = indexArray[i];
      cardRefs.current[index].move(
        startX + row * (cWidth + gap),
        startY + col * (cHeight + gap),
        Math.random() * 0.1
      );
    }
  }

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
    const newCard = cardRefs.current[cardIndex];
    newCard.show();
    selectedCards.push(newCard);
  };

  const checkIfMatching = ()=>{
    if (selectedCards.length == 2) {
      if (isMatching()) {
        console.log('matching')
        collectWinnings();
      } else {
        putEmBack();
        console.log('not matching')
      }
    }
  }

  const isMatching = ()=> {
    let matching = false;
    const symbol_0 = selectedCards[0].getSymbol();
    const symbol_1 = selectedCards[1].getSymbol();

    console.log('symbols: ', symbol_0, symbol_1)
    if (symbol_0 == symbol_1) {
      matching = true;
    }

    return matching;
  }

  function collectWinnings() {
    matches++;
    selectedCards.forEach((card) => {
      card.lock();
    });

    selectedCards = [];
  }

  function putEmBack() {
    misses++;
    setTimeout(() => {
      selectedCards.forEach((card) => {
        card.hide();
      });

      selectedCards = [];
    }, 1200);
  }

  return (
    <div className="gameContainer">
      <svg width={w + "px"} height={h + "px"} viewBox={vb}>
        {symbols.map((symbol, index) => {
          return (
            <Card
              ref={addToRefs}
              key={index}
              x={25 + index * 1}
              y={h / 2 - index * 1}
              w={cardWidth}
              h={cardHeight}
              index={index}
              symbol={symbol}
              onClick={onClick}
            />
          );
        })}
      </svg>
      <div onClick={handleStartClick} className="deal-button">START</div>
      <div>
        rows: {r} columns: {c} cardWidth: {cWidth} cardHeight: {cHeight}
      </div>
      <div>
        rowWidth:{rowWidth} columnHeight:{columnHeight}
      </div>
      <div>totalCards:{totalCards}</div>
      <div>gameStarted: {gameStarted}</div>
    </div>
  );
}

export default MatchingGame;
