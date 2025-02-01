const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Constants
const SQUARE_SIZE = 20;
const CANVAS_SIZE = 400;
const SPEED = 150;

let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: -SQUARE_SIZE };
let nextDirection = direction;
let food = getRandomFoodPosition();
let score = 0;
let gameRunning = true;

function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
}

function drawSnake() {
    snake.forEach((segment, index) => drawSquare(segment.x, segment.y, index === 0 ? "darkgreen" : "green"));
}

function drawFood() {
    drawSquare(food.x, food.y, "red");
}

function getRandomFoodPosition() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * (CANVAS_SIZE / SQUARE_SIZE)) * SQUARE_SIZE,
            y: Math.floor(Math.random() * (CANVAS_SIZE / SQUARE_SIZE)) * SQUARE_SIZE
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
}

function moveSnake() {
    if (!gameRunning) return;

    direction = nextDirection;
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(newHead);

    // Check if food is eaten
    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        food = getRandomFoodPosition();
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];

    if (
        head.x < 0 || head.x >= CANVAS_SIZE || head.y < 0 || head.y >= CANVAS_SIZE || 
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        gameRunning = false;
        setTimeout(() => alert(`Game Over! Score: ${score}`), 10);
    }
}

function update() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    moveSnake();
    checkCollision();
    drawFood();
    drawSnake();
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && direction.y === 0) nextDirection = { x: 0, y: -SQUARE_SIZE };
    if (e.key === "ArrowDown" && direction.y === 0) nextDirection = { x: 0, y: SQUARE_SIZE };
    if (e.key === "ArrowLeft" && direction.x === 0) nextDirection = { x: -SQUARE_SIZE, y: 0 };
    if (e.key === "ArrowRight" && direction.x === 0) nextDirection = { x: SQUARE_SIZE, y: 0 };
    
    if (e.key === "Enter" && !gameRunning) {
        resetGame();
    }
});

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: -SQUARE_SIZE };
    nextDirection = direction;
    food = getRandomFoodPosition();
    score = 0;
    gameRunning = true;
}

setInterval(update, SPEED);
