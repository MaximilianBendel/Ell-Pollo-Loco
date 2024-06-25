class BackGroundObject extends MoveableObject {

    width = 720;
    height = 480;
    constructor(path, x, y) {
        super().loadImg(path);
        this.x = x;
        this.y = 480 -this.height
    }
}