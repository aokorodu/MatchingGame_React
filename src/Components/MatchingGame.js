import "./MatchingGame.css";
import Card from "./Card";
import Timer from "./Timer";
import Bumper from "./Bumper";
import Scoreboard from "./Scoreboard";
import React from "react";
import { useState, useRef } from "react";

function MatchingGame({
  svgWidth,
  svgHeight,
  rows,
  columns,
  cardWidth,
  cardHeight,
  duration,
}) {
  // svg variables
  let w = svgWidth;
  let h = svgHeight;
  let vb = `0 0 ${w} ${h}`;

  // game variables
  let r = rows | 4;
  let c = columns | 4;
  let cWidth = cardWidth;
  let cHeight = cardHeight;
  let gap = 10;
  let rowWidth = c * (cWidth + gap) - gap;
  let columnHeight = r * (cHeight + gap) - gap;
  let totalCards = r * c;
  let gameDuration = duration;

  // UI
  let timerRef = useRef(null);

  // symbols
  let str = "AABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQRRSSTTUUVVWWXXYYZZ";
  str = str.substring(0, totalCards);
  let symbols = str.split("");

  // game stats
  let selectedCards = [];
  //let matches = 0;
  let misses = 0;
  let gameStarted = false;
  //let gameOver = false;

  const [gameOver, setGameOver] = useState(false);
  const [matches, setMatches] = useState(0);

  const cardRefs = useRef([]);
  cardRefs.current = [];

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  // card click handler
  const onClick = (e) => {
    if (!gameStarted) {
      console.log("game not yet started");
      return;
    }

    handleCardClick(e);
  };

  const handleStartClick = () => {
    if (gameStarted) return;

    gameStarted = true;

    deal();
    setTimeout(hideAll, 2000);
    setTimeout(shuffle, 3000);
    setTimeout(shuffle, 3700);
    setTimeout(startTimer, 4500);
  };

  const deal = () => {
    const startX = cWidth / 2 + (w - rowWidth) / 2;
    const startY = cHeight / 2 + (h - columnHeight) / 2;
    for (let row = 0; row < r; row++) {
      for (let col = 0; col < c; col++) {
        const ind = totalCards - (r * row + col);
        const xpos = startX + row * (cWidth + gap);
        const ypos = startY + col * (cHeight + gap);
        console.log("xpos:", xpos, " ypos:", ypos);
        cardRefs.current[r * row + col].move(xpos, ypos, ind / 20);
      }
    }
  };

  function hideAll() {
    console.log("hiding");
    cardRefs.current.forEach((card, index) => {
      const row = Math.floor(index / r);
      const col = index % c;
      card.hide(row / 10 + col / 10);
    });
  }

  const shuffle = () => {
    console.log("shuffling");
    let indexArray = [];
    for (let i = 0; i < totalCards; i++) {
      indexArray.push(i);
    }
    indexArray = indexArray.sort((a, b) => 0.5 - Math.random());

    const startX = cWidth / 2 + (w - rowWidth) / 2;
    const startY = cWidth / 2 + (h - columnHeight) / 2;
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
  };

  const startTimer = () => {
    timerRef.current.start();
  };

  const onEndTimer = () => {
    console.log("timer finished!");
    setGameOver(true);
    window.requestAnimationFrame(dropEverything);
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
    const newCard = cardRefs.current[cardIndex];
    newCard.show();
    selectedCards.push(newCard);
  };

  const checkIfMatching = () => {
    if (selectedCards.length == 2) {
      if (isMatching()) {
        console.log("matching");
        collectWinnings();
      } else {
        putEmBack();
        console.log("not matching");
      }
    }
  };

  const isMatching = () => {
    let matching = false;
    const symbol_0 = selectedCards[0].getSymbol();
    const symbol_1 = selectedCards[1].getSymbol();

    console.log("symbols: ", symbol_0, symbol_1);
    if (symbol_0 == symbol_1) {
      matching = true;
    }

    return matching;
  };

  function collectWinnings() {
    //setMatches(matches + 1);
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

  let startParticleEffect;
  const dropEverything = (timestamp)=>{
    if(startParticleEffect === undefined) startParticleEffect = timestamp;
    const elapsed = timestamp - startParticleEffect;
    cardRefs.current.forEach((card)=>{
      card.update();
    })
    if(elapsed > 15000) return;
    window.requestAnimationFrame(dropEverything)
  }

  return (
    <div className="gameContainer">
      <Scoreboard makes={matches} misses={0}></Scoreboard>
      <svg width={w + "px"} height={h + "px"} viewBox={vb}>
        {symbols.map((symbol, index) => {
          return (
            <Card
              ref={addToRefs}
              key={index}
              x={25 + index * 1}
              y={h / 2 - index * 1}
              width={cWidth}
              height={cHeight}
              index={index}
              symbol={symbol}
              onClick={onClick}
            />
          );
        })}
        <Timer
          ref={timerRef}
          xpos={450}
          ypos={40}
          dur={gameDuration}
          isActive={false}
          onComplete={onEndTimer}
        />
        {gameOver && (
          <Bumper width={w} height={h} message={"game over"} />
        )}
      </svg>
      
      <div onClick={handleStartClick} className="deal-button">
        START
      </div>
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
