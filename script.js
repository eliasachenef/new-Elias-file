const PageContent =document.querySelector('#page-content')
      const LoaderContainer =document.querySelector('.loader-container')
      window.addEventListener("load", () =>{
        LoaderContainer.classList.add("hidden")
        PageContent.classList.add("visible") 
    })
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
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

const statusDisplay = document.getElementById("status");

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.innerHTML = "It's a draw!";
        isGameActive = false;
        return;
    }

    changePlayer();
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
}

function makeMove(index) {
    if (gameState[index] !== "" || !isGameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    document.getElementById(`cell${index}`).innerText = currentPlayer;
    handleResultValidation();
}

function restartGame() {
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = "");
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
}

// Initialize the game status
statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
