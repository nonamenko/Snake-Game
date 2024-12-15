const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: -20 };
let food = { x: 100, y: 100 };
let score = 0;

function drawSnake() {
    snake.forEach((segment) => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x, segment.y, 20, 20);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 20, 20);
}

function moveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
        food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };
        score++;
    } else {
        snake.pop();
    }
}

function checkCollision() {
    if (
        snake[0].x < 0 ||
        snake[0].x >= canvas.width ||
        snake[0].y < 0 ||
        snake[0].y >= canvas.height ||
        snake.slice(1).some((segment) => segment.x === snake[0].x && segment.y === snake[0].y)
    ) {
        alert(`Гра закінчена! Ваш рахунок: ${score}`);
        document.location.reload();
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    moveSnake();
    drawSnake();
    checkCollision();
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && direction.y === 0) direction = { x: 0, y: -20 };
    if (e.key === "ArrowDown" && direction.y === 0) direction = { x: 0, y: 20 };
    if (e.key === "ArrowLeft" && direction.x === 0) direction = { x: -20, y: 0 };
    if (e.key === "ArrowRight" && direction.x === 0) direction = { x: 20, y: 0 };
});

setInterval(update, 150);
