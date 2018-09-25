// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    if(this.x < this.boundary) {
        this.x += this.speed * dt;
    }
    else {
        this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
class Hero {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
        
    }
// Player's image render
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
// Player's movement
    handleInput(input) {
        switch(input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= this.jump;
                }
                break;
            case 'right':
                if (this.x < this.step * 4) {
                    this.x += this.step;
                }
                break;
            case 'down':
                if (this.y < this.jump * 4) {
                    this.y += this.jump;
                }
                break;
        }
    }

    update() {
        // If the player and enemy touch eachother, player loses, game resets
        for(let enemy of allEnemies) {

            if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x
        && enemy.x < this.x + this.step/2)) {
                this.reset();
            }
        // If player reaches the river without touching the enemy, it wins
        }
        if(this.y === 55){
            this.victory = true;
            
        }

    }
    // When the game resets player goes back to the same location
    reset() {
        this.y = this.startY;
        this.x = this.startX;
    }
}
// Place the player object in a variable called player
const player = new Hero();
const bug1 = new Enemy(-101,0,200);
const bug2 = new Enemy(-101,83,300);
const bug3 = new Enemy((-101*2.5),83,300);
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
allEnemies.push(bug1,bug2,bug3);



// This listens for key presses and sends the keys to your Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
