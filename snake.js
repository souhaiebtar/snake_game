let score = 0;
let eatSound = new Audio('eat.mp3');
let gameOverSound = new Audio('gameover.mp3');
// Get the canvas element from the HTML document
const canvas = document.getElementById('game');
// Get the restart button
let restartButton = document.getElementById('restart-button');

// Get the 2D rendering context for the canvas
const context = canvas.getContext('2d');

// Define the size of each square in the grid
const box = 32;
// Initialize the snake as an array of objects with x and y coordinates
let snake = [];
snake[0] = { x: 8 * box, y: 8 * box };
// Set the initial direction of the snake
let direction = "right";

// Create the food object with random x and y coordinates
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Define the obstacles
let obstacles = [
    { x: 3 * box, y: 3 * box },
    { x: 5 * box, y: 7 * box },
    { x: 9 * box, y: 4 * box },
    // Add more obstacles as needed
];

// Function to draw the obstacles
function drawObstacles() {
    for(let i = 0; i < obstacles.length; i++) {
        context.fillStyle = "black";
        context.fillRect(obstacles[i].x, obstacles[i].y, box, box);
    }
}

// Function to draw the game background
function createBG() {
    context.fillStyle = "#c0d3c0";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Function to draw the snake
function createSnake() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Function to draw the food
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Event listener for keydown events to change the direction of the snake
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

// Function to start and update the game
function startGame() {


    
    // Wrap the snake around to the other side of the canvas if it reaches the edge
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    
    // Check if the snake has collided with itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            // Play the game over sound
            gameOverSound.play();
            // Show the restart button
            restartButton.style.display = 'block';
        }
    }

    
    

    // Draw the game elements
    createBG();
    createSnake();
    drawObstacles();
    drawFood();

    // Get the next position of the snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Update the position based on the direction
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    // Check if the snake hits an obstacle
    for(let i = 0; i < obstacles.length; i++) {
        if(snakeX == obstacles[i].x && snakeY == obstacles[i].y) {
            clearInterval(game);
            // Play the game over sound
            gameOverSound.play();
            // Show the restart button
            restartButton.style.display = 'block';
        }
    }

    // Check if the snake has eaten the food
    if (snakeX != food.x || snakeY != food.y) {
        // Remove the last segment of the snake
        snake.pop();
    } else {
        score++;
        // Generate a new food object at a random position
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        // Play the eat sound
        eatSound.play();
        document.getElementById('score').innerText = 'Score: ' + score;
    }

    // Create a new head for the snake
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    

    // Add the new head to the front of the snake
    snake.unshift(newHead);
}

// Start the game loop
let game = setInterval(startGame, 100);

// Add an event listener to the restart button
restartButton.addEventListener('click', function() {
    // Hide the restart button
    restartButton.style.display = 'none';

    // Reset the game state
    snake = [{ x: 8 * box, y: 8 * box }];
    direction = 'right';
    food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    };

    // Restart the game
    game = setInterval(startGame, 100);
});