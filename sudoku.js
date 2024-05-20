// Define a Sudoku puzzle (0 represents empty cells) in a 1D array
let board = [
    5, 0, 4, 0, 7, 0, 0, 0, 0,
    6, 0, 0, 1, 9, 5, 0, 0, 0,
    0, 9, 8, 0, 0, 0, 0, 6, 0,
    8, 0, 0, 0, 6, 0, 0, 0, 3,
    4, 0, 0, 8, 0, 3, 0, 0, 1,
    7, 0, 0, 0, 2, 0, 0, 0, 6,
    0, 6, 0, 0, 0, 0, 2, 8, 0,
    0, 0, 0, 4, 1, 9, 0, 0, 5,
    0, 0, 0, 0, 8, 0, 0, 7, 9
];

// Convert 1D index to row and column
function RowCol(index) {
    let row = Math.floor(index / 9);  // Calculate row
    let col = index % 9;              // Calculate column
    return [row, col];
}

// Convert row and column to 1D index
function ColIndex(row, col) {
    return row * 9 + col;
}

// Check if a number can be placed at the given position
function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        // Check row, column, and 3x3 subgrid for duplicates
        if (board[ColIndex(row, i)] === num || 
            board[ColIndex(i, col)] === num || 
            board[ColIndex(Math.floor(row / 3) * 3 + Math.floor(i / 3), Math.floor(col / 3) * 3 + i % 3)] === num) {
            return false;  // Not valid if duplicate found
        }
    }
    return true;  // Valid if no duplicates found
}

// Find the next empty cell (represented by 0)
function findEmptyCell(board) {
    for (let i = 0; i < 81; i++) {
        if (board[i] === 0) return i;  // Return index of empty cell
    }
    return null;  // Return null if no empty cells
}

// Sudoku solving algorithm using backtracking
function solveSudoku(board) {
    const emptyIndex = findEmptyCell(board);  // Find the next empty cell
    if (emptyIndex === null) return true;     // Puzzle solved if no empty cells

    const [row, col] = RowCol(emptyIndex);  // Get row and column from index
    for (let num = 1; num <= 9; num++) {
        if (isValid(board, row, col, num)) {  // Check if number is valid
            board[emptyIndex] = num;  // Place number on the board
            if (solveSudoku(board)) return true;  // Recursively try to solve the rest
            board[emptyIndex] = 0;  // Reset cell if solution not found
        }
    }
    return false;  // Return false if no solution found
}

// Solve the Sudoku puzzle
if (solveSudoku(board)) {
    console.log("Solved Board:");
    console.log(board);
} else {
    console.log("No solution exists!");
}
