class Chicken extends MoveableObject {

    Images_walking = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png' 
    ];
    

    constructor() {
        super().loadImg('img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.Images_walking);
        this.x = 200 + Math.random() * 500;
        this.height = 70
        this.width = 60
        this.y = 440 - this.height
        this.animate();
        this.speed = 0.15 + Math.random() * 0.25;
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            let i = this.currentImage % this.Images_walking.length; // 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, ...
            let path = this.Images_walking[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 6);
    }
}