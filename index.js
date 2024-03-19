document.addEventListener('DOMContentLoaded', () => {
     const canvas = document.getElementById('gameCanvas');
     const ctx = canvas.getContext('2d');

     const gridSize = 20;
     const gridSizeX = canvas.width / gridSize;
     const gridSizeY = canvas.height / gridSize;
     let snake = [{ x: 10, y: 10 }];
     let dx = 0;
     let dy = 0;
     let food = { x: 15, y: 15 };
     let score = 0;
     let highScore = localStorage.getItem('highScore') || 0;
     let foodsound = new Audio("images/munching.mp3");
     let ending = new Audio("images/ending.mp3");
     let movesound = new Audio("images/moving.mp3");

     function drawSnake() {
          ctx.fillStyle = 'green';
          snake.forEach(({ x, y }) => {
               ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
          });
     }

     function drawFood() {
          ctx.fillStyle = 'red';
          ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
     }

     function updateScore() {
          document.getElementById('score').textContent = score;
          document.getElementById('highScore').textContent = highScore;
     }

     function update() {
          const head = { x: snake[0].x + dx, y: snake[0].y + dy };
          snake.unshift(head);

          if (head.x === food.x && head.y === food.y) {
               score++;
               foodsound.play();
               if (score > highScore) {
                    highScore = score;
                    localStorage.setItem('highScore', highScore);
               }
               generateFood();
          } else {
               snake.pop();
          }

          updateScore();
     }

     function generateFood() {
          food.x = Math.floor(Math.random() * gridSizeX);
          food.y = Math.floor(Math.random() * gridSizeY);
     }

     function clearCanvas() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
     }

     function checkCollision() {
          const head = snake[0];
          if (head.x < 0 || head.x >= gridSizeX || head.y < 0 || head.y >= gridSizeY) {
               return true;
          }

          for (let i = 1; i < snake.length; i++) {
               if (head.x === snake[i].x && head.y === snake[i].y) {
                    return true;
               }
          }

          return false;
     }

     function main() {
          if (checkCollision()) {
               alert('Kyu nahi ho rahi h padhai, score is: ' + score);
               score = 0;
               ending.play();
               updateScore();
               return;
          }

          clearCanvas();
          drawFood();
          drawSnake();
          update();

          setTimeout(main, 235);
     }

     document.addEventListener('keydown', (event) => {
          const key = event.key;
          movesound.play();
          if (key === 'ArrowUp' && dy === 0) {
               dx = 0;
               dy = -1;
          } else if (key === 'ArrowDown' && dy === 0) {
               dx = 0;
               dy = 1;
          } else if (key === 'ArrowLeft' && dx === 0) {
               dx = -1;
               dy = 0;
          } else if (key === 'ArrowRight' && dx === 0) {
               dx = 1;
               dy = 0;
          }
     });

     generateFood();
     main();
});
