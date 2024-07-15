/**
 * Klasse, die bewegliche Objekte darstellt, die von Drawableobject erben.
 * Diese Klasse enthält Methoden zur Bewegung, Animation und Kollisionsabfrage.
 * 
 * @extends Drawableobject
 */
class MoveableObject extends DrawableObject { 

    speed = 0.15;
    speedY = 0;
    acceleration = 0.7;
    lifepoints = 100;
    lastHit = 0;
    offsetX = 0;
    offsetY = 0;
    offsetWidth = 0;
    offsetHeight = 0;


    /**
     * Bewegt das Objekt nach rechts.
     */
    moveRight() {
        console.log('Moving Right'); // Debug-Ausgabe für Bewegung nach rechts
    }

    /**
     * Bewegt das Objekt nach links.
     */
    moveLeft() {
        this.x -= this.speed; // Verringert die x-Position für Bewegung nach links
    }

    /**
     * Animiert die Bilder des Objekts.
     * 
     * @param {string[]} images - Array von Bildpfaden zur Animation.
     */
    animateImages(images) {
        this.currentImage = (this.currentImage + 1) % images.length; // Zirkuläre Animation
        let path = images[this.currentImage];
        this.img = this.imageCache[path]; // Aktualisiere das aktuelle Bild
    }

    /**
     * Wendet die Schwerkraft auf das Objekt an.
     */
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

    /**
     * Überprüft, ob das Objekt über dem Boden ist.
     * 
     * @returns {boolean} Wahr, wenn das Objekt über dem Boden ist.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        return this.y < 210; // Gibt zurück, ob der Charakter über dem Boden ist
    }

    /**
     * Lässt das Objekt springen.
     */
    jump() {
        this.speedY = 17; // Setzt die Sprunggeschwindigkeit
    }

    /**
     * Überprüft, ob das Objekt mit einem anderen beweglichen Objekt kollidiert.
     * 
     * @param {MoveableObject} movableObject - Das andere bewegliche Objekt.
     * @returns {boolean} Wahr, wenn eine Kollision vorliegt.
     */
     isColliding(movableObject) {
        return this.x + this.width - this.offsetWidth > movableObject.x + movableObject.offsetX &&
            this.y + this.height - this.offsetHeight > movableObject.y + movableObject.offsetY &&
            this.x + this.offsetX < movableObject.x + movableObject.width - movableObject.offsetWidth &&
            this.y + this.offsetY < movableObject.y + movableObject.height - movableObject.offsetHeight;
    }

    /**
     * Verursacht Schaden am Objekt.
     * 
     * @param {number} damage - Die Höhe des Schadens.
     */
    hit(damage) {
        this.lifepoints -= damage;
        if (this.lifepoints <= 0) {
            this.lifepoints = 0;
        } else {
            this.lastHit = new Date().getTime(); // Setzt den Zeitpunkt des letzten Treffers
        }
    }

    /**
     * Überprüft, ob das Objekt tot ist.
     * 
     * @returns {boolean} Wahr, wenn das Objekt keine Lebenspunkte mehr hat.
     */
    isDead() {
        return this.lifepoints === 0;
    }

    /**
     * Überprüft, ob das Objekt verletzt ist.
     * 
     * @returns {boolean} Wahr, wenn das Objekt in den letzten 3 Sekunden getroffen wurde.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Berechnet die Zeit seit dem letzten Treffer
        timepassed = timepassed / 1000; // Teilt die Zeit durch 1000, um Sekunden zu erhalten
        return timepassed < 1; // Gibt zurück, ob der Charakter in der letzten 1 Sekunde getroffen wurde
    }
}
