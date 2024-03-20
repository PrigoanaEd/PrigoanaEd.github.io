class Bonus {
    constructor(level) {
        this.pos = new vec(13, 20);
        this.type = Math.min(level, 7);

        this.exists = false;
        this.timesCollected = 0;
        this.animationTimer = random(9.7, 9.9)*60;

        this.pointsOnCollect = [100, 300, 500, 700, 1000, 2000, 3000, 5000][this.type];
        this.requiredPellets = [70, 170, Infinity];

        this.displayNum = false;

        this.update = () => {
            if(this.exists) {
                this.animationTimer--;

                if(this.animationTimer <= 0) {
                    this.exists = false;
                    this.timesCollected++;
                    this.animationTimer = random(9.7, 9.9)*60;
                } else if(player.pos.equals(this.pos)) {
                    player.points += this.pointsOnCollect;
                    this.exists = false;
                    this.timesCollected++;
                    this.animationTimer = random(9.7, 9.9)*60;

                    this.displayNum = true;
                    SFX.GetUnusedSource().play('./audio/fruit.wav', () => {
                        this.displayNum = false;
                    });
                }
            } else if(player.pelletsEaten >= this.requiredPellets[this.timesCollected]) {
                this.exists = true;
            }
        };

        this.render = () => {
            if(this.displayNum) {
                ctx.drawImage(spritesheet, 270, 110 + (this.type * 8), 20, 7, this.pos.x*8, this.pos.y*8, 20, 7);
            } else if(this.exists) {
                ctx.drawImage(spritesheet, 97 + (-Math.min(this.type, 6) * 16), 271 + (Math.min(this.type, 6) * 16), 14, 14, this.pos.x*8+2, this.pos.y*8-4, 14, 14)
            }
        }
    }
}