const level1 = new Level(
    [ // enemies
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],

    [ // clouds
        new Cloud()
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
    ] // collectableBottles
);