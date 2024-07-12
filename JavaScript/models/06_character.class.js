class Character extends MoveableObject {
    Images_walking = [
        'img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-26.png'
    ];
    Images_idle = [
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-2.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-3.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-4.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-5.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-6.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-7.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-8.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-9.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    Images_long_idle = [
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    Images_jumping = [
        'img_pollo_locco/img/2_character_pepe/3_jump/J-31.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-32.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-33.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-34.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-35.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-37.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-38.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-39.png',
    ];
    Images_dead = [
        'img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-57.png'
    ];
    Images_hurt = [
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png'
    ];

    currentImage = 0;
    world;
    speed = 5;
    direction = 'right';
    idleTime = 0;
    isDeadAnimationStopped = false;
    lifepoints = 100;

    constructor() {
        super().loadImg('img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.Images_walking);
        this.loadImages(this.Images_idle);
        this.loadImages(this.Images_long_idle);
        this.loadImages(this.Images_jumping);
        this.loadImages(this.Images_dead);
        this.loadImages(this.Images_hurt);
        this.applyGravity();
        this.x = 0;
        this.height = 240;
        this.width = 100;
        this.y = 210;
        this.initAnimations();
    }

    initAnimations() {
        this.animationIntervals = {
            moveCharacter: setInterval(() => this.moveCharacter(), 1000 / 60),
            updateAnimation: setInterval(() => this.updateAnimation(), 200),
            jumpingAnimationInterval: setInterval(() => this.startJumpingAnimation(), 250),
            deadAnimationInterval: null,
        };
    }

    moveCharacter() {
        soundManager.pauseSound('walking');
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRightCharacter();
        }
        if (this.world.keyboard.LEFT && this.x > -720) {
            this.moveLeftCharacter();
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.startJumpingAnimation();
        }
        this.world.camera_x = -this.x + 100;
    }

    moveRightCharacter() {
        this.x += this.speed;
        this.direction = 'right';
        soundManager.playnormalSound('walking');
        this.idleTime = 0;
        soundManager.pauseSound('snoring');
    }

    moveLeftCharacter() {
        this.x -= this.speed;
        this.direction = 'left';
        soundManager.playnormalSound('walking');
        this.idleTime = 0;
        soundManager.pauseSound('snoring');
    }

    startJumpingAnimation() {
        if (this.animationIntervals.jumpingAnimationInterval) {
            clearInterval(this.animationIntervals.jumpingAnimationInterval);
        }
        this.animateImages(this.Images_jumping); 
        if (this.currentImage >= this.Images_jumping.length - 1) {
            console.log(this.currentImage);
            clearInterval(this.animationIntervals.jumpingAnimationInterval);
        }
    }

    stopJumpingAnimation() {
        if (this.animationIntervals.jumpingAnimationInterval) {
            clearInterval(this.animationIntervals.jumpingAnimationInterval);
            this.animationIntervals.jumpingAnimationInterval = null;
        }
    }

    stopDeadAnimation() {
        if (this.animationIntervals.deadAnimationInterval) {
            clearInterval(this.animationIntervals.deadAnimationInterval);
            this.animationIntervals.deadAnimationInterval = null;
        }
        this.loadImg('img_pollo_locco/img/2_character_pepe/5_dead/D-56.png');
        this.isDeadAnimationStopped = true;
    }

    updateAnimation() {
        if (!this.isAboveGround()) {
            this.speedY = 0;
            this.stopJumpingAnimation();
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.animateImages(this.Images_walking);
                this.idleTime = 0;
                soundManager.pauseSound('snoring');
            } else {
                this.idleTime += 200;
                if (this.idleTime >= 8000) {
                    this.animateImages(this.Images_long_idle);
                    soundManager.playnormalSound('snoring');
                } else {
                    this.animateImages(this.Images_idle);
                    soundManager.pauseSound('snoring');
                }
            }
        } else {
            this.animateImages(this.Images_jumping);
        }
        if (this.isHurt()) {
            this.animateImages(this.Images_hurt);
        }
        if (this.isDead()) {
            if (!this.isDeadAnimationStopped) {
                this.animateImages(this.Images_dead);
                setTimeout(() => {
                    this.stopDeadAnimation();
                }, 400);
            }
            return;
        }
    }

    animateImages(images) {
        if (this.isDeadAnimationStopped) {
            return;
        }
        this.currentImage++;
        if (this.currentImage >= images.length) {
            this.currentImage = 0;
        }
        this.img = this.imageCache[images[this.currentImage]];
    }

    draw(ctx) {
        if (this.direction === 'left') {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.img, -this.x - this.width, this.y, this.width, this.height);
            ctx.restore();
        } else {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    stoppAllAnimations() {
        for (let key in this.animationIntervals) {
            if (this.animationIntervals[key]) {
                clearInterval(this.animationIntervals[key]);
                this.animationIntervals[key] = null;
            }
        }
        soundManager.pauseSound('walking');
        soundManager.pauseSound('snoring');
    }
}
