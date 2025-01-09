const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Add styles for X and O
    if (currentPlayer === 'X') {
        cell.classList.add('red'); // Apply the red style for X
        document.body.style.backgroundColor = 'red'; // Change background to red
    } else {
        cell.classList.add('blue'); // Apply the blue style for O
        document.body.style.backgroundColor = 'blue'; // Change background to blue
    }

    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameActive = false;
            message.textContent = `${board[a]} wins!`;
            return;
        }
    }

    if (!board.includes('')) {
        message.textContent = 'It\'s a draw!';
        isGameActive = false;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    message.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('red', 'blue'); // Remove styles
    });
    document.body.style.backgroundColor = ''; // Reset background color
}

// Add event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
