class Level  { 
    enemies;
    clouds;
    BackGroundObjects;
    collectableBottles;
    level_end_x = 1900; // Das Ende des Levels

    constructor(enemies, clouds, BackGroundObjects, collectableBottles) {
        this.enemies = enemies; 
        this.clouds = clouds;
        this.BackGroundObjects = BackGroundObjects;
        this.collectableBottles = collectableBottles;
    }
}