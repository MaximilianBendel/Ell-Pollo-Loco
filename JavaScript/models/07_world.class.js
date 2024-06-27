class World {
    character = new Character(); // Initialisiert einen neuen Charakter
    enemies = level1.enemies; // Initialisiert Feinde
    clouds = level1.clouds; // Initialisiert eine Wolke
    BackGroundObjects = level1.BackGroundObjects; // Initialisiert die Hintergrundobjekte
    level = level1; // Initialisiert das Level

    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); // Holt den 2D-Kontext des Canvas
        this.canvas = canvas; // Setzt das Canvas
        this.keyboard = keyboard; // Setzt das Keyboard
        this.initializeBackgroundObjects(); // Initialisiert die Hintergrundobjekte
        this.draw(); // Ruft die Zeichnen-Methode auf
        this.setWorld(); // Setzt die Welt
    }

    setWorld() { 
        this.character.world = this; // Verbindet den Charakter mit der Welt
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Löscht das Canvas
        this.ctx.translate(this.camera_x, 0); // Verschiebt die Kamera

        this.addObjectsToMap(this.BackGroundObjects); // Fügt Hintergrundobjekte zur Karte hinzu
        this.addToMap(this.character); // Fügt den Charakter zur Karte hinzu
        this.addObjectsToMap(this.enemies); // Fügt die Feinde zur Karte hinzu
        this.addObjectsToMap(this.clouds); // Fügt die Wolken zur Karte hinzu
        this.ctx.translate(-this.camera_x, 0); // Setzt die Kamera zurück
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
            this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height); // Zeichnet das Bild normal
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
