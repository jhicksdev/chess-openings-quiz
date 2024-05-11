import { sample } from "lodash";

import openings from "./openings.json";

type Opening = {
  eco: string;
  name: string;
  pgn: string;
  fen: string;
  moves: number;
};

const instances = new Array<Opening>();
for (const opening of openings) {
  instances.push(opening);
}

function random() {
  return sample(instances);
}

export { Opening, random };
