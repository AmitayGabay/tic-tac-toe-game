let parentDivOfPlayer;
let parentDivOfThoseWhoDoNotPlay = document.querySelector(".player-x");
const arrOfTheValuesInTheGameTable = new Array(10);
let valueInTheSquare;
let positionInTheTable;
let isEmptySquare = true;
const message = document.querySelector(".message");
const table = document.querySelector(".table-game");
const btn = document.querySelector(".btn");

const allowDrop = (e) => {
    e.preventDefault();
    if (e.target.id.includes("drag") || arrOfTheValuesInTheGameTable[+e.target.id[6]]) isEmptySquare = false;
    else isEmptySquare = true;
}

const drag = (e) => {
    if (e.target.id.charAt(4) === "O") {
        valueInTheSquare = 2;
    } else {
        valueInTheSquare = 1;
    }
    e.dataTransfer.setData("text", e.target.id);
    let dragged = document.getElementById(e.target.id);
    parentDivOfPlayer = dragged.parentElement;
}

const drop = (e) => {
    if (isEmptySquare) {
        e.preventDefault();
        let data = e.dataTransfer.getData("text");
        e.target.appendChild(document.getElementById(data));
        positionInTheTable = Number(e.target.id.charAt(6));
        arrOfTheValuesInTheGameTable[positionInTheTable] = valueInTheSquare;
        let result = calculateWin();
        if (result.includes("winner")) {
            gameOverWithWinner(valueInTheSquare);
        } else if (result === "tie") {
            gameOverWithTie();
        } else {
            parentDivOfThoseWhoDoNotPlay.classList.remove("disabledbutton");
        }
        parentDivOfPlayer.classList.add("disabledbutton");
        parentDivOfThoseWhoDoNotPlay = parentDivOfPlayer;
    }
    else alert("Invalid location")
}

const calculateWin = () => {
    let roules = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]
    for (let i = 0; i < roules.length; i++) {
        const [a, b, c] = roules[i];
        if (arrOfTheValuesInTheGameTable[a] && arrOfTheValuesInTheGameTable[a] === arrOfTheValuesInTheGameTable[b] && arrOfTheValuesInTheGameTable[b] === arrOfTheValuesInTheGameTable[c]) {
            return "there is a winner";
        }
    }
    for (let i = 1; i < arrOfTheValuesInTheGameTable.length; i++) {
        if (!arrOfTheValuesInTheGameTable[i]) return "the game continues";
    }
    return "tie";
}

const gameOverWithWinner = (numberOfTheWinningPlayer) => {
    const span = document.querySelector(`.span${numberOfTheWinningPlayer}`);
    span.innerHTML = "is the winner";
    message.innerHTML = "Game Over!";
    actionsToPerformWhenGameOver();
}

const gameOverWithTie = () => {
    message.innerHTML = "The Game Ended In A Tie!";
    actionsToPerformWhenGameOver();
}

const actionsToPerformWhenGameOver = () => {
    table.classList.add("disabledbutton");
    btn.style.display = "block";
    btn.addEventListener("click", () => {
        window.location.reload();
    });
}