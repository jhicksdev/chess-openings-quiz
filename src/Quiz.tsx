import React, { useState } from "react";
import { Opening, random as randomOpening } from "./Opening";
import { random, sample } from "lodash";

export default function Quiz() {
  const openings = new Array<Opening>();
  const moveCount = random(1, 4);
  for (let i = 0; i < 4; i++) {
    let opening = randomOpening();
    while (
      opening &&
      (openings.includes(opening) || opening.moves !== moveCount)
    ) {
      opening = randomOpening();
    }
    if (opening) openings.push(opening);
  }

  for (const opening of openings) {
    console.log(opening);
  }

  const correctOpening = sample(openings);
  const imageURL = `https://backscattering.de/web-boardimage/board.svg?fen=${correctOpening?.fen}`;

  const [nextButtonEnabled, setNextButtonEnabled] = useState(false);

  return (
    <div className="quiz">
      <div className="board-wrapper">
        <img src={imageURL} alt="Board" className="board" />
      </div>
      <div className="button-grid">
        {openings.map((opening) => (
          <button>{opening.name}</button>
        ))}
      </div>
      <button className="next">Next →</button>
    </div>
  );
}
