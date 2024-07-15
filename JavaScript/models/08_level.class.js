/**
 * Repräsentiert ein Level im Spiel.
 */
class Level {
    enemies;
    clouds;
    BackGroundObjects;
    collectableBottles;
    collectableCoins;
    level_end_x = 5500; // Das Ende des Levels
    levelGround = 410; // Die Höhe des Bodens

    /**
     * Erstellt eine Instanz von Level.
     * @param {Array<MoveableObject>} enemies - Die Feinde im Level.
     * @param {Array<Cloud>} clouds - Die Wolken im Level.
     * @param {Array<BackGroundObject>} BackGroundObjects - Die Hintergrundobjekte im Level.
     * @param {Array<CollectableBottle>} collectableBottles - Die sammelbaren Flaschen im Level.
     * @param {Array<CollectableCoin>} collectableCoins - Die sammelbaren Münzen im Level.
     */
    constructor(enemies, clouds, BackGroundObjects, collectableBottles, collectableCoins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.BackGroundObjects = BackGroundObjects;
        this.collectableBottles = collectableBottles;
        this.collectableCoins = collectableCoins;
    }
}
