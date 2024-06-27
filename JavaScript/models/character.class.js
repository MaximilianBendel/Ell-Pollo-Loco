class Character extends MoveableObject {
    Images_walking = [
        'img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-26.png'
    ];
    currentImage = 0;
    world;
    speed = 3;
    direction = 'right'; // Neue Eigenschaft zur Verfolgung der Richtung

    constructor() {
        super().loadImg('img_pollo_locco/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.Images_walking);
        this.x = 0;
        this.height = 200;
        this.y = 440 - this.height;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveCharacter();
        }, 1000 / 60); // 60 FPS for smoother movement

        setInterval(() => {
            this.updateAnimation();
        }, 200); // 5 FPS for slower animation
    }

    moveCharacter() {
        if (this.world.keyboard.RIGHT) {
            this.x += this.speed;
            this.direction = 'right'; // Richtung aktualisieren
        }
        if (this.world.keyboard.LEFT) {
            this.x -= this.speed;
            this.direction = 'left'; // Richtung aktualisieren
        }
    }

    updateAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            let i = this.currentImage % this.Images_walking.length;
            let path = this.Images_walking[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    draw(ctx) {
        if (this.direction === 'left') {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.img, -this.x - this.width, this.y, this.width, this.height);
            ctx.restore();
        } else {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    jump() {
        // Sprunglogik hinzufügen
    }
}
