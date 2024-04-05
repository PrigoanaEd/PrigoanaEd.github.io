class Building{constructor(e,a,i,t,r=!0){this.name=e,this.amount=0,this.originalCost=a,this.cost=a,this.multiplier=1,this.baseEffect=i,this.specialCPS=0,this.effect=0,this.upgrades=t,this.locked=r}buy(e){if(1==game.player.spendCookies(this.getCost(e))){this.amount+=e,this.cost=Math.round(this.cost*Math.pow(1.15,e)),game.settings.recalculateCPS=!0;let a=game.utilities.getBuildingIndexByName(this.name);if(a+1<=game.buildings.length-1){let i=game.buildings[a+1];1==i.locked&&(i.locked=!1,game.constructShop())}}}setCost(){this.cost=this.originalCost;for(let e=0;e<this.amount;e++)this.cost=Math.round(1.15*this.cost)}buyUpgrade(e){let a=game.player;this.upgrades.forEach(i=>{if(i.name==e&&1==a.spendCookies(i.cost))return i.owned=!0,void(game.settings.recalculateCPS=!0)})}calculateEffectOfUpgrades(){let e=game.player,a=1,i=game.utilities.getBuildingCount();return this.specialCPS=0,"Cursor"==this.name&&(game.player.aMPC=1),this.upgrades.forEach(t=>{if(1==t.owned){if(0==t.special)a*=2,"Cursor"==this.name&&(e.aMPC*=2);else if("Cursor"===this.name){let r=i-this.amount;this.specialCPS+=t.special*r*this.amount,e.aMPC+=t.special*r}}}),a}getCPS(){return this.multiplier=this.calculateEffectOfUpgrades(),this.effect=this.baseEffect*this.amount*this.multiplier+this.specialCPS,this.effect}getCost(e){let a=this.cost,i=this.cost;for(let t=0;t<e-1;t++)a+=Math.round(i*=1.15);return a}generateMenuButton(){return`<button onclick="game.updateShop('${this.name}');">${this.name}</button>`}generateBuyButtons(){let e=game.utilities.formatNumber,a='<div class="btnBuyGroup">';return a+=`<button onclick="game.buyBuilding('${this.name}', 1);">Buy x1</br><b>${e(this.cost)}</b></button>`,a+=`<button onclick="game.buyBuilding('${this.name}', 5);">Buy x5</br><b>${e(this.getCost(5))}</b></button>`,a+=`<button onclick="game.buyBuilding('${this.name}', 10);">Buy x10</br><b>${e(this.getCost(10))}</b></button>`,a+="</div>"}generateUpgradeButtons(){let e="",a=!1;return this.upgrades.forEach(i=>{let t=game.utilities.formatNumber;0==i.owned&&(i.requirementMet(this.amount)?e+=`<button class="upgBtn" onclick="game.buyUpgrade('${this.name}', '${i.name}')"><b>${i.name}</b></br>${i.desc}</br><b>${t(i.cost)}</b></button>`:0==a&&(a=!0,e+=`</br><button class="upgNext">Next upgrade in <b>${i.limit-this.amount}</b> more ${this.name.toLowerCase()}(s)</button>`))}),e}generateShopHTML(){let e=game.utilities.formatNumber,a=this.baseEffect*this.multiplier;return this.specialCPS>0&&(a+=this.specialCPS/this.amount),`<b>${this.name}</b></br>You have <b>${this.amount}</b> ${this.name.toLowerCase()}(s).</br>Each ${this.name.toLowerCase()} produces <b>${e(a)}</b> Eddies.</br>All of your ${this.name.toLowerCase()}(s) combined produces <b>${e(this.effect)}</b> eddies..</br>${this.generateBuyButtons()}</br>${this.generateUpgradeButtons()}`}}class Upgrade{constructor(e,a,i,t,r=!1){this.name=e,this.cost=a,this.desc=i,this.limit=t,this.owned=!1,this.special=r}requirementMet(e){if(e>=this.limit)return!0}}class Player{constructor(){this.cookies=0,this.cookieStats={Earned:0,Spent:0,Clicked:0},this.aMPF=0,this.aMPC=1}earnCookie(e){this.cookies+=e,this.cookieStats.Earned+=e}spendCookies(e){if(this.cookies>=e)return this.cookies-=e,this.cookieStats.Spent+=e,!0}clickCookie(){this.earnCookie(this.aMPC),this.cookieStats.Clicked+=this.aMPC}}let game={settings:{frameRate:30,recalculateCPS:!0,key:"cookieclicker"},buildings:[new Building("Cursor",15,.1,[new Upgrade("Reinforced Index Finger",100,"Cursors and clicking are twice as efficient",1),new Upgrade("Carpal tunnel prevention cream",500,"Cursors and clicking are twice as efficient",1),new Upgrade("Ambidextrous",1e4,"Cursors and clicking are twice as efficient",10),new Upgrade("Thousand Fingers",1e5,"Mouse and cursors gain +0.1 eddies for every non-cursor building owned",25,.1),new Upgrade("Million Fingers",1e7,"Mouse and cursors gain +0.5 eddies for every non-cursor building owned",50,.5),new Upgrade("Billion Fingers",1e8,"Mouse and cursors gain +5 eddies for every non-cursor building owned",100,5),new Upgrade("Trillion Fingers",1e9,"Mouse and cursors gain +50 for every non-cursor building owned",150,50),new Upgrade("Quadrillion Fingers",1e10,"Mouse and cursors gain +500 eddies for each non-cursor building owned",200,500),new Upgrade("Quintillion Fingers",1e13,"Mouse and cursors gain +5.000K for every non-cursor building owned",250,5e3),new Upgrade("Sextillion Fingers",1e16," Mouse and cursors gain +50.000K for every non-cursor building owned",300,5e4),new Upgrade("Septillion Fingers",1e19,"Mouse and cursors gain +500.000K for every non-cursor building owned",350,5e5),new Upgrade("Octillion Fingers",1e22,"Mouse and cursors gain +5.000M for each non-cursor building owned",400,5e6)],!1),new Building("Grandma",100,1,[new Upgrade("Forwards from grandma",1e3,"Grandmas are twice as efficient",1),new Upgrade("Steel-plated rolling pins",5e3,"Grandmas are twice as efficient",5),new Upgrade("Lubricated dentures",5e4,"Grandmas are twice as efficient",25),new Upgrade("Prune juice",5e6,"Grandmas are twice as efficient",50),new Upgrade("Double-thick glasses",5e8,"Grandmas are twice as efficient",100),new Upgrade("Aging agents",5e10,"Grandmas are twice as efficient",150),new Upgrade("Xtreme walkers",5e13,"Grandmas are twice as efficient",200),new Upgrade("The Unbridling",5e16,"Grandmas are twice as efficient",250),new Upgrade("Reverse dementia",5e19,"Grandmas are twice as efficient",300),new Upgrade("Timeproof hair dyes",5e22,"Grandmas are twice as efficient",350),new Upgrade("Good manners",5e26,"Grandmas are twice as efficient",400)]),new Building("Farm",1100,8,[new Upgrade("Cheap hoes",11e3,"Farms are twice as efficient",1),new Upgrade("Fertilizer",55e3,"Farms are twice as efficient",5),new Upgrade("Biscuit Trees",55e4,"Farms are twice as efficient",25),new Upgrade("Genetically-modified Biscuits",55e6,"Farms are twice as efficient",50),new Upgrade("Gingerbread scarecrows",55e8,"Farms are twice as efficient",100),new Upgrade("Pulsar sprinklers",55e10,"Farms are twice as efficient",150),new Upgrade("Fudge fungus",55e13,"Farms are twice as efficient",200),new Upgrade("Wheat triffids",55e16,"Farms are twice as efficient",250),new Upgrade("Humane pesticides",55e19,"Farms are twice as efficient",300),new Upgrade("Barnstars",55e22,"Ah, yes. These help quite a bit. Somehow.",350),new Upgrade("Lindworms",55e26,"You have to import these from far up north, but they really help areate the soil",400)]),new Building("Mine",12e3,47,[new Upgrade("Sugar gas",12e4,"Mines are twice as efficient",1),new Upgrade("Megadrill",6e5,"Mines are twice as efficient",5),new Upgrade("Ultradrill",6e6,"Mines are twice as efficient",25),new Upgrade("Ultimadrill",6e8,"Mines are twice as efficient",50),new Upgrade("H-bomb Mining",6e10,"Mines are twice as efficient",100),new Upgrade("Coreforge",6e12,"Mines are twice as efficient",150),new Upgrade("Planetsplitters",6e15,"Mines are twice as efficient",200),new Upgrade("Canola oil wells",6e18,"Mines are twice as efficient",250),new Upgrade("Mole People",6e21,"Mines are twice as efficient",300),new Upgrade("Mine canaries",6e24,"Mines are twice as efficient",350),new Upgrade("Bore again",6e28,"Mines are twice as efficient",400)]),new Building("Factory",13e4,260,[new Upgrade("Sturdier conveyor belts",13e5,"Factories are twice as efficient",1),new Upgrade("Child labor",65e5,"Factories are twice as efficient",5),new Upgrade("Sweatshop",65e6,"Factories are twice as efficient",25),new Upgrade("Radium reactors",65e8,"Factories are twice as efficient",50),new Upgrade("Recombobulators",65e10,"Factories are twice as efficient",100),new Upgrade("Deep-bake process",65e12,"Factories are twice as efficient",150),new Upgrade("Cyborg workforce",65e15,"Factories are twice as efficient",200),new Upgrade("78-hour days",65e18,"Factories are twice as efficient",250),new Upgrade("Machine learning",65e21,"Factories are twice as efficient",300),new Upgrade("Brownie point system",65e24,"Factories are twice as efficient",350),new Upgrade('"Volunteer" interns',65e28,"Factories are twice as efficient",400)]),new Building("Bank",14e5,1400,[new Upgrade("Taller Tellers",14e6,"Banks are twice as efficient",1),new Upgrade("Scissor-resistant Credit Cards",7e7,"Banks are twice as efficient",5),new Upgrade("Acid-proof vaults",7e8,"Banks are twice as efficient",25),new Upgrade("Chocolate coins",7e10,"Banks are twice as efficient",50),new Upgrade("Exponential interest rates",7e12,"Banks are twice as efficient",100),new Upgrade("Financial zen",7e14,"Banks are twice as efficient",150),new Upgrade("Way of the wallet",7e17,"Banks are twice as efficient",200),new Upgrade("The stuff rationale",7e20,"Banks are twice as efficient",250),new Upgrade("Edible money",7e20,"Banks are twice as efficient",300),new Upgrade("Grand supercycle",7e23,"Banks are twice as efficient",350),new Upgrade("Rules of acquisition",7e27,"Banks are twice as efficient",400)]),new Building("Temple",2e7,7800,[new Upgrade("Golden idols",2e8,"Temples are twice as efficient",1),new Upgrade("Sacrifices",1e9,"Temples are twice as efficient",5),new Upgrade("Delicious blessing",1e10,"Temples are twice as efficient",25),new Upgrade("Sun festival",1e12,"Temples are twice as efficient",50),new Upgrade("Enlarged pantheon",1e14,"Temples are twice as efficient",100),new Upgrade("Great Baker in the sky",1e16,"Temples are twice as efficient",150),new Upgrade("Creation myth",1e19,"Temples are twice as efficient",200),new Upgrade("Theocracy",1e22,"Temples are twice as efficient",250),new Upgrade("Sick rap prayers",1e25,"Temples are twice as efficient",300),new Upgrade("Psalm-reading",1e28,"Temples are twice as efficient",350),new Upgrade("War of the gods",1e32,"Temples are twice as efficient",400)]),new Building("Wizard Tower",33e7,44e3,[new Upgrade("Pointier hats",33e8,"Wizard towers are twice as efficient",1),new Upgrade("Beardlier beards",165e8,"Wizard towers are twice as efficient",5),new Upgrade("Ancient grimoires",165e9,"Wizard towers are twice as efficient",25),new Upgrade("Kitchen curses",165e11,"Wizard towers are twice as efficient",50),new Upgrade("School of sorcery",165e13,"Wizard towers are twice as efficient",100),new Upgrade("Dark formulas",165e15,"Wizard towers are twice as efficient",150),new Upgrade("Eddiemancy",165e18,"Wizard towers are twice as efficient",200),new Upgrade("Rabbit trick",165e21,"Wizard towers are twice as efficient",250),new Upgrade("Deluxe tailored wands",165e24,"Wizard towers are twice as efficient",300),new Upgrade("Immobile spellcasting",165e27,"Wizard towers are twice as efficient",350),new Upgrade("Electricity",165e31,"Wizard towers are twices as efficient",400)]),new Building("Shipment",51e8,26e4,[new Upgrade("Vanilla nebulae",51e9,"Shipments are twice as efficient",1),new Upgrade("Wormholes",255e9,"Shipments are twice as efficient",5),new Upgrade("Frequent flyer",255e10,"Shipments are twice as efficient",25),new Upgrade("Warp drive",255e12,"Shipments are twice as efficient",50),new Upgrade("Chocolate monoliths",255e14,"Shipments are twice as efficient",100),new Upgrade("Generation ship",255e16,"Shipments are twice as efficient",150),new Upgrade("Dyson sphere",255e19,"Shipments are twice as efficient",200),new Upgrade("The final frontier",255e22,"Shipments are twice as efficient",250),new Upgrade("Autopilot",255e25,"Shipments are twice as efficient",300),new Upgrade("Restaurants at the end of the universe",255e28,"Shipments are twice as efficient",350),new Upgrade("Universal alphabet",255e32,"Shipments are twice as efficient",400)]),new Building("Alchemy Lab",75e9,15e5,[new Upgrade("Antimony",75e10,"Alchemy labs are twice as efficient",1),new Upgrade("Essence of dough",375e10,"Alchemy labs are twice as efficient",5),new Upgrade("True chocolate",375e11,"Alchemy labs are twice as efficient",25),new Upgrade("Ambrosia",375e13,"Alchemy labs are twice as efficient",50),new Upgrade("Aqua crustulae",375e15,"Alchemy labs are twice as efficient",100),new Upgrade("Origin crucible",375e17,"Alchemy labs are twice as efficient",150),new Upgrade("Theory of atomic fluidity",375e20,"Alchemy labs are twice as efficient",200),new Upgrade("Beige goo",375e23,"Alchemy labs are twice as efficient",250),new Upgrade("The advent of chemistry",375e26,"Alchemy labs are twice as efficient",300),new Upgrade("On second thought",375e29,"Alchemy labs are twice as efficient",350),new Upgrade("Public betterment",375e33,"Alchemy labs are twice as efficient",400)]),new Building("Portal",1e12,1e7,[new Upgrade("Ancient tablet",1e13,"Portals are twice as efficient",1),new Upgrade("Insane oatling workers",5e13,"Portals are twice as efficient",5),new Upgrade("Soul bond",5e14,"Portals are twice as efficient",25),new Upgrade("Sanity dance",5e16,"Portals are twice as efficient",50),new Upgrade("Brane transplant",5e18,"Portals are twice as efficient",100),new Upgrade("Deity-sized portals",5e20,"Portals are twice as efficient",150),new Upgrade("End of times back-up plan",5e23,"Portals are twice as efficient",200),new Upgrade("Maddening chants",5e26,"Portals are twice as efficient",250),new Upgrade("The real world",5e29,"Portals are twice as efficient",300),new Upgrade("Dimensional garbage gulper",5e32,"Portals are twice as efficient",350),new Upgrade("Embedded microportals",5e36,"Portals are twice as efficient",400)]),new Building("Time Machine",14e12,65e6,[new Upgrade("Flux capacitors",14e13,"Time machines are twice as efficient",1),new Upgrade("Time paradox resolver",7e14,"Time machines are twice as efficient",5),new Upgrade("Quantum conundrum",7e15,"Time machines are twice as efficient",25),new Upgrade("Causality enforcer",7e17,"Time machines are twice as efficient",50),new Upgrade("Yestermorrow comparators",7e19,"Time machines are twice as efficient",100),new Upgrade("Far future enactment",7e21,"Time machines are twice as efficient",150),new Upgrade("Great loop hypothesis",7e24,"Time machines are twice as efficient",200),new Upgrade("Eddietopian moments of maybe",7e27,"Time machines are twice as efficient",250),new Upgrade("Second seconds",7e30,"Time machines are twice as efficient",300),new Upgrade("Additional clock hands",7e33,"Time machines are twice as efficient",350),new Upgrade("Nostalgia",7e37,"Time machines are twice as efficient",400)]),new Building("Antimatter Condenser",17e13,43e7,[new Upgrade("Sugar bosons",17e14,"Antimatter condensers are twice as efficient",1),new Upgrade("String theory",85e14,"Antimatter condensers are twice as efficient",5),new Upgrade("Large macaron collider",85e15,"Antimatter condensers are twice as efficient",25),new Upgrade("Big bang bake",85e17,"Antimatter condensers are twice as efficient",50),new Upgrade("Reverse cyclotrons",85e19,"Antimatter condensers are twice as efficient",100),new Upgrade("Nanocosmics",85e21,"Antimatter condensers are twice as efficient",150),new Upgrade("The Pulse",85e24,"Antimatter condensers are twice as efficient",200),new Upgrade("Some other super-tiny fundamental particle? Probably?",85e27,"Antimatter condensers are twice as efficient",250),new Upgrade("Quantum comb",85e30,"Antimatter condensers are twice as efficient",300),new Upgrade("Baking Nobel prize",85e33,"Antimatter condensers are twice as efficient",350),new Upgrade("The definite molecule",85e37,"Antimatter condensers are twice as efficient",400)]),new Building("Prism",21e14,29e8,[new Upgrade("Gem polish",21e15,"Prims are twice as efficient",1),new Upgrade("9th color",105e15,"Prims are twice as efficient",5),new Upgrade("Chocolate light",105e16,"Prims are twice as efficient",25),new Upgrade("Grainbow",105e18,"Prims are twice as efficient",50),new Upgrade("Pure cosmic light",105e20,"Prims are twice as efficient",100),new Upgrade("Glow-in-the-dark",105e22,"Prims are twice as efficient",150),new Upgrade("Lux sanctorum",105e25,"Prims are twice as efficient",200),new Upgrade("Reverse shadows",105e28,"Prims are twice as efficient",250),new Upgrade("Crystal mirrors",105e31,"Prims are twice as efficient",300),new Upgrade("Reverse theory of light",105e34,"Prisms are twice as efficient",350),new Upgrade("Light capture measures",105e38,"Prisms are twice as efficient",400)]),new Building("Chancemaker",26e15,21e9,[new Upgrade("Your lucky Eddie",26e16,"Chancemakers are twice as efficient",1),new Upgrade("'All Bets Are Off' magic coin",13e16,"Chancemakers are twice as efficient",5),new Upgrade("Winning lottery ticket",13e18,"Chancemakers are twice as efficient",25),new Upgrade("Four-leaf clover field",13e19,"Chancemakers are twice as efficient",50),new Upgrade("A recipe book about books",13e21,"Chancemakers are twice as efficient",100),new Upgrade("Leprechaun village",13e24,"Chancemakers are twice as efficient",150),new Upgrade("Improbability drive",13e27,"Chancemakers are twice as efficient",200),new Upgrade("Antisuperstistronics",13e30,"Chancemakers are twice as efficient",250),new Upgrade("Bunnypedes",13e33,"Chancemakers are twice as efficient",300),new Upgrade("Revised probalistics",13e36,"Chancemakers are twice as efficient",350),new Upgrade("0-sided dice",13e40,"Chancemakers are twice as efficient",400)]),new Building("Fractal Engine",31e16,15e10,[new Upgrade("Metabakeries",31e17,"Fractal engines are twice as efficient",1),new Upgrade("Mandelbrown sugar",155e17,"Fractal engines are twice as efficient",5),new Upgrade("Fractoids",155e18,"Fractal engines are twice as efficient",25),new Upgrade("Nested universe theory",155e20,"Fractal engines are twice as efficient",50),new Upgrade("Menger sponge cake",155e22,"Fractal engines are twice as efficient",100),new Upgrade("One particularly good-humoured cow",155e24,"Fractal engines are twice as efficient",150),new Upgrade("Chocolate ouroboros",155e27,"Fractal engines are twice as efficient",200),new Upgrade("Nested",155e30,"Fractal engines are twice as efficient",250),new Upgrade("Space-filling fibers",155e33,"Fractal engines are twice as efficient",300),new Upgrade("Endless book of prose",155e36,"Fractal engines are twice as efficient",350),new Upgrade("The set of all sets",155e40,"Fractal engines are twice as efficient",400)]),new Building("Java Console",71e18,11e11,[new Upgrade("The JavaScript console for dummies",71e19,"Java consoles are twice as efficient",1),new Upgrade("64bit Arrays",355e19,"Java consoles are twices as efficient",5),new Upgrade("Stack overflow",355e20,"Java consoles are twice as efficient",25),new Upgrade("Enterprise compiler",355e22,"Java consoles are twice as efficient",50),new Upgrade("Syntactic sugar",355e24,"Java consoles are twice as efficient",100),new Upgrade("A nice cup of coffee",355e26,"Java consoles are twice as efficient",150),new Upgrade("Just-in-time baking",355e29,"Java consoles are twice as efficient",200),new Upgrade("Eddies++",355e32,"Java consoles are twice as efficient",250),new Upgrade("Software updates",355e35,"Java consoles are twice as efficient",300),new Upgrade("Game.Loop",355e38,"Java consoles are twice as efficient",350),new Upgrade("eval()",355e42,"Java consoles are twice as efficient",400)])],utilities:{ShortNumbers:["K","M","B","T","Qua","Qui","Sex","Sep","Oct","Non","Dec","Und","Duo","Tre","QuaD","QuiD","SexD","SepD","OctD","NonD","Vig"],updateText(e,a){let i=document.getElementsByClassName(e);for(var t in i)i[t].innerHTML=a},formatNumber(e){let a="";if(e>=1e3){for(let i=0;i<game.utilities.ShortNumbers.length;i++){let t=Math.pow(10,3*(i+1));e>=t&&(a=(Math.trunc(e/t*1e3)/1e3).toFixed(3)+" "+game.utilities.ShortNumbers[i])}return a}return(Math.trunc(10*e)/10).toFixed(1)},getBuildingByName(e){let a=null;return game.buildings.forEach(i=>{i.name!=e||(a=i)}),a},getBuildingIndexByName(e){for(let a=0;a<game.buildings.length-1;a++)if(game.buildings[a].name==e)return a},getBuildingCount(){let e=0;return game.buildings.forEach(a=>{e+=a.amount}),e},stringToBool(e){switch(e){case"true":return!0;case"false":return!1}}},saving:{export(){let e="";e+=`${game.player.cookies}|${game.player.cookieStats.Earned}|${game.player.cookieStats.Spent}|${game.player.cookieStats.Clicked}-`;let a=!0;return game.buildings.forEach(i=>{a?(a=!1,e+=`${i.amount}|${i.locked}|`):e+=`#${i.amount}|${i.locked}|`,i.upgrades.forEach(a=>{e+=`${a.owned}:`}),e=e.slice(0,-1)}),game.saving.saveToCache(premagic(e)),premagic(e)},import(e){0!=(e=magic(e))?(e=e.split("-"),game.saving.loadPlayer(e[0]),game.saving.loadBuildings(e[1]),game.settings.recalculateCPS=!0,game.updateShop(game.currentShop)):alert("Something wasn't quite right there, unfortunately your save could not be loaded.")},saveToCache(e){try{return window.localStorage.setItem(game.settings.key,e)}catch{console.log("Problem saving to cache")}},getSaveFromCache(){try{return window.localStorage.getItem(game.settings.key)}catch{console.log("Problem loading data from cache, probably doesn't exist")}},loadPlayer(e){e=e.split("|");try{game.player.cookies=parseFloat(e[0]),game.player.cookieStats.Earned=parseFloat(e[1]),game.player.cookieStats.Spent=parseFloat(e[2]),game.player.cookieStats.Clicked=parseFloat(e[3])}catch{console.log("Something went wrong whilst loading player data, likely from an older version and not to worry.")}},loadBuildings(e){e=e.split("#");try{for(let a=0;a<game.buildings.length;a++){let i=e[a].split("|"),t=game.buildings[a];t.amount=parseFloat(i[0]),t.setCost(),t.locked=game.utilities.stringToBool(i[1]);let r=0,n=i[2].split(":");t.upgrades.forEach(e=>{e.owned=game.utilities.stringToBool(n[r]),r++})}}catch{console.log("Something went wrong whilst loading building data, likely from an older version and not to worry.")}},wipeSave(){confirm("Are you sure you want to wipe your save? This cannot be reversed!")&&(game.player.cookies=0,game.player.cookieStats.Earned=0,game.player.cookieStats.Spent=0,game.player.cookieStats.Clicked=0,game.buildings.forEach(e=>{for(var a in"Cursor"!=e.name&&(e.locked=!0),e.amount=0,e.effect=0,e.specialCPS=0,e.setCost(),e.upgrades)e.upgrades[a].owned=!1}),game.constructShop(),game.updateShop("Cursor"),game.settings.recalculateCPS=!0)},importing:!1,openBox(e){let a=document.getElementsByClassName("importExportBox")[0],i=document.getElementById("saveBox");switch(e){case"import":return this.importing=!0,a.style.visibility="visible",i.removeAttribute("readonly"),void(i.value="");case"export":let t=this.export();return a.style.visibility="visible",i.value=t,void i.setAttribute("readonly",!0)}},closeBox(){if(document.getElementsByClassName("importExportBox")[0].style.visibility="hidden",this.importing){let e=document.getElementById("saveBox");this.import(e.value),e.value=""}}},player:new Player,logic(){if(game.updateDisplays(),1==game.settings.recalculateCPS){let e=0;game.buildings.forEach(a=>{e+=a.getCPS()}),game.settings.recalculateCPS=!1,game.player.aMPF=e/game.settings.frameRate,game.updateShop(game.currentShop)}document.hasFocus()?(game.player.earnCookie(game.player.aMPF),game.saving.export(),setTimeout(game.logic,1e3/game.settings.frameRate)):(game.player.earnCookie(game.player.aMPF*game.settings.frameRate),game.saving.export(),setTimeout(game.logic,1e3))},updateDisplays(){let e=game.utilities.updateText,a=game.utilities.formatNumber,i=game.player,t=i.cookieStats;document.title="Eddy Clicker | "+a(i.cookies),e("cookieDisplay",a(i.cookies)),e("cpcDisplay",a(i.aMPC)),e("cpsDisplay",a(i.aMPF*game.settings.frameRate)),e("earnedDisplay",a(t.Earned)),e("spentDisplay",a(t.Spent)),e("clickedDisplay",a(t.Clicked))},constructShop(){let e=game.buildings,a="";e.forEach(e=>{0==e.locked&&(a+=e.generateMenuButton())}),game.utilities.updateText("shopList",a)},currentShop:"Cursor",updateShop(e){game.currentShop=e;let a="";a+=game.utilities.getBuildingByName(e).generateShopHTML(),game.utilities.updateText("shop",a)},buyBuilding(e,a){game.utilities.getBuildingByName(e).buy(a)},buyUpgrade(e,a){game.utilities.getBuildingByName(e).buyUpgrade(a)},start(){window.addEventListener("keydown",()=>{if(13==event.keyCode||32==event.keyCode)return event.preventDefault(),!1}),document.getElementsByClassName("cookieButton")[0].onclick=()=>{game.player.clickCookie()};let e=game.saving.getSaveFromCache();e?game.saving.import(e):console.log("No cache save found"),game.constructShop(),game.logic()}};game.start();