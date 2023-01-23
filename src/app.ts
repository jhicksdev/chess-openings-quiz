import "./style.css";
import openings from "./openings.json";
import { ChoiceButton } from "./ChoiceButton";
import { sample, shuffle } from "lodash-es";
import { RatioBar } from "./RatioBar";

const ratioBar = RatioBar.getInstance();

const opening = sample(openings);
if (opening) {
  const { name, pgn, epd, lastMove, check } = opening;

  const boards = document.getElementsByClassName("board");
  if (boards[0] && boards[0] instanceof HTMLImageElement) boards[0].src = `https://backscattering.de/web-boardimage/board.svg?fen=${epd}&lastMove=${lastMove}${check ? `&check=${check}` : ""}`;
  if (boards[1] && boards[1] instanceof HTMLImageElement) boards[1].src = `https://backscattering.de/web-boardimage/board.svg?fen=${epd}&lastMove=${lastMove}${check ? `&check=${check}` : ""}&coordinates=true`;

  const _pgn = document.querySelector(".pgn");
  if (_pgn) _pgn.innerHTML = `<b>PGN:</b>&nbsp;${pgn}`;

  const choiceButtons: ChoiceButton[] = [];
  choiceButtons.push(new ChoiceButton(name));
  for (let i = 0; i < 3; i++) {
    const opening = sample(openings.filter((opening) => opening.name !== name));
    if (opening) {
      choiceButtons.push(new ChoiceButton(opening.name));
    }
  }
  choiceButtons.forEach((choiceButton) => {
    choiceButton.setClickEventListener(() => {
      choiceButtons.forEach(({ getLabel, getElement }) => {
        getElement().style.color = "white";
        getElement().style.pointerEvents = "none";
        if (getLabel() === name) getElement().style.backgroundColor = "green";
      });

      if (choiceButton.getLabel() === name) {
        ratioBar.incrementCorrectCount();
      } else {
        ratioBar.incrementIncorrectCount();
        choiceButton.getElement().style.backgroundColor = "#b50000";
      }
    });
  });

  const choices = document.querySelector(".choices");
  if (choices) shuffle(choiceButtons).forEach(({ getElement }) => choices.appendChild(getElement()));
}
