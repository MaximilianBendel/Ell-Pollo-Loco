class Drawableobject {
    images;
    imageCache = {};
    x = 120;
    y = 320;
    height = 150;
    width = 100;
    currentImage = 0;

    loadImg(path) {
        this.img = new Image(); // Erstellt ein neues Bild-Objekt
        this.img.src = path; // Setzt den Pfad des Bildes
    }

    loadImages(images) {
        images.forEach(path => {
            let img = new Image(); // Erstellt ein neues Bild-Objekt
            img.src = path; // Setzt den Pfad des Bildes
            this.imageCache[path] = img; // Speichert das Bild im Cache
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height); // Zeichnet das Bild normal
    }    
    
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath(); // Beginnt einen neuen Pfad
            ctx.lineWidth = 5; // Setzt die Linienbreite auf 2
            ctx.strokeStyle = 'red'; // Setzt die Linienfarbe auf Rot
            ctx.rect(this.x, this.y, this.width, this.height); // Zeichnet ein Rechteck
            ctx.stroke(); // Zeichnet den Pfad 
        }
    }

    
}