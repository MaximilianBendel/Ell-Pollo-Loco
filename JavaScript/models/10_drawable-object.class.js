/**
 * Represents a drawable object in the game.
 */
class DrawableObject {
    images;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads a single image.
     * @param {string} path - The path of the image to load.
     */
    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images and stores them in the cache.
     * @param {Array<string>} images - The paths of the images to load.
     */
    loadImages(images) {
        images.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the object's current image on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The 2D context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }    
}
