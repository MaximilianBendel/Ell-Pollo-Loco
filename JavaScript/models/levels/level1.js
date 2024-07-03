const level1 = new Level(
    [ // enemies
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],

    [ // clouds
        new Cloud(250, 25),
        new Cloud(500, 50),
        new Cloud(800, 25),
        new Cloud(1200, 50),    
        new Cloud(1700, 25),
        new Cloud(2300, 50),
    ],

    [], // BackGroundObjects

    [
        new CollectableBottles(),
        new CollectableBottles(),
        new CollectableBottles(),
        new CollectableBottles(),
        new CollectableBottles(),
        new CollectableBottles(),
        new CollectableBottles(),
        new CollectableBottles(),
        new CollectableBottles(),
        new CollectableBottles()
    ], // collectableBottles

    [
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins()
    ] // Coins
);