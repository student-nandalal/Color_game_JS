let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "blue"];

let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0;

let h2 = document.querySelector("h2");
let highScoreDisplay = document.querySelector("#highScore"); // optional display element

// Initial display of high score
if (highScoreDisplay) {
    highScoreDisplay.innerText = `High Score: ${highScore}`;
}

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game Started!");
        started = true;
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randInx = Math.floor(Math.random() * 4); // fixed: should be 4 not 3
    let randColer = btns[randInx];
    let randBtn = document.querySelector(`.${randColer}`);
    gameSeq.push(randColer);
    console.log(gameSeq);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        updateHighScore(); // update if needed
        h2.innerHTML = `Game Over! <b>Your score: Level ${level}</b><br>Press any key to restart`;

        document.querySelector("body").style.background = "red";
        setTimeout(function () {
            document.querySelector("body").style.background = "white";
        }, 150);
        reset();
    }
}

function updateHighScore() {
    if (level > highScore) {
        highScore = level;
        localStorage.setItem("highScore", highScore);
        if (highScoreDisplay) {
            highScoreDisplay.innerText = `High Score: ${highScore}`;
        }
    }
}

function btnpress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allbtn = document.querySelectorAll(".btn");
for (let btn of allbtn) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}
