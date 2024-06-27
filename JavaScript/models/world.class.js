class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [
        new Cloud()
    ];
    canvas;
    ctx;
    BackGroundObjects = [
        new BackGroundObject('img_pollo_locco/img/5_background/layers/air.png', 0),
        new BackGroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 0),
        new BackGroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 0),
        new BackGroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 0)
        
    ];
    keyboard;
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() { 
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.BackGroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
        
        // Draw wird immer wieder ausgeführt 
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addToMap(movableObject) {
        if (movableObject instanceof Character && movableObject.direction === 'left') {
            this.ctx.save();
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(
                movableObject.img,
                -movableObject.x - movableObject.width, // Negative x position for flipping
                movableObject.y,
                movableObject.width,
                movableObject.height
            );
            this.ctx.restore();
        } else {
            this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
        }
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }
}
