/**
 * Class representing moveable objects that inherit from DrawableObject.
 * This class includes methods for movement, animation, and collision detection.
 * 
 * @extends DrawableObject
 */
class MoveableObject extends DrawableObject {

    speed = 0.15;
    speedY = 0;
    acceleration = 0.7;
    lifepoints = 100;
    lastHit = 0;
    offsetX = 0;
    offsetY = 0;
    offsetWidth = 0;
    offsetHeight = 0;

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Animates the object's images.
     * 
     * @param {string[]} images - Array of image paths for animation.
     */
    animateImages(images) {
        this.currentImage = (this.currentImage + 1) % images.length;
        let path = images[this.currentImage];
        this.img = this.imageCache[path];
    }

    /**
     * Applies gravity to the object.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
                this.y = 210;
            }
        }, 1000 / 60);
    }

    /**
     * Checks if the object is above the ground.
     * 
     * @returns {boolean} True if the object is above the ground.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        return this.y < 210;
    }

    /**
     * Makes the object jump.
     */
    jump() {
        this.speedY = 17;
    }

    /**
     * Checks if the object is colliding with another moveable object.
     * 
     * @param {MoveableObject} movableObject - The other moveable object.
     * @returns {boolean} True if there is a collision.
     */
    isColliding(movableObject) {
        const collision = this.x + this.width - this.offsetWidth > movableObject.x + movableObject.offsetX &&
                          this.y + this.height - this.offsetHeight > movableObject.y + movableObject.offsetY &&
                          this.x + this.offsetX < movableObject.x + movableObject.width - movableObject.offsetWidth &&
                          this.y + this.offsetY < movableObject.y + movableObject.height - movableObject.offsetHeight;
        return collision;
    }

    /**
     * Causes damage to the object.
     * 
     * @param {number} damage - The amount of damage.
     */
    hit(damage) {
        this.lifepoints -= damage;
        if (this.lifepoints <= 0) {
            this.lifepoints = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is dead.
     * 
     * @returns {boolean} True if the object has no lifepoints left.
     */
    isDead() {
        return this.lifepoints === 0;
    }

    /**
     * Checks if the object is hurt.
     * 
     * @returns {boolean} True if the object was hit in the last 3 seconds.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }
}
