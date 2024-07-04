class MoveableObject extends Drawableobject {
    speed = 0.15;
    speedY = 0;
    acceleration = 0.7;
    lifepoints = 100;
    lastHit = 0;


    moveRight() {
        console.log('Moving Right'); // Debug-Ausgabe für Bewegung nach rechts
    }

    moveLeft() {
        this.x -= this.speed; // Verringert die x-Position für Bewegung nach links
    }

    animateImages(images) {
        this.currentImage = (this.currentImage + 1) % images.length; // Zirkuläre Animation
        let path = images[this.currentImage];
        this.img = this.imageCache[path]; // Aktualisiere das aktuelle Bild
    }
    

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) { // || Bedeutet ODER
                this.y -= this.speedY; // Verringert die y-Position für die Fallgeschwindigkeit
                this.speedY -= this.acceleration; // Verringert die Fallgeschwindigkeit
            } else {
                this.speedY = 0; // Stellt sicher, dass die Geschwindigkeit auf 0 gesetzt wird, wenn der Charakter den Boden berührt
                this.y = 210; // Setzt die y-Position auf den Boden zurück
            }
        }, 1000 / 60); // 60 FPS
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        return this.y < 210; // Gibt zurück, ob der Charakter über dem Boden ist
    }

    jump() {
        this.speedY = 17; // Setzt die Sprunggeschwindigkeit
    }
    // Kollisionsabfrage
    isColliding(movableObject) {
        return this.x + this.width > movableObject.x &&
            this.y + this.height > movableObject.y &&
            this.x < movableObject.x + movableObject.width &&
            this.y < movableObject.y + movableObject.height;
    }

    hit(damage) {
        this.lifepoints -= damage;
        if (this.lifepoints <= 0) {
            this.lifepoints = 0;
        } else {
            this.lastHit = new Date().getTime(); // Setzt den Zeitpunkt des letzten Treffers
        }
    }

    isDead() {
        return this.lifepoints === 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Berechnet die Zeit seit dem letzten Treffer
        timepassed = timepassed / 1000; // Teilt die Zeit durch 1000, um Sekunden zu erhalten
        return timepassed < 1; // Gibt zurück, ob der Charakter in den letzten 3 Sekunden getroffen wurde
    }
}
