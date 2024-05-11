import chess
import chess.pgn
import csv
import io
import json
import math
import os
import pathlib
import re
import requests

dirname = pathlib.Path(__file__).parent.resolve()

openings = []

for filename in ("a", "b", "c", "d", "e"):
    response = requests.get(
        f"https://raw.githubusercontent.com/lichess-org/chess-openings/master/{filename}.tsv"
    )
    file = io.StringIO(response.text)
    reader = csv.DictReader(file, delimiter="\t")
    for row in reader:
        moves = list(filter(None, re.split(r"\b\d+.|\s", row["pgn"])))
        board = chess.Board()
        for move in moves:
            board.push_san(move)
        fen = board.fen()
        if len(moves) <= 8:
            openings.append({**row, "fen": fen, "moves": math.ceil(len(moves) / 2)})

openings_json_path = os.path.abspath(
    os.path.join(os.path.join(dirname, "src", "openings.json"))
)
with open(openings_json_path, "w") as file:
    json.dump(openings, file)
    print(f"{openings_json_path} has been written successfully.")
