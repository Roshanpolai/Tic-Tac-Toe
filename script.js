let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let statusText = document.querySelector(".status");

let turnO = true; // Player O starts
let moveCount = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

function updateTurnText() {
    statusText.innerText = turnO ? "Player O's Turn" : "Player X's Turn";
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        box.innerText = turnO ? "O" : "X";
        box.disabled = true;
        moveCount++;

        if (checkWinner()) return;

        turnO = !turnO;
        updateTurnText();
    });
});

function checkWinner() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let val1 = boxes[a].innerText;
        let val2 = boxes[b].innerText;
        let val3 = boxes[c].innerText;

        if (val1 && val1 === val2 && val2 === val3) {
            boxes[a].classList.add("winner");
            boxes[b].classList.add("winner");
            boxes[c].classList.add("winner");
            statusText.innerText = `${val1} Wins! 🎉`;
            disableAllBoxes();
            return true;
        }
    }

    if (moveCount === 9) {
        statusText.innerText = "It's a Draw! 🤝";
        return true;
    }

    return false;
}

function disableAllBoxes() {
    boxes.forEach((box) => (box.disabled = true));
}

function enableAllBoxes() {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("winner");
    });
    moveCount = 0;
    turnO = true;
    updateTurnText();
}

resetBtn.addEventListener("click", enableAllBoxes);

// Initialize turn display
updateTurnText();

