
let p = document.querySelector('p');
let level = 0;
let start = false;
let userSequence = [];
let gameSequence = [];


// Start the game
function startTheGame() {
    body.classList.remove('warning');
    if (!start) {
        start = true;
        level = 0;
        stopMusic();
        gameSequence = [];
        userSequence = [];
        p.innerText = "Game Started";
        levelGame();
    }
}

// Move to the next level
function levelGame() {
    userSequence = []; // reset user sequence for this level
    level++;
    p.innerText = `Level ${level}`;
    let btns = [first, second, third, fourth];
    let randIndex = Math.floor(Math.random() * 4);
    let randomBtn = btns[randIndex];// random btn index 
    gameSequence.push(randomBtn.id); // random btn id
    flash(randomBtn);// flash random btn blocks 
    // flashSound(randomBtn);
}

// Flash effect for game buttons
function flash(element) {
    element.classList.add('flash');
    audio.currentTime = 0; // restart from beginning
    audio.play();
    setTimeout(() => {
        element.classList.remove('flash');
        audio.pause();
    }, 250);// flash after 250 delay of seconds
}

// Flash effect for user clicks
function userFlash(element) {
    element.classList.add('user');
    setTimeout(() => {
        element.classList.remove('user');
    }, 250);
}

// Handle user button clicks
function btnPrint() {
    let btn = this;
    userFlash(btn);
    userSequence.push(btn.id);
    gameCheck(userSequence.length - 1);
}

// Check the user's sequence

function gameCheck(currentIndex) {
    if (userSequence[currentIndex] === gameSequence[currentIndex]) {
        if (userSequence.length === gameSequence.length) {
            setTimeout(levelGame, 1000);
        }
    } else {
        p.innerText = "Game Over! Press any key to restart"// game over
        gameOver();
        start = false;
    }
}

let gameOverInterval;
 
let audio = document.querySelector('.btnEffect');
let gameOverMusic = document.querySelector('.gameOver');
function gameOver() {
    gameOverInterval = setInterval(() => {
        gameOverMusic.currentTime = 0;
        gameOverMusic.play();
    }, 1000);
}

function stopMusic() {
    clearInterval(gameOverInterval);
}

// Add click listeners to all buttons
let btnAll = document.querySelectorAll('.container div');

btnAll.forEach(btn => {
    btn.addEventListener('click', btnPrint);
});

// Start the game on key press
let body = document.querySelector('body');
body.addEventListener('keypress', startTheGame);


