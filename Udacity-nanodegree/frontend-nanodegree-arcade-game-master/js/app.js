//global variables - will be helpful to generate random positions and speed to the enemies
// possibleX will delay the new enemy appearance
// possibleY only allow Enemies apear at the stone/street blocks
var possibleX = [-100, -200, -250];
var possibleY = [60, 145, 230];
var possibleSp = [55, 80, 100, 130];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = possibleX[Math.floor(Math.random() * possibleX.length)];
    this.y = possibleY[Math.floor(Math.random() * possibleY.length)];
    this.speed = possibleSp[Math.floor(Math.random() * possibleSp.length)];
    
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
    this.x = this.x + this.speed * dt;
    
    //After the canvas limit, the Enemy will return to the position -100 
    if(this.x > 505) {
        this.x = -100;
        this.y = possibleY[Math.floor(Math.random() * possibleY.length)];
        this.speed = possibleSp[Math.floor(Math.random() * possibleSp.length)];
    }

    // check for collision. If it happens, player returns to the respawn position
    if (this.y == player.y && (this.x > player.x - 55 && this.x < player.x + 55)) {
        player.x = 200;
        player.y = 400;
        player.saved = 1;
        document.getElementsByClassName("points")[0].innerHTML='Oh-oh.. Let\'s try that again';
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-princess-girl.png'
    // will be counting how many times the player wins
    this.saved = 1;
}

Player.prototype.update = function() {

};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//execute this moves according to the keyCode
Player.prototype.handleInput = function(keyCode) {
    if (keyCode == 'up'){
        if(this.y <= 60){
            this.x = 200;
            this.y = 400;
            points = this.saved++;
            document.getElementsByClassName("points")[0].innerHTML='Are you wet? '+ points;
        }
        else{
            this.y = this.y - 85;
        }
    }

    if (keyCode == 'down'){
        if(this.y >= 400){
            this.y = this.y;
        }
        else {
         this.y = this.y + 85;
        }

    }
    if (keyCode == 'right'){
        if(this.x >= 400){
            this.x = this.x;
        }
        else{
        this.x = this.x + 50;
        }
    }

    if (keyCode == 'left'){
       if(this.x <=0){
            this.x = this.x;
        }
        else{
        this.x = this.x - 50;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (i=0; allEnemies.length <=5; i++){
    var bug = new Enemy();
    allEnemies.push(bug);
}

// Place the player object in a variable called player
var player = new Player();


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
