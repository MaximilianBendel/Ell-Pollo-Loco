class Keyboard {
    constructor() {
        this.LEFT = false;
        this.RIGHT = false;
        this.UP = false;
        this.DOWN = false;
        this.SPACE = false;
        this.D = false;
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
}
