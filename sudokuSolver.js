class SudokuSolver {
    constructor() {
        this.grid = [];
    }

    // Method to set the initial puzzle grid
    setGrid(grid) {
        this.grid = grid;
    }

    // Method to check if a number can be placed in a specific cell
    isValidMove(row, col, num) {
        // Check if the number is already present in the row
        for (let i = 0; i < 9; i++) {
            if (this.grid[row * 9 + i] === num) {
                return false;
            }
        }

        // Check if the number is already present in the column
        for (let i = 0; i < 9; i++) {
            if (this.grid[i * 9 + col] === num) {
                return false;
            }
        }

        // Check if the number is already present in the 3x3 box
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.grid[(startRow + i) * 9 + startCol + j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    // Method to solve the Sudoku puzzle
    solve() {
        const emptyCell = this.findEmptyCell();
        if (!emptyCell) {
            return true; // Puzzle solved successfully
        }

        const [row, col] = emptyCell;

        // Try placing numbers 1 to 9 in the empty cell
        for (let num = 1; num <= 9; num++) {
            if (this.isValidMove(row, col, num)) {
                this.grid[row * 9 + col] = num;

                if (this.solve()) {
                    return true;
                }

                // If placing num in (row, col) doesn't lead to a solution, backtrack
                this.grid[row * 9 + col] = 0;
            }
        }

        return false; // No valid number can be placed in this cell
    }

    // Method to find an empty cell in the grid
    findEmptyCell() {
        for (let i = 0; i < 81; i++) {
            if (this.grid[i] === 0) {
                return [Math.floor(i / 9), i % 9];
            }
        }
        return null; // If no empty cell is found
    }

    // Method to print the grid to the console
    printGrid() {
        for (let i = 0; i < 9; i++) {
            console.log(this.grid.slice(i * 9, (i + 1) * 9).join(" "));
        }
    }
}


// Example usage
const solver = new SudokuSolver();

// Define the initial puzzle grid (0 represents empty cells)
const initialGrid = [
    0, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 5, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 8, 0, 0,
    0, 9, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0
];

solver.setGrid(initialGrid);

console.log("Initial Puzzle:");
solver.printGrid();

console.log("\nSolving...\n");

if (solver.solve()) {
    console.log("Solution:");
    solver.printGrid();
} else {
    console.log("No solution exists.");
}
