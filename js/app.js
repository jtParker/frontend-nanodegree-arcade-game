'use strict';
/*
    Enemy Object
*/

var Enemy = function(player) {
    this.x = -150;
    this.y = this.randY();
    this.speed = this.randSpeed(100, 400);
    this.sprite = 'images/enemy-bug.png';
    this.width = 30;
    this.height = 60;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
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
};

// Return a random enemy y coordinate.
Enemy.prototype.randY = function() {
    this.yArr = [48, 136, 224];
    return this.yArr[Math.floor(Math.random() * this.yArr.length)];
};

// Detect a collision between the player and enemy
Enemy.prototype.detectCol = function(player) {
  let distance = player.x - this.x;

  if(this.x < player.x + player.width &&
    this.x + this.width > player.x &&
    this.y < player.y + player.height &&
    this.height + this.y > player.y) {

    window.setTimeout(player.restart(), 5000);
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
    Player Object
*/

const Player = function(enemy) {
  this.x = 202;
  this.y = 400;
  this.sprite = 'images/char-boy.png';
  this.width = 80;
  this.height = 60;
  this.winner = false;
  this.replay = false;
  this.currentScore = 0;
  this.highScore = 0;
  this.totalScore = 0;
  this.scoreBoard = document.getElementById('score');
  this.modalScoreboard = document.getElementById('modal-score');
  this.highScoreboard = document.getElementById('high-score');
  this.modalHighScore = document.getElementById('modal-high-score');
  this.totalScoreboard = document.getElementById('total-score');
  this.modalTotalScore = document.getElementById('modal-total-score');
};

// Updates player object
Player.prototype.update = function(dt) {
  if (player.y === -40) {
    window.setTimeout(this.winGame(), 5000);
  }
};

const winModal = document.querySelector('.win-modal');
const winContent = document.querySelector('.win-modal-content');

// Fires when player wins reaches the water blocks
Player.prototype.winGame = function() {

  if (this.currentScore > this.highScore) {
    this.highScore = this.currentScore;
  }

  this.winner = true;
  this.modalScoreboard.innerHTML = this.currentScore;
  this.modalHighScore.innerHTML = this.highScore;
  this.totalScore += this.currentScore;
  this.modalTotalScore.innerHTML = this.totalScore;
  this.charUnlock();

  winModal.classList.toggle('closed');
  winContent.classList.toggle('closed');

};

Player.prototype.restart = function() {
  this.x = 202;
  this.y = 400;
  this.currentScore = 0;
  this.scoreBoard.innerHTML = player.currentScore;
};

// Method to restart game after winning
Player.prototype.playAgain = function() {
  this.winner = false;
  this.replay = true;
  this.scoreBoard.innerHTML = 0;
  this.currentScore = 0;
  this.modalScoreboard.innerHTML = 0;
  this.highScoreboard.innerHTML = this.highScore;
  this.totalScoreboard.innerHTML = this.totalScore;
  this.x = 202;
  this.y = 400;
  winModal.classList.toggle('closed');
  winContent.classList.toggle('closed');
  main();
};

// Unlock characters after earning points
Player.prototype.charUnlock = function() {
  this.boy = document.getElementById('boy');
  this.catGirl = document.getElementById('cat-girl');
  this.hornGirl = document.getElementById('horn-girl');
  this.pinkGirl = document.getElementById('pink-girl');
  this.princess = document.getElementById('princess');

  if (this.totalScore >= 400) {
    this.pinkGirl.classList.remove('closed');
    this.hornGirl.classList.remove('closed');
    this.catGirl.classList.remove('closed');

  } else if (this.totalScore >= 300) {
    this.hornGirl.classList.remove('closed');
    this.catGirl.classList.remove('closed');

  } else if (this.totalScore >= 200) {
    this.catGirl.classList.remove('closed');
  }

  if (this.highScore >= 300) {
    this.princess.classList.remove('closed');
  }
};

// Input handling for player
Player.prototype.handleInput = function(keyCode, enemy) {

    if (keyCode === 'left' && this.x === 0) {
        return;

    } else if (keyCode === 'left') {
        this.x -= 101;

    } else if (keyCode === 'up' && this.y === -40) {
        return;

    } else if (keyCode === 'up' && this.y - enemy.y < 176 && this.x < enemy.x + 50 || this.x < enemy.x - 50) {
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

// Draws the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
  Gem Object
*/

const Gems = function() {
  this.xArr = [20, 121, 222, 323, 424];
  this.yArr = [352, 264, 176];
  this.x = this.xArr[randInt(0,4)];
  this.y = this.yArr[randInt(0,2)];
  this.blueGem = 'images/Gem-Blue.png';
  this.greenGem = 'images/Gem-Green.png';
  this.orangeGem = 'images/Gem-Orange.png';
  this.gemArray = [this.blueGem, this.greenGem, this.orangeGem];
  this.width = 40;
  this.height = 30;
  this.weights = [0.5, 0.3, 0.1];
  this.weightedArr = [];
  this.sprite = this.randGem();
};

// Weighted random selection for gems. Code thanks to http://codetheory.in/weighted-biased-random-number-generation-with-javascript-based-on-probability/
Gems.prototype.randGem = function() {
  let randIndex;
  for (let i = 0; i < this.weights.length; i++) {
    let multiples = this.weights[i] * 100;

    for (let j = 0; j < multiples; j++) {
      this.weightedArr.push(this.gemArray[i]);
    }
  }
  randIndex = randInt(0, this.weightedArr.length-1);
  return this.weightedArr[randIndex];
};

Gems.prototype.detectCol = function(player) {
  let distance = player.x - this.x;

  if(this.x < player.x + player.width &&
    this.x + this.width > player.x &&
    this.y < player.y + player.height &&
    this.height + this.y > player.y) {

      if (this.sprite === this.blueGem) {
        player.currentScore += 5;
        player.scoreBoard.innerHTML = player.currentScore;

      } else if (this.sprite === this.greenGem) {
        player.currentScore += 10;
        player.scoreBoard.innerHTML = player.currentScore;

      } else if (this.sprite === this.orangeGem) {
        player.currentScore += 20;
        player.scoreBoard.innerHTML = player.currentScore;
      }
      this.sprite = this.randGem();
      this.x = this.xArr[randInt(0,4)];
      this.y = this.yArr[randInt(0,2)];
  }
};

// Draw gems on the screen
Gems.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Function to call all collision functions
function detectCollision(player) {
  enemy1.detectCol(player);
  enemy2.detectCol(player);
  enemy3.detectCol(player);
  gem.detectCol(player);
}


// Returns random integer
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
}

// Instantiating objects
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const allEnemies = [enemy1, enemy2, enemy3];
const player = new Player();
const gem = new Gems();


// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'left',
        68: 'right',
        83: 'down',
        87: 'up'
    };
    e.preventDefault();

    player.handleInput(allowedKeys[e.keyCode], Enemy);
});

// Listen for clicks
document.addEventListener('click', function(e) {
  let replayBtn = document.getElementById('replay-btn');

  if (e.target === replayBtn) {
    player.playAgain();

  } else if (e.target === player.boy) {
    player.sprite = 'images/char-boy.png';
    player.playAgain();

  } else if (e.target === player.catGirl) {
    player.sprite = 'images/char-cat-girl.png';
    player.playAgain();

  } else if (e.target === player.hornGirl) {
    player.sprite = 'images/char-horn-girl.png';
    player.playAgain();

  } else if (e.target === player.pinkGirl) {
    player.sprite = 'images/char-pink-girl.png';
    player.playAgain();

  } else if (e.target === player.princess) {
    player.sprite = 'images/char-princess-girl.png';
    player.playAgain();

  }
});
