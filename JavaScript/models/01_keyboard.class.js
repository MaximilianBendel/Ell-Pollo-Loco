class Keyboard {
    constructor() {
        this.LEFT = false;
        this.RIGHT = false;
        this.UP = false;
        this.DOWN = false;
        this.SPACE = false;
        this.D = false;

           // mobile Steuerungseingaben
           this.LEFT_BTN = false;
           this.RIGHT_BTN = false;
           this.JUMP_BTN = false;
           this.THROW_BTN = false;
    }

    updateKeyState(key, isPressed) {
        switch (key) {
            case 'ArrowLeft':
                this.LEFT = isPressed;
                break;
            case 'ArrowRight':
                this.RIGHT = isPressed;
                break;
            case 'ArrowUp':
                this.UP = isPressed; 
                break;
            case 'ArrowDown':   
                this.DOWN = isPressed;
                break;
            case ' ':
                this.SPACE = isPressed;
                break;
            case 'd':
            case 'D':
                this.D = isPressed;
                break;
            default:
                break;
        }
    }

    updateButtonState(button, isPressed) {
        switch (button) {
            case 'LEFT':
                this.LEFT_BTN = isPressed;
                break;
            case 'RIGHT':
                this.RIGHT_BTN = isPressed;
                break;
            case 'JUMP':
                this.JUMP_BTN = isPressed;
                break;
            case 'THROW':
                this.THROW_BTN = isPressed;
                break;
            default:
                break;
        }
    }
}
