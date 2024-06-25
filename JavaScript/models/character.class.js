class Character extends MoveableObject {
    

    constructor() {
        super().loadImg('img_pollo_locco/img/2_character_pepe/2_walk/W-21.png');
        this.x = 0
        this.height = 200
        this.y = 440 - this.height
    }

    jump() {
        
    }
}