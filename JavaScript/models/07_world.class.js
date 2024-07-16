/**
 * Repräsentiert die Spielwelt.
 */
class World {
    character = new Character(); // Initialisiert einen neuen Charakter
    statusbar = new Statusbar(); // Initialisiert die Statusleiste
    coinbar = new Coinbar(); // Initialisiert die Münzleiste
    bottlebar = new Bottlebar(); // Initialisiert die Flaschenleiste
    endbossbar = new Endbossbar(); // Initialisiert die Endbossleiste
    enemies = level1.enemies; // Initialisiert Feinde
    clouds = level1.clouds; // Initialisiert eine Wolke
    BackGroundObjects = level1.BackGroundObjects; // Initialisiert die Hintergrundobjekte
    level = level1; // Initialisiert das Level
    bottle = []; // Initialisiert die Flasche
    collectableBottles = level1.collectableBottles; // Initialisiert die sammelbaren Flaschen
    collectableCoins = level1.collectableCoins; // Initialisiert die sammelbaren Münzen
    WinEndScreen = document.getElementById('WinScreenEnd');
    LoseEndScreen = document.getElementById('LoseScreenEnd');
    canvas = document.getElementById('canvas');
    ctx;
    keyboard;
    camera_x = 0;
    lastThrowTime = 0; // Zeitpunkt des letzten Wurfs
    winScreen = false;
    loseScreen = false;
    runInterval = true;

    /**
     * Erstellt eine Instanz von World.
     * @param {HTMLCanvasElement} canvas - Das Canvas-Element.
     * @param {Keyboard} keyboard - Das Keyboard-Objekt zur Steuerung des Spiels.
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
     * Verbindet den Charakter mit der Welt.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Setzt den Endboss und verbindet ihn mit dem Charakter.
     */
    setEndboss() {
        this.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.character = this.character;
            }
        });
    }

    /**
     * Initialisiert die Hintergrundobjekte im Level.
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
     * Startet die Hauptspiel-Schleife, die Kollisionen und andere Spielereignisse überprüft.
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
     * Aktualisiert die Bewegung des Endbosses.
     */
    updateEndbossMovement() {
        this.enemies.forEach(enemy => {
            if (enemy instanceof Endboss && enemy.animationTriggered) {
                enemy.followCharacter();
            }
        });
    }

    /**
     * Überprüft, ob ein Wurfobjekt geworfen werden soll.
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
     * Überprüft Kollisionen zwischen Feinden und geworfenen Flaschen.
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
     * Behandelt die Kollision eines Huhns mit einer Flasche.
     * @param {Chicken|brownChicken} enemy - Das kollidierende Huhn.
     * @param {ThrowableObject} bottle - Die kollidierende Flasche.
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
     * Behandelt die Kollision des Endbosses mit einer Flasche.
     * @param {Endboss} enemy - Der kollidierende Endboss.
     * @param {ThrowableObject} bottle - Die kollidierende Flasche.
     */
    handleEndbossHit(enemy, bottle) {
        if (!enemy.isHitCooldown) {
            enemy.hit(20);
            enemy.isHurtAnimation();
            bottle.bottleSplash();
        }
    }

    /**
     * Überprüft, ob die Flasche den Boden berührt.
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
     * Überprüft, ob eine Flasche mit einem Feind kollidiert.
     * @param {ThrowableObject} bottle - Die zu überprüfende Flasche.
     * @returns {boolean} - Gibt true zurück, wenn eine Kollision vorliegt, andernfalls false.
     */
    isBottleCollidingWithEnemy(bottle) {
        return this.enemies.some(enemy => bottle.isColliding(enemy));
    }

    /**
     * Entfernt die Flasche nach einer Verzögerung.
     * @param {number} index - Der Index der zu entfernenden Flasche.
     */
    removeBottleAfterDelay(index) {
        setTimeout(() => this.bottle.splice(index, 1), 250);
    }

    /**
     * Überprüft Kollisionen mit sammelbaren Flaschen.
     */
    checkCollisionsWithCollectableBottles() {
        this.collectableBottles?.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                bottle.collectBottle(this.collectableBottles, this.bottlebar);
            }
        });
    }

    /**
     * Überprüft Kollisionen mit sammelbaren Münzen.
     */
    checkCollisionsWithCollectableCoins() {
        this.collectableCoins?.forEach(coin => {
            if (this.character.isColliding(coin)) {
                coin.collectCoin(this.collectableCoins, this.coinbar);
            }
        });
    }

    /**
     * Überprüft, ob der Endboss getriggert werden soll.
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
     * Aktualisiert die Lebenspunkteanzeige des Endbosses.
     */
    updateEndbossBar() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                this.endbossbar.setPercentage(enemy.lifepoints);
            }
        });
    }

    /**
     * Entfernt tote Feinde aus dem Spiel.
     */
    handleDeadEnemies() {
        this.enemies = this.enemies.filter(enemy => !enemy.isDead);
    }

    /**
     * Überprüft, ob der Spieler verloren hat.
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
     * Zeigt den Verliererscreen an.
     */
    showLoseScreenEnd() {
        this.canvas.classList.remove('display-block');
        this.LoseEndScreen.style.display = 'block';
    }

    /**
     * Überprüft, ob der Spieler gewonnen hat.
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
     * Stoppt alle Animationen im Spiel.
     */
    stoppAllAnimations() {
        this.winScreen = true;
        this.enemies.forEach(enemy => enemy.stopAllAnimations());
        this.character.stoppAllAnimations();
        clearInterval(this.runInterval);
        this.runInterval = false;
    }

    /**
     * Zeigt den Gewinnerscreen an.
     */
    showWinScreenEnd() {
        this.canvas.classList.remove('display-block');
        this.WinEndScreen.style.display = 'block';
    }

    /**
     * Überprüft Kollisionen des Charakters mit Feinden und dem Endboss.
     */
    checkCollisionsCharacter() {
        setInterval(() => {
            this.checkCollisionsWithChicken();
            this.checkCollisionsWithEndboss();
        }, 10);
    }

    /**
     * Überprüft Kollisionen des Charakters mit Hühnern.
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
     * Überprüft Kollisionen des Charakters mit dem Endboss.
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
     * Zeichnet die Spielwelt.
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
     * Fügt ein bewegliches Objekt zur Karte hinzu.
     * @param {MoveableObject} movableObject - Das hinzuzufügende Objekt.
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
     * Fügt eine Liste von Objekten zur Karte hinzu.
     * @param {Array<MoveableObject>} objects - Die hinzuzufügenden Objekte.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => this.addToMap(object));
    }
}
