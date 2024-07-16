/**
 * Represents the game world.
 */
class World {
    character = new Character();
    statusbar = new Statusbar();
    coinbar = new Coinbar();
    bottlebar = new Bottlebar();
    endbossbar = new Endbossbar();
    enemies = level1.enemies;
    clouds = level1.clouds;
    BackGroundObjects = level1.BackGroundObjects;
    level = level1;
    bottle = [];
    collectableBottles = level1.collectableBottles;
    collectableCoins = level1.collectableCoins;
    WinEndScreen = document.getElementById('WinScreenEnd');
    LoseEndScreen = document.getElementById('LoseScreenEnd');
    canvas = document.getElementById('canvas');
    ctx;
    keyboard;
    camera_x = 0;
    lastThrowTime = 0;
    winScreen = false;
    loseScreen = false;
    runInterval = true;

    /**
     * Creates an instance of World.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {Keyboard} keyboard - The keyboard object for game controls.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.initializeBackgroundObjects();
        this.draw();
        this.setWorld();
        this.setEndboss();
        this.run();
    }

    /**
     * Connects the character with the world.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Sets the endboss and connects it with the character.
     */
    setEndboss() {
        this.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.character = this.character;
            }
        });
    }

    /**
     * Initializes the background objects in the level.
     */
    initializeBackgroundObjects() {
        const layers = [
            'img_pollo_locco/img/5_background/layers/air.png',
            'img_pollo_locco/img/5_background/layers/air.png',
            'img_pollo_locco/img/5_background/layers/3_third_layer/1.png',
            'img_pollo_locco/img/5_background/layers/3_third_layer/2.png',
            'img_pollo_locco/img/5_background/layers/2_second_layer/1.png',
            'img_pollo_locco/img/5_background/layers/2_second_layer/2.png',
            'img_pollo_locco/img/5_background/layers/1_first_layer/1.png',
            'img_pollo_locco/img/5_background/layers/1_first_layer/2.png'
        ];
        const startPositions = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        startPositions.forEach(position => {
            for (let j = 0; j < layers.length; j += 2) {
                this.BackGroundObjects.push(new BackGroundObject(layers[j], position * 719 * 2));
                this.BackGroundObjects.push(new BackGroundObject(layers[j + 1], position * 719 * 2 + 719));
            }
        });
    }

    /**
     * Starts the main game loop, checking for collisions and other game events.
     */
    run() {
        if (this.runInterval) clearInterval(this.runInterval);
        this.runInterval = setInterval(() => {
            this.checkThrowObject();
            this.checkEnemyCollisionWithBottle();
            this.checkCollisionsWithCollectableBottles();
            this.checkCollisionsWithCollectableCoins();
            this.checkEndbossTrigger();
            this.checkBottleHitGround();
            this.updateEndbossBar();
            this.handleDeadEnemies();
            this.checkIfWin();
            this.checkIfLose();
            this.updateEndbossMovement();
        }, 25);
        this.checkCollisionsCharacter();
    }

    /**
     * Updates the movement of the endboss.
     */
    updateEndbossMovement() {
        this.enemies.forEach(enemy => {
            if (enemy instanceof Endboss && enemy.animationTriggered) {
                enemy.followCharacter();
            }
        });
    }

    /**
     * Checks if a throwable object should be thrown.
     */
    checkThrowObject() {
        const currentTime = Date.now();
        if ((this.keyboard.F || this.keyboard.THROW_BTN || this.keyboard.C) && currentTime - this.lastThrowTime >= 2000 && this.bottlebar.bottles > 0) {
            this.bottle.push(new ThrowableObject(this.character.x + 50, this.character.y + 100, this.character.direction));
            this.bottlebar.setBottles(--this.bottlebar.bottles);
            this.lastThrowTime = currentTime;
        }
    }

    /**
     * Checks for collisions between enemies and thrown bottles.
     */
    checkEnemyCollisionWithBottle() {
        this.enemies.forEach(enemy => {
            this.bottle.forEach((bottle, index) => {
                if (bottle.isColliding(enemy)) {
                    if (enemy instanceof Chicken || enemy instanceof brownChicken) {
                        this.handleChickenHit(enemy, bottle, index);
                    } else if (enemy instanceof Endboss && enemy.notHurtable) {
                        this.handleEndbossHit(enemy, bottle, index);
                    }
                }
            });
        });
    }

    /**
     * Handles the collision of a chicken with a bottle.
     * @param {Chicken|brownChicken} enemy - The colliding chicken.
     * @param {ThrowableObject} bottle - The colliding bottle.
     */
    handleChickenHit(enemy, bottle) {
        if (!enemy.isHitCooldown) {
            enemy.hit(100);
            bottle.bottleSplash();
            if (enemy.lifepoints <= 0) {
                enemy.deadAnimation(enemy);
            }
        }
    }

    /**
     * Handles the collision of the endboss with a bottle.
     * @param {Endboss} enemy - The colliding endboss.
     * @param {ThrowableObject} bottle - The colliding bottle.
     */
    handleEndbossHit(enemy, bottle) {
        if (!enemy.isHitCooldown) {
            enemy.hit(20);
            enemy.isHurtAnimation();
            bottle.bottleSplash();
        }
    }

    /**
     * Checks if the bottle has hit the ground.
     */
    checkBottleHitGround() {
        this.bottle.forEach((bottle, index) => {
            if (bottle.y >= 350) {
                if (!this.isBottleCollidingWithEnemy(bottle)) {
                    bottle.playGlasSplashSound();
                }
                bottle.bottleSplash();
                this.removeBottleAfterDelay(index);
            }
        });
    }

    /**
     * Checks if a bottle is colliding with an enemy.
     * @param {ThrowableObject} bottle - The bottle to check.
     * @returns {boolean} - Returns true if a collision occurs, otherwise false.
     */
    isBottleCollidingWithEnemy(bottle) {
        return this.enemies.some(enemy => bottle.isColliding(enemy));
    }

    /**
     * Removes the bottle after a delay.
     * @param {number} index - The index of the bottle to remove.
     */
    removeBottleAfterDelay(index) {
        setTimeout(() => this.bottle.splice(index, 1), 250);
    }

    /**
     * Checks for collisions with collectable bottles.
     */
    checkCollisionsWithCollectableBottles() {
        this.collectableBottles?.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                bottle.collectBottle(this.collectableBottles, this.bottlebar);
            }
        });
    }

    /**
     * Checks for collisions with collectable coins.
     */
    checkCollisionsWithCollectableCoins() {
        this.collectableCoins?.forEach(coin => {
            if (this.character.isColliding(coin)) {
                coin.collectCoin(this.collectableCoins, this.coinbar);
            }
        });
    }

    /**
     * Checks if the endboss should be triggered.
     */
    checkEndbossTrigger() {
        if (this.character.x > 5450) {
            this.enemies.forEach(enemy => {
                if (enemy instanceof Endboss && !enemy.animationTriggered) {
                    enemy.startAnimation();
                    enemy.animationTriggered = true;
                }
            });
        }
    }

    /**
     * Updates the health bar of the endboss.
     */
    updateEndbossBar() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                this.endbossbar.setPercentage(enemy.lifepoints);
            }
        });
    }

    /**
     * Removes dead enemies from the game.
     */
    handleDeadEnemies() {
        this.enemies = this.enemies.filter(enemy => !enemy.isDead);
    }

    /**
     * Checks if the player has lost.
     */
    checkIfLose() {
        if (this.character.lifepoints <= 0) {
            this.loseScreen = true;
            showMobileButtonsStatus = false;
            setTimeout(() => this.stoppAllAnimations(), 1500);
            setTimeout(() => {
                soundManager.pauseSound('gamemusic');
                soundManager.playnormalSound('loselevel');
                this.showLoseScreenEnd();
            }, 2500);
        }
    }

    /**
     * Shows the lose screen.
     */
    showLoseScreenEnd() {
        this.canvas.classList.remove('display-block');
        this.LoseEndScreen.style.display = 'block';
    }

    /**
     * Checks if the player has won.
     */
    checkIfWin() {
        if (this.enemies.some(enemy => enemy instanceof Endboss && enemy.lifepoints <= 0)) {
            this.winScreen = true;
            showMobileButtonsStatus = false;
            setTimeout(() => this.stoppAllAnimations(), 1500);
            setTimeout(() => {
                soundManager.pauseSound('gamemusic');
                soundManager.playnormalSound('winlevel');
                this.showWinScreenEnd();
            }, 2500);
        }
    }

    /**
     * Stops all animations in the game.
     */
    stoppAllAnimations() {
        this.winScreen = true;
        this.enemies.forEach(enemy => enemy.stopAllAnimations());
        this.character.stoppAllAnimations();
        clearInterval(this.runInterval);
        this.runInterval = false;
    }

    /**
     * Shows the win screen.
     */
    showWinScreenEnd() {
        this.canvas.classList.remove('display-block');
        this.WinEndScreen.style.display = 'block';
    }

    /**
     * Checks for character collisions with enemies and the endboss.
     */
    checkCollisionsCharacter() {
        setInterval(() => {
            this.checkCollisionsWithChicken();
            this.checkCollisionsWithEndboss();
        }, 10);
    }

    /**
     * Checks for character collisions with chickens.
     */
    checkCollisionsWithChicken() {
        this.enemies.forEach(enemy => {
            if (enemy instanceof Chicken || enemy instanceof brownChicken) {
                if (this.character.speedY < 0 && this.character.isAboveGround() && this.character.isColliding(enemy) && (this.character.y + this.character.height - this.character.offsetHeight) < (enemy.y + enemy.height / 2)) {
                    this.character.speedY = 17;
                    this.character.unHurtable();
                    enemy.hit(100);
                    if (enemy.lifepoints <= 0) {
                        enemy.deadAnimation();
                    }
                } else if (enemy.lifepoints > 0 && this.character.isColliding(enemy)) {
                    if (!this.character.CharacterIsUnhurtable) {
                        this.character.hit(5);
                        this.character.unHurtable();
                        this.statusbar.setPercentage(this.character.lifepoints);
                    }
                }
            }
        });
    }

    /**
     * Checks for character collisions with the endboss.
     */
    checkCollisionsWithEndboss() {
        this.enemies.forEach(enemy => {
            if (enemy instanceof Endboss && !enemy.isAttacking && enemy.isColliding(this.character)) {
                enemy.startAttack();
                this.character.hit(5);
                this.statusbar.setPercentage(this.character.lifepoints);
            }
        });
    }

    /**
     * Draws the game world.
     */
    draw() {
        if (this.isClearing || !this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.BackGroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.statusbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.bottlebar);
        this.addToMap(this.endbossbar);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.collectableCoins);
        this.addObjectsToMap(this.collectableBottles);
        this.addObjectsToMap(this.bottle);
        this.addObjectsToMap(this.enemies);
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Adds a moveable object to the map.
     * @param {MoveableObject} movableObject - The object to add.
     */
    addToMap(movableObject) {
        if ((movableObject instanceof Character || movableObject instanceof Endboss) && movableObject.direction === 'left') {
            this.ctx.save();
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(movableObject.img, -movableObject.x - movableObject.width, movableObject.y, movableObject.width, movableObject.height);
            this.ctx.restore();
        } else {
            movableObject.draw(this.ctx);
        }
        if (typeof movableObject.drawFrame === 'function') {
            movableObject.drawFrame(this.ctx);
        }
    }

    /**
     * Adds a list of objects to the map.
     * @param {Array<MoveableObject>} objects - The objects to add.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => this.addToMap(object));
    }
}
