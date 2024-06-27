class Level  { 
    enemies;
    clouds;
    BackGroundObjects;
    level_end_x = 1900; // Das Ende des Levels

    constructor(enemies, clouds, BackGroundObjects) {
        this.enemies = enemies; 
        this.clouds = clouds;
        this.BackGroundObjects = BackGroundObjects;
    }
}