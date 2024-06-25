class Chicken extends MoveableObject {

    constructor() {
        super().loadImg('img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');

        this.x = 200 + Math.random() * 500;
        this.height = 70
        this.width = 60
        this.y = 440 - this.height
    }
}