/**
 * Initializes the first level of the game.
 */
function initLevel() {
    level1 = new Level(
        [ 
            new Chicken(),
            new brownChicken(300),
            new brownChicken(400),
            new brownChicken(500),
            new Chicken(800),
            new Chicken(1000),
            new Chicken(1200),
            new brownChicken(1600),
            new brownChicken(1700),
            new Chicken(2000),
            new Chicken(2200),
            new Chicken(2400),
            new brownChicken(2900),
            new brownChicken(3000),
            new Chicken(3500),
            new Chicken(3600),
            new Chicken(3700),
            new brownChicken(4200),
            new brownChicken(4300),
            new Chicken(4700),
            new Chicken(4800),
            new Endboss()
        ],

        [ 
            new Cloud(250, 25),
            new Cloud(500, 50),
            new Cloud(800, 25),
            new Cloud(1200, 50),
            new Cloud(1700, 25),
            new Cloud(2300, 50),
        ],

        [], 

        [ 
            new CollectableBottles(300, 400),
            new CollectableBottles(700, 200),
            new CollectableBottles(1100, 400),
            new CollectableBottles(1500, 400),
            new CollectableBottles(1900, 200),
            new CollectableBottles(2300, 400),
            new CollectableBottles(2700, 400),
            new CollectableBottles(3200, 150),
            new CollectableBottles(3800, 400),
            new CollectableBottles(4600, 400)
        ],

        [ 
            new Coins(200, 150),
            new Coins(500, 200),
            new Coins(1000, 125),
            new Coins(1400, 150),
            new Coins(1900, 200),
            new Coins(2300, 150),
            new Coins(2700, 200),
            new Coins(3300, 150),
            new Coins(3900, 200),
            new Coins(4400, 150)
        ]
    );
}
