const board = document.getElementById("chessBoard");
const pieces = {
  r: "♜", n: "♞", b: "♝", q: "♛", k: "♚", p: "♟",
  R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔", P: "♙",
};

let boardState = [
  ["r","n","b","q","k","b","n","r"],
  ["p","p","p","p","p","p","p","p"],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["P","P","P","P","P","P","P","P"],
  ["R","N","B","Q","K","B","N","R"]
];

let selected = null;

function drawBoard() {
  board.innerHTML = "";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.classList.add((row + col) % 2 === 0 ? "white" : "black");
      square.dataset.row = row;
      square.dataset.col = col;

      const piece = boardState[row][col];
      if (piece) square.textContent = pieces[piece];

      if (selected && selected.row == row && selected.col == col) {
        square.classList.add("selected");
      }

      square.addEventListener("click", () => handleClick(row, col));
      board.appendChild(square);
    }
  }
}

function handleClick(row, col) {
  const clickedPiece = boardState[row][col];

  if (selected) {
    // Move the piece
    boardState[row][col] = boardState[selected.row][selected.col];
    boardState[selected.row][selected.col] = "";
    selected = null;
  } else if (clickedPiece) {
    // Select the piece
    selected = { row, col };
  }

  drawBoard();
}

drawBoard();
