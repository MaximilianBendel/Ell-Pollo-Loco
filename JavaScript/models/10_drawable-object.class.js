class Drawableobject {
    images;
    imageCache = {};
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
}