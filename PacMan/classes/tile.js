function getTile(x,y) {
    if(x<0||y<0||x>w/8-1||y>h/8-1) return null;
    return grid[y*map[0].length+x];
}

class Tile {
    constructor(insX, insY, tx, ty, n) {
        this._insX = ~~insX * 8;
        this._insY = ~~insY * 8;

        this._tx = tx * 8 + (tx+1);
        this._ty = ty * 8 + (ty+1);

        this.type = n;

        this.render = (t) => {
            if((this.type != 47 || t > 30) && this.type != 51) ctx.drawImage(spritesheet, this._tx + (player.won && player.animationTimer%30>15 && player.animationTimer < 90 ? 144 : 0), this._ty, 8, 8, this._insX, this._insY, 8, 8);
        }

        this.changeTile = (x,y) => {
            this._tx = x * 8 + (x+1);
            this._ty = y * 8 + (y+1);
            this.type = y * 16 + x;
        }

        grid.push(this);
    }
}