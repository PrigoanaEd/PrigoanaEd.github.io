class Pacman {
    constructor(startPos) {
        this.lastPos = vec.from(startPos);
        this.pos = vec.from(startPos);
        this.renderpos = vec.from(startPos)
        this.nt = vec.from(startPos);

        this.orientation = -1;
        this.nextOrientation = -1;

        this.animationTimer = 0;

        this.pelletsEaten = 0;
        this.ghostsEaten = 0;

        this.points = 0;
        this.level = 0;
        this.lives = 2;

        this.times1up = 0;

        this.dead = false;
        this.won = false;

        this.lastPelletTime = Date.now();
        this.pelletAud = [SFX.GetUnusedSource(true),SFX.GetUnusedSource(true)]
        this.pelletAud[0].src = this.pelletAud[1].src= './audio/pellet.wav';
        this.pelletAudIndex = 0;
        this.nodraw = false;
        this.readyText = true;
        
        this.update = () => {
            if(this.won) {
                this.animationTimer--;
                if(this.animationTimer <= 0) {
                    freeze = false;
                    start(this.level+1, false);
                }
                return;
            }
            if(this.dead) {
                this.animationTimer--;
                if(this.animationTimer <= 0) {
                    start(this.level, true);
                }
                return;
            };
            if(this.points > highscore) {
                highscore = this.points;
                setCookie('pac-hs', highscore.toString(), 365);
            }
            if(this.points - (this.times1up * requiredFor1up) >= requiredFor1up) {
                this.times1up++;
                this.lives = Math.min(5, this.lives+1);
                SFX.GetUnusedSource().play('./audio/1up.wav');
            }
            if(this.pelletsEaten == 244) {
                return this.win();
            }
            if(!this.pos.equals(this.nt)) {
                this.animationTimer++;
                this.animationTimer %= 8;
            } else {
                this.animationTimer = 0;
            }

            this.renderpos.add(vec.from(this.nt).sub(this.pos).div(8));
            if(!this.animationTimer) {
                this.lastPos = vec.from(this.pos);
                this.pos = vec.from(this.nt);
                this.renderpos = vec.from(this.pos);

                let newTile = getTile(this.pos.x, this.pos.y)
                if(newTile) {
                    switch(newTile.type) {
                        case 45 :
                            newTile.changeTile(12, 2)
                            this.pelletsEaten++;
                            this.points += 10;
                            this.lastPelletTime = Date.now();
                            var toPlay = null;
                            if(this.pelletAud[this.pelletAudIndex].playing){
                                if(this.pelletAud[this.pelletAudIndex].elapsed > 0.25){
                                    this.pelletAudIndex = 1 - this.pelletAudIndex;
                                    toPlay = this.pelletAud[this.pelletAudIndex];
                                }
                            }
                            else
                                toPlay = this.pelletAud[this.pelletAudIndex];
                            if(toPlay){
                                if(toPlay.playing)
                                    toPlay.stop();
                                toPlay.play();
                            }
                            break;
                        case 47 :
                            newTile.changeTile(12, 2);
                            this.pelletsEaten++;
                            this.points += 50;
                            this.lastPelletTime = Date.now();
                            for(let g of ghosts) {
                                if(!g.eaten && !g.spawnloop)
                                    g.changeMode(3);
                            }

                            this.ghostsEaten = 0;

                            if(siren.playing)
                                siren.stop();
                            siren.loop('./audio/frightened.wav');
                            break;
                    }
                }

                let save = this.orientation;
                this.orientation = this.nextOrientation;

                let v = new vec().setVals(this.orientation).add(this.pos),
                    t = getTile(v.x,v.y);

                if(!t || acceptableTiles.includes(t.type)) {
                    this.nt = v;
                } else {
                    this.orientation = save;
                    let v = new vec().setVals(this.orientation).add(this.pos),
                        t = getTile(v.x,v.y);
                    if(!t || acceptableTiles.includes(t.type)) this.nt = v;
                }
            };


            if(this.renderpos.x > w/8-1) {
                this.pos.x = 0;
                this.nt.x = 1;
            }
            else if(this.renderpos.x <= 0) {
                this.pos.x = w/8;
                this.nt.x = w/8-1;
            }
        }

        this.die = () => {
            this.animationTimer = 90;
            this.dead = true;
            for(let g of ghosts) {
                g.nodraw = true;
            }
            SFX.GetUnusedSource().play('./audio/death.wav');
            if(siren.playing)
                siren.stop();
        }

        this.win = () => {
            this.animationTimer = 2.5 * 60;
            this.won = true;
            freeze = true;
        }

        this.requestOrientationChange = (n) => {
            this.nextOrientation = n;
        }

        this.render = (t) => {
            if(this.nodraw) return;
            if(this.dead) {
                ctx.drawImage(spritesheet, 35 + (14 - ( Math.round(this.animationTimer / 90 * 14))) * 16, 28, 14, 16, this.renderpos.x*8-3, this.renderpos.y*8-3, 14, 16)
                return;
            }
            if(this.readyText) {
                ctx.drawImage(spritesheet, 0, 506, 46, 7, 11*8+3, 20*8+3, 46, 7)
            }
            if(this.orientation < 0) {
                ctx.drawImage(spritesheet, 35, 28, 14, 16, this.renderpos.x*8+1, this.renderpos.y*8-3, 14, 16);
            } else {
                ctx.drawImage(spritesheet, t % 8 > 4 && (!this.nt.equals(this.pos) || !this.pos.equals(this.renderpos)) ? 3 : 19, 16 * this.orientation + 28, 14, 16, this.renderpos.x*8-3, this.renderpos.y*8-3, 14, 16)
            }

            ctx.drawImage(spritesheet, 0, 174 + 16 * Math.min(this.level, 18), 111, 16, w-112, h-16, 111, 16);
            if(this.lives) ctx.drawImage(spritesheet, 112, 174 + 16 * (5 - Math.min(this.lives, 5)), 80, 16, 1, h-16, 80, 16);

            drawNumbers(this.points, 48, 8);
            drawNumbers(highscore.toString().padStart(6, '0'), 128, 8);
            ctx.drawImage(spritesheet, 139, 255, 126, 7, 26, 0, 126, 7);
        }

        this.handleKeyPress = (e) => {
            switch(e.key.toLowerCase()) {
                case "w" :
                case "arrowup" :
                    this.requestOrientationChange(2)
                    break;
                case "a" :
                case "arrowleft" :
                    this.requestOrientationChange(1)
                    break;
                case "s" :
                case "arrowdown" :
                    this.requestOrientationChange(3);
                    break;
                case "d" :
                case "arrowright" :
                    this.requestOrientationChange(0);
                    break;
            }
        }

        this.mobileSwipeLast = new vec();
        
        this.handleSwipe = (e) => {
            if(e instanceof MouseEvent) {
                if(e.button || e.buttons) {
                    let x = e.movementX,
                        y = e.movementY;
                    if(Math.abs(x) > Math.abs(y)) {
                        if(x > 0) {
                            this.requestOrientationChange(0);
                        } else {
                            this.requestOrientationChange(1);
                        }
                    } else {
                        if(y > 0) {
                            this.requestOrientationChange(3)
                        } else {
                            this.requestOrientationChange(2);
                        }
                    }
                }
            } else if(e instanceof TouchEvent) {
                let x = e.touches[e.touches.length-1].clientX,
                    y = e.touches[e.touches.length-1].clientY,
                    dx = x - this.mobileSwipeLast.x,
                    dy = y - this.mobileSwipeLast.y;

                    if(Math.abs(dx) > Math.abs(dy)) {
                        if(dx > 0) {
                            this.requestOrientationChange(0);
                        } else {
                            this.requestOrientationChange(1);
                        }
                    } else {
                        if(dy > 0) {
                            this.requestOrientationChange(3)
                        } else {
                            this.requestOrientationChange(2);
                        }
                    }
                this.mobileSwipeLast = new vec(x,y)
            } else throw new TypeError("Unknown Swipe Source");
        }
        window.addEventListener('keydown', (e) => this.handleKeyPress(e));
        window.addEventListener('touchmove', (e) => this.handleSwipe(e));
        window.addEventListener('mousemove', (e)=> this.handleSwipe(e));
    }
}