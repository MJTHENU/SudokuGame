// Initialize a 2D array for the Sudoku board
let board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

// Function to render the Sudoku board
function renderBoard() {
    const boardElement = document.getElementById('sudoku-board');
    boardElement.innerHTML = '';
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('input');
            cell.type = 'text';
            cell.className = 'sudoku-cell';
            cell.value = board[row][col] !== 0 ? board[row][col] : '';
            if (board[row][col] !== 0) {
                cell.readOnly = true;
                cell.classList.add('read-only');
            }
            cell.addEventListener('input', (event) => {
                handleInput(event, row, col);
            });
            boardElement.appendChild(cell);
        }
    }
}

// Function to handle user input
function handleInput(event, row, col) {
    const value = parseInt(event.target.value);
    if (value >= 1 && value <= 9) {
        board[row][col] = value;
    } else {
        event.target.value = '';
        board[row][col] = 0;
    }
    checkSolution();
}

// Function to check if the current state of the board is a valid Sudoku solution
function checkSolution() {
    const isValid = validateBoard();
    const messageElement = document.getElementById('message');
    if (isValid) {
        messageElement.textContent = 'Congratulations! The solution is correct.';
        messageElement.style.color = 'green';
    } else {
        messageElement.textContent = 'There are errors in the solution. Please try again.';
        messageElement.style.color = 'red';
    }
}

// Function to validate the entire board
function validateBoard() {
    clearErrors();
    return validateRows() && validateColumns() && validateSubgrids();
}

// Function to validate rows
function validateRows() {
    for (let row = 0; row < 9; row++) {
        const seen = new Set();
        for (let col = 0; col < 9; col++) {
            const value = board[row][col];
            if (value !== 0) {
                if (seen.has(value)) {
                    highlightError(row, col);
                    return false;
                }
                seen.add(value);
            }
        }
    }
    return true;
}

// Function to validate columns
function validateColumns() {
    for (let col = 0; col < 9; col++) {
        const seen = new Set();
        for (let row = 0; row < 9; row++) {
            const value = board[row][col];
            if (value !== 0) {
                if (seen.has(value)) {
                    highlightError(row, col);
                    return false;
                }
                seen.add(value);
            }
        }
    }
    return true;
}

// Function to validate 3x3 subgrids
function validateSubgrids() {
    for (let startRow = 0; startRow < 9; startRow += 3) {
        for (let startCol = 0; startCol < 9; startCol += 3) {
            if (!validateSubgrid(startRow, startCol)) {
                return false;
            }
        }
    }
    return true;
}

// Function to validate a single 3x3 subgrid
function validateSubgrid(startRow, startCol) {
    const seen = new Set();
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const value = board[startRow + row][startCol + col];
            if (value !== 0) {
                if (seen.has(value)) {
                    highlightError(startRow + row, startCol + col);
                    return false;
                }
                seen.add(value);
            }
        }
    }
    return true;
}

// Function to highlight errors on the board
function highlightError(row, col) {
    const cells = document.querySelectorAll('.sudoku-cell');
    const index = row * 9 + col;
    cells[index].classList.add('error');
}

// Function to clear all error highlights
function clearErrors() {
    const cells = document.querySelectorAll('.sudoku-cell');
    cells.forEach(cell => cell.classList.remove('error'));
}

// Initial render
renderBoard();
