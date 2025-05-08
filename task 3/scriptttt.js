let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let currentPlayer = 'X'; // Player X starts
let gameOver = false;

const statusText = document.getElementById('statusText');
const boardElement = document.getElementById('board');
const resetBtn = document.getElementById('resetBtn');

// Create 3x3 grid dynamically
function createBoard() {
  boardElement.innerHTML = '';
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const cell = document.createElement('div');
      cell.setAttribute('data-row', row);
      cell.setAttribute('data-col', col);
      cell.addEventListener('click', handleCellClick);
      boardElement.appendChild(cell);
    }
  }
}

// Handle cell click
function handleCellClick(e) {
  const row = e.target.getAttribute('data-row');
  const col = e.target.getAttribute('data-col');

  if (board[row][col] === '' && !gameOver) {
    board[row][col] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
      statusText.textContent = `${currentPlayer} wins!`;
      gameOver = true;
      return;
    }

    // Check for draw
    if (isBoardFull()) {
      statusText.textContent = 'It\'s a draw!';
      gameOver = true;
      return;
    }

    // Switch turns
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;

    // If it's Player O's turn, make the computer move
    if (currentPlayer === 'O' && !gameOver) {
      computerMove();
    }
  }
}

// Check if board is full (for draw condition)
function isBoardFull() {
  return board.every(row => row.every(cell => cell !== ''));
}

// Check if a player has won
function checkWinner() {
  // Check rows, columns, and diagonals
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) {
      return true; // Row win
    }
    if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) {
      return true; // Column win
    }
  }

  // Check diagonals
  if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
    return true; // Diagonal win
  }
  if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
    return true; // Diagonal win
  }

  return false;
}

// Computer makes a move
function computerMove() {
  let availableCells = [];

  // Collect all empty cells
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === '') {
        availableCells.push({ row, col });
      }
    }
  }

  // Randomly select an empty cell for the computer
  const randomMove = availableCells[Math.floor(Math.random() * availableCells.length)];
  board[randomMove.row][randomMove.col] = 'O';
  const cell = boardElement.querySelector(`[data-row='${randomMove.row}'][data-col='${randomMove.col}']`);
  cell.textContent = 'O';

  if (checkWinner()) {
    statusText.textContent = 'Player O wins!';
    gameOver = true;
  } else {
    currentPlayer = 'X';
    statusText.textContent = `Player X's turn`;
  }
}

// Reset the game
resetBtn.onclick = () => {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  currentPlayer = 'X';
  gameOver = false;
  statusText.textContent = `Player X's turn`;
  createBoard();
};

// Initialize the game
createBoard();
