class Level  { 
    enemies;
    clouds;
    BackGroundObjects;
    collectableBottles;
    collectableCoins;
    level_end_x = 5500; // Das Ende des Levels
    levelGround = 410; // Die Höhe des Bodens

    constructor(enemies, clouds, BackGroundObjects, collectableBottles, collectableCoins) {
        this.enemies = enemies; 
        this.clouds = clouds;
        this.BackGroundObjects = BackGroundObjects;
        this.collectableBottles = collectableBottles;
        this.collectableCoins = collectableCoins;
    }
}