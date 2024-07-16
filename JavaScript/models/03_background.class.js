/**
 * Represents a background object in the game.
 * @extends MoveableObject
 */
class BackGroundObject extends MoveableObject {

    width = 720;
    height = 480;

    /**
     * Creates an instance of BackGroundObject.
     * @param {string} path - The path to the background object's image.
     * @param {number} x - The x-position of the background object.
     * @param {number} y - The y-position of the background object.
     */
    constructor(path, x, y) {
        super().loadImg(path);
        this.x = x;
        this.y = 480 - this.height;
    }
}
