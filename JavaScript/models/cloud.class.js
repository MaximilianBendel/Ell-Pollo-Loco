class Cloud extends MoveableObject {

    constructor() {
        super().loadImg('img_pollo_locco/img/5_background/layers/4_clouds/1.png');

        this.x = 0 + Math.random() * 500;
        this.y = 20
        this.width = 500
        this.height = 250
    }
}