class SoundManager {
    constructor() {
        this.sounds = {};
        this.lastPlayTime = {};
        this.isMuted = false;
    }

    addSound(name, sound) {
        this.sounds[name] = sound;
        this.lastPlayTime[name] = 0; // Initialisierungszeitstempel
    }

    playSound(name, delay = 500) {
        const currentTime = Date.now();
        if (!this.isMuted && this.sounds[name] && currentTime - this.lastPlayTime[name] > delay) {
            this.sounds[name].currentTime = 0; // Stellt sicher, dass das Audio von Anfang an spielt
            this.sounds[name].play();
            this.lastPlayTime[name] = currentTime; // Aktualisiert den letzten Wiedergabezeitpunkt
            // Stoppt die Wiedergabe nach 0,5 Sekunden
            setTimeout(() => {
                this.sounds[name].pause();
                this.sounds[name].currentTime = 0; // Setzt die Zeit zurück, damit das nächste Mal von Anfang an gespielt wird
            }, 500);
        }
    }

    playnormalSound(name) {
        if (!this.isMuted && this.sounds[name]) {
            this.sounds[name].play();
        }
    }

    pauseSound(name) {
        if (this.sounds[name]) {
            this.sounds[name].pause();
        }
    }

    muteAll() {
        this.isMuted = true;
        for (let sound in this.sounds) {
            this.sounds[sound].pause();
        }
    }

    unmuteAll() {
        this.isMuted = false;
    }
}

const soundManager = new SoundManager();
