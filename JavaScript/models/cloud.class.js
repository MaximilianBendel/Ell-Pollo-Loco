class Cloud extends MoveableObject {

    constructor() {
        super().loadImg('img_pollo_locco/img/5_background/layers/4_clouds/1.png');

        this.x = 0 + Math.random() * 500;
        this.y = 20
        this.width = 500
        this.height = 250

        this.startMovingClouds();   
    }

    startMovingClouds() {
        setInterval(() => {
            this.x -= 0.5;  // Verringert die x Koordinate

            // Wenn die Wolke aus dem Canvas verschwindet, setze sie neu
            if (this.x + this.width < 0) {
                this.x = canvas.width;  // Setze die Wolke an den rechten Rand des Canvas
                this.y = 20 + Math.random() * 100;  // Generiere eine neue zufällige y Position
            }
        }, 16,6666666);
    }
}