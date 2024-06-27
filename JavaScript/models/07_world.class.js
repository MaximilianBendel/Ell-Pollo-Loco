class World {
    character = new Character(); // Initialisiert einen neuen Charakter
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ]; // Initialisiert drei Feinde (Hühner)
    clouds = [
        new Cloud()
    ]; // Initialisiert eine Wolke
    canvas;
    ctx;
    BackGroundObjects = [
        new BackGroundObject('img_pollo_locco/img/5_background/layers/air.png', 0),
        new BackGroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 0),
        new BackGroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 0),
        new BackGroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 0)
    ]; // Initialisiert die Hintergrundobjekte
    keyboard;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); // Holt den 2D-Kontext des Canvas
        this.canvas = canvas; // Setzt das Canvas
        this.keyboard = keyboard; // Setzt das Keyboard
        this.draw(); // Ruft die Zeichnen-Methode auf
        this.setWorld(); // Setzt die Welt
    }

    setWorld() { 
        this.character.world = this; // Verbindet den Charakter mit der Welt
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Löscht das Canvas

        this.addObjectsToMap(this.BackGroundObjects); // Fügt Hintergrundobjekte zur Karte hinzu
        this.addToMap(this.character); // Fügt den Charakter zur Karte hinzu
        this.addObjectsToMap(this.enemies); // Fügt die Feinde zur Karte hinzu
        this.addObjectsToMap(this.clouds); // Fügt die Wolken zur Karte hinzu
        
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
}
