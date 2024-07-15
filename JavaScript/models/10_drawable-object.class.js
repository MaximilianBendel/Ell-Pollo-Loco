/**
 * Repräsentiert ein zeichnbares Objekt im Spiel.
 */
class DrawableObject {
    images;
    imageCache = {};
    currentImage = 0;
    /**
     * Lädt ein einzelnes Bild.
     * @param {string} path - Der Pfad des zu ladenden Bildes.
     */
    loadImg(path) {
        this.img = new Image(); // Erstellt ein neues Bild-Objekt
        this.img.src = path; // Setzt den Pfad des Bildes
    }

    /**
     * Lädt mehrere Bilder und speichert sie im Cache.
     * @param {Array<string>} images - Die Pfade der zu ladenden Bilder.
     */
    loadImages(images) {
        images.forEach(path => {
            let img = new Image(); // Erstellt ein neues Bild-Objekt
            img.src = path; // Setzt den Pfad des Bildes
            this.imageCache[path] = img; // Speichert das Bild im Cache
        });
    }

    /**
     * Zeichnet das aktuelle Bild des Objekts auf das Canvas.
     * @param {CanvasRenderingContext2D} ctx - Der 2D-Kontext des Canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height); // Zeichnet das Bild normal
    }    
}
