/**
 * Represents a level in the game.
 */
class Level {
    enemies;
    clouds;
    BackGroundObjects;
    collectableBottles;
    collectableCoins;
    level_end_x = 5500;
    levelGround = 410;

    /**
     * Creates an instance of Level.
     * @param {Array<MoveableObject>} enemies - The enemies in the level.
     * @param {Array<Cloud>} clouds - The clouds in the level.
     * @param {Array<BackGroundObject>} BackGroundObjects - The background objects in the level.
     * @param {Array<CollectableBottle>} collectableBottles - The collectable bottles in the level.
     * @param {Array<CollectableCoin>} collectableCoins - The collectable coins in the level.
     */
    constructor(enemies, clouds, BackGroundObjects, collectableBottles, collectableCoins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.BackGroundObjects = BackGroundObjects;
        this.collectableBottles = collectableBottles;
        this.collectableCoins = collectableCoins;
    }
}
