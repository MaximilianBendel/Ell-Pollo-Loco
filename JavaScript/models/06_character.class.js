/**
 * Represents the main character in the game.
 * @extends MoveableObject
 */
class Character extends MoveableObject {
    /**
     * Creates a new instance of the character and loads all required images.
     */
    constructor() {
        super().loadImg('img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadAllImages();
        this.applyGravity();
        this.initCharacterProperties();
        this.initAnimations();
    }

    /**
     * Initializes the basic properties of the character.
     */
    initCharacterProperties() {
        this.x = 0;
        this.y = 210;
        this.width = 100;
        this.height = 240;
        this.offsetX = 20;
        this.offsetY = 20;
        this.offsetWidth = 20;
        this.offsetHeight = 20;
        this.currentImage = 0;
        this.world = null;
        this.speed = 5;
        this.direction = 'right';
        this.idleTime = 0;
        this.isDeadAnimationStopped = false;
        this.lifepoints = 100;
        this.CharacterIsJumping = false;
        this.CharacterIsUnhurtable = false;
    }

    /**
     * Loads all necessary images for the character.
     */
    loadAllImages() {
        const imageSets = [
            'walking', 'idle', 'long_idle', 'jumping', 'dead', 'hurt'
        ];
        imageSets.forEach(set => this.loadImages(this[`Images_${set}`]));
    }

    /**
     * Initializes the animations of the character.
     */
    initAnimations() {
        this.animationIntervals = {
            moveCharacter: setInterval(() => this.moveCharacter(), 1000 / 60),
            updateAnimation: setInterval(() => this.updateAnimation(), 200),
            jumpingAnimationInterval: setInterval(() => this.startJumpingAnimation(), 250),
            deadAnimationInterval: null,
        };
    }

    /**
     * Makes the character invincible for a short period.
     */
    unHurtable() {
        if (!this.CharacterIsUnhurtable) {
            this.CharacterIsUnhurtable = true;
            setTimeout(() => this.CharacterIsUnhurtable = false, 500);
        }
    }

    /**
     * Moves the character based on user input.
     */
    moveCharacter() {
        soundManager.pauseSound('walking');
        if (this.isMovingRight()) {
            this.moveRightCharacter();
        }
        if (this.isMovingLeft()) {
            this.moveLeftCharacter();
        }
        if (this.isJumping()) {
            this.jump();
            this.startJumpingAnimation();
        }
        this.world.camera_x = -this.x + 100;
    }

    isMovingRight() {
        return (this.world.keyboard.RIGHT || this.world.keyboard.RIGHT_BTN || this.world.keyboard.D) && this.x < this.world.level.level_end_x;
    }

    isMovingLeft() {
        return (this.world.keyboard.LEFT || this.world.keyboard.LEFT_BTN || this.world.keyboard.A) && this.x > -720;
    }

    isJumping() {
        return (this.world.keyboard.SPACE || this.world.keyboard.JUMP_BTN || this.world.keyboard.UP) && !this.isAboveGround();
    }

    /**
     * Moves the character to the right.
     */
    moveRightCharacter() {
        this.x += this.speed;
        this.direction = 'right';
        this.resetIdleTimeAndPlaySound('walking');
    }

    /**
     * Moves the character to the left.
     */
    moveLeftCharacter() {
        this.x -= this.speed;
        this.direction = 'left';
        this.resetIdleTimeAndPlaySound('walking');
    }

    resetIdleTimeAndPlaySound(sound) {
        this.idleTime = 0;
        soundManager.playnormalSound(sound);
        soundManager.pauseSound('snoring');
    }

    /**
     * Starts the jump animation.
     */
    startJumpingAnimation() {
        this.clearInterval('jumpingAnimationInterval');
        soundManager.playnormalSound('jumping');
        this.animateImages(this.Images_jumping);
        if (this.currentImage >= this.Images_jumping.length - 1) {
            this.CharacterIsJumping = true;
        }
    }

    /**
     * Stops the jump animation.
     */
    stopJumpingAnimation() {
        this.clearInterval('jumpingAnimationInterval');
        this.CharacterIsJumping = false;
    }

    /**
     * Stops the death animation.
     */
    stopDeadAnimation() {
        this.clearInterval('deadAnimationInterval');
        this.loadImg('img_pollo_locco/img/2_character_pepe/5_dead/D-56.png');
        this.isDeadAnimationStopped = true;
    }

    /**
     * Updates the animations based on the character's state.
     */
    updateAnimation() {
        if (this.isAboveGround()) {
            this.animateImages(this.Images_jumping);
        } else {
            this.speedY = 0;
            this.stopJumpingAnimation();
            (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.RIGHT_BTN || this.world.keyboard.LEFT_BTN || this.world.keyboard.D || this.world.keyboard.A) ? this.startWalkingAnimation() : this.startIdleAnimation();
        }
        if (this.isHurt()) {
            this.animateImages(this.Images_hurt);
            soundManager.playnormalSound('hurt');
        }
        if (this.isDead()) {
            this.handleDeath();
        }
    }

    handleDeath() {
        if (!this.isDeadAnimationStopped) {
            this.animateImages(this.Images_dead);
            setTimeout(() => this.stopDeadAnimation(), 400);
        }
    }

    startIdleAnimation() {
        this.idleTime += 200;
        if (this.idleTime >= 8000) {
            this.animateImages(this.Images_long_idle);
            soundManager.playnormalSound('snoring');
        } else {
            this.animateImages(this.Images_idle);
            soundManager.pauseSound('snoring');
        }
    }

    startWalkingAnimation() {
        this.animateImages(this.Images_walking);
        soundManager.pauseSound('snoring');
    }

    /**
     * Animates the character's images.
     * @param {string[]} images - The array of images to animate.
     */
    animateImages(images) {
        if (this.isDeadAnimationStopped) return;
        this.currentImage = (this.currentImage + 1) % images.length;
        this.img = this.imageCache[images[this.currentImage]];
    }

    /**
     * Draws the character on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.save();
        if (this.direction === 'left') {
            ctx.scale(-1, 1);
            ctx.drawImage(this.img, -this.x - this.width, this.y, this.width, this.height);
        } else {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
        ctx.restore();
    }

    /**
     * Stops all animations of the character.
     */
    stoppAllAnimations() {
        Object.keys(this.animationIntervals).forEach(key => this.clearInterval(key));
        soundManager.pauseSound('walking');
        soundManager.pauseSound('snoring');
    }

    /**
     * Activates all animations of the character.
     */
    activateAllAnimations() {
        this.initAnimations();
    }

    clearInterval(key) {
        if (this.animationIntervals[key]) {
            clearInterval(this.animationIntervals[key]);
            this.animationIntervals[key] = null;
        }
    }
}

const Images = {
    walking: [
        'img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-26.png'
    ],
    idle: [
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
    ],
    long_idle: [
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
    ],
    jumping: [
        'img_pollo_locco/img/2_character_pepe/3_jump/J-31.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-32.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-33.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-34.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-35.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-37.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-38.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-39.png'
    ],
    dead: [
        'img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-57.png'
    ],
    hurt: [
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png'
    ]
};

Object.keys(Images).forEach(key => {
    Character.prototype[`Images_${key}`] = Images[key];
});
