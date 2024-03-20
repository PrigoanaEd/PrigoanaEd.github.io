const map = [
    'IIIIIIIIIIIIIIIIIIIIIIIIIIII',
    'IIIIIIIIIIIIIIIIIIIIIIIIIIII',
    'IIIIIIIIIIIIIIIIIIIIIIIIIIII',
    '1bbbbbbbbbbbbHGbbbbbbbbbbbb0',
    '3JJJJJJJJJJJJpoJJJJJJJJJJJJ2',
    '3JDeeCJDeeeCJpoJDeeeCJDeeCJ2',
    '3LpIIoJpIIIoJpoJpIIIoJpIIoL2',
    '3JrkkqJrkkkqJrqJrkkkqJrkkqJ2',
    '3JJJJJJJJJJJJJJJJJJJJJJJJJJ2',
    '3JDeeCJDCJDeeeeeeCJDCJDeeCJ2',
    '3JrkkqJpoJrkkCDeeqJpoJrkkqJ2',
    '3JJJJJJpoJJJJpoJJJJpoJJJJJJ2',
    '5ccccCJpFeeCIpoIDeeqoJDcccc4',
    'IIIII3JpDkkqIrqIrkkCoJ2IIIII',
    'IIIII3JpoIIIIIIIIIIpoJ2IIIII',
    'IIIII3JpoItcxKKwcsIpoJ2IIIII',
    'bbbbbqJrqI2PPIIPP3IrqJrbbbbb',
    'IIIIIIJIII2IIIIII3IIIJIIIIII',
    'cccccCJDCI2PPPPPP3IDCJDccccc',
    'IIIII3JpoIvbbbbbbuIpoJ2IIIII',
    'IIIII3JpoIIIIIIIIIIpoJ2IIIII',
    'IIIII3JpoIDeeeeeeCIpoJ2IIIII',
    '1bbbbqJrqIrkkCDeeqIrqJrbbbb0',
    '3JJJJJJJJJJJJpoJJJJJJJJJJJJ2',
    '3JDeeCJDeeeCJpoJDeeeCJDeeCJ2',
    '3JrkCoJrkkkqJrqJrkkkqJpDeqJ2',
    '3LJJpoJJJJJJJIIJJJJJJJpoJJL2',
    '7eCJpoJDCJDeeeeeeCJDCJpoJDe6',
    '9kqJrqJpoJrkkCDeeqJpoJrqJrk8',
    '3JJJJJJpoJJJJpoJJJJpoJJJJJJ2',
    '3JDeeeeqreeCJpoJDeeqreeeeCJ2',
    '3JrkkkkkkkkqJrqJrkkkkkkkkqJ2',
    '3JJJJJJJJJJJJJJJJJJJJJJJJJJ2',
    '5cccccccccccccccccccccccccc4',
    'IIIIIIIIIIIIIIIIIIIIIIIIIIII',
    'IIIIIIIIIIIIIIIIIIIIIIIIIIII',
],
    definitions = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP';

var canvas = document.getElementById('c'),
    ctx = canvas.getContext('2d'),
    w = canvas.width,
    h = canvas.height,
    hw = Math.round(w/2),
    hh = Math.round(h/2),
    spritesheet = document.createElement('img'),
    title = document.getElementsByTagName('title')[0],
    acceptableTiles = [44, 45, 47],
    ghosts = [],
    highscore = ~~getCookie('pac-hs') || 0,
    displaymain = true,
    freeze = false,
    player,
    bonus,
    siren,
    gameover = false,
    requiredFor1up = 10000,
    SFX = new SoundManager(8),
    waves = [
        [7*60, 20*60, 7*60, 20*60, 5*60, 20*60, 5*60, Infinity],
        [7*60, 20*60, 7*60, 20*60, 5*60, 1033*60, 1, Infinity],
        [7*60, 20*60, 7*60, 20*60, 5*60, 1033*60, 1, Infinity],
        [7*60, 20*60, 7*60, 20*60, 5*60, 1033*60, 1, Infinity],
        [5*60, 20*60, 5*60, 20*60, 5*60, 1037*60, 1, Infinity]
    ],
    grid = [],
    credits = ~~random(3, 99);
spritesheet.src = './spritesheet.png'

window.addEventListener('resize', resize);
function resize() {
    canvas.width = map[0].length*8;
    canvas.height = map.length*8;
    w = canvas.width;
    h = canvas.height;
    hw = Math.round(w/2);
    hh = Math.round(h/2);
}
resize();

function px(n) {
    return Math.min(n * (w/100), n * (h/100));
}
function random( min, max ) {
	return Math.random() * ( max - min ) + min;
}

function drawNumbers(n,x,y,c) {
    let a = n.toString().split('').map(n=>{return~~n});
    for(let i = a.length; i >= 0; i--) {
        ctx.drawImage(spritesheet, a[i] * 8, (!!c * 8) + 487, 8, 8, x - (((a.length-1) - i) * 8), y, 8, 8)
    }
}

function start(level, restart) {
    if(!restart) {
        grid = [];
        for(let y = 0; y < map.length; ++y) {
            for(let x = 0; x < map[y].length; ++x) {
                let n = definitions.indexOf(map[y].charAt(x)),            
                    tx = n % 16,
                    ty = n / 16;
    
                new Tile(x,y, ~~tx, ~~ty, n);
            }
        }
        player.pelletsEaten = 0;
        bonus = new Bonus(level);
    } else {
        player.lives--;
    }

    var startPos = new vec(13, 26);
    player.level = level;
    player.lastPos = vec.from(startPos);
    player.pos = vec.from(startPos);
    player.renderpos = vec.from(startPos)
    player.nt = vec.from(startPos);
    player.orientation = -1;
    player.nextOrientation = -1;
    player.dead = false;
    player.won = false;
    player.readyText = true;
    player.ghostsEaten = 0;

    if(player.lives < 0) {
        credits--;
        displaymain = true;
        gameover = true;
        for(let a of SFX.audioHolder) {
            if(a.playing) {
                a.stop();
            }
        }
        return;
    }


    ghosts = [];
    new Blinky();
    new Pinky();
    new Inky();
    new Clyde();

    freeze = true;

    for(let o of SFX.audioHolder) {
        if(o.playing)
            o.stop();
    }
    if(!level && !restart) {
        return SFX.GetUnusedSource().play('./audio/gameStart.wav', () => {
            freeze = false;
            player.readyText = false;
            siren.play('./audio/siren.wav');
        })
    } else {
        setTimeout(() => {
            siren.play('./audio/siren.wav');
            freeze = false;
            player.readyText = false;
        }, 1500)
    }
}

(f=i=>{
    if(freeze) i-=1;
    i%=60;
    requestAnimationFrame(()=>f(i+1));
    ctx.clearRect(0,0,w,h);

    if(displaymain) {
        if(gameover) {
            return ctx.drawImage(spritesheet, 0, 543, 97, 7, ~~(w/2 - 97/2), ~~(h/2), 97, 7)
        }
        ctx.drawImage(spritesheet, 113, 255, 223, 287, 0, 0, 223, 287);
        drawNumbers(credits, 80, h-8);
        drawNumbers(requiredFor1up.toString().substring(0,requiredFor1up.toString().length-3), 160, 192, true);
        drawNumbers(requiredFor1up, 48, 8);
        drawNumbers(requiredFor1up*2, 200, 8);
        drawNumbers(highscore.toString().padStart(6, '0'), 128, 8);
    } else {
        for(let t of grid) {
            t.render(i)
        }

        if(!freeze) bonus.update();
        bonus.render();
        
        if(!freeze || player.won) player.update();
        player.render(i);
    
        for(let g of ghosts) {
            if(!freeze) g.update(i);
            g.render(i);
        }
    }
})(0);

function startGame() {
    if(displaymain) {
        if(gameover) {
            return gameover = false;
        }
        displaymain = false;
        player = new Pacman(new vec(13, 26));
        start(0);
        siren = SFX.GetUnusedSource();
    }
}
window.addEventListener('mousedown', startGame);
window.addEventListener('keydown', startGame);
window.addEventListener('tap', startGame);

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}