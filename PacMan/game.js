const _0x3146cb=_0x5a9c;(function(_0x1e7220,_0x899f7d){const _0x49093a=_0x5a9c,_0x86a57f=_0x1e7220();while(!![]){try{const _0x10eb1c=parseInt(_0x49093a(0x182))/0x1*(-parseInt(_0x49093a(0x18d))/0x2)+parseInt(_0x49093a(0x1b8))/0x3*(-parseInt(_0x49093a(0x1be))/0x4)+-parseInt(_0x49093a(0x1a0))/0x5*(parseInt(_0x49093a(0x1cd))/0x6)+-parseInt(_0x49093a(0x184))/0x7+-parseInt(_0x49093a(0x1ab))/0x8+parseInt(_0x49093a(0x18f))/0x9*(-parseInt(_0x49093a(0x1b5))/0xa)+parseInt(_0x49093a(0x189))/0xb*(parseInt(_0x49093a(0x1a9))/0xc);if(_0x10eb1c===_0x899f7d)break;else _0x86a57f['push'](_0x86a57f['shift']());}catch(_0x3c4d3e){_0x86a57f['push'](_0x86a57f['shift']());}}}(_0x2091,0xb0e63));function _0x2091(){const _0x662e2e=['pelletsEaten','IIIII3JpoIvbbbbbbuIpoJ2IIIII','1124385VCyaMF','keydown','setTime','min','charAt','random','round','IIIII3JpoItcxKKwcsIpoJ2IIIII','padStart','78526956rTNRDF','substring','9580008cVXIro','expires=','3JrkkqJpoJrkkCDeeqJpoJrkkqJ2','3JJJJJJJJJJJJJJJJJJJJJJJJJJ2','nextOrientation','pos','readyText','1bbbbbbbbbbbbHGbbbbbbbbbbbb0','3LpIIoJpIIIoJpoJpIIIoJpIIoL2','IIIIIIJIII2IIIIII3IIIJIIIIII','220RmVbhR','3JJJJJJpoJJJJpoJJJJpoJJJJJJ2','width','52179vwBQKh','5cccccccccccccccccccccccccc4','won','5ccccCJpFeeCIpoIDeeqoJDcccc4','stop','3JDeeCJDeeeCJpoJDeeeCJDeeCJ2','104YrOQKg','drawImage','toString','img','length','IIIII3JpoIIIIIIIIIIpoJ2IIIII','IIIII3JpoIDeeeeeeCIpoJ2IIIII','ghostsEaten','9kqJrqJpoJrkkCDeeqJpoJrqJrk8','dead','getTime','3JJJJJJJJJJJJpoJJJJJJJJJJJJ2','3JrkCoJrkkkqJrqJrkkkqJpDeqJ2','render','bbbbbqJrqI2PPIIPP3IrqJrbbbbb','30ljadXb','cccccCJDCI2PPPPPP3IDCJDccccc','./audio/siren.wav','516979RAstqf','addEventListener','9786623knBKLk','lives','./audio/gameStart.wav','createElement','1bbbbqJrqIrkkCDeeqIrqJrbbbb0','11dUuXCz','IIIIIIIIIIIIIIIIIIIIIIIIIIII','height','level','2JBvWCw','src','462339lbLZhh','getElementById','tap','indexOf','3JDeeeeqreeCJpoJDeeqreeeeCJ2','renderpos','toUTCString','./spritesheet.png','from','cookie','playing','play','update','3JrkkkkkkkkqJrqJrkkkkkkkkqJ2','split'];_0x2091=function(){return _0x662e2e;};return _0x2091();}const map=[_0x3146cb(0x18a),_0x3146cb(0x18a),_0x3146cb(0x18a),_0x3146cb(0x1b2),_0x3146cb(0x1c9),_0x3146cb(0x1bd),_0x3146cb(0x1b3),'3JrkkqJrkkkqJrqJrkkkqJrkkqJ2','3JJJJJJJJJJJJJJJJJJJJJJJJJJ2','3JDeeCJDCJDeeeeeeCJDCJDeeCJ2',_0x3146cb(0x1ad),_0x3146cb(0x1b6),_0x3146cb(0x1bb),'IIIII3JpDkkqIrqIrkkCoJ2IIIII',_0x3146cb(0x1c3),_0x3146cb(0x1a7),_0x3146cb(0x1cc),_0x3146cb(0x1b4),_0x3146cb(0x180),_0x3146cb(0x19f),_0x3146cb(0x1c3),_0x3146cb(0x1c4),_0x3146cb(0x188),_0x3146cb(0x1c9),'3JDeeCJDeeeCJpoJDeeeCJDeeCJ2',_0x3146cb(0x1ca),'3LJJpoJJJJJJJIIJJJJJJJpoJJL2','7eCJpoJDCJDeeeeeeCJDCJpoJDe6',_0x3146cb(0x1c6),_0x3146cb(0x1b6),_0x3146cb(0x193),_0x3146cb(0x19c),_0x3146cb(0x1ae),_0x3146cb(0x1b9),'IIIIIIIIIIIIIIIIIIIIIIIIIIII',_0x3146cb(0x18a)],definitions='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP';var player,bonus,siren,canvas=document[_0x3146cb(0x190)]('c'),ctx=canvas['getContext']('2d'),w=canvas[_0x3146cb(0x1b7)],h=canvas['height'],hw=Math[_0x3146cb(0x1a6)](w/0x2),hh=Math['round'](h/0x2),spritesheet=document[_0x3146cb(0x187)](_0x3146cb(0x1c1)),title=document['getElementsByTagName']('title')[0x0],acceptableTiles=[0x2c,0x2d,0x2f],ghosts=[],highscore=~~getCookie('pac-hs')||0x0,displaymain=!0x0,freeze=!0x1,gameover=!0x1,requiredFor1up=0x2710,SFX=new SoundManager(0x8),waves=[[0x1a4,0x4b0,0x1a4,0x4b0,0x12c,0x4b0,0x12c,0x1/0x0],[0x1a4,0x4b0,0x1a4,0x4b0,0x12c,0xf21c,0x1,0x1/0x0],[0x1a4,0x4b0,0x1a4,0x4b0,0x12c,0xf21c,0x1,0x1/0x0],[0x1a4,0x4b0,0x1a4,0x4b0,0x12c,0xf21c,0x1,0x1/0x0],[0x12c,0x4b0,0x12c,0x4b0,0x12c,0xf30c,0x1,0x1/0x0]],grid=[],credits=~~random(0x3,0x63);function resize(){const _0x2e0edb=_0x3146cb;canvas[_0x2e0edb(0x1b7)]=0x8*map[0x0]['length'],canvas['height']=0x8*map[_0x2e0edb(0x1c2)],w=canvas[_0x2e0edb(0x1b7)],h=canvas[_0x2e0edb(0x18b)],hw=Math[_0x2e0edb(0x1a6)](w/0x2),hh=Math['round'](h/0x2);}function px(_0x194a08){const _0x4abac3=_0x3146cb;return Math[_0x4abac3(0x1a3)](_0x194a08*(w/0x64),_0x194a08*(h/0x64));}function random(_0x14c7e3,_0x18f1e5){const _0x506e98=_0x3146cb;return Math[_0x506e98(0x1a5)]()*(_0x18f1e5-_0x14c7e3)+_0x14c7e3;}function _0x5a9c(_0x168ddb,_0x4bc51c){const _0x20918d=_0x2091();return _0x5a9c=function(_0x5a9cdb,_0x26a546){_0x5a9cdb=_0x5a9cdb-0x180;let _0x116e5a=_0x20918d[_0x5a9cdb];return _0x116e5a;},_0x5a9c(_0x168ddb,_0x4bc51c);}function drawNumbers(_0x4e3ca4,_0x2283bf,_0x518f9d,_0x3bbbd9){const _0x481e9a=_0x3146cb;let _0x2d889d=_0x4e3ca4['toString']()['split']('')['map'](_0x18852e=>~~_0x18852e);for(let _0x270f92=_0x2d889d[_0x481e9a(0x1c2)];_0x270f92>=0x0;_0x270f92--)ctx[_0x481e9a(0x1bf)](spritesheet,0x8*_0x2d889d[_0x270f92],0x8*!!_0x3bbbd9+0x1e7,0x8,0x8,_0x2283bf-(_0x2d889d[_0x481e9a(0x1c2)]-0x1-_0x270f92)*0x8,_0x518f9d,0x8,0x8);}function start(_0x598021,_0x3e256f){const _0x2222e5=_0x3146cb;if(_0x3e256f)player[_0x2222e5(0x185)]--;else{grid=[];for(let _0x133860=0x0;_0x133860<map[_0x2222e5(0x1c2)];++_0x133860)for(let _0x20c053=0x0;_0x20c053<map[_0x133860][_0x2222e5(0x1c2)];++_0x20c053){let _0x59d430='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP'[_0x2222e5(0x192)](map[_0x133860]['charAt'](_0x20c053)),_0x442e41=_0x59d430%0x10,_0x5af661=_0x59d430/0x10;new Tile(_0x20c053,_0x133860,~~_0x442e41,~~_0x5af661,_0x59d430);}player[_0x2222e5(0x19e)]=0x0,bonus=new Bonus(_0x598021);}var _0x140ae3=new vec(0xd,0x1a);if(player[_0x2222e5(0x18c)]=_0x598021,player['lastPos']=vec[_0x2222e5(0x197)](_0x140ae3),player[_0x2222e5(0x1b0)]=vec[_0x2222e5(0x197)](_0x140ae3),player[_0x2222e5(0x194)]=vec['from'](_0x140ae3),player['nt']=vec[_0x2222e5(0x197)](_0x140ae3),player['orientation']=-0x1,player[_0x2222e5(0x1af)]=-0x1,player[_0x2222e5(0x1c7)]=!0x1,player[_0x2222e5(0x1ba)]=!0x1,player[_0x2222e5(0x1b1)]=!0x0,player[_0x2222e5(0x1c5)]=0x0,player[_0x2222e5(0x185)]<0x0){for(let _0x207626 of(credits--,displaymain=!0x0,gameover=!0x0,SFX['audioHolder']))_0x207626[_0x2222e5(0x199)]&&_0x207626[_0x2222e5(0x1bc)]();return;}for(let _0x13ca5a of(ghosts=[],new Blinky(),new Pinky(),new Inky(),new Clyde(),freeze=!0x0,SFX['audioHolder']))_0x13ca5a[_0x2222e5(0x199)]&&_0x13ca5a[_0x2222e5(0x1bc)]();if(!_0x598021&&!_0x3e256f)return SFX['GetUnusedSource']()[_0x2222e5(0x19a)](_0x2222e5(0x186),()=>{const _0x8dc577=_0x2222e5;freeze=!0x1,player[_0x8dc577(0x1b1)]=!0x1,siren[_0x8dc577(0x19a)](_0x8dc577(0x181));});setTimeout(()=>{const _0x38a3cc=_0x2222e5;siren[_0x38a3cc(0x19a)](_0x38a3cc(0x181)),freeze=!0x1,player[_0x38a3cc(0x1b1)]=!0x1;},0x5dc);}function startGame(){if(displaymain){if(gameover)return gameover=!0x1;displaymain=!0x1,player=new Pacman(new vec(0xd,0x1a)),start(0x0),siren=SFX['GetUnusedSource']();}}function setCookie(_0x411008,_0x3c01c4,_0x4dc939){const _0x558d8b=_0x3146cb;var _0x505296=new Date();_0x505296[_0x558d8b(0x1a2)](_0x505296[_0x558d8b(0x1c8)]()+0x5265c00*_0x4dc939);var _0x38fa1c=_0x558d8b(0x1ac)+_0x505296[_0x558d8b(0x195)]();document['cookie']=_0x411008+'='+_0x3c01c4+';'+_0x38fa1c+';path=/';}function getCookie(_0x26666b){const _0x10acaa=_0x3146cb;for(var _0x132949=_0x26666b+'=',_0x2495ac=document[_0x10acaa(0x198)][_0x10acaa(0x19d)](';'),_0x4973b6=0x0;_0x4973b6<_0x2495ac[_0x10acaa(0x1c2)];_0x4973b6++){for(var _0x223b63=_0x2495ac[_0x4973b6];'\x20'==_0x223b63[_0x10acaa(0x1a4)](0x0);)_0x223b63=_0x223b63[_0x10acaa(0x1aa)](0x1);if(0x0==_0x223b63[_0x10acaa(0x192)](_0x132949))return _0x223b63[_0x10acaa(0x1aa)](_0x132949[_0x10acaa(0x1c2)],_0x223b63[_0x10acaa(0x1c2)]);}return'';}spritesheet[_0x3146cb(0x18e)]=_0x3146cb(0x196),window['addEventListener']('resize',resize),resize(),(f=_0x4fcce8=>{const _0x59949e=_0x3146cb;if(freeze&&(_0x4fcce8-=0x1),_0x4fcce8%=0x3c,requestAnimationFrame(()=>f(_0x4fcce8+0x1)),ctx['clearRect'](0x0,0x0,w,h),displaymain){if(gameover)return ctx[_0x59949e(0x1bf)](spritesheet,0x0,0x21f,0x61,0x7,~~(w/0x2-48.5),~~(h/0x2),0x61,0x7);ctx[_0x59949e(0x1bf)](spritesheet,0x71,0xff,0xdf,0x11f,0x0,0x0,0xdf,0x11f),drawNumbers(credits,0x50,h-0x8),drawNumbers(requiredFor1up[_0x59949e(0x1c0)]()[_0x59949e(0x1aa)](0x0,requiredFor1up[_0x59949e(0x1c0)]()[_0x59949e(0x1c2)]-0x3),0xa0,0xc0,!0x0),drawNumbers(requiredFor1up,0x30,0x8),drawNumbers(0x2*requiredFor1up,0xc8,0x8),drawNumbers(highscore[_0x59949e(0x1c0)]()[_0x59949e(0x1a8)](0x6,'0'),0x80,0x8);}else{for(let _0xc9b83e of grid)_0xc9b83e['render'](_0x4fcce8);for(let _0x5be667 of(freeze||bonus['update'](),bonus[_0x59949e(0x1cb)](),(!freeze||player[_0x59949e(0x1ba)])&&player[_0x59949e(0x19b)](),player[_0x59949e(0x1cb)](_0x4fcce8),ghosts))freeze||_0x5be667[_0x59949e(0x19b)](_0x4fcce8),_0x5be667['render'](_0x4fcce8);}})(0x0),window[_0x3146cb(0x183)]('mousedown',startGame),window[_0x3146cb(0x183)](_0x3146cb(0x1a1),startGame),window[_0x3146cb(0x183)](_0x3146cb(0x191),startGame);