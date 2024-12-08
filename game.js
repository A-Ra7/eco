let score;
let isPlaying = false;
let garbage;
let wasteSize = 50;      // Размер мусора
let moveInterval = 1000; // Cкорость перемещения
let timeLeft        
let timerInterval;

// Начинаем игру
function startGame() {
    score = 0;
    timeLeft = 60; // Время игры
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

// Конец игры
function endGame() {
    isPlaying = false;
    clearInterval(timerInterval);
    if (garbage) {
        garbage.remove();
        garbage = null;
    }
    alert(`Время вышло! \n\nВы собрали ${score} из 50 единиц мусора. \n\nНадо собрать весь мусор. Попробуйте еще раз :-)`);
}

// Создаём мусор
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

// Собрали мусор
function catchgarbage() {
    garbage.style.backgroundСolor = "green";
    score++;
    document.getElementById('score').textContent = score;
    
    if (score >= 50) { // Количество мусора
        victory();
        return;
    }
    
    creategarbage();
}

// Победа
function victory() {
    isPlaying = false;
    clearInterval(timerInterval);
    if (garbage) {
        garbage.remove();
        garbage = null;
    }
    alert(`Поздравляем! Вы собрали весь мусор. \n\nВремя: ${60 - timeLeft} секунд - Очки: ${score} \n\nА теперь соберите немного настоящего мусора и сделайте мир чище :-)`);
}

