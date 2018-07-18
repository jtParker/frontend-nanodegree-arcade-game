// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -150;
    this.y = this.randY();
    this.speed = this.randSpeed(100, 400);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if ( this.x > 450) {
      this.x = -150;
      this.y = this.randY();
      this.speed = this.randSpeed(100, 400);
    }
    this.x += this.speed * dt;
};

// Return a random enemy movement speed.
Enemy.prototype.randSpeed = function(min, max) {
    return Math.random() * (max - min) + min;
}

// Return a random enemy y coordinate.
Enemy.prototype.randY = function() {
    this.yArr = [48, 136, 224];
    return this.yArr[Math.floor(Math.random() * this.yArr.length)];
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
  this.x = 202;
  this.y = 400;
  this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function(dt) {
};

Player.prototype.handleInput = function(keyCode) {

    if (keyCode === 'left' && this.x === 0) {
        return;

    } else if (keyCode === 'left') {
        this.x -= 101;

    } else if (keyCode === 'up' && this.y === -40) {
        return;

    } else if (keyCode === 'up') {
        this.y -= 88;

    } else if (keyCode === 'right' && this.x === 404) {
        return;

    } else if (keyCode === 'right') {
        this.x += 101;

    } else if (keyCode === 'down' && this.y === 400) {
        return;

    } else if (keyCode === 'down') {
        this.y += 88;
    }
};

function detectCollision() {
  if (Player.x <= Enemy.x + 50 && Player.y === Enemy.y) {
    Player.x = 202;
    Player.y = 400;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const allEnemies = [enemy1, enemy2, enemy3];
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
