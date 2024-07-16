/**
 * Represents a collectable bottle in the game.
 * @extends DrawableObject
 */
class CollectableBottles extends DrawableObject {
  
    static allBottles = [];

    /**
     * Creates an instance of CollectableBottles.
     * @param {number} x - The x-position of the collectable bottle.
     * @param {number} y - The y-position of the collectable bottle.
     */
    constructor(x, y) {
        super().loadImg('img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png');
        this.height = 40;
        this.width = 50;
        this.x = x;
        this.y = y;
        this.offsetX = 0;
        this.offsetY = 0;
        this.offsetWidth = 5;
        this.offsetHeight = 5;
    }

    /**
     * Collects the bottle and updates the bottle bar.
     * @param {Array<CollectableBottles>} collectableBottles - The array of collectable bottles.
     * @param {Bottlebar} bottlebar - The bottle bar.
     */
    collectBottle(collectableBottles, bottlebar) {
        soundManager.playSound('collectBottle', 300);
        bottlebar.bottles += 1;
        bottlebar.setBottles(bottlebar.bottles);
        collectableBottles.splice(collectableBottles.indexOf(this), 1);
    }
}
