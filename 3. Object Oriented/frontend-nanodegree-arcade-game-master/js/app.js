// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = speed;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/char-boy.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;

  // canvas off reset
  if (this.x > 550) {
    this.x = -100;
    this.speed = 100 + Math.floor(Math.random() * 512);
  }

  // hit character
  if (
    player.x < this.x + 50 &&
    player.x + 50 > this.x &&
    player.y < this.y + 50 &&
    50 + player.y > this.y
  ) {
    player.x = 0;
    player.y = 380;
    // after collision effects
    var collision_effect = document.querySelector("body");
    collision_effect.style.backgroundColor = "red";
    setTimeout(function() {
      collision_effect.style.backgroundColor = "white";
    }, 500);
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;

  this.sprite = "images/enemy-bug.png";
};

Player.prototype.update = function(dt) {
  if (this.y > 380) {
    this.y = 380;
  }

  if (this.x > 400) {
    this.x = 400;
  }

  if (this.x < 0) {
    this.x = 0;
  }

  // Check for player reaching top of canvas and winning the game
  if (this.y < 0) {
    // after win effects
    document.querySelector("body").style.backgroundColor = "blue";
    setTimeout(function() {
      document.querySelector("body").style.backgroundColor = "white";
      this.x = 0;
      this.y = 380;
    }, 1000);
  }
};

// Allows player to moves when key is pressed
Player.prototype.handleInput = function(press) {
  if (this.y > 0) {
    switch (press) {
      case "left":
        this.x -= this.speed + 50;
        break;
      case "up":
        this.y -= this.speed + 30;
        break;
      case "right":
        this.x += this.speed + 50;
        break;
      case "down":
        this.y += this.speed + 30;
        break;
    }
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [];
var player = new Player(0, 380, 50);
var enemySpawnY = [60, 140, 220];

enemySpawnY.forEach(function(spawnY) {
  enemySpawn = new Enemy(0, spawnY, 100 + Math.floor(Math.random() * 512));
  allEnemies.push(enemySpawn);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
