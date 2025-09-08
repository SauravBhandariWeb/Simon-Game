const allbtns = document.querySelectorAll('.container-btns button');
const start = document.querySelector('#start');

let arr = Array(9).fill(null);
let currentPlayer = 'X';

function runGame() {
    allbtns.forEach(btn => {
        btn.addEventListener('click', () => {
            let btnid = Number(btn.id);
            if (arr[btnid] != null) return;
            arr[btnid] = currentPlayer;

            if (arr[btnid] == 'X') {
                btn.classList.add('xplayer');
                btn.style.background = 'blue';
            } else if (arr[btnid] == 'O') {
                btn.classList.add('oplayer');
                btn.style.background = 'yellow';
            }

            btn.innerHTML = currentPlayer;
            makeSound(btn);
            checkMatch();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        });
    });
}

const player1 = document.querySelector('#player1 h3');
const player2 = document.querySelector('#player2 h3');

function checkMatch() {
    if (
        (arr[0] != null && arr[0] == arr[1] && arr[1] == arr[2]) ||
        (arr[3] != null && arr[3] == arr[4] && arr[4] == arr[5]) ||
        (arr[6] != null && arr[6] == arr[7] && arr[7] == arr[8]) ||
        (arr[0] != null && arr[0] == arr[3] && arr[3] == arr[6]) ||
        (arr[1] != null && arr[1] == arr[4] && arr[4] == arr[7]) ||
        (arr[2] != null && arr[2] == arr[5] && arr[5] == arr[8]) ||
        (arr[2] != null && arr[2] == arr[4] && arr[4] == arr[6]) ||
        (arr[0] != null && arr[0] == arr[4] && arr[4] == arr[8])
    ) {
        let p1 = document.querySelector('#player1');
        let p2 = document.querySelector('#player2');

        // if X win
        if (currentPlayer === 'X') {
            p1.style.background = 'blue';
            p2.style.color = 'black';
            arr.forEach((num, i) => {
                if (num === 'X') {
                    let btn = document.getElementById(`${i}`);
                    buttonOpecity(btn, btn, btn);
                    buttonTransition(btn, btn, btn);
                    setTimeout(() => location.reload(), 3000);
                }
            });
        }

        // if O win
        else if (currentPlayer === 'O') {
            p2.style.background = 'yellow';
            p2.style.color = 'black';
            arr.forEach((num, i) => {
                if (num === 'O') {
                    let btn = document.getElementById(`${i}`);
                    btn.style.opacity = '0';
                    btn.style.transition = '2s';
                    buttonOpecity(btn, btn, btn);
                    buttonTransition(btn, btn, btn);
                    brokenSound();
                    setTimeout(() => location.reload(), 2000);
                }
            });
        }
    } else if (!arr.some(e => e === null)) {
        start.innerHTML = 'Draw';
        setTimeout(() => location.reload(), 2000);
    }
}

// 🔊 tap sound
let audio = document.querySelector('.audiotap');
function makeSound() {
    if (audio) {
        audio.currentTime = 0.95;
        audio.play();
        setTimeout(() => audio.pause(), 1000);
    }
}

// 🔊 win sound
const broken = document.querySelector('.broken');
function brokenSound() {
    if (broken) {
        broken.currentTime = 0;
        broken.play();
    }
}

// player win animation
function buttonOpecity(o1, o2, o3) {
    o1.style.opacity = '0';
    o2.style.opacity = '0';
    o3.style.opacity = '0';
}

function buttonTransition(o1, o2, o3) {
    o1.style.transition = '2s';
    o2.style.transition = '2s';
    o3.style.transition = '2s';
}

// start the game
start.addEventListener('click', () => {
    start.style.color = 'white';
    start.style.background = 'orange';
    runGame();
});

// restart the game
const restart = document.querySelector('#restart');
restart.addEventListener('click', () => location.reload());
