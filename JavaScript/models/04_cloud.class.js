/**
 * Represents a cloud in the game.
 * @extends MoveableObject
 */
class Cloud extends MoveableObject {
    /**
     * Creates an instance of Cloud.
     * @param {number} x - The x-position of the cloud.
     * @param {number} y - The y-position of the cloud.
     */
    constructor(x, y) {
        super().loadImg('img_pollo_locco/img/5_background/layers/4_clouds/1.png');
        this.x = x;
        this.y = y;
        this.width = 500;
        this.height = 250;
        this.startMovingClouds();
    }

    /**
     * Starts the movement of the clouds.
     * The clouds move from right to left and reappear on the right side when they leave the left edge of the canvas.
     */
    startMovingClouds() {
        setInterval(() => {
            this.x -= 0.5;
            if (this.x + this.width < 0) {
                this.x = canvas.width;
                this.y = 20 + Math.random() * 100;
            }
        }, 16.6666666); // 60 FPS
    }
}
