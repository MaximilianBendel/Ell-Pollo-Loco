class MoveableObject {
    x = 120;
    y = 320;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;

    loadImg(path) {
        this.img = new Image(); // Erstellt ein neues Bild-Objekt
        this.img.src = path; // Setzt den Pfad des Bildes
    }

    loadImages(image) {
        image.forEach(path => {
            let img = new Image(); // Erstellt ein neues Bild-Objekt
            img.src = path; // Setzt den Pfad des Bildes
            this.imageCache[path] = img; // Speichert das Bild im Cache
        });
    }

    moveRight() {
        console.log('Moving Right'); // Debug-Ausgabe für Bewegung nach rechts
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed; // Verringert die x-Position für Bewegung nach links
        }, 1000 / 60); // 60 FPS
    }
}
