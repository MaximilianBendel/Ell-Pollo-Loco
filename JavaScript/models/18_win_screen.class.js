class WinScreen extends Drawableobject { 

    ShowWinScreen = false;

    WinScreenImage = [
        'img_pollo_locco/img/9_intro_outro_screens/win/won_2.png'
    ];

    constructor() { 
        super();
        this.loadImg('img_pollo_locco/img/9_intro_outro_screens/win/won_2.png');
        this.x = 100
        this.y = 100
        this.height = 300
        this.width = 500
    }

    draw(ctx) {
        if (this.ShowWinScreen) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
}