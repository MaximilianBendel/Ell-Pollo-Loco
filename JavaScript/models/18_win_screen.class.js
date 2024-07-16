/**
 * Represents the win screen in the game.
 * @extends DrawableObject
 */
class WinScreen extends DrawableObject {

    ShowWinScreen = false;

    /**
     * The image of the win screen.
     * @type {Array<string>}
     */
    WinScreenImage = [
        'img_pollo_locco/img/9_intro_outro_screens/win/won_2.png'
    ];

    /**
     * Creates an instance of WinScreen.
     */
    constructor() {
        super();
        this.loadImg('img_pollo_locco/img/9_intro_outro_screens/win/won_2.png');
        this.x = 100;
        this.y = 100;
        this.height = 300;
        this.width = 500;
    }

    /**
     * Draws the win screen if ShowWinScreen is set to true.
     * @param {CanvasRenderingContext2D} ctx - The 2D context of the canvas.
     */
    draw(ctx) {
        if (this.ShowWinScreen) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
}
