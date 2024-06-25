class MoveableObject {
    x = 120;
    y = 320;
    img;
    height = 150;
    width = 100;


    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving Right')
    }


    moveLeft() {
        
    }
}