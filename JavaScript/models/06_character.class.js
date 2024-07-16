/**
 * Repräsentiert den Hauptcharakter im Spiel.
 * @extends MoveableObject
 */
class Character extends MoveableObject {
    /**
     * Die Bilder des Charakters im Gehmodus.
     * @type {string[]}
     */
    Images_walking = [
        'img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * Die Bilder des Charakters im Ruhmodus.
     * @type {string[]}
     */
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

    /**
     * Die Bilder des Charakters im langen Ruhmodus.
     * @type {string[]}
     */
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

    /**
     * Die Bilder des Charakters im Sprungmodus.
     * @type {string[]}
     */
    Images_jumping = [
        'img_pollo_locco/img/2_character_pepe/3_jump/J-31.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-32.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-33.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-34.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-35.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-37.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-38.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-39.png'
    ];

    /**
     * Die Bilder des Charakters im Todesmodus.
     * @type {string[]}
     */
    Images_dead = [
        'img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Die Bilder des Charakters im Verletzungsmodus.
     * @type {string[]}
     */
    Images_hurt = [
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
     * Das aktuelle Bild des Charakters.
     * @type {number}
     */
    currentImage = 0;

    /** 
     * Die Welt, in der sich der Charakter befindet.
     */
    world;

    /**
     * Die Geschwindigkeit des Charakters.
     * @type {number}
     */
    speed = 5;

    /**
     * Die Richtung, in die der Charakter schaut.
     * @type {string}
     */
    direction = 'right';

    /**
     * Die Zeit, die der Charakter im Ruhezustand verbringt.
     * @type {number}
     */
    idleTime = 0;

    /**
     * Der Status der Todesanimation.
     * @type {boolean}
     */
    isDeadAnimationStopped = false;

    /**
     * Die Lebenspunkte des Charakters.
     * @type {number}
     */
    lifepoints = 100;

    CharacterIsJumping = false;
    CharacterIsUnhurtable = false;

    /**
     * Erstellt eine Instanz von Character.
     */
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
        this.offsetX = 20; // Beispiel: verkleinert die Hitbox an allen Seiten
        this.offsetY = 20;
        this.offsetWidth = 20;
        this.offsetHeight = 20;
        this.initAnimations();
    }

    /**
     * Initialisiert die Animationen des Charakters.
     */
    initAnimations() {
        this.animationIntervals = {
            moveCharacter: setInterval(() => this.moveCharacter(), 1000 / 60),
            updateAnimation: setInterval(() => this.updateAnimation(), 200),
            jumpingAnimationInterval: setInterval(() => this.startJumpingAnimation(), 250),
            deadAnimationInterval: null,
        };
    }

    unHurtable() { 
        if (!this.CharacterIsUnhurtable) {
            this.CharacterIsUnhurtable = true;
            setTimeout(() => {
                this.CharacterIsUnhurtable = false;
            }, 500);
        }
    }

    /**
     * Bewegt den Charakter basierend auf der Benutzereingabe.
     */
    moveCharacter() {
        soundManager.pauseSound('walking');
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x || this.world.keyboard.RIGHT_BTN && this.x < this.world.level.level_end_x || this.world.keyboard.D && this.x < this.world.level.level_end_x) {
            this.moveRightCharacter();
        }
        if (this.world.keyboard.LEFT && this.x > -720 || this.world.keyboard.LEFT_BTN && this.x > -720 || this.world.keyboard.A && this.x > -720) {
            this.moveLeftCharacter();
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround() || this.world.keyboard.JUMP_BTN && !this.isAboveGround() || this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
            this.startJumpingAnimation();
        }
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Bewegt den Charakter nach rechts.
     */
    moveRightCharacter() {
        this.x += this.speed;
        this.direction = 'right';
        soundManager.playnormalSound('walking');
        this.idleTime = 0;
        soundManager.pauseSound('snoring');
    }

    /**
     * Bewegt den Charakter nach links.
     */
    moveLeftCharacter() {
        this.x -= this.speed;
        this.direction = 'left';
        soundManager.playnormalSound('walking');
        this.idleTime = 0;
        soundManager.pauseSound('snoring');
    }

    /**
     * Startet die Sprunganimation.
     */
    startJumpingAnimation() {
        if (this.animationIntervals.jumpingAnimationInterval) {
            clearInterval(this.animationIntervals.jumpingAnimationInterval);
        }
        soundManager.playnormalSound('jumping');
        this.animateImages(this.Images_jumping); 
        if (this.currentImage >= this.Images_jumping.length - 1) {
            clearInterval(this.animationIntervals.jumpingAnimationInterval);
            this.CharacterIsJumping = true;
        }
        
    }

    /**
     * Stoppt die Sprunganimation.
     */
    stopJumpingAnimation() {
        if (this.animationIntervals.jumpingAnimationInterval) {
            clearInterval(this.animationIntervals.jumpingAnimationInterval);
            this.animationIntervals.jumpingAnimationInterval = null;
            this.CharacterIsJumping = false;
        }
        
    }

    /**
     * Stoppt die Todesanimation.
     */
    stopDeadAnimation() {
        if (this.animationIntervals.deadAnimationInterval) {
            clearInterval(this.animationIntervals.deadAnimationInterval);
            this.animationIntervals.deadAnimationInterval = null;
        }
        this.loadImg('img_pollo_locco/img/2_character_pepe/5_dead/D-56.png');
        this.isDeadAnimationStopped = true;
    }

    /**
     * Aktualisiert die Animationen basierend auf dem Zustand des Charakters.
     */
    updateAnimation() {
        if (!this.isAboveGround()) {
            this.speedY = 0;
            this.stopJumpingAnimation();
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.RIGHT_BTN || this.world.keyboard.LEFT_BTN || this.world.keyboard.D || this.world.keyboard.A) {
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
            soundManager.playnormalSound('hurt');
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

    /**
     * Animiert die Bilder des Charakters.
     * @param {string[]} images - Das Array der Bilder, die animiert werden sollen.
     */
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

    /**
     * Zeichnet den Charakter auf das Canvas.
     * @param {CanvasRenderingContext2D} ctx - Der Rendering-Kontext des Canvas.
     */
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

    /**
     * Stoppt alle Animationen des Charakters.
     */
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

    /**
     * Aktiviert alle Animationen des Charakters.
     */
    activateAllAnimations() {
        this.initAnimations();
    }
}
