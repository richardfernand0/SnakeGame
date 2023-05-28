const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

// Set the size of the canvas
canvas.width = 400;
canvas.height = 400;

// Define the initial snake position and speed
let snake = [{ x: 200, y: 200 }];
let dx = 10;
let dy = 0;

// Define the initial food position
let food = { x: 0, y: 0 };

// Set random position for the food
function setFoodPosition() {
  food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
  food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

// Set the initial food position
setFoodPosition();

// Main game loop
function gameLoop() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Update the snake position
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check if the snake has hit the border or touched itself
  if (
    snake[0].x < 0 ||
    snake[0].x >= canvas.width ||
    snake[0].y < 0 ||
    snake[0].y >= canvas.height ||
    isSnakeTouchingItself()
  ) {
    // Game over condition
    alert('Game Over');
    return;
  }

  // Check if the snake has eaten the food
  const hasEatenFood = snake[0].x === food.x && snake[0].y === food.y;

  if (hasEatenFood) {
    // Increase the snake's length by 1 pixel
    snake.push({});
    setFoodPosition();
  } else {
    snake.pop();
  }

  // Draw the snake
  snake.forEach((segment, index) => {
    const color = index === 0 ? '#000' : getRandomColor();
    drawSegment(segment.x, segment.y, color);
  });

  // Draw the food
  drawSegment(food.x, food.y, getRandomColor());

  // Call the game loop again
  setTimeout(gameLoop, 100);
}

// Draw a single segment (snake or food)
function drawSegment(x, y, color) {
  context.fillStyle = color;
  context.fillRect(x, y, 10, 10);
}

// Generate a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Check if the snake is touching itself
function isSnakeTouchingItself() {
  const [head, ...body] = snake;
  return body.some(segment => segment.x === head.x && segment.y === head.y);
}

// Handle keyboard input
document.addEventListener('keydown', changeDirection);

// Change the snake's direction based on arrow key pressed
function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;

  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }

  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }

  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }

  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

// Start the game
gameLoop();
