class Cloud extends MoveableObject {
    constructor(x,y) {
        super().loadImg('img_pollo_locco/img/5_background/layers/4_clouds/1.png'); // Lädt das Bild der Wolke
        this.x = x;
        this.y = y;
        this.width = 500;
        this.height = 250;
        this.startMovingClouds(); // Startet die Bewegung der Wolken
    }

    startMovingClouds() {
        setInterval(() => {
            this.x -= 0.5; // Verringert die x-Position der Wolke
            if (this.x + this.width < 0) {
                this.x = canvas.width; // Setzt die Wolke an den rechten Rand des Canvas zurück
                this.y = 20 + Math.random() * 100; // Generiert eine neue zufällige y-Position
            }
        }, 16.6666666); // 60 FPS
    }
}
