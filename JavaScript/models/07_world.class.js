/**
 * Repräsentiert die Spielwelt.
 */
class World {
    character = new Character(); // Initialisiert einen neuen Charakter
    enemies = level1.enemies; // Initialisiert Feinde
    clouds = level1.clouds; // Initialisiert eine Wolke
    BackGroundObjects = level1.BackGroundObjects; // Initialisiert die Hintergrundobjekte
    level = level1; // Initialisiert das Level
    statusbar = new Statusbar(); // Initialisiert die Statusleiste
    coinbar = new Coinbar(); // Initialisiert die Münzleiste
    bottlebar = new Bottlebar(); // Initialisiert die Flaschenleiste
    endbossbar = new Endbossbar(); // Initialisiert die Endbossleiste
    bottle = []; // Initialisiert die Flasche
    collectableBottles = level1.collectableBottles; // Initialisiert die sammelbaren Flaschen
    collectableCoins = level1.collectableCoins; // Initialisiert die sammelbaren Münzen
    WinEndScreen = document.getElementById('WinScreenEnd');
    LoseEndScreen = document.getElementById('LoseScreenEnd');
    canvas = document.getElementById('canvas');
    
    /**
     * Der 2D-Kontext des Canvas.
     * @type {CanvasRenderingContext2D}
     */
    ctx;
    
    /**
     * Das Keyboard-Objekt zur Steuerung des Spiels.
     * @type {Keyboard}
     */
    keyboard;
    
    /**
     * Die x-Position der Kamera.
     * @type {number}
     */
    camera_x = 0;
    lastThrowTime = 0; // Zeitpunkt des letzten Wurfs
    winScreen = false;
    loseScreen = false;
    runInterval = true;

    // Konstruktor
    /**
     * Erstellt eine Instanz von World.
     * @param {HTMLCanvasElement} canvas - Das Canvas-Element.
     * @param {Keyboard} keyboard - Das Keyboard-Objekt zur Steuerung des Spiels.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); // Holt den 2D-Kontext des Canvas
        this.canvas = canvas; // Setzt das Canvas
        this.keyboard = keyboard; // Setzt das Keyboard
        this.initializeBackgroundObjects(); // Initialisiert die Hintergrundobjekte
        this.draw(); // Ruft die Zeichnen-Methode auf
        this.setWorld(); // Setzt die Welt
        this.setEndboss(); // Setzt den Endboss
        this.run(); // Überprüft Kollisionen
    }

    // Methoden zur Initialisierung
    /**
     * Verbindet den Charakter mit der Welt.
     */
    setWorld() {
        this.character.world = this; // Verbindet den Charakter mit der Welt
    }

    /**
     * Setzt den Endboss und verbindet ihn mit dem Charakter.
     */
    setEndboss() {
        this.level.enemies.forEach(enemy => {
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
        for (let i = 0; i < startPositions.length; i++) {
            for (let j = 0; j < layers.length; j += 2) {
                this.BackGroundObjects.push(new BackGroundObject(layers[j], startPositions[i] * 719 * 2));
                this.BackGroundObjects.push(new BackGroundObject(layers[j + 1], startPositions[i] * 719 * 2 + 719));
            }
        }
    }

    // Spiel-Logik
    /**
     * Startet die Hauptspiel-Schleife, die Kollisionen und andere Spielereignisse überprüft.
     */
    run() {
        if (this.runInterval) {
            clearInterval(this.runInterval);
        }
        this.runInterval = setInterval(() => {
            this.checkThrowObject(); // Überprüft, ob die Flasche geworfen wird
            this.checkEnemyCollisionWithBottle(); // Überprüft Kollisionen mit Flaschen
            this.checkCollisionsWithCollectableBottles(); // Überprüft Kollisionen mit Flaschen
            this.checkCollisionsWithCollectableCoins(); // Überprüft Kollisionen mit Münzen
            this.checkEndbossTrigger(); // Überprüft die Position des Characters zum Endboss triggern
            this.checkBottleHitGround(); // Überprüft, ob die Flasche den Boden berührt
            this.updateEndbossBar(); // Aktualisiert die Endbossleiste
            this.handleDeadEnemies(); // Entfernt tote Feinde
            this.checkIfWin();
            this.checkIfLose();
        }, 25);
        this.checkCollisionsCharacter(); // Überprüft Kollisionen mit dem Charakter
    }

    /**
     * Überprüft, ob ein Wurfobjekt geworfen werden soll.
     */
    checkThrowObject() {
        const currentTime = Date.now();
        if (this.keyboard.F && currentTime - this.lastThrowTime >= 2000 && this.bottlebar.bottles > 0 || this.keyboard.THROW_BTN && currentTime - this.lastThrowTime >= 2000 && this.bottlebar.bottles > 0 || this.keyboard.C && currentTime - this.lastThrowTime >= 2000 && this.bottlebar.bottles > 0) {
            let newBottle = new ThrowableObject(this.character.x + 50, this.character.y + 100);
            this.bottle.push(newBottle);
            this.bottlebar.bottles -= 1;
            this.bottlebar.setBottles(this.bottlebar.bottles);  // Aktualisiert die Anzeige
            this.lastThrowTime = currentTime;
        }
    }

    /**
     * Überprüft Kollisionen zwischen Feinden und geworfenen Flaschen.
     */
    checkEnemyCollisionWithBottle() {
        this.enemies.forEach((enemy) => {
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
            enemy.hit(100); // Reduziert die Lebenspunkte des Feindes
            bottle.bottleSplash(); // Ruft die Methode bottleSplash auf
            if (enemy.lifepoints <= 0) {
                enemy.deadAnimation(enemy); // Startet die Todesanimation des Endbosses
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
            enemy.hit(20); // Reduziert die Lebenspunkte des Endbosses 
            enemy.isHurtAnimation(); // Setzt den Status des Endbosses auf verletzt
            bottle.bottleSplash(); // Ruft die Methode bottleSplash auf
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
        return this.enemies.some((enemy) => {
            if (bottle.isColliding(enemy)) {
                if (enemy instanceof Chicken || enemy instanceof brownChicken) {
                    this.handleChickenHit(enemy, bottle);
                } else if (enemy instanceof Endboss && enemy.notHurtable) {
                    this.handleEndbossHit(enemy, bottle);
                }
                return true; // Kollision gefunden
            }
            return false; // Keine Kollision
        });
    }

    /**
     * Entfernt die Flasche nach einer Verzögerung.
     * @param {number} index - Der Index der zu entfernenden Flasche.
     */
    removeBottleAfterDelay(index) {
        setTimeout(() => {
            this.bottle.splice(index, 1); // Entfernt die Flasche aus dem Array
        }, 250); // 250 Millisekunden
    }

    /**
     * Überprüft Kollisionen mit sammelbaren Flaschen.
     */
    checkCollisionsWithCollectableBottles() {
        if (!this.collectableBottles) return; // Beendet die Methode, wenn collectableBottles null ist
        this.collectableBottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                bottle.collectBottle(this.collectableBottles, this.bottlebar); // Ruft collectBottle auf dem kollidierenden Flaschenobjekt auf
            }
        });
    }

    /**
     * Überprüft Kollisionen mit sammelbaren Münzen.
     */
    checkCollisionsWithCollectableCoins() {
        if (!this.collectableCoins) return; // Beendet die Methode, wenn collectableCoins null ist
        this.collectableCoins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                coin.collectCoin(this.collectableCoins, this.coinbar); // Ruft collectCoin auf dem kollidierenden Münzobjekt auf
            }
        });
    }

    /**
     * Überprüft, ob der Endboss getriggert werden soll.
     */
    checkEndbossTrigger() {
        if (this.character && this.character.x > 5450) {
            this.level.enemies.forEach(enemy => {
                if (enemy instanceof Endboss && !enemy.animationTriggered) {
                    enemy.startAnimation();
                    enemy.animationTriggered = true; // Setzt die Zustandsvariable, um erneutes Starten zu verhindern
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
                const percentage = enemy.lifepoints // Annahme: Endboss startet mit 100 Lifepoints
                this.endbossbar.setPercentage(percentage);
            }
        });
    }

    /**
     * Entfernt tote Feinde aus dem Spiel.
     */
    handleDeadEnemies() {
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            if (this.enemies[i].isDead) {
                this.enemies.splice(i, 1); // Entfernt den toten Feind sicher
            }
        }
    }

    /**
     * Überprüft, ob der Spieler verloren hat.
     */
    checkIfLose() {
        if (this.character.lifepoints <= 0) {
            this.loseScreen = true;
            showMobileButtonsStatus = false;
            if (this.loseScreen) {
                setTimeout(() => {
                    this.stoppAllAnimations();
                }, 1500);
                setTimeout(() => {
                    soundManager.pauseSound('gamemusic');
                    soundManager.playnormalSound('loselevel');
                    this.showLoseScreenEnd();
                }, 2500);
            }
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
        this.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && enemy.lifepoints <= 0) {
                this.winScreen = true;
                showMobileButtonsStatus = false;
            }
        });
        if (this.winScreen) {
            setTimeout(() => {
                this.stoppAllAnimations();
            }, 1500);
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
        this.enemies.forEach(enemy => {
            if (enemy instanceof Endboss || enemy instanceof Chicken || enemy instanceof brownChicken) {
                enemy.stopAllAnimations();
            }
        });
        this.character.stoppAllAnimations();
        clearInterval(this.runInterval); // Stoppt die Run Funktionen
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
            this.checkCollisionsWithChicken(); // Überprüft Kollisionen mit Feinden
            this.checkCollisionsWithEndboss(); // Überprüft Kollisionen mit dem Endboss
        }, 250); // Überprüft Kollisionen alle 250 Millisekunden
    }

    /**
     * Überprüft Kollisionen des Charakters mit Hühnern.
     */
    checkCollisionsWithChicken() {
        this.enemies.forEach((enemy) => {
            if (enemy instanceof Chicken && enemy.lifepoints > 0 && this.character.isColliding(enemy) || enemy instanceof brownChicken && enemy.lifepoints > 0 && this.character.isColliding(enemy)) {
                this.character.hit(5);
                this.statusbar.setPercentage(this.character.lifepoints);
            }
        });
    }

    /**
     * Überprüft Kollisionen des Charakters mit dem Endboss.
     */
    checkCollisionsWithEndboss() {
        this.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && !enemy.isAttacking && enemy.isColliding(this.character)) {
                enemy.startAttack(); // Startet die Angriffsanimation nur, wenn der Endboss nicht bereits angreift
                this.character.hit(5);
                this.statusbar.setPercentage(this.character.lifepoints);
            }
        });
    }

    // Zeichnen und Aktualisieren
    /**
     * Zeichnet die Spielwelt.
     */
    draw() {
        if (this.isClearing || !this.ctx) return; // Beendet die Methode, wenn die Welt gelöscht wird oder ctx null ist

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Löscht das Canvas
        this.ctx.translate(this.camera_x, 0); // Verschiebt die Kamera

        this.addObjectsToMap(this.BackGroundObjects); // Fügt Hintergrundobjekte zur Karte hinzu
        this.ctx.translate(-this.camera_x, 0); // Verschiebt die Kamera zurück
        this.addToMap(this.statusbar); // Fügt die Statusleiste zur Karte hinzu
        this.addToMap(this.coinbar); // Fügt die Münzleiste zur Karte hinzu
        this.addToMap(this.bottlebar); // Fügt die Flaschenleiste zur Karte hinzu
        this.addToMap(this.endbossbar); // Fügt die Endbossleiste zur Karte hinzu
        this.ctx.translate(this.camera_x, 0); // Verschiebt die Kamera
        this.addToMap(this.character); // Fügt den Charakter zur Karte hinzu
        this.addObjectsToMap(this.collectableCoins); // Fügt die sammelbaren Münzen zur Karte hinzu
        this.addObjectsToMap(this.collectableBottles); // Fügt die sammelbaren Flaschen zur Karte hinzu
        this.addObjectsToMap(this.bottle); // Fügt die Flasche zur Karte hinzu
        this.addObjectsToMap(this.enemies); // Fügt die Feinde zur Karte hinzu
        this.addObjectsToMap(this.clouds); // Fügt die Wolken zur Karte hinzu
        this.ctx.translate(-this.camera_x, 0); // Setzt die Kamera zurück
        let self = this;
        requestAnimationFrame(function () {
            self.draw(); // Ruft draw() wiederholt auf, um Animation zu erstellen
        });
    }

    /**
     * Fügt ein bewegliches Objekt zur Karte hinzu.
     * @param {MoveableObject} movableObject - Das hinzuzufügende Objekt.
     */
    addToMap(movableObject) {
        if (movableObject instanceof Character && movableObject.direction === 'left') {
            this.ctx.save(); // Speichert den aktuellen Zustand des Canvas
            this.ctx.scale(-1, 1); // Spiegelt das Bild horizontal
            this.ctx.drawImage(
                movableObject.img,
                -movableObject.x - movableObject.width, // Negative x-Position zum Spiegeln
                movableObject.y,
                movableObject.width,
                movableObject.height
            );
            this.ctx.restore(); // Stellt den gespeicherten Zustand wieder her
        } else {
            movableObject.draw(this.ctx); // Zeichnet das Objekt
        }
        if (typeof movableObject.drawFrame === 'function') {
            movableObject.drawFrame(this.ctx); // Zeichnet den Rahmen
        }
    }

    /**
     * Fügt eine Liste von Objekten zur Karte hinzu.
     * @param {Array<MoveableObject>} objects - Die hinzuzufügenden Objekte.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object); // Fügt jedes Objekt zur Karte hinzu
        });
    }
}
