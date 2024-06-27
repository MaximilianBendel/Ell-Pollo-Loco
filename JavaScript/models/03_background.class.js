class BackGroundObject extends MoveableObject {
    width = 720;
    height = 480;

    constructor(path, x, y) {
        super().loadImg(path); // Lädt das Bild des Hintergrundobjekts
        this.x = x;
        this.y = 480 - this.height; // Setzt die y-Position des Hintergrundobjekts
    }
}
