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
    winscreen = new WinScreen();

    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    lastThrowTime = 0;  // Zeitpunkt des letzten Wurfs


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

    setWorld() {
        this.character.world = this; // Verbindet den Charakter mit der Welt
    }

    setEndboss() {
        // Wenn es weitere Endboss-Instanzen gibt, die aktualisiert werden müssen:
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.character = this.character;
            }
        });
    }

    run() {
        setInterval(() => {
            this.checkThrowObject(); // Überprüft, ob die Flasche geworfen wird
            this.checkEnemyCollisionWithBottle(); // Überprüft Kollisionen mit Flaschen
            this.checkCollisionsWithBottles(); // Überprüft Kollisionen mit Flaschen
            this.checkCollisionsWithCoins(); // Überprüft Kollisionen mit Münzen
            this.checkEndbossTrigger(); // Überprüft die Position des Characters
            this.checkBottleHitGround(); // Überprüft, ob die Flasche den Boden berührt
            this.updateEndbossBar(); // Aktualisiert die Endbossleiste
            this.handleDeadEnemies(); // Entfernt tote Feinde
            this.checkIfWin();
        }, 25);
        this.checkCollisionsCharacter(); // Überprüft Kollisionen mit dem Charakter
    }

    checkIfWin() {
        this.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && enemy.lifepoints <= 0) {
                this.winscreen.ShowWinScreen = true;
            }
        });
    }
    

    checkCollisionsCharacter() { 
        setInterval(() => {
            this.checkCollisionsWithEnemy(); // Überprüft Kollisionen mit Feinden
            this.checkCollisionsWithEndboss(); // Überprüft Kollisionen mit dem Endboss
        }, 250); // Überprüft Kollisionen alle 250 Millisekunden
    }

    checkCollisionsWithEnemy() {
        this.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && enemy.lifepoints > 0) {
                this.character.hit(5);
                this.statusbar.setPercentage(this.character.lifepoints);
                console.log('Collision with Character!', this.character.lifepoints);
            } else if (enemy instanceof Endboss && !enemy.isAttacking && enemy.isColliding(this.character)) {
                enemy.startAttack(); // Startet die Angriffsanimation nur, wenn der Endboss nicht bereits angreift
                this.character.hit(5);
                this.statusbar.setPercentage(this.character.lifepoints);
                console.log('Hit by Endboss!');
            }
            }); 
    }

    checkCollisionsWithEndboss() {
        this.enemies.forEach((enemy) => {
                if (enemy instanceof Endboss && !enemy.isAttacking && enemy.isColliding(this.character)) {
                enemy.startAttack(); // Startet die Angriffsanimation nur, wenn der Endboss nicht bereits angreift
                this.character.hit(5);
                this.statusbar.setPercentage(this.character.lifepoints);
                console.log('Hit by Endboss!');
            }
            }); 
    }

    checkEndbossTrigger() {
        if (this.character.x > 1800) {
            this.level.enemies.forEach(enemy => {
                if (enemy instanceof Endboss && !enemy.animationTriggered) {
                    enemy.startAnimation();
                    enemy.animationTriggered = true; // Setzt die Zustandsvariable, um erneutes Starten zu verhindern
                }
            });
        }
    }

    checkBottleHitGround() { 
        this.bottle.forEach((bottle, index) => { 
            if (bottle.y >= 350) { 
                bottle.bottleSplash();
                this.removeBottleAfterDelay(index);
            }
        });
    }
    

    checkEnemyCollisionWithBottle() {
        this.enemies.forEach((enemy) => {
            this.bottle.forEach((bottle, index) => {
                if (bottle.isColliding(enemy)) {
                    if (enemy instanceof Chicken) {
                        this.handleChickenHit(enemy, bottle, index);
                    } else if (enemy instanceof Endboss && enemy.notHurtable) {
                        this.handleEndbossHit(enemy, bottle, index);
                    }
                }
            });
        });
    }
    
    handleChickenHit(enemy, bottle, index) {
        if (!enemy.isHitCooldown) {
            enemy.hit(100); // Reduziert die Lebenspunkte des Feindes
            bottle.bottleSplash(); // Ruft die Methode bottleSplash auf
            this.removeBottleAfterDelay(index);
            if (enemy.lifepoints <= 0) {
                enemy.deadAnimation(enemy); // Startet die Todesanimation des Endbosses
            }
        }
    }
    
    handleEndbossHit(enemy, bottle, index) {
        if (!enemy.isHitCooldown) {
            enemy.hit(20); // Reduziert die Lebenspunkte des Endbosses 
            enemy.isHurtAnimation(); // Setzt den Status des Endbosses auf verletzt
            bottle.bottleSplash(); // Ruft die Methode bottleSplash auf
            this.removeBottleAfterDelay(index);
        }
    }
    
    removeBottleAfterDelay(index) {
        setTimeout(() => {
            this.bottle.splice(index, 1); // Entfernt die Flasche aus dem Array
        }, 250); // 250 Millisekunden
    }

    updateEndbossBar() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                const percentage = enemy.lifepoints // Annahme: Endboss startet mit 100 Lifepoints
                this.endbossbar.setPercentage(percentage);
            }
        });
    }

    handleDeadEnemies() {
        // Iteriere rückwärts durch das Array, um das Entfernen während der Iteration zu ermöglichen
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            if (this.enemies[i].isDead) {
                this.enemies.splice(i, 1); // Entfernt den toten Feind sicher
            }
        }
    }
    


    checkThrowObject() {
        const currentTime = Date.now();
        // Prüft, ob die 'D'-Taste gedrückt ist, die Länge von bottle weniger als 30 beträgt,
        // ob bottlebar.bottles zwischen 1 und 10 liegt und ob 0,5 Sekunden seit dem letzten Wurf vergangen sind.
        if (this.keyboard.D && currentTime - this.lastThrowTime >= 1250) {
            let newBottle = new ThrowableObject(this.character.x + 50, this.character.y + 100);
            this.bottle.push(newBottle); 
            
            // Reduziert die Anzahl der Flaschen in bottlebar um 1, wenn eine Flasche geworfen wird.
            this.bottlebar.bottles -= 1;
            this.bottlebar.setBottles(this.bottlebar.bottles);  // Aktualisiert die Anzeige
            
            // Setzt den Zeitpunkt des letzten Wurfs auf die aktuelle Zeit.
            this.lastThrowTime = currentTime;
        }
    }
    
    // this.bottlebar.bottles > 0 && this.bottlebar.bottles <= 10

    checkCollisionsWithBottles() { 
        this.level.collectableBottles.forEach((bottle) => { 
            if (this.character.isColliding(bottle)) {
                bottle.collectBottle(this.level.collectableBottles, this.bottlebar); // Korrekt: Ruft collectBottle auf dem kollidierenden Flaschenobjekt auf
            }
        });
    }

    checkCollisionsWithCoins() { 
        this.level.collectableCoins.forEach((coin) => { 
            if (this.character.isColliding(coin)) {
                coin.collectCoin(this.level.collectableCoins, this.coinbar); // Korrekt: Ruft collectCoin auf dem kollidierenden Münzobjekt auf
            }
        });
    }


    draw() {
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
        this.addToMap(this.winscreen); // Fügt den Winscreen zur Karte hinzu
        let self = this;
        requestAnimationFrame(function () {
            self.draw(); // Ruft draw() wiederholt auf, um Animation zu erstellen
        });
    }

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
    

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object); // Fügt jedes Objekt zur Karte hinzu
        });
    }

    initializeBackgroundObjects() {
        // Array von Bildpfaden für die verschiedenen Layer
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

        // Array von Startpositionen, multipliziert mit 719 für die Platzierung der Bilder
        const startPositions = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        // Äußere Schleife iteriert über die Startpositionen
        for (let i = 0; i < startPositions.length; i++) {
            // Innere Schleife iteriert über die Layer-Array, zwei Elemente auf einmal (Schrittgröße 2)
            for (let j = 0; j < layers.length; j += 2) {
                // Fügt ein neues BackGroundObject mit dem Bild aus layers[j] und der berechneten Position hinzu
                this.BackGroundObjects.push(new BackGroundObject(layers[j], startPositions[i] * 719 * 2));
                // Fügt ein neues BackGroundObject mit dem nächsten Bild aus layers[j + 1] und der berechneten Position + 719 hinzu
                this.BackGroundObjects.push(new BackGroundObject(layers[j + 1], startPositions[i] * 719 * 2 + 719));
            }
        }
    }
}
