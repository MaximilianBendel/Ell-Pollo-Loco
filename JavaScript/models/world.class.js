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
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
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

    addToMap(MovableObject) {
        this.ctx.drawImage(MovableObject.img, MovableObject.x, MovableObject.y, MovableObject.width, MovableObject.height);
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }
}