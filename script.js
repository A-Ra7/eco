let score = 0;
let isPlaying = false;
let garbage;
let moveInterval = 1000; // Базовая скорость перемещения
let wasteSize = 50;    // Базовый размер мусора

let timeLeft = 60;
let timerInterval;

function startGame() {
    score = 0;
    timeLeft = 60;
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = timeLeft;
    isPlaying = true;
    creategarbage();
    
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    isPlaying = false;
    clearInterval(timerInterval);
    if (garbage) {
        garbage.remove();
        garbage = null;
    }
    alert(`Время вышло! Вы собрали ${score} из 50 единиц мусора. Попробуйте еще раз :-)`);
}

function creategarbage() {
    if (!isPlaying) return;
    
    if (garbage) {
        garbage.style.height = "0";
        garbage.style.width = "0";
        garbage.style.top = "0%";
        garbage.style.left = "50%";
    }

    garbage = document.createElement('div');
    garbage.className = 'garbage';
    garbage.onclick = catchgarbage;

    const gameField = document.getElementById('gameField');
    const maxX = gameField.offsetWidth - 50;
    const maxY = gameField.offsetHeight - 50;

    garbage.style.left = Math.random() * maxX + 'px';
    garbage.style.top = Math.random() * maxY + 'px';

    gameField.appendChild(garbage);

    let newPos = setTimeout(() => {
        if (garbage) {
            garbage.style.left = Math.random() * maxX + 'px';
            garbage.style.top = Math.random() * maxY + 'px';
        }
    }, 1000);
}

function catchgarbage() {
    garbage.style.backgroundСolor = "green";
    score++;
    document.getElementById('score').textContent = score;
    
    // Проверяем условие победы
    if (score >= 50) {
        victory();
        return;
    }
    
    creategarbage();
}

function victory() {
    isPlaying = false;
    clearInterval(timerInterval);
    if (garbage) {
        garbage.remove();
        garbage = null;
    }
    alert(`Поздравляем! Вы собрали весь мусор. \nВремя: ${60 - timeLeft} секунд\nОчки: ${score} \nА теперь соберите немного настоящего мусора и сделайте мир чище :-)`);
}

