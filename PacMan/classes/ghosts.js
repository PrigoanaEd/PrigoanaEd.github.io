class Ghost {
    constructor(type, startPos, scatterTarget) {
        this.pos = vec.from(startPos);
        this.renderpos = vec.from(startPos);
        this.nt = vec.from(startPos);
        this.target = new vec();
        this.lastPos = vec.from(startPos);

        this.type = ~~type;
        this.orientation = 0;
        this.animationTimer = 0;

        this.scatterTarget = vec.from(scatterTarget);

        this.spawnloop = true;
        this.chase = false;
        this.scatter = false;
        this.frightened = false;
        this.eaten = false;

        this.previousScatter = true;

        this.frightenedTimer = 0;
        this.wave = 0;
        this.waveTimer = waves[Math.min(player.level, 4)][this.wave];

        this.drawEatenNumber = false;

        this.nodraw = false;

        this.update = (t) => {
            if(this.nodraw) return;
            this.waveTimer--;
            var fast;
            if(this.eaten)  {
                this.target = new vec(14, 16);
                fast = true;
                if(this.pos.equals(new vec(14, 16))) {
                    this.lastPos = vec.from(this.pos);
                    this.changeMode(0);
                }
            } else if(this.frightened) {
                this.frightenedTimer--;
                this.target = new vec(random(-1000, 1000), random(-1000, 1000));
                if(this.frightenedTimer <= 0) {
                    if(siren.audio.src.includes('frightened.wav')) {
                        siren.stop();
                        siren.loop('./audio/siren.wav')
                    }
                    this.changeMode(this.previousScatter + 1);
                }
            } else if(this.scatter) {
                this.target = vec.from(this.scatterTarget);

                if(this.waveTimer <=0) {
                    this.wave++;
                    this.waveTimer = waves[Math.min(player.level, 4)][this.wave];
                    this.previousScatter = false;
                    this.changeMode(1);
                }
            } else if(this.chase) {
                this.target = this.getTarget();

                if(this.waveTimer <=0) {
                    this.wave++;
                    this.waveTimer = waves[Math.min(player.level, 4)][this.wave];
                    this.previousScatter = true;
                    this.changeMode(2);
                }
            } else if(this.spawnloop) {
                if(player.pelletsEaten >= this.spawnPelletsRequire[Math.min(player.level, this.spawnPelletsRequire.length-1)] || (Date.now() - player.lastPelletTime > 5000 && !ghosts[this.type-1].spawnloop)) {
                    if(this.pos.equals(new vec(14, 14))) {
                        player.lastPelletTime = Date.now();
                        this.lastPos = vec.from(this.pos);
                        this.changeMode(this.previousScatter + 1);
                    } else {
                        this.target = new vec(14, 14);
                    }
                } else {
                    return this.orientation = ~~(t/30) % 4;
                }
            } else {
                throw new Error('No Ghost mode')
            }

            var slow = (this.frightened || (this.pos.y == 17 && (this.pos.x < 6 || this.pos.x > 21)));

            if(!this.pos.equals(this.nt)) {
                this.animationTimer += slow ? 0.5 : fast ? 2 : 1;
                this.animationTimer %= 8;
            } else {
                this.animationTimer = 0;
            }

            let v = vec.from(this.nt).sub(this.pos).div(8)
            if(slow) v.div(2);
            else if(fast) v.mult(2);
            this.renderpos.add(v);

            if(!this.animationTimer) {
                this.lastPos = vec.from(this.pos);
                this.pos = vec.from(this.nt);
                this.renderpos = vec.from(this.pos);

                let validTiles = [
                    new vec(0, -1).add(this.pos),
                    new vec(-1, 0).add(this.pos),
                    new vec(0, 1).add(this.pos),
                    new vec(1, 0).add(this.pos)
                ];

                validTiles = validTiles.sort((a,b) => {return a.distance(this.target) - b.distance(this.target)});
                for(let i = 0; i < validTiles.length; ++i) {
                    let t = getTile(validTiles[i].x, validTiles[i].y)
                    if(!validTiles[i].equals(this.lastPos) && (!t || acceptableTiles.includes(t.type) || ((this.pos.equals(new vec(14, 16)) && validTiles[i].equals(new vec(14, 15))) || (this.eaten && this.pos.equals(new vec(14, 14)) && validTiles[i].equals(new vec(14, 15)))))) {
                        this.orientation = validTiles[i].sub(this.pos).getOrientation();
                        break;
                    }
                }
                this.nt = new vec().setVals(this.orientation).add(this.pos);
            };

            if(this.renderpos.x > w/8-1) {
                this.pos.x = 0;
                this.nt.x = 1
            }
            else if(this.renderpos.x <= 0) {
                this.pos.x = w/8;
                this.nt.x = w/8-1;
            }

            this.checkCollision();
        }

        this.changeMode = (n) => {
            let arr = [this.spawnloop, this.chase, this.scatter, this.frightened, this.eaten];
            this.spawnloop = (this.chase = (this.scatter = (this.frightened = (this.eaten = false))));

            switch(n) {
                case 0:
                    this.spawnloop = true;
                    break;
                case 1:
                    this.chase = true;
                    break;
                case 2:
                    this.scatter = true;
                    break;
                case 3:
                    this.frightened = true;
                    this.frightenedTimer = 240 + 180;
                    break;
                case 4:
                    this.eaten = true;
                    break;
            }

            if(!arr[n]) {
                this.animationTimer = 0;
                this.renderpos = vec.from(this.pos);
                let temp = vec.from(this.nt);
                this.nt = vec.from(this.lastPos);
                this.lastPos = temp;
            }
        }

        this.checkCollision = () => {
            let n = 0.2;
            if(
                !(
                    player.renderpos.x - n > this.renderpos.x + n ||
                    player.renderpos.x + n < this.renderpos.x - n ||
                    player.renderpos.y - n > this.renderpos.y + n ||
                    player.renderpos.y + n < this.renderpos.y - n
                )
            ) {
                if(this.frightened) {
                    freeze = true;
                    player.nodraw = true;
                    player.ghostsEaten++;
                    SFX.GetUnusedSource().play('./audio/ghostDeath.wav', () => {
                        freeze=false;
                        player.nodraw = false;
                        this.drawEatenNumber = 0;
                    })
                    this.changeMode(4);
                    
                    this.drawEatenNumber = player.ghostsEaten;
                    player.points += [200, 400, 800, 1600][player.ghostsEaten-1];
                } else if(!this.eaten) {
                    player.die();
                }
            }
        }

        this.render = (t) => {
            if(this.nodraw) return;
            if(this.drawEatenNumber) {
                return ctx.drawImage(spritesheet, 270 + ((player.ghostsEaten-1) * 16), 102, 15 + (player.ghostsEaten == 4), 7, this.renderpos.x*8, this.renderpos.y*8, 15 + (player.ghostsEaten == 4), 7);
            }
            if(this.eaten) {
                ctx.drawImage(spritesheet, (this.orientation * 14) + (this.orientation * 2) + 129, 16 + 108, 14, 14, this.renderpos.x*8-3, this.renderpos.y*8-3, 14, 14);
            } else if(this.frightened) {
                ctx.drawImage(spritesheet, (!!(t % 8 > 4) * 16) + (this.frightenedTimer < 180 && t % 30 > 15 ? 160 : 128), 108, 14, 14, this.renderpos.x*8-3, this.renderpos.y*8-3, 14, 14);
            } else {
                ctx.drawImage(spritesheet, (this.orientation * 2 * 14) + (this.orientation * 4) + (!!(t % 8 > 4) * 16), this.type * 14 + this.type * 2 + 108, 14, 14, this.renderpos.x*8-3 + (this.spawnloop ? -4 : 0), this.renderpos.y*8-3, 14, 14);
            }
        }

        this.getTarget = () => {
            return vec.from(this.pos);
        }

        ghosts.push(this);
    }
}

class Blinky extends Ghost {
    constructor() {
        super(0, new vec(14, 14), new vec(w/8-1, 0));

        this.spawnPelletsRequire = [
            0, 0
        ]

        this.getTarget = () => {
            return vec.from(player.pos);
        }
    }
}

class Pinky extends Ghost {
    constructor() {
        super(1, new vec(14, 17), new vec(0,0));

        this.spawnPelletsRequire = [
            30, 0
        ]

        this.getTarget = () => {
            return new vec().setVals(player.orientation).mult(4).add(player.pos);
        }
    }
}

class Inky extends Ghost {
    constructor() {
        super(2, new vec(12, 17), new vec(w/8-1, h/8-1));

        this.spawnPelletsRequire = [
            50, 10
        ]

        this.getTarget = () => {
            let i = new vec().setVals(player.orientation).mult(2).add(player.pos),
                v = vec.from(ghosts[0].pos).sub(i),
                cos = Math.cos(Math.PI),
                sin = Math.sin(Math.PI);
            return new vec(~~(v.x * cos - v.y * sin), ~~(v.x * sin + v.y * cos)).add(i);
        };
    }
}

class Clyde extends Ghost {
    constructor() {
        super(3, new vec(16, 17), new vec(0, h/8-1));

        this.spawnPelletsRequire = [
            60, 50
        ]

        this.getTarget = () => {
            return this.pos.distance(player.pos) / 8 < 8 ? vec.from(this.scatterTarget) : vec.from(player.pos);
        }
    }
}