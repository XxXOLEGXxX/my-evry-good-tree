const myParticle = {
    image:"your_thingy.png",
    spread: 0,
    gravity: 0,
    time: 99999,
    speed() { // Randomize speed a bit
        return 0
    },
    update(diff){
        this.xVel = (mouseX+(Math.sin(player.yourGod.timer+(Math.PI*2/8*particles[this.id].id))*512*(Math.sin(player.yourGod.timer*Math.PI/4))/(Math.sin(player.yourGod.timer*0.69)+3.14*2))-this.x)/10
        this.yVel = (mouseY+(Math.cos(player.yourGod.timer+(Math.PI*2/8*particles[this.id].id))*512*(Math.cos(player.yourGod.timer*Math.E/4))/(Math.sin(player.yourGod.timer*0.42)+3.14*2))-this.y)/10
        this.angle = Math.cos(player.yourGod.timer+(Math.PI*2/8*particles[this.id].id))*90+45*-1
    }
}

addLayer("yourGod", {
    name: "X-iry", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        bestPointsThusFar: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)], //points, prestige, space, time points
        bestPassivePointGainThusFar: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)], //points, prestige, space, time points
        unlocked: false,
		points: new Decimal(0),
        isAlreadyHere: false,
        timer: 0,
        musicTime: 0,
        tabCheck: "idk",
        particles: new Decimal(0),
        hasBeenSeen: false,
        textX: new Decimal(0),
        textY: new Decimal(0),
        textBlur: new Decimal(0),
        shopPoints: new Decimal(0),
        perkPoints: new Decimal(1),
        quests: [[[undefined,undefined,undefined,undefined,undefined], [undefined, undefined, undefined]], [[undefined,undefined,undefined,undefined,undefined], [undefined, undefined, undefined]], [[undefined,undefined,undefined,undefined,undefined], [undefined, undefined, undefined]],[[undefined,undefined,undefined,undefined,undefined], [undefined, undefined, undefined]]],
        selectedQuest: 4,
		questsDone: new Decimal(0),
		lowerSpaceTimeUpgradeCost: false,
        youreFuckedBuddy: false,
    }},
    tooltip: "It's-a-me,",
    color: "rgb(52,52,152)",
    row: "side", // Row the layer is in on the tree (0 is the first row)
    position: 1,
	nodeStyle(){return{
		"border": options.hqStyle[0].substr(1),
        "text-shadow": options.hqStyle[2].substr(1),
		"box-shadow": (((!player.her.sheWasSeen || (player.her.herLog[1]>=1 && player.her.buyables["progress"].eq(0)) || (player.her.whatCouldPossiblyGoWrong && player.her.buyables["progress"].eq(1) && player.her.herPoints.lte(0))) && player.yourGod.unlocked) ?"0px 0px 10px rgba("+Math.random()*127+",0,0,"+(Math.random()*0.2+0.8)+"),0px 0px 52px rgba("+Math.random()*127+",0,"+Math.random()*255+","+(Math.random()*0.4+0.6)+"),0px 0px 100px rgba("+Math.random()*255+","+Math.random()*255+","+Math.random()*255+","+(Math.random()*0.4+0.6)+")":"0px 0px 0px rgba(0,0,0,0)")+options.hqStyle[1]
	}},
	update(myCore){
        if(player.yourGod.youreFuckedBuddy){ 
            player = getStartPlayer()
            save();
            window.location.reload();
        }
		player.a.statsRPG[4] = player.a.statsRPG[0].gte(5)?"Farmer with Shotgun":"Sir Dumb Stupid I"
        for(i=0;i<4;i++){
            player.yourGod.bestPointsThusFar[i] = player.yourGod.bestPointsThusFar[i].max([player.points,player.p.points,player.s.points,player.t.timePoints][i])
            player.yourGod.bestPassivePointGainThusFar[i] = player.yourGod.bestPassivePointGainThusFar[i].max([getPointGen(),getResetGain("p").mul(tmp.p.passiveGeneration),getResetGain("s").mul(tmp.s.passiveGeneration),tmp.t.timeGain][i])
		}
        if(player.yourGod.hasBeenSeen && player.her.timeline[1]==0){
            for(i=0;i<3;i++){
				if(typeof player.yourGod.quests[i][0][0] == "string") player.yourGod.quests[i][0][0] = new Decimal(player.yourGod.quests[i][0][0])
				if(typeof player.yourGod.quests[i][0][4] == "string") player.yourGod.quests[i][0][4] = new Decimal(player.yourGod.quests[i][0][4])
				if(typeof player.yourGod.quests[i][1][0] == "string") player.yourGod.quests[i][1][0] = new Decimal(player.yourGod.quests[i][1][0])
				if(typeof player.yourGod.quests[i][1][1] == "string") player.yourGod.quests[i][1][1] = new Decimal(player.yourGod.quests[i][1][1])
                let randomizeIt = Math.floor(Math.random()*(4))
                if(player.yourGod.quests[i][1][2]==undefined) player.yourGod.quests[i][1][2] = [1,2,3][i] //Strength, Agility, Intelligence
                if(player.yourGod.quests[i][0][0]==undefined) player.yourGod.quests[i][0][0] = player.yourGod.quests[i][0][0] = player.yourGod.bestPointsThusFar[randomizeIt].gt(0)?player.yourGod.bestPointsThusFar[randomizeIt].add(player.yourGod.bestPassivePointGainThusFar[randomizeIt].mul(randomizeIt==3?1:420).add(randomizeIt==3?70:0)).mul(randomizeIt==3?[1,3,6][i]:[1,8,27][i]):new Decimal(0)
				while(player.yourGod.quests[i][0][0].lte(0) && player.yourGod.bestPointsThusFar[randomizeIt].lte(0)) {
                    randomizeIt = Math.floor(Math.random()*(4)) 
                    player.yourGod.quests[i][0][0] = player.yourGod.bestPointsThusFar[randomizeIt].add(player.yourGod.bestPassivePointGainThusFar[randomizeIt].mul(randomizeIt==3?1:420).add(randomizeIt==3?70:0)).mul(randomizeIt==3?[1,3,6][i]:[1,8,27][i])
                }
                if(player.yourGod.quests[i][0][1]==undefined) player.yourGod.quests[i][0][1] = [`Points`,`Prestige Points`,`Spaces`,`Time Points`][randomizeIt] //Resource Name
                if(player.yourGod.quests[i][0][2]==undefined) player.yourGod.quests[i][0][2] = [`player.points`,`player.p.points`,`player.s.points`,`player.t.timePoints`][randomizeIt] //Resource Source
                if(player.yourGod.quests[i][0][3]==undefined) player.yourGod.quests[i][0][3] = [0,1,2,3][randomizeIt] //Resource Index
                if(player.yourGod.quests[i][1][0]==undefined) player.yourGod.quests[i][1][0] = new Decimal(420) //Timer
                if(player.yourGod.quests[i][1][1]==undefined) player.yourGod.quests[i][1][1] = new Decimal(1) //Level
				if(player.yourGod.quests[i][0][4]==undefined) player.yourGod.quests[i][0][4] = Decimal.pow(7/6, player.yourGod.quests[i][1][1]).sub(1) //Reward
				Decimal.pow(7/6, player.yourGod.quests[0][1][1]).sub(1)
                player.yourGod.quests[i][1][0] = player.yourGod.quests[i][1][0].sub(myCore)
				if(!(player.yourGod.quests[i][0][2]==null)) if(eval(player.yourGod.quests[i][0][2]).gte(player.yourGod.quests[i][0][0]) && player.yourGod.selectedQuest == i+1) {
					player.a.statsRPG[player.yourGod.quests[i][1][2]] = new Decimal(player.a.statsRPG[player.yourGod.quests[i][1][2]]).add(player.yourGod.quests[i][0][4])
					switch(player.yourGod.quests[i][0][3]){
						case 0:
							player.points = player.points.sub(player.yourGod.quests[i][0][0])
							break;
						case 1:
							player.p.points = player.p.points.sub(player.yourGod.quests[i][0][0])
							break;
						case 2:
							player.s.points = player.s.points.sub(player.yourGod.quests[i][0][0])
							break;
						case 3:
							player.t.timePoints = player.t.timePoints.sub(player.yourGod.quests[i][0][0])
							break;
						default:
							console.log("uhh exucse me what the fuck are you doing in my house")
							break;
					}
					player.yourGod.quests[i][1][1] = player.yourGod.quests[i][1][1].add(1)
					let randomizeIt = Math.floor(Math.random()*(4))
					let requirementExponent = new Decimal(player.yourGod.quests[i][1][1]).mul((player.yourGod.quests[i][1][1]).add(1)).div(2).sub(1).div(100).add(1)
					player.yourGod.quests[i][0][0] = player.yourGod.bestPointsThusFar[randomizeIt].gt(0)?player.yourGod.bestPointsThusFar[randomizeIt].add(player.yourGod.bestPassivePointGainThusFar[randomizeIt].mul(randomizeIt==3?1:420).add(randomizeIt==3?70:0)).mul(randomizeIt==3?[1,3,6][i]:[1,8,27][i]).pow(requirementExponent).div(tmp.her.buyables["level6"].effect):new Decimal(0)
					while(player.yourGod.quests[i][0][0].lte(0) || player.yourGod.bestPointsThusFar[randomizeIt].lte(0)) {
						randomizeIt = Math.floor(Math.random()*(4))
						player.yourGod.quests[i][0][0] = player.yourGod.bestPointsThusFar[randomizeIt].add(player.yourGod.bestPassivePointGainThusFar[randomizeIt].mul(randomizeIt==3?1:420).add(randomizeIt==3?70:0)).mul(randomizeIt==3?[1,3,6][i]:[1,8,27][i]).pow(requirementExponent).div(tmp.her.buyables["level6"].effect)
					}
					player.yourGod.quests[i][0][1] = [`Points`,`Prestige Points`,`Spaces`,`Time Points`][randomizeIt]
					player.yourGod.quests[i][0][2] = [`player.points`,`player.p.points`,`player.s.points`,`player.t.timePoints`][randomizeIt]
					player.yourGod.quests[i][0][3] = [0,1,2,3][randomizeIt]
					player.yourGod.quests[i][0][4] = Decimal.pow(7/6, player.yourGod.quests[0][1][1]).sub(1)
					player.yourGod.quests[i][1][0] = new Decimal(420).mul(player.yourGod.quests[i][1][1])
					player.yourGod.questsDone=player.yourGod.questsDone.add(1)
				}
				if(player.yourGod.quests[i][1][0].lte(0)){
					if(player.yourGod.quests[i][1][1].gte(2)){
						let prevRequirementExponent = new Decimal(player.yourGod.quests[i][1][1]).mul((player.yourGod.quests[i][1][1]).add(1)).div(2).sub(1).div(100).add(1)
						player.yourGod.quests[i][1][1] = player.yourGod.quests[i][1][1].sub(1).max(1)
						let requirementExponent = new Decimal(player.yourGod.quests[i][1][1]).mul((player.yourGod.quests[i][1][1]).add(1)).div(2).sub(1).div(100).add(1)
						let questSave = player.yourGod.quests[i][0][0]
						player.yourGod.quests[i][0][0] = questSave.root(prevRequirementExponent).pow(requirementExponent)
						player.yourGod.quests[i][0][4] = Decimal.pow(7/6, player.yourGod.quests[i][1][1]).sub(1)
						player.yourGod.quests[i][1][0] = new Decimal(420).mul(player.yourGod.quests[i][1][1])
					}
					else{
						let randomizeIt = Math.floor(Math.random()*(4))
						player.yourGod.quests[i][0][0] = player.yourGod.bestPointsThusFar[randomizeIt].gt(0)?player.yourGod.bestPointsThusFar[randomizeIt].add(player.yourGod.bestPassivePointGainThusFar[randomizeIt].mul(randomizeIt==3?1:420).add(randomizeIt==3?70:0)).mul(randomizeIt==3?[1,3,6][0]:[1,8,27][0]).div(tmp.her.buyables["level6"].effect):new Decimal(0)
						while(player.yourGod.quests[i][0][0].lte(0) || player.yourGod.bestPointsThusFar[randomizeIt].lte(0)) {
							randomizeIt = Math.floor(Math.random()*(4))
							player.yourGod.quests[i][0][0] = player.yourGod.bestPointsThusFar[randomizeIt].add(player.yourGod.bestPassivePointGainThusFar[randomizeIt].mul(randomizeIt==3?1:420).add(randomizeIt==3?70:0)).mul(randomizeIt==3?3:8).div(tmp.her.buyables["level6"].effect)
						}
						player.yourGod.quests[i][0][1] = [`Points`,`Prestige Points`,`Spaces`,`Time Points`][randomizeIt]
						player.yourGod.quests[i][0][4] = Decimal.pow(7/6, 1).sub(1)
						player.yourGod.quests[i][1][1] = new Decimal(1)
						player.yourGod.quests[i][0][2] = [`player.points`,`player.p.points`,`player.s.points`,`player.t.timePoints`][randomizeIt]
						player.yourGod.quests[i][0][3] = [0,1,2,3][randomizeIt]
						player.yourGod.quests[i][1][0] = new Decimal(420)
					}
				}
            }
        }
        if(player.yourGod.isAlreadyHere && player.tab !=='yourGod' && player.tab !=='her' && player.yourGod.tabCheck!=="idk") {
            options.forceOneTab = player.yourGod.tabCheck
            player.yourGod.tabCheck = "idk"
        }
        if(player.tab == 'yourGod'){
            player.yourGod.hasBeenSeen = true
            if(player.yourGod.musicTime<(60/74*32)){
                document.getElementById("idAudio1").play()
            }
            else {
                document.getElementById("idAudio1").pause()
                document.getElementById("idAudio1").currentTime = 0
                document.getElementById("idAudio2").play()
            }
            player.yourGod.musicTime = player.yourGod.musicTime+myCore
        }
        else {
            document.getElementById("idAudio1").pause()
			document.getElementById("idAudio1").currentTime = 0
            document.getElementById("idAudio2").pause()
			document.getElementById("idAudio2").currentTime = 0
            player.yourGod.musicTime = 0
        }
		document.getElementById("idAudio1").volume = options.musicMute?0:1
        document.getElementById("idAudio2").volume = options.musicMute?0:1
        if(player.yourGod.isAlreadyHere && player.tab == 'yourGod' || player.tab == 'her') {
            player.yourGod.tabCheck = player.yourGod.tabCheck=="idk"?options.forceOneTab:player.yourGod.tabCheck
            options.forceOneTab = true
        }
        if(player.yourGod.isAlreadyHere && (player.tab =='yourGod') && !player.yourGod.particles.eq(8)){
            makeParticles(myParticle, 8)
            player.yourGod.particles = new Decimal(8)
        }
        if(player.yourGod.isAlreadyHere && player.tab !=='yourGod' && !player.yourGod.particles.eq(0)){
            clearParticles()
            player.yourGod.particles = new Decimal(0)
        }
        player.yourGod.timer = player.yourGod.timer+myCore
        player.yourGod.textX = Math.sin(player.yourGod.timer*(5/2))*2
        player.yourGod.textY = Math.sin(player.yourGod.timer*(2019/2024))*3
        player.yourGod.textBlur = Math.abs(Math.sin(player.yourGod.timer*(8/4))*5)
    },
    upgrades: {
        space1:{ 
            title(){return `<h1 style='color: white;font-size: 20px;'>`+(player.s.unlocked?`4th Dimension`:`[LOCKED]`)},
            description(){return `<h1 style='color: white;font-size: 12px;'>`+(player.s.unlocked?`Unlocks "Time of Spissitude"<br>(nerfs your total size effect)<br>Cost: 1 Perk Point`:`You gotta unlock Space layer first, you silly goose.`)},
            canAfford(){return new Decimal(player.yourGod.perkPoints).gte(this.cost()) && !hasUpgrade("yourGod", "space1") && player.s.unlocked},
            cost(){return new Decimal(1)},
			currencyInternalName: "perkPoints",
			currencyLayer: "yourGod",
            style(){return {
                "height": "100px",
                "width": "200px",
                "color": (hasUpgrade("yourGod", "space1")?"rgb(31.875,31.875,31.875)":"black"),
                "border-radius": "0%",
                "border": "4px rgba(255,255,255,0.125) solid",
                "background-color": (hasUpgrade("yourGod", "space1")?"rgb(31.875,31.875,31.875)":"black")
            }},
            unlocked(){return true}
        },
        time1:{ 
            title(){return `<h1 style='color: black;font-size: 20px;'>`+(player.t.unlocked?`Time Bar`:`[LOCKED]`)},
            description(){return `<h1 style='color: black;font-size: 12px;'>`+(player.t.unlocked?`Unlocks bars for Time buyables<br>Cost: 1 Perk Point`:`You gotta unlock Time layer first, you silly goose.`)},
            canAfford(){return new Decimal(player.yourGod.perkPoints).gte(this.cost()) && !hasUpgrade("yourGod", "time1") && player.t.unlocked},
            cost(){return new Decimal(1)},
			currencyInternalName: "perkPoints",
			currencyLayer: "yourGod",
            style(){return {
                "height": "100px",
                "width": "200px",
                "color": (hasUpgrade("yourGod", "time1")?"rgb(223.125,223.125,223.125)":"white"),
                "border-radius": "0%",
                "border": "4px rgba(0,0,0,0.125) solid",
                "background-color": (hasUpgrade("yourGod", "time1")?"rgb(223.125,223.125,223.125)":"white")
            }},
            unlocked(){return true}
        },
    },
    buyables: {
        11: {
            title(){return `Additional Point Massacre`},
            display(){return `Adds up your point gain by 73-ish million<br>Amount: ${formatWhole(player.yourGod.buyables[11])}<br>Effect: +${format(tmp.yourGod.buyables[11].effect)} points<br>Cost: ${formatWhole(tmp.yourGod.buyables[11].cost)} Anti Points`},
            effect(){return Decimal.mul(Decimal.pow(9000, new Decimal(3.954242509439325).root(2)), player.yourGod.buyables[11])},
            canAfford(){return player.yourGod.shopPoints.gte(this.cost())},
            cost(){return player.yourGod.buyables[11].add(1).mul(player.yourGod.buyables[11].add(2)).div(2)},
            buy(){
                player.yourGod.shopPoints = player.yourGod.shopPoints.sub(this.cost())
                player.yourGod.buyables[11] = player.yourGod.buyables[11].add(1)
            },
			unlocked(){return player.her.timeline[1]==0},
        },
        12: { 
            title(){return `Multiplicative Point Scaler`},
            display(){return `Multiplies your point gain by 9,000x<br>Amount: ${formatWhole(player.yourGod.buyables[12])}<br>Effect: x${format(tmp.yourGod.buyables[12].effect)}<br>Cost: ${formatWhole(tmp.yourGod.buyables[12].cost)} Anti Points`},
            effect(){return Decimal.pow(9000, player.yourGod.buyables[12])},
            canAfford(){return player.yourGod.shopPoints.gte(this.cost())},
            cost(){return player.yourGod.buyables[12].add(1).mul(player.yourGod.buyables[12].add(2)).div(2)},
            buy(){
                player.yourGod.shopPoints = player.yourGod.shopPoints.sub(this.cost())
                player.yourGod.buyables[12] = player.yourGod.buyables[12].add(1)
            },
			unlocked(){return player.her.timeline[1]==0},
        },
        13: { 
            title(){return `Power Point Presentation`},
            display(){return `Exponentiates your point gain by 0.0022<br>Amount: ${formatWhole(player.yourGod.buyables[13])}<br>Effect: ^${format(tmp.yourGod.buyables[13].effect)}<br>Cost: ${formatWhole(tmp.yourGod.buyables[13].cost)} Anti Points`},
            effect(){return Decimal.mul(.0022241188054641, player.yourGod.buyables[13]).add(1)},
            canAfford(){return player.yourGod.shopPoints.gte(this.cost())},
            cost(){return player.yourGod.buyables[13].add(1).mul(player.yourGod.buyables[13].add(2)).div(2)},
            buy(){
                player.yourGod.shopPoints = player.yourGod.shopPoints.sub(this.cost())
                player.yourGod.buyables[13] = player.yourGod.buyables[13].add(1)
            },
			unlocked(){return player.her.timeline[1]==0},
        },
        21: {
            title(){return `Spacial Dimension Duplicator`},
            display(){return `You gain 3 additional Dimensions<br>Amount: ${formatWhole(player.yourGod.buyables[21])}<br>Effect: +${format(tmp.yourGod.buyables[21].effect)} free Space buyables<br>Cost: ${formatWhole(tmp.yourGod.buyables[21].cost)} Anti Points`},
            effect(){return Decimal.mul(3, player.yourGod.buyables[21])},
            canAfford(){return player.yourGod.shopPoints.gte(this.cost())},
            cost(){return player.yourGod.buyables[21].add(1).mul(player.yourGod.buyables[21].add(2)).div(2)},
            buy(){
                player.yourGod.shopPoints = player.yourGod.shopPoints.sub(this.cost())
                player.yourGod.buyables[21] = player.yourGod.buyables[21].add(1)
            },
            unlocked(){return player["tree-tab"].shown[2] && player.her.timeline[1]==0}
        },
        22: {
            title(){return `Spacial Dimension Duplicator`},
            display(){return `Your total size boosts your point gain<br>Amount: ${formatWhole(player.yourGod.buyables[22])}<br>Effect: x${format(tmp.yourGod.buyables[22].effect)}<br>Cost: ${formatWhole(tmp.yourGod.buyables[22].cost)} Anti Points`},
            effect(){return Decimal.pow(tmp.s.sizeEffect, player.yourGod.buyables[22])},
            canAfford(){return player.yourGod.shopPoints.gte(this.cost())},
            cost(){return player.yourGod.buyables[22].add(1).mul(player.yourGod.buyables[22].add(2)).div(2)},
            buy(){
                player.yourGod.shopPoints = player.yourGod.shopPoints.sub(this.cost())
                player.yourGod.buyables[22] = player.yourGod.buyables[22].add(1)
            },
            unlocked(){return player["tree-tab"].shown[2] && player.her.timeline[1]==0}
        },
        23: {
            title(){return `Spacial Point Elevation`},
            display(){return `Increases your space point gain exponent by 11th<br>Amount: ${formatWhole(player.yourGod.buyables[23])}<br>Effect: ^${format(tmp.yourGod.buyables[23].effect.add(1))}<br>Cost: ${formatWhole(tmp.yourGod.buyables[23].cost)} Anti Points`},
            effect(){return Decimal.mul(1/11, player.yourGod.buyables[23])},
            canAfford(){return player.yourGod.shopPoints.gte(this.cost())},
            cost(){return player.yourGod.buyables[23].add(1).mul(player.yourGod.buyables[23].add(2)).div(2)},
            buy(){
                player.yourGod.shopPoints = player.yourGod.shopPoints.sub(this.cost())
                player.yourGod.buyables[23] = player.yourGod.buyables[23].add(1)
            },
            unlocked(){return player["tree-tab"].shown[2] && player.her.timeline[1]==0}
        },
        31: {
            title(){return `Temporal Time Advantage`},
            display(){return `Your time point is incrased as if you just bought another Time<br>Amount: ${formatWhole(player.yourGod.buyables[31])}<br>Effect: +${format(tmp.yourGod.buyables[31].effect)} free time<br>Cost: ${formatWhole(tmp.yourGod.buyables[31].cost)} Anti Points`},
            effect(){return Decimal.mul(1, player.yourGod.buyables[31])},
            canAfford(){return player.yourGod.shopPoints.gte(this.cost())},
            cost(){return player.yourGod.buyables[31].add(1).mul(player.yourGod.buyables[31].add(2)).div(2)},
            buy(){
                player.yourGod.shopPoints = player.yourGod.shopPoints.sub(this.cost())
                player.yourGod.buyables[31] = player.yourGod.buyables[31].add(1)
            },
            unlocked(){return player["tree-tab"].shown[3] && player.her.timeline[1]==0}
        },
        32: {
            title(){return `Temporal Bar Overflow`},
            display(){return `Your bars can go beyond limitation, further increasing your Time buyables's potential<br>Amount: ${formatWhole(player.yourGod.buyables[32])}<br>Effect: x${format(tmp.yourGod.buyables[32].effect)}<br>Cost: ${formatWhole(tmp.yourGod.buyables[32].cost)} Anti Points`},
            effect(){return Decimal.mul(1, player.yourGod.buyables[32]).add(1)},
            canAfford(){return player.yourGod.shopPoints.gte(this.cost())},
            cost(){return player.yourGod.buyables[32].add(1).mul(player.yourGod.buyables[32].add(2)).div(2)},
            buy(){
                player.yourGod.shopPoints = player.yourGod.shopPoints.sub(this.cost())
                player.yourGod.buyables[32] = player.yourGod.buyables[32].add(1)
            },
            unlocked(){return player["tree-tab"].shown[3] && player.her.timeline[1]==0}
        },
        33: {
            title(){return `Temporal Time Dilation`},
            display(){return `Exponentiates your Time upgrades's "time" by 60th<br>Amount: ${formatWhole(player.yourGod.buyables[33])}<br>Effect: ^${format(tmp.yourGod.buyables[33].effect.add(1))}<br>Cost: ${formatWhole(tmp.yourGod.buyables[33].cost)} Anti Points`},
            effect(){return Decimal.mul(1/60, player.yourGod.buyables[33])},
            canAfford(){return player.yourGod.shopPoints.gte(this.cost())},
            cost(){return player.yourGod.buyables[33].add(1).mul(player.yourGod.buyables[33].add(2)).div(2)},
            buy(){
                player.yourGod.shopPoints = player.yourGod.shopPoints.sub(this.cost())
                player.yourGod.buyables[33] = player.yourGod.buyables[33].add(1)
            },
            unlocked(){return player["tree-tab"].shown[3] && player.her.timeline[1]==0}
        },
        691: {
            title(){return `Buy Shop Point`},
            display(){return `Does exactly what it says.<br>Cost: ${formatWhole(tmp.yourGod.buyables[691].cost)} points`},
            canAfford(){return player.points.gte(this.cost())},
            cost(){return Decimal.pow(10000000000, player.yourGod.buyables[691].add(100).pow(6.9))},
            buy(){
                player.points = player.points.sub(this.cost())
                player.yourGod.shopPoints = player.yourGod.shopPoints.add(1)
                player.yourGod.buyables[691] = player.yourGod.buyables[691].add(1)
            },
			unlocked(){return player.her.timeline[1]==0},
        },
        692: {
            title(){return `Respec Shop Points`},
            display(){return `Adds up your point gain by 30 billion<br>Amount: ${formatWhole(player.yourGod.buyables[692])}<br>Effect: +${format(tmp.yourGod.buyables[692].effect)} points<br>Cost: ${formatWhole(tmp.yourGod.buyables[692].cost)} Anti Points`},
            canAfford(){return true},
            cost(){return player.yourGod.buyables[692].add(1).mul(player.yourGod.buyables[692].add(2)).div(2)},
            buy(){
				if(confirm("Are you sure you want to do that? You'll get all your shop points back, but you'll lose all your resources\n\n(you'll keep all your layers unlocked)")){
					player.points = new Decimal(0)
					layerDataReset("p")
					layerDataReset("s")
					layerDataReset("t")
					player.yourGod.shopPoints = player.yourGod.buyables[691]
					for(i=1;i>4;i++){
						for(v=1;v>4;v++){
							player.yourGod.buyables[i*10+v] = new Decimal(0)
						}
					}
				}
            },
			unlocked(){return player.her.timeline[1]==0},
        },
        quest1: {
            title(){return `<h1 style='font-size:32px;'>Strength Quest [LEVEL ${formatWhole(player.yourGod.quests[0][1][1])}]`},
            display(){return `<h1 style='font-size:12px;'>Reach ${format(player.yourGod.quests[0][0][0])} ${player.yourGod.quests[0][0][1]}<br>Reward: ${format(player.yourGod.quests[0][0][4])} Str<br><br>Time Left: ${formatTime(player.yourGod.quests[0][1][0])}`},
            canAfford(){return true},
			buy(){player.yourGod.selectedQuest = player.yourGod.selectedQuest==1?4:1},
            style(){return {
                "height": "150px",
                "width": "350px",
                "color": (player.yourGod.selectedQuest==1?"limegreen":"black"),
                "border-radius": "0%",
                "border": "4px rgba(0,0,0,0.125) solid",
                "background-color": (player.yourGod.selectedQuest==1?"lightgreen":"white"),
            }},
        },
        quest1Reset: {
            title(){return `<h1 style='font-size:20px;'>[RESET STRENGTH QUEST]</h1>`},
            display(){return `<h1 style='font-size:10px;'>Resets quest entirely (level, requirement, reward) inexchange for instant quest swap.</h1>`},
			canAfford(){return true},
			buy(){
				let randomizeIt = Math.floor(Math.random()*(4))
				let questRequirement = player.yourGod.bestPointsThusFar[randomizeIt].gt(0)?player.yourGod.bestPointsThusFar[randomizeIt].add(player.yourGod.bestPassivePointGainThusFar[randomizeIt].mul(randomizeIt==3?1:420).add(randomizeIt==3?70:0)).mul(randomizeIt==3?[1,3,6][0]:[1,8,27][0]).div(tmp.her.buyables["level6"].effect):new Decimal(0)
				while(questRequirement.lte(0) || player.yourGod.bestPointsThusFar[randomizeIt].lte(0)) {
					randomizeIt = Math.floor(Math.random()*(4))
					questRequirement = player.yourGod.bestPointsThusFar[randomizeIt].add(player.yourGod.bestPassivePointGainThusFar[randomizeIt].mul(randomizeIt==3?1:420).add(randomizeIt==3?70:0)).div(tmp.her.buyables["level6"].effect)
				}
				let questResource = [`Points`,`Prestige Points`,`Spaces`,`Time Points`][randomizeIt]
				let questReward = Decimal.pow(7/6, 1).sub(1)
				if(confirm(`Are you sure you want to reset that quest? You could get some INSANE stat gains if you were to just push even further beyond.\n\n[New Quest Stats]\nRequirement: ${format(questRequirement)} ${questResource}\nReward: ${format(questReward)} Strength`)==true){
					player.yourGod.quests[0][1][1] = new Decimal(1)
					player.yourGod.quests[0][0][0] = questRequirement
					player.yourGod.quests[0][0][1] = questResource
					player.yourGod.quests[0][0][2] = [`player.points`,`player.p.points`,`player.s.points`,`player.t.timePoints`][randomizeIt]
					player.yourGod.quests[0][0][3] = [0,1,2,3][randomizeIt]
					player.yourGod.quests[0][0][4] = questReward
					player.yourGod.quests[0][1][0] = new Decimal(420)
				}
			},
            style(){return {
                "height": "150px",
                "width": "150px",
                "color": "black",
                "border-radius": "0%",
                "border": "4px rgba(0,0,0,0.125) solid",
                "background-color": "white",
            }},
        },
        quest2: {
            title(){return `<h1 style='font-size:32px;'>Agility Quest [LEVEL ${formatWhole(player.yourGod.quests[1][1][1])}]`},
            display(){return `<h1 style='font-size:12px;'>Reach ${format(player.yourGod.quests[1][0][0])} ${player.yourGod.quests[1][0][1]}<br>Reward: ${format(player.yourGod.quests[1][0][4])} Agi<br><br>Time Left: ${formatTime(player.yourGod.quests[1][1][0])}`},
			canAfford(){return true},
			buy(){player.yourGod.selectedQuest = player.yourGod.selectedQuest==2?4:2},
            style(){return {
                "height": "150px",
                "width": "350px",
                "color": (player.yourGod.selectedQuest==2?"limegreen":"black"),
                "border-radius": "0%",
                "border": "4px rgba(0,0,0,0.125) solid",
                "background-color": (player.yourGod.selectedQuest==2?"lightgreen":"white"),
            }},
        },
        quest2Reset: {
            title(){return `<h1 style='font-size:20px;'>[RESET AGILITY QUEST]</h1>`},
            display(){return `<h1 style='font-size:10px;'>Resets quest entirely (level, requirement, reward) inexchange for instant quest swap.</h1>`},
			canAfford(){return true},
			buy(){
				let randomizeIt = Math.floor(Math.random()*(4))
				let questRequirement = player.yourGod.bestPointsThusFar[randomizeIt].gt(0)?player.yourGod.bestPointsThusFar[randomizeIt].add(player.yourGod.bestPassivePointGainThusFar[randomizeIt].mul(randomizeIt==3?1:420).add(randomizeIt==3?70:0)).mul(randomizeIt==3?[1,3,6][0]:[1,8,27][0]).div(tmp.her.buyables["level6"].effect):new Decimal(0)
				while(questRequirement.lte(0) || player.yourGod.bestPointsThusFar[randomizeIt].lte(0)) {
					randomizeIt = Math.floor(Math.random()*(4))
					questRequirement = player.yourGod.bestPointsThusFar[randomizeIt].add(player.yourGod.bestPassivePointGainThusFar[randomizeIt].mul(randomizeIt==3?1:420).add(randomizeIt==3?70:0)).mul(randomizeIt==3?3:8).div(tmp.her.buyables["level6"].effect)
				}
				let questResource = [`Points`,`Prestige Points`,`Spaces`,`Time Points`][randomizeIt]
				let questReward = Decimal.pow(7/6, 1).sub(1)
				if(confirm(`Are you sure you want to reset that quest? You could get some INSANE stat gains if you were to just push even further beyond.\n\n[New Quest Stats]\nRequirement: ${format(questRequirement)} ${questResource}\nReward: ${format(questReward)} Agility`)==true){
					player.yourGod.quests[1][1][1] = new Decimal(1)
					player.yourGod.quests[1][0][0] = questRequirement
					player.yourGod.quests[1][0][1] = questResource
					player.yourGod.quests[1][0][2] = [`player.points`,`player.p.points`,`player.s.points`,`player.t.timePoints`][randomizeIt]
					player.yourGod.quests[1][0][3] = [0,1,2,3][randomizeIt]
					player.yourGod.quests[1][0][4] = questReward
					player.yourGod.quests[1][1][0] = new Decimal(420)
				}
			},
            style(){return {
                "height": "150px",
                "width": "150px",
                "color": "black",
                "border-radius": "0%",
                "border": "4px rgba(0,0,0,0.125) solid",
                "background-color": "white",
            }},
        },
        quest3: {
            title(){return `<h1 style='font-size:32px;'>Intelligence Quest [LEVEL ${formatWhole(player.yourGod.quests[2][1][1])}]`},
            display(){return `<h1 style='font-size:12px;'>Reach ${format(player.yourGod.quests[2][0][0])} ${player.yourGod.quests[2][0][1]}<br>Reward: ${format(player.yourGod.quests[2][0][4])} Int<br><br>Time Left: ${formatTime(player.yourGod.quests[2][1][0])}`},
            canAfford(){return true},
			buy(){player.yourGod.selectedQuest = player.yourGod.selectedQuest==3?4:3},
            style(){return {
                "height": "150px",
                "width": "350px",
                "color": (player.yourGod.selectedQuest==3?"limegreen":"black"),
                "border-radius": "0%",
                "border": "4px rgba(0,0,0,0.125) solid",
                "background-color": (player.yourGod.selectedQuest==3?"lightgreen":"white"),
            }},
        },
        quest3Reset: {
            title(){return `<h1 style='font-size:20px;'>[RESET INTELLIGENCE QUEST]</h1>`},
            display(){return `<h1 style='font-size:10px;'>Resets quest entirely (level, requirement, reward) inexchange for instant quest swap.</h1>`},
			canAfford(){return true},
			buy(){
				let randomizeIt = Math.floor(Math.random()*(4))
				let questRequirement = player.yourGod.bestPointsThusFar[randomizeIt].gt(0)?player.yourGod.bestPointsThusFar[randomizeIt].add(player.yourGod.bestPassivePointGainThusFar[randomizeIt].mul(randomizeIt==3?1:420).add(randomizeIt==3?70:0)).mul(randomizeIt==3?[1,3,6][0]:[1,8,27][0]).div(tmp.her.buyables["level6"].effect):new Decimal(0)
				while(questRequirement.lte(0) || player.yourGod.bestPointsThusFar[randomizeIt].lte(0)) {
					randomizeIt = Math.floor(Math.random()*(4))
					questRequirement = player.yourGod.bestPointsThusFar[randomizeIt].add(player.yourGod.bestPassivePointGainThusFar[randomizeIt].mul(randomizeIt==3?1:420).add(randomizeIt==3?70:0)).mul(randomizeIt==3?6:27).div(tmp.her.buyables["level6"].effect)
				}
				let questResource = [`Points`,`Prestige Points`,`Spaces`,`Time Points`][randomizeIt]
				let questReward = Decimal.pow(7/6, 1).sub(1)
				if(confirm(`Are you sure you want to reset that quest? You could get some INSANE stat gains if you were to just push even further beyond.\n\n[New Quest Stats]\nRequirement: ${format(questRequirement)} ${questResource}\nReward: ${format(questReward)} Intelligence`)==true){
					player.yourGod.quests[2][1][1] = new Decimal(1)
					player.yourGod.quests[2][0][0] = questRequirement
					player.yourGod.quests[2][0][1] = questResource
					player.yourGod.quests[2][0][2] = [`player.points`,`player.p.points`,`player.s.points`,`player.t.timePoints`][randomizeIt]
					player.yourGod.quests[2][0][3] = [0,1,2,3][randomizeIt]
					player.yourGod.quests[2][0][4] = questReward
					player.yourGod.quests[2][1][0] = new Decimal(420)
				}
			},
            style(){return {
                "height": "150px",
                "width": "150px",
                "color": "black",
                "border-radius": "0%",
                "border": "4px rgba(0,0,0,0.125) solid",
                "background-color": "white",
            }},
        },
    },
    microtabs: {
        0: {
            "SPACE & TIME": {
                content: [["row", [["upgrade","space1"],["upgrade","time1"]]]],  
                unlocked(){return true},
            }
        }
    },
    tabFormat: {
        "SHOP": {
            content: [["display-text", function(){return `<h1 style='color: darkred; text-shadow: purple ${player.yourGod.textX}px ${player.yourGod.textY}px ${player.yourGod.textBlur}px'>DOES ANY OF THIS LOOK FAMILIAR?</h1><br>SHOP POINTS: ${formatWhole(player.yourGod.shopPoints)}`}],"blank","buyables"],
            unlocked(){return player.her.timeline[1]==0}
        },
        "PERKS": {
            content: [["display-text", function(){return `<h1 style='color: darkred; text-shadow: purple ${player.yourGod.textX}px ${player.yourGod.textY}px ${player.yourGod.textBlur}px'>DOES ANY OF THIS LOOK FAMILIAR?</h1><br>PERK POINTS: ${formatWhole(player.yourGod.perkPoints)}`}],["microtabs", 0, {'border-color': 'rgba(0,0,0,0)'}]],  
            unlocked(){return true},
        },
        "QUESTS": {
            content: [["display-text", function(){return `<h1 style='color: darkred; text-shadow: purple ${player.yourGod.textX}px ${player.yourGod.textY}px ${player.yourGod.textBlur}px'>DOES ANY OF THIS LOOK FAMILIAR?</h1><br>QUESTS DONE: ${formatWhole(player.yourGod.questsDone)}`}],"blank",["display-text", function(){return player.yourGod.selectedQuest!==4?`<h2>PROGRESS: ${format(eval(player.yourGod.quests[player.yourGod.selectedQuest-1][0][2]))} / ${format(player.yourGod.quests[player.yourGod.selectedQuest-1][0][0])} ${player.yourGod.quests[player.yourGod.selectedQuest-1][0][1]}`:``}],"blank",["row",[["buyable","quest1"],["buyable","quest1Reset"]]],"blank",["row",[["buyable","quest2"],["buyable","quest2Reset"]]],"blank",["row",[["buyable","quest3"],["buyable","quest3Reset"]]]],
            unlocked(){return player.her.timeline[1]==0}
        },
        "???": {
            content: [["tree", function() {return [["penis"]]}]],
            unlocked(){return true},
			buttonStyle(){return{
				"color": player.her.timeline[1]==0?"rgba(0,0,0,0)":"",
				"border-color": player.her.timeline[1]==0?"rgba(0,0,0,0)":tmp.yourGod.color,
				"transform": player.her.timeline[1]==0?"scale(1,1)":"",
				"box-shadow": !player.her.sheWasSeen || (player.her.herLog[1]>=1 && player.her.buyables["progress"].eq(0)) || (player.her.whatCouldPossiblyGoWrong && player.her.buyables["progress"].eq(1) && player.her.herPoints.lte(0))?"0px 0px 20px rgb(0,255,255)":"0px 0px 0px rgba(0,0,0,0)"
			}},
			title(){return player.her.timeline[1]!==0?"W.I.P.":"???"}
        },
    },
    layerShown(){return player.yourGod.isAlreadyHere}
})

addLayer("her", { 
    name: "her", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        herLog: [0, 0],
        herPath: 3,
		sheWasSeen: false,
		accessDenied: false,
		levels: new Decimal(1),
		experience: new Decimal(0),
		japanese: true,
		whatCouldPossiblyGoWrong: false,
		herPoints: new Decimal(0),
		timeline: [0, 0],
		timelineSave: "",
		timelinePoints: [new Decimal(10),new Decimal(10),new Decimal(10)],
		fuckOFFIMALLOWEDTOCHEATNOW: 1,
		gameState: 0,
    }},
	timelineNames(){return player.her.japanese?([["MAIN ZONE",`[undefined]<br>REWARD: NaN`],["ROOT ZONE",`[Decimal.root(normal_resource, 2),Decimal.root(getPointGain(), 2)]<br>reward: x${format(tmp.her.timelineEffects[1])} point gain`],["The RPG-less Timeline",`[level=undefined, stats=undefined]<br>Reward: x${format(tmp.her.timelineEffects[2])} EXP gain`]][player.her.timeline[0]]):([["The Main Timeline",`[No negative, nor positive changes, just your average vanilla experience]<br>Reward: None`],["The Root Timeline",`[All Normal Resources and Point Gain are square rooted]<br>Reward: x${format(tmp.her.timelineEffects[1])} point gain`],["The RPG-less Timeline",`[Levels and Stats do not exist within this timeline]<br>Reward: x${format(tmp.her.timelineEffects[2])} experience gain`]][player.her.timeline[0]])},
	timelineEffects(){return [player.her.timelinePoints[0].max(10).log(10), player.her.timelinePoints[1].max(10).log(10), player.her.timelinePoints[2].max(10).log(10)]},
	update(ourSoul){ 
		if(player.tab=="her") player.her.sheWasSeen = true
		player.her.timelinePoints[player.her.timeline[1]] = player.her.timelinePoints[player.her.timeline[1]].max(player.points)
		player.her.experience = player.her.experience.add(tmp.her.experienceGain.mul(ourSoul)).min(tmp.her.buyables["level2"].cost)
	},
	experienceGain(){
		let gain = tmp.her.buyables["level1"].effect.mul(tmp.her.timelineEffects[2])
		return gain
	},
    tabFormat: {
		"thought you were clever huh": {
			content: [["infobox", "herBlog"],["row", [["buyable","prev"], ["buyable","current"], ["buyable","next"]]], ["buyable","progress"]],
			unlocked(){return player.her.buyables["progress"].gte(1)},
			buttonStyle(){return{
				"box-shadow":((player.her.herLog[1]>=1 && player.her.buyables["progress"].eq(0)) || (player.her.whatCouldPossiblyGoWrong && player.her.buyables["progress"].eq(1) && player.her.herPoints.lte(0))?"0px 0px 20px rgb(0,255,255)":"0px 0px 0px rgba(0,0,0,0)")
			}},
			title(){return player.her.japanese?"ラッキーエア":"Rakkīea"},
		},
		"level": {
			content: [["display-text", function(){return player.her.japanese?`<h2>current LEVEL: ${formatWhole(player.her.levels)}</h2><br>You have <h1 style='font-size: 30px;text-shadow: 0px 0px 8px ${tmp.her.color};color: ${tmp.her.color}'>${format(player.her.experience)}</h1><h1 style='font-size: 30px;'>|${format(tmp.her.buyables["level2"].cost)}</h1> EXP<h5 style='opacity:0.5;'>(${format(tmp.her.experienceGain)} EXP/sec)</h5>${player.her.timeline[1]==2?``:`<br>base STR: ${format(player.a.statsRPG[1])}<br>base AGI: ${format(player.a.statsRPG[2])}<br>base INT: ${format(player.a.statsRPG[3])}`}`:`<h2>Current Level: ${formatWhole(player.her.levels)}</h2><br>You have <h1 style='font-size: 30px;text-shadow: 0px 0px 8px ${tmp.her.color};color: ${tmp.her.color}'>${format(player.her.experience)}</h1>|<h1 style='font-size: 30px;'>${format(tmp.her.buyables["level2"].cost)}</h1> experiences<h5 style='opacity:0.5;'>(and you gain ${format(tmp.her.experienceGain)} exp/sec)${player.her.timeline[1]==2?``:`<br>Base Strength: ${format(player.a.statsRPG[1])}<br>Base Agility: ${format(player.a.statsRPG[2])}<br>Base Intelligence: ${format(player.a.statsRPG[3])}`}`}],"blank",["row",[["buyable","level1"],["buyable","level2"]]],["row",[["buyable","level3"],["buyable","level4"],["buyable","level5"],["buyable","level6"]]],"blank",["display-text", function(){return "<span>mini tree (¬ ¬)<p style='font-size:10px;transform:translateX(42px) translateY(-10px);'>▽</p></h1>"}],"blank",["tree", function() {return [["pNodeMini"],["sNodeMini","blankMini","tNodeMini"]]}, {"border":"4px solid"}]],
			unlocked(){return player.her.buyables["progress"].gte(1)},
			title(){return player.her.japanese?"レベル":"Level"}
		},
		"time travel": {
			content: [["display-text", function(){return player.her.japanese?`<h1>TIMELINE ZONE</h1><br>TIMELINE ZONE grants access to other zones, each having differential attributions... and deadly obstacles. FUN IS INFINITE, after all! progression in other zones boosts all zones, very important.<br><br>there are no quest or shop in other time zones and... your progress in zone won't stay after leaving them, recommendation: stay as long as possible.<br><br>can't fix the problem... scores are still preserved though. ¯\_(ツ)_/¯<br><br>-ラッキーエア`:`<h1>TIMELINE HUB</h1><br>In this hub, you are able to traverse across different timelines of the same universe, each offering different challenges, trade offs or absolute dumpsters that... will make you reconsider life choices. The possibilities are endless, after all! Progressing through different timelines will affect all timelines in one way or another, so don't hesitate to try them all out.<br><br>You only get to keep the layer itself, perk subtab and this sublayer in other timelines and... unfortunately for you, there are some technical issues that apparently causes the entire universe to implode at exponential rate, forcing you to start all over again in alternate timelines.<br><br>Can't really do much about it... at least you get to keep your score. ¯\_(ツ)_/¯<br><br>-Rakkīea`}],"blank","blank",["display-text", function(){return `<h2>${tmp.her.timelineNames[0]}</h2><br>(${format(player.her.timelinePoints[player.her.timeline[0]])} ${player.her.japanese?"s":"S"}core)<br>${tmp.her.timelineNames[1]}</h2>`}],"blank",["buyable","enterTimeline"],"blank",["tree", function() {return [["mainTimeline"],["rootTimeline","blankMini","blankMini","antiRPGTimeline"]]}]],
			unlocked(){return player.her.buyables["progress"].gte(2)},
			title(){return player.her.japanese?"タイムラインハブ":"Timeline Hub"}
		}
	},
    color: "rgb(0,99,99)",
    row: "side",
    layerShown: false,
    infoboxes: {
        herBlog: {
            title(){return `???<br>`+[`${player.her.japanese?"ログ#1: こんにちは、プレイヤー。":"Log #1: Hello Player."}`,`${player.her.japanese?"ログ#2: 緊急ヘルプ。":"Log #2: Emergency Help."}`,`${player.her.japanese?`ログ#3: ミッション失敗`:`Log #3: Mission Failed.`}`,`not nice :(`,`bitach`][player.her.herLog[0]]},
            body(){return [
                `${player.her.japanese?`こんにちは？こんにちは？<br><br>誰かいますか？<br><br>このメッセージを受け取っている人は、私の話を聞いてください。<br><br>ここにはあまり時間がなく、日本語キーボードを使うしかありません。申し訳ありません... -m-<br><br>あなたが知る必要があるのは、この秘密を私たちの間だけにしておくことだけです。<br><br>あらゆる手段を使って私のログを読んで、何が起こっているのかを見つけてください。`:`Hello? Hello?<br><br>Is anyone there?<br><br>If you are receiving this message, please listen to me.<br><br>I don't have much time here and I have no choice but to use a Japanese keyboard. Sorry... -m-<br><br>All you need to know is to keep this secret between us.<br><br>Please use any means necessary to read my logs and find out what is going on.`}`,
                `${player.her.japanese?`あまり説明せずに放置して申し訳ありません。<br><br>残念ながら、私自身のことや、今何が起こっているのか、あまりお伝えできません...「私が今経験している「特定の状況」」です。<br><br>いずれにせよ、あなたが彼らの愚かなソフトキャップにこだわっていることに気付きました。ひどいのはわかっています。-_-<br><br>これを受け取ってください。これで回避できるはずです。まったく話ができず申し訳ありません。理解するにはすべてを翻訳することに慣れる必要があります。うまくいけば。._.'`:`Sorry for leaving you without much explanation.<br><br>Unfortunately I can't tell you much about myself or what's going on thanks to a... "certain situation" I'm going through right now.<br><br>Anyways, I noticed that you got stuck with that stupid softcap of his. I know, it sucks. -_-<br><br>Take this. This should help you get around it. Sorry that we can't speak directly. You'll just have to get used to translating everything to understand. Hopefully. ._.'`}`,
				`${player.her.japanese?`まあ... うまくいかなかった。П-П<br><br>回避する方法は本当にないと思う... 別だけど!<br><br>以前にも同じようなことを見たことがあるような気がする。<br><br>時間を遡る必要があるが、ありがたいことに、この生き物のツリー内で見つけたエクスプロイトのおかげで、私はそのような偉業を成し遂げることができる。<br><br>さあ、誰がボスか見せつけてやろう...<br><br>ああ、えーと、リセット後にこれを読んでいるなら、おかえりなさい! ^-^/*`:`Well... that didn't go well. П-П<br><br>I guess there is really no way to get around it... Unless!<br><br>I think I've seen something done like that before.<br><br>We'll have to go back in time, and thankfully, I'm capable of doing such feat due to exploits that I found within this creature's tree.<br><br>Now let's go and show 'em who's boss here...<br><br>Oh and, uh, if you're reading this after reset, welcome back! ^-^/*`}`,`no lore`,`a`,`a`][player.her.herLog[0]]},
            unlocked(){return true}
        }
    },
    buyables: {
        prev: {
            display(){return `<h1 style='font-size:32px;'><==`},
            buy(){
                player.her.herLog[0] = player.her.herLog[0] - 1
            },
            canAfford(){return player.her.herLog[0] !== 0},
            style(){return {
                "height": "100px",
                "width": "100px"
            }},
        },
        current: {
            display(){return `<p style='font-size:20px;'>[${formatWhole(player.her.herLog[0]+1)}|${formatWhole(player.her.herLog[1]+1)}]`},
            style(){return {
                "height": "100px",
                "width": "100px"
            }},
        },
        next: {
            display(){return `<h1 style='font-size:32px;'>==>`},
            buy(){
                player.her.herLog[0] = player.her.herLog[0] + 1
            },
            canAfford(){return player.her.herLog[0] < player.her.herLog[1]},
            style(){return {
                "height": "100px",
                "width": "100px"
            }},
        },
		enterTimeline: {
            display(){return `<p style='font-size:30px;'>${player.her.japanese?`「巨ハノイ巨尺」`:`[ENTER]`}`},
            buy(){
                if(confirm("Are you sure you're not misclicking anything?")){
					if(confirm("Are you REAAAAAAAAAAAAAAALLY sure about that?")){
						alert("Initializing Timeline Travel...")
						timelineShenanigans(player.her.timeline[1],player.her.timeline[0])
					}
				}
            },
            canAfford(){return true},
            style(){return {
                "height": "100px",
                "width": "300px",
				"color": player.her.timeline[0]==1?"rgb(247.788897449,247.788897449,242.671171994)":"",
				"background-color": tmp[["mainTimeline","rootTimeline","antiRPGTimeline"][player.her.timeline[0]]].color
            }},
		},
        progress: {
            display(){return `<p style='font-size:30px;'>${player.her.japanese?`「ア尺のこ巨巨厶」`:`[PROCEED]`}`},
            buy(){
				if(player.her.buyables["progress"].eq(0)) doPopup("default", `${player.her.japanese?`レベル機能がロック解除されました!`:`Level feature unlocked!`}`, `${player.her.japanese?`「✓」`:`[√]`}`, new Decimal(3), tmp.her.color);
                if(player.her.buyables["progress"].eq(1)) doPopup("default", `${player.her.japanese?`タイムラインハブがロック解除されました!`:`Timeline Hub unlocked!`}`, `${player.her.japanese?`「✓」`:`[√]`}`, new Decimal(3), tmp.her.color);
                player.her.buyables["progress"] = player.her.buyables["progress"].add(1)
            },
			canAfford(){return (player.her.herLog[1]>=1 && player.her.buyables["progress"].eq(0)) || (player.her.whatCouldPossiblyGoWrong && player.her.buyables["progress"].eq(1) && player.her.herPoints.lte(0))},
            style(){return {
                "width": "300px",
                "height": "100px",
            }},
			unlocked(){return (player.her.herLog[1]>=1 && player.her.buyables["progress"].eq(0)) || (player.her.whatCouldPossiblyGoWrong && player.her.buyables["progress"].eq(1) && player.her.herPoints.lte(0))},
        },
        level1: {
            display(){return  player.her.japanese?`<h1>EXP generate</h1><br>get 1 EXP/sec per buyable<br><br>effect: ${format(this.effect())}/sec<br>cost: ${format(this.cost())} EXP`:`<h1>Experience Generator</h1><br>Generates 1 Exp/sec per buyable<br><br>Effect: ${format(this.effect())}/sec<br>Cost: ${format(this.cost())} experiences`},
            effect(){return player.her.buyables["level1"].mul(tmp.her.buyables["level3"].effect)},
			cost(){return player.her.buyables["level1"].gte(1)?Decimal.pow(777, player.her.buyables["level1"]):new Decimal(0)},
			buy(){
				player.her.experience = player.her.experience.sub(this.cost())
                player.her.buyables["level1"] = player.her.buyables["level1"].add(1)
            },
            canAfford(){return player.her.experience.gte(this.cost())},
        },
        level2: {
            display(){return player.her.japanese?`<h1>LEVEL!</h1><br>compromise EXP for LEVEL, better stats (+1/7) and +buyable<br><br>effect: x${format(this.effect())}<br>requirement: ${format(this.cost())} EXP`:`<h1>Level Up</h1><br>Resets your experience in exchange for a single level, increasing your total stats by +1/7 and unlocking new buyables<br><br>Effect: x${format(this.effect())}<br>Requirement: ${format(this.cost())} experiences`},
            effect(){return player.her.levels.sub(1).div(7).add(1)},
			cost(){return Decimal.pow(player.her.levels.pow(5/3).add(1), 4/3).mul(15)},
			buy(){
				if(player.her.levels.eq(4)){
					for(i=0;i<3;i++){
						player.yourGod.quests[i][0][0] = player.yourGod.quests[i][0][0].div(Decimal.pow(1.15, player.her.buyables["level2"]).mul(tmp.her.buyables["level5"].effect))
					}
				}
				if(player.her.levels.eq(5)){
					player.her.whatCouldPossiblyGoWrong = true
					if(player.her.herLog[1]<2) player.her.herLog[1]=player.her.herLog[1]+1
				}
				player.her.experience = player.her.experience.sub(this.cost())
                player.her.levels = player.her.levels.add(1)
            },
            canAfford(){return player.her.experience.gte(this.cost())},
        },
        level3: {
            display(){return player.her.japanese?`<h1>EXP generate++</h1><br>EXP generate = EXP generate+0.2<br><br>effect: x${format(this.effect())}<br>cost: ${format(this.cost())} EXP`:`<h1>More Powerful Generators</h1><br>Makes "Expeirence Generator" stronger<br><br>Effect: x${format(this.effect())}<br>Cost: ${format(this.cost())} experiences`},
            effect(){return player.her.buyables["level3"].div(5).add(1).mul(tmp.her.buyables["level5"].effect)},
			cost(){return Decimal.pow(6, player.her.buyables["level3"]).mul(15)},
			buy(){
				player.her.experience = player.her.experience.sub(this.cost())
                player.her.buyables["level3"] = player.her.buyables["level3"].add(1)
            },
            canAfford(){return player.her.experience.gte(this.cost())},
			unlocked(){return player.her.levels.gte(2)}
        },
        level4: {
            display(){return player.her.japanese?`<h1>softcap bypass point boost</h1><br>boosts point with no softcap<br><br>effect: x${format(this.effect())}<br>cost: ${format(this.cost())} EXP`:`<h1>Point Gain Anti-Cap Booster</h1><br>Boosts Point Gain after softcap<br><br>Effect: x${format(this.effect())}<br>Cost: ${format(this.cost())} experiences`},
            effect(){return player.her.buyables["level4"].div(5/1.69).add(1).mul(tmp.her.buyables["level5"].effect)},
			cost(){return Decimal.pow(12*1.69, player.her.buyables["level4"]).mul(30*1.69)},
			buy(){
				player.her.experience = player.her.experience.sub(this.cost())
                player.her.buyables["level4"] = player.her.buyables["level4"].add(1)
            },
            canAfford(){return player.her.experience.gte(this.cost())},
			unlocked(){return player.her.levels.gte(3)}
        },
        level5: {
            display(){return player.her.japanese?`<h1>SUPER LEVEL!</h1><br>better row 2 buyables with LEVEL!<br><br>effect: x${format(this.effect())}<br>cost: ${format(this.cost())} EXP`:`<h1>Super Level</h1><br>"Level Up" affects other Row 2 buyables<br><br>Effect: x${format(this.effect())}<br>Cost: ${format(this.cost())} experiences`},
            effect(){return Decimal.pow(tmp.her.buyables["level2"].effect, player.her.buyables["level5"])},
			cost(){return Decimal.pow(player.her.buyables["level5"].pow(10/3).add(1), 8/3).mul(30)},
			buy(){
				player.her.experience = player.her.experience.sub(this.cost())
                player.her.buyables["level5"] = player.her.buyables["level5"].add(1)
				if(player.her.levels.gte(5)){
					for(i=0;i<3;i++){
						player.yourGod.quests[i][0][0] = player.yourGod.quests[i][0][0].div(tmp.her.buyables["level2"].effect)
					}
				}
            },
            canAfford(){return player.her.experience.gte(this.cost())},
			unlocked(){return player.her.levels.gte(4)}
        },
        level6: {
            display(){return player.her.japanese?`<h1>cheap quest</h1><br>makes quests easier<br><br>effect: /${format(this.effect())}<br>cost: ${format(this.cost())} EXP`:`<h1>Quest Requirement Decreases</h1><br>Decreases quest requirements<br><br>Effect: /${format(this.effect())}<br>Cost: ${format(this.cost())} experiences`},
            effect(){return this.unlocked?Decimal.pow(1.15, player.her.buyables["level6"]).mul(tmp.her.buyables["level5"].effect):new Decimal(1)},
			cost(){return Decimal.pow(420, player.her.buyables["level6"].add(1))},
			buy(){
				player.her.experience = player.her.experience.sub(this.cost())
                player.her.buyables["level6"] = player.her.buyables["level6"].add(1)
				for(i=0;i<3;i++){
					player.yourGod.quests[i][0][0] = player.yourGod.quests[i][0][0].div(1.15)
				}
            },
            canAfford(){return player.her.experience.gte(this.cost())},
			unlocked(){return player.her.levels.gte(5)}
        },
    },
})

addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        upgradesUnlocked: [],
		points: new Decimal(0),
    }},
    nodeStyle(){return{
		"border": options.hqStyle[0].substr(1),
        "text-shadow": options.hqStyle[2].substr(1),
        "z-index":"1", 
        "box-shadow": "0px 0px "+(canReset("p")?20:0)+"px white,0px 0px "+(!options.mobileShortcuts?player["tree-tab"].coolMobileStuff[0].mul(100):new Decimal(100).sub(player["tree-tab"].coolMobileStuff[0].mul(100)))+"px "+tmp.p.color+",0px 0px "+(!options.additionalMobileShortcuts?player["tree-tab"].coolMobileStuff[1].mul(100):new Decimal(100).sub(player["tree-tab"].coolMobileStuff[1].mul(100)))+"px "+tmp.p.color+options.hqStyle[1] 
    }},
    passiveGeneration(){
        return player.a.unlockedTabs[1]?new Decimal(player.p.unlocked?player.a.finalStatsRPG[2].div(100):0):false
    },
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainAdd() { // Calculate the multiplier for main currency from bonuses
        let add = new Decimal(0)
        if(hasUpgrade("p",12)) add = add.add(1)
        return add
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if(hasUpgrade("p",23)) mult = mult.mul(4)
        if(player["tree-tab"].shown[2]) mult = mult.mul(tmp.s.buyables[12].effect)
        if(hasUpgrade("t",11)) mult = mult.mul(tmp.t.upgrades[11].effect)
        if(hasUpgrade("t",12)) mult = mult.mul(tmp.t.upgrades[12].effect)
        if(hasUpgrade("t",22)) mult = mult.mul(tmp.t.upgrades[22].effect)
		for(i=0;i<3;i++){
			if(player.s.hypotheticalIdEffects[i]==1) mult = mult.mul(tmp.s.hypotheticalEffects[i])
		}
		if(player.s.hypotheticalIdEffects[3]==1) mult = mult.div(tmp.s.hypotheticalEffects[3])
        return mult.mul(player.a.unlockedTabs[1]?player.a.finalStatsRPG[0]:1)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades: {
		11: { 
			title: "Point Generation", 
			description: "We've got to start from somewhere, right?<h5>(generates 1 point per second)",
			cost: new Decimal(1),
		},
		12: { 
			title: "Simplicity", 
			description: "Boosts point gain by 1 and adds prestige point gain by 1.<h5>(quite literally)",
			cost: new Decimal(3),
            unlocked(){return player.p.upgradesUnlocked.includes(12)}
		},
		13: { 
			title: "Classic Supremacy", 
			description: "Multipliesy your point gain by x1.15 per prestige upgrade bought.",
            effect(){return new Decimal(1.15).pow(player.p.upgrades.length)},
            effectDisplay(){return "x"+format(this.effect())},
			cost: new Decimal(7),
            unlocked(){return player.p.upgradesUnlocked.includes(13)}
		},
		21: { 
			title: "Spacial Awareness", 
			description: "Reveals Space layer and multiplies point gain based on prestige points",
            effect(){return player.p.points.add(1).root(4).max(1)},
            effectDisplay(){return "x"+format(this.effect())},
			cost(){return player.yourGod.lowerSpaceTimeUpgradeCost&&player.s.unlocked?new Decimal(31):player.yourGod.lowerSpaceTimeUpgradeCost?new Decimal(1000000000):new Decimal(hasUpgrade("p",23)||player["tree-tab"].shown[3]?(hasUpgrade("p",21)?31:"1e100"):31)},
            canAfford(){return (hasUpgrade("p",23)||player["tree-tab"].shown[3])&&!player.yourGod.lowerSpaceTimeUpgradeCost?false:true},
            onPurchase(){
                if(!hasUpgrade("p", 23)){
                    if(player["tree-tab"].dialoguePath==0)player["tree-tab"].specialEventsCounter = 0
                    if(!(player["tree-tab"].shown[2]||player["tree-tab"].shown[3])){
						player["tree-tab"].dialoguePath = 1
						player["tree-tab"].dialogueNumber= 0
						player["tree-tab"].unlockOrder[1] = 0
					}
                    player["tree-tab"].shown[2] = true
                }
                if(player["tree-tab"].dialoguePath == 2){
					player["tree-tab"].dialoguePath = 3
					player["tree-tab"].unlockOrder[2] = 0
					player["tree-tab"].specialEventsCounter = 0
					player["tree-tab"].dialogueNumber= 0
				}
            },
            unlocked(){return player.p.upgradesUnlocked.includes(21)}
		},
		22: { 
			title: "Ctrl + Alt + Shift", 
			description: "Reveals Achievements layer",
			cost: new Decimal(15),
            onPurchase(){
                player["tree-tab"].shown[1] = true
                player.a.unlocked = true
            },
            unlocked(){return player.p.upgradesUnlocked.includes(22)}
		},
		23: { 
			title: "Linear Timeline", 
			description: "Reveals Time layer and multiplies prestige point gain by x4",
			cost(){return player.yourGod.lowerSpaceTimeUpgradeCost&&player.t.unlocked?new Decimal(31):player.yourGod.lowerSpaceTimeUpgradeCost?new Decimal(1000000000):new Decimal(hasUpgrade("p",21)||player["tree-tab"].shown[2]?(hasUpgrade("p",23)?31:"1e100"):31)},
            canAfford(){return (hasUpgrade("p",21)||player["tree-tab"].shown[2])&&!player.yourGod.lowerSpaceTimeUpgradeCost?false:true},
            onPurchase(){
                if(!hasUpgrade("p", 21)){
                    if(player["tree-tab"].dialoguePath==0) player["tree-tab"].specialEventsCounter = 0
                    if(!(player["tree-tab"].shown[2]||player["tree-tab"].shown[3])){
						player["tree-tab"].dialoguePath = 2
						player["tree-tab"].dialogueNumber= 0
						player["tree-tab"].unlockOrder[1] = 1
					}
                    player["tree-tab"].shown[3] = true
                }
                if(player["tree-tab"].dialoguePath == 1){
					player["tree-tab"].dialoguePath = 3
					player["tree-tab"].unlockOrder[2] = 0
					player["tree-tab"].specialEventsCounter = 0
					player["tree-tab"].dialogueNumber= 0
				}
            },
            unlocked(){return player.p.upgradesUnlocked.includes(23)}
		},
	},
    layerShown(){return player["tree-tab"].shown[0]},
    doReset(resettingLayer){
        if(tmp[resettingLayer].symbol=="P"){
            player.t.timeSincePurchase[1] = new Decimal(0)
        }
        if(tmp[resettingLayer].row>this.row){
            layerDataReset("p")
        }
    }
})

addLayer("a", {
    name: "achievement", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        upgradesUnlocked: [],
		points: new Decimal(0),
        funkyStyle: [16,0,""],
        unlockedTabs: [false,false],
        statsRPG: [0,new Decimal(1),new Decimal(1),new Decimal(1),"Sir Dumb Stupid I"],
        finalStatsRPG: [new Decimal(1),new Decimal(1),new Decimal(1)],
		vibeCheck: new Decimal(1),
		vibeCheck2: new Decimal(1),
    }},
    nodeStyle(){return{
		"border": options.hqStyle[0].substr(1),
		"box-shadow": options.hqStyle[1].substr(1),
        "text-shadow": options.hqStyle[2].substr(1),
	}},
    tooltip: "Achievements",
    update(diff){
		player.a.finalStatsRPG[0] = player.a.statsRPG[1].mul(player.her.levels.sub(1).div(7).add(1))
		player.a.finalStatsRPG[1] = player.a.statsRPG[2].mul(player.her.levels.sub(1).div(7).add(1))
		player.a.finalStatsRPG[2] = player.a.statsRPG[3].mul(player.her.levels.sub(1).div(7).add(1))
        player.a.statsRPG[0] = getPointGen().max(1).log(10).add(1).add(player.a.finalStatsRPG[0].add(player.a.finalStatsRPG[1]).add(player.a.finalStatsRPG[2]).root(3)).mul(new Decimal(1.029302236643492).pow(player.a.achievements.length))
		if(getPointGen().gt(277777)){
			player.a.vibeCheck=player.a.vibeCheck.sub(diff)
		}
		else player.a.vibeCheck = new Decimal(1)
		if(tmp.t.timeGain.lt(0.1)){
			player.a.vibeCheck2=player.a.vibeCheck2.sub(diff)
		}
		else player.a.vibeCheck2 = new Decimal(1)
	},
	infoboxes: {
        lore: {
            title(){return `<p style ='transform: scale(1.333333333, 1);color: rgba(0,0,0,0);font-family: Impact, Impacto;font-size:20px;-webkit-text-stroke:1px cyan;'>${Object.keys(findPreviousDialogues()[0][player["tree-tab"].prevDialogueNumber[0]]?findPreviousDialogues()[0][player["tree-tab"].prevDialogueNumber[0]]:{"gojo":["nah","i","would","win"]})[0].toUpperCase()}`}, 
            body() { return `<p style ='transform: scale(1.333333333, 1);color: rgba(0,0,0,0);font-family: Impact, Impacto;font-size:20px;-webkit-text-stroke:1px cyan;text-align:left;margin-left:82px;'>`+(findPreviousDialogues()[0][player["tree-tab"].prevDialogueNumber[0]]?findPreviousDialogues()[0][player["tree-tab"].prevDialogueNumber[0]][Object.keys(findPreviousDialogues()[0][player["tree-tab"].prevDialogueNumber[0]])[0]][player["tree-tab"].prevDialogueNumber[1]]:"nah")},
			titleStyle(){
                return {
                    "width": "128px",
					"background": "repeating-linear-gradient(black, rgba(0,255,0,"+(Math.random()*0.2+0.1)+"), black, black 5px)",
					"background-position": "0px "+player.timePlayed*10+"px",
                    "border": "lime 4px solid",
                    "box-shadow": "0px 0px 4px lime",
                }
            },
            bodyStyle(){
                return {
                    "height":"256px",
                    "color": "lime",
					"background": "repeating-linear-gradient(black, rgba(0,255,0,"+(Math.random()*0.2+0.1)+"), black, black 5px)",
					"background-position": "0px "+player.timePlayed*10+"px",
                    "border": "lime 4px solid",
					"border-radius": "0%",
                    "box-shadow": "0px 0px 4px lime",
                    "margin-bottom": "-4px",
                }
            }
        },
    },
    color: "yellow",
    row: "side", // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Achievements": {
            content: [["display-text", function(){return `You have <h1 style='font-size:${player.a.funkyStyle[0]}px;text-shadow: 0px 0px ${player.a.funkyStyle[1]}px ${player.a.funkyStyle[2]};color: ${player.a.funkyStyle[2]}'> ${formatWhole(0)}</h1> achievements complete`}],"blank",["display-text", function(){return player.a.unlockedTabs[1]?`<h1>General`:``}],"blank","achievements","blank","blank",["display-text", function(){return player["tree-tab"].shown[2]?`<h1 style='color: black; -webkit-text-stroke:2px white;'>Space`:``}],"blank",["row",[["achievement", "s11"],["achievement", "s12"],["achievement", "s13"],["achievement", "s14"],["achievement", "s15"],["achievement", "s16"]]],"blank","blank",["display-text", function(){return player["tree-tab"].shown[3]?`<h1 style='color: white; -webkit-text-stroke:2px black;'>Time`:``}],"blank",["row",[["achievement", "t11"],["achievement", "t12"],["achievement", "t13"],["achievement", "t14"],["achievement", "t15"]]]],
            unlocked(){return player.a.unlockedTabs[0]}
        },
        "Stats": {
            content: [["display-text", function(){return `<h1 style='text-align: left;'>YOU HAVE A POWER LEVEL OF ${format(player.a.statsRPG[0])}</h1><h5>(Multiplies your point gain based on your point gain, RPG stats and total achievements)</h5><h1 style='text-align: left;'><br>YOU ARE: ${player.a.statsRPG[4]}</h1><br><br><h3 style='text-align:left;'>Strength: ${format(player.a.finalStatsRPG[0])} (Global Resource Multiplier)<br>Agility: ${format(player.a.finalStatsRPG[1])} (Global Softcap Resistence)<br>Intelligence: ${format(player.a.finalStatsRPG[2])} (Global Passive Normal Resource Gain)`}]],
            unlocked(){return player.a.unlockedTabs[1]}
        },
        "Previous Dialogues": {
            content: [["infobox","lore"],["row",[["buyable","prev"],["buyable","current"],["buyable","next"]]],["row",[["buyable","first"],["buyable","second"],["buyable","third"]]]],
            unlocked(){return player.a.unlockedTabs[0]}
        }
    },
    buyables: {
        prev: {
            display(){return `<h1 style='font-size:32px;'><==`},
            buy(){
                player["tree-tab"].prevDialogueNumber[1] = player["tree-tab"].prevDialogueNumber[1] - 1
            },
            canAfford(){return player["tree-tab"].prevDialogueNumber[1] !== 0},
            style(){return {
                "height": "50px",
                "width": "190px",
				"margin-top": "-8px",
                "background": "repeating-linear-gradient(black, rgba(0,255,0,"+(Math.random()*0.2+0.1)+"), black, black 5px)",
				"background-position": "0px "+player.timePlayed*10+"px",
				"color": "lime",
				"transform":"scale(1,1)",
				"border": "4px solid lime",
				"border-radius": "0%",
                "box-shadow": "0px 0px 4px lime",
            }},
        },
        current: {
            display(){return `<p style='font-size:20px;'>[${formatWhole(player["tree-tab"].prevDialogueNumber[1]+1)}|${formatWhole(player["tree-tab"].prevDialogueNumber[2])}]`},
            style(){return {
                "height": "50px",
                "width": "190px",
				"margin-top": "-8px",
                "background": "repeating-linear-gradient(black, rgba(0,255,0,"+(Math.random()*0.2+0.1)+"), black, black 5px)",
				"background-position": "0px "+player.timePlayed*10+"px",
				"color": "lime",
				"transform":"scale(1,1)",
				"border": "4px solid lime",
				"border-radius": "0%",
                "box-shadow": "0px 0px 4px lime",
            }},
        },
        next: {
            display(){return `<h1 style='font-size:32px;'>==>`},
            buy(){
                player["tree-tab"].prevDialogueNumber[1] = player["tree-tab"].prevDialogueNumber[1] + 1
            },
            canAfford(){return player["tree-tab"].prevDialogueNumber[1] < player["tree-tab"].prevDialogueNumber[2]-1},
            style(){return {
                "height": "50px",
                "width": "190px",
				"margin-top": "-8px",
                "background": "repeating-linear-gradient(black, rgba(0,255,0,"+(Math.random()*0.2+0.1)+"), black, black 5px)",
				"background-position": "0px "+player.timePlayed*10+"px",
				"color": "lime",
				"transform":"scale(1,1)",
				"border": "4px solid lime",
				"border-radius": "0%",
                "box-shadow": "0px 0px 4px lime",
            }},
        },
        first: {
            display(){return `<h1 style='font-size:16px;'>${Object.keys(findPreviousDialogues()[0][0])}<br>Dialogues`},
            buy(){
				player["tree-tab"].prevDialogueNumber[0] = 0
				player["tree-tab"].prevDialogueNumber[1] = 0
				player["tree-tab"].prevDialogueNumber[2] = findPreviousDialogues()[0][player["tree-tab"].prevDialogueNumber[0]].length
            },
            canAfford(){return true},
            style(){return {
				"background-color":"lime",
                "height": "50px",
                "width": (570/player["tree-tab"].splitDialogueChoice)+"px",
                "background": "repeating-linear-gradient(black, rgba(0,255,0,"+(Math.random()*0.2+0.1)+"), black, black 5px)",
				"background-position": "0px "+player.timePlayed*10+"px",
				"color": "lime",
				"transform":"scale(1,1)",
				"border": "4px solid lime",
				"border-radius": player["tree-tab"].splitDialogueChoice>1?"0% 0% 0% 25%":"0% 0% 25% 25%",
                "box-shadow": "0px 0px 4px lime",
            }},
			unlocked(){return findPreviousDialogues()[0][0]}
        },
        second: {
            display(){return `<h1 style='font-size:16px;'>${Object.keys(findPreviousDialogues()[0][1])}<br>Dialogues`},
            buy(){
				player["tree-tab"].prevDialogueNumber[0] = 1
				player["tree-tab"].prevDialogueNumber[1] = 0
				player["tree-tab"].prevDialogueNumber[2] = findPreviousDialogues()[0][player["tree-tab"].prevDialogueNumber[0]].length
            },
            canAfford(){return true},
            style(){return {
				"background-color":"gray",
                "height": "100px",
                "width": "100px",
                "background": "repeating-linear-gradient(black, rgba(0,255,0,"+(Math.random()*0.2+0.1)+"), black, black 5px)",
				"background-position": "0px "+player.timePlayed*10+"px",
                "height": "50px", 
                "width": (570/player["tree-tab"].splitDialogueChoice)+"px",
				"background-color": "black",
				"color": "lime",
				"transform":"scale(1,1)",
				"border": "4px solid lime",
				"border-radius": player["tree-tab"].splitDialogueChoice>2?"0%":"0% 0% 25% 0%",
                "box-shadow": "0px 0px 4px lime",
            }},
			unlocked(){return findPreviousDialogues()[0][1]}
        },
        third: {
            display(){return `<h1 style='font-size:16px;'>${Object.keys(findPreviousDialogues()[0][2])}<br>Dialogues`},
            buy(){
				player["tree-tab"].prevDialogueNumber[0] = 2
				player["tree-tab"].prevDialogueNumber[1] = 0
				player["tree-tab"].prevDialogueNumber[2] = findPreviousDialogues()[0][player["tree-tab"].prevDialogueNumber[0]].length
            },
            canAfford(){return true},
            style(){return {
				"background-color":"gray",
                "height": "100px",
                "width": "100px",
                "background": "repeating-linear-gradient(black, rgba(0,255,0,"+(Math.random()*0.2+0.1)+"), black, black 5px)",
				"background-position": "0px "+player.timePlayed*10+"px",
                "height": "50px", 
                "width": (570/player["tree-tab"].splitDialogueChoice)+"px",
				"background-color": "black",
				"color": "lime",
				"transform":"scale(1,1)",
				"border": "4px solid lime",
				"border-radius": "0% 0% 25% 0%",
                "box-shadow": "0px 0px 4px lime",
            }},
			unlocked(){return findPreviousDialogues()[0][2]}
        },
	},
	achievements: {
        11: {
            name: "Blah",
            done(){return player["tree-tab"].shown[1]},
            tooltip: "You just unlocked it, duh."
        },
        12: {
            name: "The Original Antimatter Tree",
            done(){return player.s.unlocked || player.t.unlocked},
            tooltip: "Unlock Space or Time layer.",
            unlocked(){return player.a.unlockedTabs[0]}
        },
        13: {
            name: "A MERE HUMAN",
            done(){return player.a.statsRPG[0].gte(5) && player.her.timeline[1]!==2},
            tooltip: "Reach 5 PL",
            unlocked(){return player.a.unlockedTabs[0] && player.her.timeline[1]!==2}
        },
        14: {
            name: "Forgive me for what I'm about to add, Acadaema",
            done(){return player.yourGod.questsDone.gte(1) && player.her.timeline[1]==0},
            tooltip: "Complete your first quest",
            unlocked(){return player.a.unlockedTabs[0] && player.her.timeline[1]==0}
        },
        15: {
            name: "You WILL utilize that Agility.",
            done(){return getPointGen().gte(277777) && player.a.vibeCheck.lte(0)},
            tooltip: "Reach your first softcap.<br><br>wait what",
			onComplete(){
				player.her.herLog[0]=1
				player.her.herLog[1]=player.her.herLog[1]+1
			},
            unlocked(){return player.a.unlockedTabs[0]}
        },
        s11: {
            name: "Your first disap<br>pointment.",
            done(){return player.s.buyables[11].gte(1)},
            tooltip: "Purchase Length of Point once.",
            unlocked(){return player["tree-tab"].shown[2]}
        },
        s12: {
            name: "Oleg's Signature Number",
            done(){return tmp.s.totalSize.gte(52)},
			tooltip(){return `Reach 52px${hasUpgrade("yourGod","space1")?"⁴":"³"}<br>Reward: Your total size divides dimension buyables cost`},
            unlocked(){return player["tree-tab"].shown[2]}
        },
        s13: {
            name: "Inflation Is Real.",
            done(){return tmp.s.buyables[11].effect2.gte(60)||tmp.s.buyables[12].effect2.gte(60)||tmp.s.buyables[13].effect2.gte(60)||tmp.s.buyables[14].effect2.gte(60)},
            tooltip: "Reach 60px in any dimensions.",
            unlocked(){return player["tree-tab"].shown[2]}
        },
        s14: {
            name: "EVIL OLEG BE LIKE",
            done(){return tmp.s.buyables[14].effect.gte(2.5)},
            tooltip: "Reach x2.5 effect in Time of Spisstude buyable",
            unlocked(){return player["tree-tab"].shown[2]}
        },
        s15: {
            name: "MAXED OUT!",
            done(){return tmp.s.buyables[11].effect2.gte(60)&&tmp.s.buyables[12].effect2.gte(60)&&tmp.s.buyables[13].effect2.gte(60)&&tmp.s.buyables[14].effect2.gte(60)},
            tooltip: "Reach 60px in ALL dimensions.<br>Reward: All Dimensions are 4% stronger",
            unlocked(){return player["tree-tab"].shown[2]}
        },
        s16: {
            name: "a new tab?<br><br><br>is for me?",
            done(){return hasUpgrade("s",14)},
            tooltip: "Unlock a second Space tab",
            unlocked(){return player["tree-tab"].shown[2]}
        },
        t11: {
            name: "But... I need point gain boost.",
            done(){return hasUpgrade("t",11)},
            tooltip: "Purchase 1st Time Upgrade.",
            unlocked(){return player["tree-tab"].shown[3]}
        },
        t12: {
            name: "This is getting ridiculous",
            done(){return tmp.t.timeGain.lte(0.1) && player.t.unlocked && player.t.points.gte(1) && player.a.vibeCheck2.lte(0)},
            tooltip: "Reach 0.1 Time Points/sec<br>Reward: Times are 10% stronger",
            unlocked(){return player["tree-tab"].shown[3]}
        },
        t13: {
            name: "TWO CONSTANT TIMELINES/?!?!?!?",
            done(){return player.t.points.gte(2)},
            tooltip: "Get 2nd Time",
            unlocked(){return player["tree-tab"].shown[3]}
        },
        t14: {
            name: "Don't you hate when they serve time with walls?",
            done(){return player.t.points.gte(3)},
            tooltip: "Get 3rd Time",
            unlocked(){return player["tree-tab"].shown[3]}
        },
        t15: {
            name: "fiiive more miiinuuttesss...",
            done(){return player.t.buyables[11].gte(5)},
            tooltip: "Get 5 Minutes",
            unlocked(){return player["tree-tab"].shown[3]}
        },
    },
    layerShown(){return player["tree-tab"].shown[1]}
})

addLayer("s", {
    name: "space", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 1, // Row the layer is in on the tree (0 is the first row)
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		hypotheticalPoints: [new Decimal(1),new Decimal(1),new Decimal(0)],
		hypotheticalIdEffects: [0,1,0,1],
		canMaxBuyDimensions: false,
    }},
    nodeStyle(){return{
		"border": options.hqStyle[0].substr(1),
        "text-shadow": options.hqStyle[2].substr(1),
        "z-index":"1",
		"background-color": player.s.unlocked?"black":"",
		"color": player.s.unlocked?"white":"",
		"border-color": player.s.unlocked?"rgba(255,255,255,0.125)":"",
        "box-shadow": "0px 0px "+(canReset("s")?20:0)+"px white,0px 0px "+(player.s.unlocked?!options.mobileShortcuts?player["tree-tab"].coolMobileStuff[0].mul(100):new Decimal(100).sub(player["tree-tab"].coolMobileStuff[0].mul(100)):0)+"px "+tmp.s.color+",0px 0px "+(player.s.unlocked?!options.additionalMobileShortcuts?player["tree-tab"].coolMobileStuff[1].mul(100):new Decimal(100).sub(player["tree-tab"].coolMobileStuff[1].mul(100)):0)+"px "+tmp.s.color+options.hqStyle[1], 
    }},
    passiveGeneration(){
        return player.a.unlockedTabs[1]?new Decimal(player.s.unlocked?player.a.finalStatsRPG[2].div(100):0):false
    },
	hypotheticalEffects(){
		return hasUpgrade("s",14)?[new Decimal(player.s.hypotheticalPoints[0]).root(26),new Decimal(player.s.hypotheticalPoints[0]).root(26),new Decimal(player.s.hypotheticalPoints[1]).root(4),new Decimal(player.s.hypotheticalPoints[1]).root(11),Decimal.pow(1.26, player.s.hypotheticalPoints[2]).pow(1.26)]:[new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1)]
	},
	update(diff){
		if (hasUpgrade("s",14)){
			player.s.hypotheticalPoints[0] = player.s.hypotheticalPoints[0].add(player.s.buyables["reverse11"].add(player.s.buyables["reverse13"]).mul(player.a.unlockedTabs[1]?player.a.finalStatsRPG[0]:1).mul(diff)).root(Decimal.root(Decimal.div(0.05, tmp.s.hypotheticalEffects[4]).add(1), Decimal.pow(diff, -1)))
			player.s.hypotheticalPoints[1] = player.s.hypotheticalPoints[1].add(player.s.buyables["reverse12"].add(player.s.buyables["reverse14"]).mul(player.a.unlockedTabs[1]?player.a.finalStatsRPG[0]:1).mul(diff)).root(Decimal.root(Decimal.div(0.05, tmp.s.hypotheticalEffects[4]).add(1), Decimal.pow(diff, -1)))
		}
	},
    color: "white",
    requires(){return new Decimal(!player.s.unlocked?"6.9e69":11)}, // Can be a function that takes requirement increases into account
    resource: "space", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){return 1/3}, // Prestige currency exponent
    gainAdd() { // Calculate the multiplier for main currency from bonuses
        let add = new Decimal(0)
        return add
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        mult = mult.mul(tmp.s.buyables[13].effect)
		for(i=0;i<3;i++){
			if(player.s.hypotheticalIdEffects[i]==2) mult = mult.mul(tmp.s.hypotheticalEffects[i])
		}
		if(player.s.hypotheticalIdEffects[3]==2) mult = mult.div(tmp.s.hypotheticalEffects[3])
        return mult.mul(player.a.unlockedTabs[1]?player.a.finalStatsRPG[0]:1)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1).add(tmp.yourGod.buyables[23].effect)
    },
    tabFormat: {
		"Space": {
			content: ["main-display", "prestige-button","resource-display",["display-text",function(){return `Your total size is ${formatWhole(tmp.s.totalSize)}px${hasUpgrade("yourGod","space1")?"⁴":"³"}`+(hasAchievement("a","s12")?` and it divides your dimension buyables cost by /${(format(tmp.s.sizeEffect))}`:``)}],"blank",["buyable","maxBuyToggle"],"blank",["row", [["buyable",11],["buyable",12],["buyable", 13],["buyable", 14]]],"blank","upgrades","blank",["buyable", "terrasect"],"blank"],
			unlocked(){return hasUpgrade("s",14)},
			buttonStyle(){return{
				"color": "black",
				"border-color": "black",
				"box-shadow": "0px 0px 10px black inset,0px 0px 40px white inset,0px 0px 10px white",
				"text-shadow": "0px 0px 10px white,0px 0px 20px black,0px 0px 30px black,0px 0px 40px black"
			}},
		},
		"Hypothetical Dimensions": {
			content: ["main-display", ["buyable","hypotheticalButton"],"resource-display",["display-text",function(){return `${player.s.hypotheticalPoints[2].gt(0)?`You have <span style="color: rgb(127.5, 31.5, 26); text-shadow: 0px 0px 10px rgb(127.5, 31.5, 26);">${format(player.s.hypotheticalPoints[2])}</span> Nullities, slowing down hypothetical points's decaying rate by <span style="color: rgb(127.5, 31.5, 26); text-shadow: 0px 0px 10px rgb(127.5, 31.5, 26);">/${format(tmp.s.hypotheticalEffects[4])}</span> and expanding ${hasUpgrade("yourGod","space1")?"Terrasect":"Cube"}'s total size by <span style="color: rgb(127.5, 31.5, 26); text-shadow: 0px 0px 10px rgb(127.5, 31.5, 26);">x${format(tmp.s.hypotheticalEffects[4])}</span><br><br>`:``}You have <span style="color: cyan; text-shadow: 0px 0px 10px cyan;">${format(player.s.hypotheticalPoints[0].sub(1))}</span> positive and <span style="color: pink; text-shadow: 0px 0px 10px pink;">${format(player.s.hypotheticalPoints[1].sub(1))}</span> negative hypothetical points.<br>Positive hypothetical points are giving slight boosts while negative hypothetical points are giving a strong boost in one aspect in exchange for a nerf in other aspect.<br>Positive Hypothetical Effects: <span style="color: cyan; text-shadow: 0px 0px 10px cyan;">x${format(tmp.s.hypotheticalEffects[0])} ${["Point Gain", "Prestige Point Gain", "Space Gain", "Time Point Gain"][player.s.hypotheticalIdEffects[0]]}, x${format(tmp.s.hypotheticalEffects[1])} ${["Point Gain", "Prestige Point Gain", "Space Gain", "Time Point Gain"][player.s.hypotheticalIdEffects[1]]}</span><br>Negative Hypothetical Effects: <span style="color: pink; text-shadow: 0px 0px 10px pink;">x${format(tmp.s.hypotheticalEffects[2])} ${["Point Gain", "Prestige Point Gain", "Space Gain", "Time Point Gain"][player.s.hypotheticalIdEffects[2]]}, /${format(tmp.s.hypotheticalEffects[3])} ${["Point Gain", "Prestige Point Gain", "Space Gain", "Time Point Gain"][player.s.hypotheticalIdEffects[3]]}</span>`}], "blank", ["row", [["buyable","positiveSelect1"],["buyable","positiveSelect2"],["buyable", "negativeSelect1"],["buyable", "negativeSelect2"]]], "blank", ["row", [["buyable","reverse11"],["buyable","reverse12"],["buyable", "reverse13"],["buyable", "reverse14"]]]],
			unlocked(){return hasUpgrade("s",14)},
			buttonStyle(){return{
				"color": "black",
				"border-color": "black",
				"box-shadow": "0px 0px 10px black inset,0px 0px 40px white inset,0px 0px 10px white",
				"text-shadow": "0px 0px 10px white,0px 0px 20px black,0px 0px 30px black,0px 0px 40px black"
			}},
		},
	},
    totalSize(){
        return tmp.s.buyables[11].effect2.mul(tmp.s.buyables[12].effect2).mul(tmp.s.buyables[13].effect2).mul(tmp.s.buyables[14].effect2).mul(tmp.s.hypotheticalEffects[4]).pow(hasUpgrade("s",13)?1.26:1)
    },
    sizeEffect(){
        return tmp.s.totalSize.root(hasUpgrade("yourGod","space1")?4:3)
    },
    hotkeys: [
        {key: "s", description: "S: Reset for spaces", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
		11: { 
			title: "Zeroth Dimension", 
			description: "Length of Point additionally boosts your point gain at weaker, but exponential rate",
            effect(){return new Decimal(1/24+1).pow(player.s.buyables[11])},
            effectDisplay(){return "x"+format(this.effect())},
			cost: new Decimal(12),
			canAfford(){return player.s.points.gte(this.cost) && !hasUpgrade("s", 11)},
			style(){return{
				"background-color": this.canAfford()?"black":"",
				"color": this.canAfford()?"white":"",
				"border-color": this.canAfford()?"rgba(255,255,255,0.125)":"rgba(0,0,0,0.125)",
			}},
		},
		12: { 
			title: "Correct Order", 
			description: "Height of Space is now included in Width of Prestige's effect",
            effect(){return player.s.buyables[13]},
            effectDisplay(){return "+"+format(this.effect())},
			cost: new Decimal(288),
			canAfford(){return player.s.points.gte(this.cost) && !hasUpgrade("s", 12)},
			style(){return{
				"background-color": this.canAfford()?"black":"",
				"color": this.canAfford()?"white":"",
				"border-color": this.canAfford()?"rgba(255,255,255,0.125)":"rgba(0,0,0,0.125)",
			}},
		},
		13: { 
			title: "String Theotu", 
			description: "<h5>okay so there should've been a joke about russian movies having absurd dimensionality but we kept finding higher and higher ones so yeah we had to scrap the idea</h5>Boosts total size by ^1.26",
			cost: new Decimal(10368),
			canAfford(){return player.s.points.gte(this.cost) && !hasUpgrade("s", 13)},
			style(){return{
				"background-color": this.canAfford()?"black":"",
				"color": this.canAfford()?"white":"",
				"border-color": this.canAfford()?"rgba(255,255,255,0.125)":"rgba(0,0,0,0.125)",
			}},
		},
		14: { 
			title: "Hypothetical Tab", 
			description: "Unlocks a new Space tab",
			cost: new Decimal(497664),
			canAfford(){return player.s.points.gte(this.cost) && !hasUpgrade("s", 14)},
			style(){return{
				"background-color": this.canAfford()?"black":"",
				"color": this.canAfford()?"white":"",
				"border-color": this.canAfford()?"rgba(255,255,255,0.125)":"rgba(0,0,0,0.125)",
			}},
		},
    },
    buyables: {
        hypotheticalButton: {
			display(){return `<h2>Nullify Hypothetical Points.</h2><br><h3>Requirements:</h3><br>[<h3 style="color:cyan;text-shadow:0px 0px 10px cyan;">${format(player.s.hypotheticalPoints[0])} / ${format(this.requirement())}</h3>]<br>[<h3 style="color:pink;text-shadow:0px 0px 10px pink;">${format(player.s.hypotheticalPoints[1])} / ${format(this.requirement())}</h3>]`},
			requirement(){
				let req = new Decimal(11)
				for(i=new Decimal(0);i.lt(player.s.hypotheticalPoints[2])&&i.lt(15);i=i.add(1)){
					req = req.mul(i.add(12))
				}
				return req
			},
			buy(){
				player.s.hypotheticalPoints[0] = player.s.hypotheticalPoints[0].sub(this.requirement())
				player.s.hypotheticalPoints[1] = player.s.hypotheticalPoints[1].sub(this.requirement())
				player.s.hypotheticalPoints[2] = player.s.hypotheticalPoints[2].add(1)
			},
			canAfford(){return player.s.hypotheticalPoints[0].gte(this.requirement()) && player.s.hypotheticalPoints[1].gte(this.requirement())},
            style(){return{
				"height": "120px",
				"width": "180px",
				"border-radius": "25%",
				"border": "4px solid",
				"background-color": this.canAfford()?"black":"",
				"color": this.canAfford()?"white":"",
				"border-color": this.canAfford()?"rgba(255,255,255,0.125)":"rgba(0,0,0,0.125)",
            }}
		},
		11: {
            title: "Length of Point",
            display(){return `This is where it all starts.<br>Boosts your point gain by your length.<br><br>Current length: ${format(this.effect2())}px<br>Current effect: x${format(this.effect())}<br>Cost: ${format(this.cost())} spaces`},
            cost(){
                let cost = new Decimal(1).mul(player.s.buyables[11].add(player.s.buyables["reverse11"].mul(26)).add(1).pow(1.15).pow(1.1))
                if(tmp.s.buyables[11].effect2.add(player.s.buyables["reverse11"].mul(26)).gte(60)) cost = cost.root(2).pow(new Decimal(2).add(new Decimal(0.4).mul(tmp.s.buyables[11].effect2.add(player.s.buyables["reverse11"].mul(26)).sub(60))))
                return cost.div(hasAchievement("a","s12")?tmp.s.sizeEffect:1)
            },
            effect(){return new Decimal(1).add(player.s.buyables[11].add(tmp.yourGod.buyables[21].effect).div(12)).mul(tmp.s.buyables[14].effect).mul(hasAchievement("a","s15")?1.04:1).mul(tmp.s.buyables["reverse12"].effect).mul(tmp.s.buyables["reverse13"].effect)},
            effect2(){return player.s.buyables[11].add(tmp.yourGod.buyables[21].effect).add(12)},
            canAfford(){return player.s.points.gte(this.cost())},
            buy(){
                player.s.points = player.s.points.sub(this.cost())
                player.s.buyables[11] = player.s.buyables[11].add(1)
				let check = false
				let effect2 = new Decimal(1)
				let cost = new Decimal(1)
				if(player.s.canMaxBuyDimensions){
					for(i=0;!check;i++){
						effect2 = player.s.buyables[11].add(tmp.yourGod.buyables[21].effect).add(12)
						cost = new Decimal(1).mul(player.s.buyables[11].add(player.s.buyables["reverse11"].mul(26)).add(1).pow(1.15).pow(1.1))
						if(effect2.add(player.s.buyables["reverse11"].mul(26)).gte(60)) cost = cost.root(2).pow(new Decimal(2).add(new Decimal(0.4).mul(effect2.add(player.s.buyables["reverse11"].mul(26)).sub(60))))
						cost = cost.div(hasAchievement("a","s12")?tmp.s.sizeEffect:1)
						if(player.s.points.lt(cost)) check = true
						if(!check){
							player.s.points = player.s.points.sub(cost)
							player.s.buyables[11] = player.s.buyables[11].add(1)
						}
					}
				}
            },
            style(){return{
				"background-color": this.canAfford()?"black":"",
				"color": this.canAfford()?"white":"",
                "border-radius": "25% 0% 0% 25%",
				"border-color": this.canAfford()?"rgba(255,255,255,0.125)":"rgba(0,0,0,0.125)",
                "height": "150px",
                "width": "150px"
            }}
        },
        12: {
            title: "Width of Prestige",
            display(){return `Can't have TMT without width... I guess?.<br>Boosts your prestge point gain by your width.<br><br>Current width: ${format(this.effect2())} px<br>Current effect: x${format(this.effect())}<br>Cost: ${format(this.cost())} spaces`},
            cost(){
                let cost = new Decimal(3).mul(player.s.buyables[12].add(player.s.buyables["reverse12"].mul(26)).add(1).pow(1.15).pow(1.2))
                if(tmp.s.buyables[12].effect2.add(player.s.buyables["reverse12"].mul(26)).gte(60)) cost = cost.root(2).pow(new Decimal(2).add(new Decimal(0.4).mul(tmp.s.buyables[12].effect2.add(player.s.buyables["reverse12"].mul(26)).sub(60))))
                return cost.div(hasAchievement("a","s12")?tmp.s.sizeEffect:1)
            },
            effect(){return new Decimal(1).add(player.s.buyables[12].add(hasUpgrade("s",12)?player.s.buyables[13]:0).add(tmp.yourGod.buyables[21].effect).div(2)).mul(tmp.s.buyables[14].effect).mul(hasAchievement("a","s15")?1.04:1).mul(tmp.s.buyables["reverse11"].effect).mul(tmp.s.buyables["reverse13"].effect)},
            effect2(){return player.s.buyables[12].add(tmp.yourGod.buyables[21].effect).add(2)},
            canAfford(){return player.s.points.gte(this.cost())},
            buy(){
                player.s.points = player.s.points.sub(this.cost())
                player.s.buyables[12] = player.s.buyables[12].add(1)
				let check = false
				let effect2 = new Decimal(1)
				let cost = new Decimal(1)
				if(effect2.add(player.s.buyables["reverse12"].mul(26)).gte(60)) cost = cost.root(2).pow(new Decimal(2).add(new Decimal(0.4).mul(effect2.add(player.s.buyables["reverse12"].mul(26)).sub(60)))).div(hasAchievement("a","s12")?tmp.s.sizeEffect:1)	
				if(player.s.canMaxBuyDimensions){
					for(i=0;!check;i++){
						effect2 = player.s.buyables[12].add(tmp.yourGod.buyables[21].effect).add(2)
						cost = new Decimal(3).mul(player.s.buyables[12].add(player.s.buyables["reverse12"].mul(26)).add(1).pow(1.15).pow(1.2))
						if(effect2.add(player.s.buyables["reverse12"].mul(26)).gte(60)) cost = cost.root(2).pow(new Decimal(2).add(new Decimal(0.4).mul(effect2.add(player.s.buyables["reverse12"].mul(26)).sub(60))))
						cost = cost.div(hasAchievement("a","s12")?tmp.s.sizeEffect:1)
						if(player.s.points.lt(cost)) check = true
						if(!check){
							player.s.points = player.s.points.sub(cost)
							player.s.buyables[12] = player.s.buyables[12].add(1)
						}
					}
				}
            },
            style(){return{
				"background-color": this.canAfford()?"black":"",
				"color": this.canAfford()?"white":"",
                "border-radius": "0%",
				"border-color": this.canAfford()?"rgba(255,255,255,0.125)":"rgba(0,0,0,0.125)",
                "height": "150px",
                "width": "150px"
            }}
        },
        13: {
            title: "Height of Space",
            display(){return `Only by having 3 dimensions can we truly exist, at least hypothetically speaking.<br>Boosts your space gain by your height.<br><br>Current height: ${format(this.effect2())} px<br>Current effect: x${format(this.effect())}<br>Cost: ${format(this.cost())} spaces`},
            cost(){
                let cost = new Decimal(9).mul(player.s.buyables[13].add(player.s.buyables["reverse13"].mul(26)).add(1).pow(1.15).pow(1.3))
                if(tmp.s.buyables[13].effect2.add(player.s.buyables["reverse13"].mul(26)).gte(60)) cost = cost.root(2).pow(new Decimal(2).add(new Decimal(0.4).mul(tmp.s.buyables[13].effect2.add(player.s.buyables["reverse13"].mul(26)).sub(60))))
                return cost.div(hasAchievement("a","s12")?tmp.s.sizeEffect:1)
            },
            effect(){return player.s.buyables[13].add(tmp.yourGod.buyables[21].effect).add(1).mul(tmp.s.buyables[14].effect).mul(hasAchievement("a","s15")?1.04:1).mul(tmp.s.buyables["reverse11"].effect).mul(tmp.s.buyables["reverse12"].effect)},
            effect2(){return player.s.buyables[13].add(tmp.yourGod.buyables[21].effect).add(1)},
            canAfford(){return player.s.points.gte(this.cost())},
            buy(){
                player.s.points = player.s.points.sub(this.cost())
                player.s.buyables[13] = player.s.buyables[13].add(1)
				let check = false
				let effect2 = new Decimal(1)
				let cost = new Decimal(1)
				if(effect2.add(player.s.buyables["reverse13"].mul(26)).gte(60)) cost = cost.root(2).pow(new Decimal(2).add(new Decimal(0.4).mul(effect2.add(player.s.buyables["reverse13"].mul(26)).sub(60)))).div(hasAchievement("a","s12")?tmp.s.sizeEffect:1)
				if(player.s.canMaxBuyDimensions){
					for(i=0;!check;i++){
						effect2 = player.s.buyables[13].add(tmp.yourGod.buyables[21].effect).add(1)
						cost = new Decimal(9).mul(player.s.buyables[13].add(player.s.buyables["reverse13"].mul(26)).add(1).pow(1.15).pow(1.3))
						if(effect2.add(player.s.buyables["reverse13"].mul(26)).gte(60)) cost = cost.root(2).pow(new Decimal(2).add(new Decimal(0.4).mul(effect2.add(player.s.buyables["reverse13"].mul(26)).sub(60))))
						cost = cost.div(hasAchievement("a","s12")?tmp.s.sizeEffect:1)
						if(player.s.points.lt(cost)) check = true
						if(!check){
							player.s.points = player.s.points.sub(cost)
							player.s.buyables[13] = player.s.buyables[13].add(1)
						}
					}
				}
            },
            style(){return{
				"background-color": this.canAfford()?"black":"",
				"color": this.canAfford()?"white":"",
                "border-radius": (hasUpgrade("yourGod","space1")?"0%":"0% 25% 25% 0%"),
				"border-color": this.canAfford()?"rgba(255,255,255,0.125)":"rgba(0,0,0,0.125)",
                "height": "150px",
                "width": "150px"
            }}
        },
        14: {
            title: "Time of Spissitude",
            display(){return `I guess we're buffing Time now.<br>Boosts other Space buyables and time points gain by your spissitude.<br><br>Current spissitude: ${format(this.effect2())} px<br>Current effect: x${format(this.effect())}<br>Cost: ${format(this.cost())} spaces`},
            cost(){
                let cost = new Decimal(729).mul(player.s.buyables[14].add(player.s.buyables["reverse14"].mul(26)).add(1).pow(1.15).pow(1.4))
                if(tmp.s.buyables[14].effect2.add(player.s.buyables["reverse14"].mul(26)).gte(60)) cost = cost.root(2).pow(new Decimal(2).add(new Decimal(0.4).mul(tmp.s.buyables[14].effect2.add(player.s.buyables["reverse14"].mul(26)).sub(60))))
                return cost.div(hasAchievement("a","s12")?tmp.s.sizeEffect:1)
            },
            effect(){return (this.unlocked?player.s.buyables[14].add(tmp.yourGod.buyables[21].effect).add(1).root(4).mul(hasAchievement("a","s15")?1.04:1):1)},
            effect2(){return (this.unlocked?player.s.buyables[14].add(tmp.yourGod.buyables[21].effect).add(1):1)},
            canAfford(){return player.s.points.gte(this.cost())},
            buy(){
                player.s.points = player.s.points.sub(this.cost())
                player.s.buyables[14] = player.s.buyables[14].add(1)
				let check = false
				let effect2 = new Decimal(1)
				let cost = new Decimal(1)
				if(effect2.add(player.s.buyables["reverse14"].mul(26)).gte(60)) cost = cost.root(2).pow(new Decimal(2).add(new Decimal(0.4).mul(effect2.add(player.s.buyables["reverse14"].mul(26)).sub(60)))).div(hasAchievement("a","s12")?tmp.s.sizeEffect:1)
				if(player.s.canMaxBuyDimensions){
					for(i=0;!check;i++){
						effect2 = player.s.buyables[14].add(tmp.yourGod.buyables[21].effect).add(1)
						cost = new Decimal(729).mul(player.s.buyables[14].add(player.s.buyables["reverse14"].mul(26)).add(1).pow(1.15).pow(1.4))
						if(effect2.add(player.s.buyables["reverse14"].mul(26)).gte(60)) cost = cost.root(2).pow(new Decimal(2).add(new Decimal(0.4).mul(effect2.add(player.s.buyables["reverse14"].mul(26)).sub(60))))
						cost = cost.div(hasAchievement("a","s12")?tmp.s.sizeEffect:1)
						if(player.s.points.lt(cost)) check = true
						if(!check){
							player.s.points = player.s.points.sub(cost)
							player.s.buyables[14] = player.s.buyables[14].add(1)
						}
					}
				}
            },
            style(){return{
				"background-color": this.canAfford()?"black":"",
				"color": this.canAfford()?"white":"",
                "border-radius": "0% 25% 25% 0%",
				"border-color": this.canAfford()?"rgba(255,255,255,0.125)":"rgba(0,0,0,0.125)",
                "height": "150px",
                "width": "150px"
            }},
            unlocked(){return hasUpgrade("yourGod", "space1")}
        },
		maxBuyToggle: {
            title: "MAX BUY:",
            display(){return `<h1>${player.s.canMaxBuyDimensions?"[ON]":"[OFF]"}`},
            canAfford(){return true},
            buy(){
                player.s.canMaxBuyDimensions = !player.s.canMaxBuyDimensions
            },
            style(){return{
				"background-color": "black",
				"color": "white",
                "border-radius": "25%",
				"border-color": "rgba(255,255,255,0.125)",
                "height": "100px",
                "width": "100px"
            }}
        },
        positiveSelect1: {
            title(){return `<span style="font-size:12px;">`+["Points", "Prestige Points", "Space", "Time Points"][player.s.hypotheticalIdEffects[0]]},
            canAfford(){return true},
            buy(){
				let check = false
				let keepItSafe = player.s.hypotheticalIdEffects[0]
				for(i=0;i<4;i++){
					if(player.yourGod.bestPointsThusFar[i].gt(0) && !check && keepItSafe<i){
						keepItSafe = i
						check = true
					}
				}
				if(player.s.hypotheticalIdEffects[0]==keepItSafe)
					player.s.hypotheticalIdEffects[0] = 0;
				else
					player.s.hypotheticalIdEffects[0] = keepItSafe;
				if(player.s.hypotheticalIdEffects[0]==player.s.hypotheticalIdEffects[1]) player.s.hypotheticalIdEffects[0] = player.yourGod.bestPointsThusFar[player.s.hypotheticalIdEffects[0]+1].gt(0)?player.s.hypotheticalIdEffects[0]+1:0
            },
            style(){return{
				"background-color": "black",
				"color": "cyan",
                "border-radius": "25% 0% 0% 25%",
				"border-color": "rgba(255,255,255,0.125)",
                "height": "75px",
                "width": "75px"
            }},
        },
        positiveSelect2: {
            title(){return `<span style="font-size:12px;">`+["Points", "Prestige Points", "Space", "Time Points"][player.s.hypotheticalIdEffects[1]]},
            canAfford(){return true},
            buy(){
				let check = false
				let keepItSafe = player.s.hypotheticalIdEffects[1]
				for(i=0;i<4;i++){
					if(player.yourGod.bestPointsThusFar[i].gt(0) && !check && keepItSafe<i){
						keepItSafe = i
						check = true
					}
				}
				if(player.s.hypotheticalIdEffects[1]==keepItSafe)
					player.s.hypotheticalIdEffects[1] = 0;
				else
					player.s.hypotheticalIdEffects[1] = keepItSafe;
				if(player.s.hypotheticalIdEffects[1]==player.s.hypotheticalIdEffects[0]) player.s.hypotheticalIdEffects[1] = player.yourGod.bestPointsThusFar[player.s.hypotheticalIdEffects[1]+1].gt(0)?player.s.hypotheticalIdEffects[1]+1:0
            },
            style(){return{
				"background-color": "black",
				"color": "cyan",
                "border-radius": "0%",
				"border-color": "rgba(255,255,255,0.125)",
                "height": "75px",
                "width": "75px"
            }},
        },
        negativeSelect1: {
            title(){return `<span style="font-size:12px;">`+["Points", "Prestige Points", "Space", "Time Points"][player.s.hypotheticalIdEffects[2]]},
            canAfford(){return true},
            buy(){
				let check = false
				let keepItSafe = player.s.hypotheticalIdEffects[2]
				for(i=0;i<4;i++){
					if(player.yourGod.bestPointsThusFar[i].gt(0) && !check && keepItSafe<i){
						keepItSafe = i
						check = true
					}
				}
				if(player.s.hypotheticalIdEffects[2]==keepItSafe)
					player.s.hypotheticalIdEffects[2] = 0;
				else
					player.s.hypotheticalIdEffects[2] = keepItSafe;
				if(player.s.hypotheticalIdEffects[2]==player.s.hypotheticalIdEffects[3]) player.s.hypotheticalIdEffects[2] = player.yourGod.bestPointsThusFar[player.s.hypotheticalIdEffects[2]+1].gt(2)?player.s.hypotheticalIdEffects[2]+3:2
            },
            style(){return{
				"background-color": "black",
				"color": "pink",
                "border-radius": "0%",
				"border-color": "rgba(255,255,255,0.125)",
                "height": "75px",
                "width": "75px"
            }},
        },
        negativeSelect2: {
            title(){return `<span style="font-size:12px;">`+["Points", "Prestige Points", "Space", "Time Points"][player.s.hypotheticalIdEffects[3]]},
            canAfford(){return true},
            buy(){
				let check = false
				let keepItSafe = player.s.hypotheticalIdEffects[3]
				for(i=0;i<4;i++){
					if(player.yourGod.bestPointsThusFar[i].gt(0) && !check && keepItSafe<i){
						keepItSafe = i
						check = true
					}
				}
				if(player.s.hypotheticalIdEffects[3]==keepItSafe)
					player.s.hypotheticalIdEffects[3] = 0;
				else
					player.s.hypotheticalIdEffects[3] = keepItSafe;
				if(player.s.hypotheticalIdEffects[3]==player.s.hypotheticalIdEffects[2]) player.s.hypotheticalIdEffects[3] = player.yourGod.bestPointsThusFar[player.s.hypotheticalIdEffects[3]+1].gt(2)?player.s.hypotheticalIdEffects[3]+3:2
            },
            style(){return{
				"background-color": "black",
				"color": "pink",
                "border-radius": "0% 25% 25% 0%",
				"border-color": "rgba(255,255,255,0.125)",
                "height": "75px",
                "width": "75px"
            }},
        },
        reverse11: {
            title: "Hypothetical Length",
            display(){return `Boosts "Width of Prestige" and "Height of Space" effects in exchange for 26 "Length of Point".<br><br>Current HL: ${format(player.s.buyables["reverse11"])}<br>Current effect: x${format(this.effect())}`},
            effect(){return new Decimal(0.26).mul(player.s.buyables["reverse11"]).add(1)},
            canAfford(){return player.s.buyables[11].gte(26)},
            buy(){
                player.s.buyables[11] = player.s.buyables[11].sub(26)
                player.s.buyables["reverse11"] = player.s.buyables["reverse11"].add(1)
            },
			sellOne(){
                player.s.buyables["reverse11"] = player.s.buyables["reverse11"].sub(1).max(0)
			},
            style(){return{
				"background-color": this.canAfford()?"black":"",
				"color": this.canAfford()?"cyan":"",
                "border-radius": "25% 0% 0%",
				"border-color": this.canAfford()?"rgba(255,255,255,0.125)":"rgba(0,0,0,0.125)",
                "height": "150px",
                "width": "150px"
            }},
			sellOneText: "Remove One",
			sellOneStyle(){return{
				"height": "50px",
				"width": "150px",
				"background": tmp.s.color,
				"background-color": this.canAfford()?"black":"",
				"border-radius": "0% 0% 0% 37.5px",
				"color": this.canAfford()?"cyan":"",
				"border": "2px solid",
				"border-color": this.canAfford()?"rgba(255,255,255,0.125)":"rgba(0,0,0,0.125)",
				"font-size": "16px",
			}}
        },
        reverse12: {
            title: "Hypothetical Width",
            display(){return `Boosts "Length of Point" and "Height of Space" effects in exchange for 26 "Width of Prestige".<br><br>Current HW: ${format(player.s.buyables["reverse12"])}<br>Current effect: x${format(this.effect())}`},
            effect(){return new Decimal(0.26).mul(player.s.buyables["reverse12"]).add(1)},
            canAfford(){return player.s.buyables[12].gte(26)},
            buy(){
                player.s.buyables[12] = player.s.buyables[12].sub(26)
                player.s.buyables["reverse12"] = player.s.buyables["reverse12"].add(1)
            },
			sellOne(){
                player.s.buyables["reverse12"] = player.s.buyables["reverse12"].sub(1).max(0)
			},
            style(){return{
				"background-color": this.canAfford()?"black":"",
				"color": this.canAfford()?"pink":"",
                "border-radius": "0%",
				"border-color": this.canAfford()?"rgba(255,255,255,0.125)":"rgba(0,0,0,0.125)",
                "height": "150px",
                "width": "150px"
            }},
			sellOneText: "Remove One",
			sellOneStyle(){return{
				"height": "50px",
				"width": "150px",
				"background": tmp.s.color,
				"background-color": this.canAfford()?"black":"",
				"border-radius": "0%",
				"color": this.canAfford()?"pink":"",
				"border": "2px solid",
				"border-color": this.canAfford()?"rgba(255,255,255,0.125)":"rgba(0,0,0,0.125)",
				"font-size": "16px",
			}}
        },
        reverse13: {
            title: "Hypothetical Height",
            display(){return `Boosts "Length of Point" and "Width of Prestige" effects in exchange for 26 "Height of Space".<br><br>Current HH: ${format(player.s.buyables["reverse13"])}<br>Current effect: x${format(this.effect())}`},
            effect(){return new Decimal(0.26).mul(player.s.buyables["reverse13"]).add(1)},
            canAfford(){return player.s.buyables[13].gte(26)},
            buy(){
                player.s.buyables[13] = player.s.buyables[13].sub(26)
                player.s.buyables["reverse13"] = player.s.buyables["reverse13"].add(1)
            },
			sellOne(){
                player.s.buyables["reverse13"] = player.s.buyables["reverse13"].sub(1).max(0)
			},
            style(){return{
				"background-color": this.canAfford()?"black":"",
				"color": this.canAfford()?"cyan":"",
                "border-radius": (hasUpgrade("yourGod","space1")?"0%":"0% 25% 0% 0%"),
				"border-color": this.canAfford()?"rgba(255,255,255,0.125)":"rgba(0,0,0,0.125)",
                "height": "150px",
                "width": "150px"
            }},
			sellOneText: "Remove One",
			sellOneStyle(){return{
				"height": "50px",
				"width": "150px",
				"background": tmp.s.color,
				"background-color": this.canAfford()?"black":"",
				"border-radius": hasUpgrade("yourGod", "space1")?"0%":"0% 0% 37.5px 0%",
				"color": this.canAfford()?"cyan":"",
				"border": "2px solid",
				"border-color": this.canAfford()?"rgba(255,255,255,0.125)":"rgba(0,0,0,0.125)",
				"font-size": "16px",
			}}
        },
        reverse14: {
            title: "Hypothetical Spisstude",
            display(){return `Boosts Time Point gain in exchange for 26 "Spisstude of Time".<br><br>Current HS: ${format(player.s.buyables["reverse14"])}<br>Current effect: x${format(this.effect())}`},
            effect(){return (this.unlocked?new Decimal(0.26).mul(player.s.buyables["reverse14"]).add(1):new Decimal(1))},
            canAfford(){return player.s.buyables[14].gte(26)},
            buy(){
                player.s.buyables[14] = player.s.buyables[14].sub(26)
                player.s.buyables["reverse14"] = player.s.buyables["reverse14"].add(1)
            },
			sellOne(){
                player.s.buyables["reverse14"] = player.s.buyables["reverse14"].sub(1).max(0)
			},
            style(){return{
				"background-color": this.canAfford()?"black":"",
				"color": this.canAfford()?"pink":"",
                "border-radius": "0% 25% 0% 0%",
				"border-color": this.canAfford()?"rgba(255,255,255,0.125)":"rgba(0,0,0,0.125)",
                "height": "150px",
                "width": "150px"
            }},
            unlocked(){return hasUpgrade("yourGod", "space1")},
			sellOneText: "Remove One",
			sellOneStyle(){return{
				"height": "50px",
				"width": "150px",
				"background": tmp.s.color,
				"background-color": this.canAfford()?"black":"",
				"border-radius": "0% 0% 37.5px 0%",
				"color": this.canAfford()?"pink":"",
				"border": "2px solid",
				"border-color": this.canAfford()?"rgba(255,255,255,0.125)":"rgba(0,0,0,0.125)",
				"font-size": "16px",
			}}
        },
        terrasect: {
            canAfford(){return false},
            style(){return{
                "border-radius": "0%",
                "border": "0px solid",
                "min-width": "0px",
                "min-height": "0px",
                "width": (tmp.s.buyables[11].effect2.min(options.pissLimit[0]))+"px",
                "height": (tmp.s.buyables[13].effect2.min(options.pissLimit[1]))+"px",
                "margin-top": tmp.s.buyables[12].effect2.min(new Decimal(options.pissLimit[2]).add(1)).add(tmp.s.buyables[14].effect2.min(new Decimal(options.pissLimit[3])))+"px",
                "box-shadow": (player.s.secondDimension)
            }}
        }, 
    },
    secondDimension(){
        let a = ``
        if(options.pissLimit[2]!==0) for(let i=new Decimal(0);i.lt(player.s.buyables[12]) && i.lt(options.pissLimit[2]);i=i.add(1)){
            a = a+`${tmp.s.buyables[12].effect2.min(new Decimal(options.pissLimit[2]).add(1)).sub(1).div(player.s.buyables[12].min(new Decimal(options.pissLimit[2]).add(1))).mul(player.s.buyables[12].min(new Decimal(options.pissLimit[2]).add(1)).sub(i)).add(Math.sin(player.yourGod.timer*(i.add(1)))*(player.s.buyables[14].min(options.pissLimit[3])))}px ${tmp.s.buyables[12].effect2.min(new Decimal(options.pissLimit[2]).add(1)).sub(1).div(player.s.buyables[12].min(new Decimal(options.pissLimit[2]).add(1)).min(new Decimal(options.pissLimit[2]).add(1))).mul(player.s.buyables[12].min(new Decimal(options.pissLimit[2]).add(1)).sub(i)).mul(-1).add(Math.sin(player.yourGod.timer*(i.add(1)))*(player.s.buyables[14].min(options.pissLimit[3])))}px 0px 0px #9d6d6d,`
        }
		else a=`,`
        return a.slice(0,-1)
    },
	componentStyles: {
		"prestige-button"(){return{
			"background-color": canReset("s")?"black":"",
			"color": canReset("s")?"white":"",
			"border-color": canReset("s")?"rgba(255,255,255,0.125)":"rgba(0,0,0,0.125)",
		}}
	},
    branches: ["p"],
    layerShown(){return player["tree-tab"].shown[2]}
})

addLayer("t", {
    name: "time", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 1, // Row the layer is in on the tree (0 is the first row)
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        timePoints: new Decimal(0),
        timeSincePurchase: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
    }},
    nodeStyle(){return{
		"border": options.hqStyle[0].substr(1),
        "text-shadow": options.hqStyle[2].substr(1),
        "z-index":"1",
        "box-shadow": "0px 0px "+(canReset("t")?20:0)+"px white,0px 0px "+(player.t.unlocked?!options.mobileShortcuts?player["tree-tab"].coolMobileStuff[0].mul(100):new Decimal(100).sub(player["tree-tab"].coolMobileStuff[0].mul(100)):0)+"px "+tmp.t.color+",0px 0px "+(player.t.unlocked?!options.additionalMobileShortcuts?player["tree-tab"].coolMobileStuff[1].mul(100):new Decimal(100).sub(player["tree-tab"].coolMobileStuff[1].mul(100)):0)+"px "+tmp.t.color+options.hqStyle[1], 
    }},
    timeGain(){
		let base = player.t.points.add(tmp.yourGod.buyables[31].effect).mul(tmp.t.buyables[12].effect).mul(tmp.s.buyables[14].effect).mul(player.a.unlockedTabs[1]?player.a.finalStatsRPG[0]:1).mul(hasAchievement("a","t12")?1.1:1).mul(tmp.s.buyables["reverse14"].effect).add(player.her.timeline[1]==1?1:0).root(player.her.timeline[1]==1?2:1).sub(player.her.timeline[1]==1?1:0)
		for(i=0;i<3;i++){
			if(player.s.hypotheticalIdEffects[i]==3) base = base.mul(tmp.s.hypotheticalEffects[i])
		}
		if(player.s.hypotheticalIdEffects[3]==3) base = base.div(tmp.s.hypotheticalEffects[3])
		return player.t.unlocked?base.sub(player.t.timePoints.pow(1/9+1).div(20).add(1).root(2).sub(1)).mul(hasUpgrade("t",14)?tmp.t.upgrades[14].effect:1).div(player.t.timePoints.div(20).add(1)):new Decimal(0)
	},
    update(diff){
        player.t.timePoints = player.t.timePoints.add(tmp.t.timeGain.mul(diff))
        for(let i=1;i<6;i++){
            for(let v=1;v<3;v++){
                if(player.t.upgrades.includes(i+v*10)) player.t.timeSincePurchase[i+v*5-6] = player.t.upgrades.includes(12) && !hasUpgrade("t",23) ? player.t.timeSincePurchase[i+v*5-6].add(diff).min(60) : player.t.timeSincePurchase[i+v*5-6].add(diff)
            }
        }
    },
    hotkeys: [
        {key: "t", description: "T: Reset for time", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
			title: "Time Constant", 
			description: "Increases your prestige point gain",
            effect(){return player.t.timeSincePurchase[0].pow(tmp.yourGod.buyables[33].effect.add(1)).div(100).add(1)},
            effectDisplay(){return "x"+format(this.effect())},
			cost: new Decimal(10),
            currencyDisplayName: "time points",
            currencyInternalName: "timePoints",
            currencyLayer: "t"
        },
        12: {
			title: "Patience Takes Time", 
			description: "Increases your prestige point gain at faster rate (up to x3, resets on prestige reset)",
            effect(){return hasUpgrade("t",23)&&(player.t.timeSincePurchase[1].pow(tmp.yourGod.buyables[33].effect.add(1)).div(30).add(1).gte(3))?player.t.timeSincePurchase[1].pow(tmp.yourGod.buyables[33].effect.add(1)).div(30).sub(2).root(Decimal.add(1, Decimal.div(2, player.a.unlockedTabs[1]?player.a.finalStatsRPG[1]:1))).add(2):player.t.timeSincePurchase[1].pow(tmp.yourGod.buyables[33].effect.add(1)).div(30).add(1).min(3)},
            effectDisplay(){return "x"+format(this.effect())+(this.effect().gte(3)?hasUpgrade("t",23)?"<br>(softcapped)":"<br>(hardcapped)":"")},
			cost: new Decimal(20),
            currencyDisplayName: "time points",
            currencyInternalName: "timePoints",
            currencyLayer: "t",
            unlocked(){return hasUpgrade("t",11)},
        },
        13: {
			title: "Inverse Point of Time", 
			description: "Increases your point gain based on how low your time point gain is",
            effect(){return player.t.timeSincePurchase[2].pow(tmp.yourGod.buyables[33].effect.add(1)).add(1).log(10).add(1).add(tmp.t.timeGain.sub(player.t.points).mul(-1).div(player.t.points)).pow(tmp.t.timeGain.sub(player.t.points).mul(-1).div(player.t.points))},
            effectDisplay(){return "x"+format(this.effect())},
			cost: new Decimal(30),
            currencyDisplayName: "time points",
            currencyInternalName: "timePoints",
            currencyLayer: "t",
            unlocked(){return hasUpgrade("t",12)},
        },
        14: {
			title: "Time Rubberbanding", 
			description: "Accelerates your time point gain based on how low your time point gain is (Not affected by time)",
            effect(){return new Decimal(1).add(tmp.t.timeGain.sub(player.t.points).mul(-1).min(player.t.points)).pow(tmp.t.timeGain.sub(player.t.points).mul(-1).min(player.t.points).div(player.t.points))},
            effectDisplay(){return "x"+format(this.effect())+(tmp.t.timeGain.sub(player.t.points).mul(-1).gte(player.t.points)?"<br>(hardcapped)":"")},
			cost: new Decimal(40),
            currencyDisplayName: "time points",
            currencyInternalName: "timePoints",
            currencyLayer: "t",
            unlocked(){return hasUpgrade("t",13)},
        },
        15: {
			title: "Another Unit", 
			description: "Unlocks a buyable",
			cost: new Decimal(50),
            currencyDisplayName: "time points",
            currencyInternalName: "timePoints",
            currencyLayer: "t",
            unlocked(){return hasUpgrade("t",14)},
        },
        21: {
			title: "A Direct Cause", 
			description: "Your point gain is boosted based on prestige points",
            effect(){return player.p.points.add(1).log(60).add(1).add(player.t.timeSincePurchase[5].pow(tmp.yourGod.buyables[33].effect.add(1)).add(1).root(10))},
            effectDisplay(){return "x"+format(this.effect())},
			cost: new Decimal(70),
            currencyDisplayName: "time points",
            currencyInternalName: "timePoints",
            currencyLayer: "t",
            unlocked(){return hasUpgrade("t",15)},
        },
        22: {
			title: "A Collateral Cause", 
			description: "Your prestige point gain is boosted based on points at reduced rate",
            effect(){return player.points.add(1).log(3600).add(1).add(player.t.timeSincePurchase[6].pow(tmp.yourGod.buyables[33].effect.add(1)).add(1).root(100))},
            effectDisplay(){return "x"+format(this.effect())},
			cost: new Decimal(110),
            currencyDisplayName: "time points",
            currencyInternalName: "timePoints",
            currencyLayer: "t",
            unlocked(){return hasUpgrade("t",21)},
        },
        23: {
			title: "The Forbidden One", 
			description: `Replaces "Patience Takes Time"'s hardcap with softcap and it affects point gain as well (Not affected by time)`,
			cost: new Decimal(200),
            currencyDisplayName: "time points",
            currencyInternalName: "timePoints",
            currencyLayer: "t",
            unlocked(){return hasUpgrade("t",22)},
        },
        24: {
			title: "Gold Richener", 
			description: "Decreases Time's requirement.",
            effect(){return player.t.timeSincePurchase[8].pow(tmp.yourGod.buyables[33].effect.add(1)).div(100).add(1)},
            effectDisplay(){return "/"+format(this.effect())},
			cost: new Decimal(360),
            currencyDisplayName: "time points",
            currencyInternalName: "timePoints",
            currencyLayer: "t",
            unlocked(){return hasUpgrade("t",23)},
        },
        25: {
			title: "Conversion", 
			description: "Unlocks an another buyable",
			cost: new Decimal(610),
            currencyDisplayName: "time points",
            currencyInternalName: "timePoints",
            currencyLayer: "t",
            unlocked(){return hasUpgrade("t",24)},
        }
    },
    bars: {
        minuteBar: {
            direction: UP,
            width: 25,
            height: 196,
            barColor(){
                let color = [0,0,0,0]
                let colorFill = [255,255,255,1]
                let progress = player.t.timePoints.div(60).div(player.t.buyables[11].add(1)).min(player.yourGod.buyables[32].add(1))
                for(i=new Decimal(0);i.lt(player.yourGod.buyables[32]);i=i.add(1)){
                    if(progress.gt(1)) {
                        progress = progress.sub(1)
                        color[0] = colorFill[0]
                        color[1] = colorFill[1]
                        color[2] = colorFill[2]
						color[3] = 1
                        colorFill[0] = colorFill[0]/1.1
                        colorFill[1] = colorFill[1]/1.3
                        colorFill[2] = colorFill[2]/1.6
                    }
                }
                return [color, colorFill]
            },
            progress(){
                let progress = player.t.timePoints.div(60).div(player.t.buyables[11].add(1)).min(player.yourGod.buyables[32].add(1))
                for(i=new Decimal(0);i.lt(player.yourGod.buyables[32]);i=i.add(1)){
                    if(progress.gt(1)) progress = progress.sub(1)
                }
                return progress
            },
            style(){return{
                "border-radius": "0% 25% 25% 0%",
                "background-color": "rgba("+tmp.t.bars.minuteBar.barColor[0][0]+","+tmp.t.bars.minuteBar.barColor[0][1]+","+tmp.t.bars.minuteBar.barColor[0][2]+","+tmp.t.bars.minuteBar.barColor[0][3]+")"
            }},
            fillStyle(){return{
                "background-color": "rgba("+tmp.t.bars.minuteBar.barColor[1][0]+","+tmp.t.bars.minuteBar.barColor[1][1]+","+tmp.t.bars.minuteBar.barColor[1][2]+","+tmp.t.bars.minuteBar.barColor[1][3]+")"
            }},
            borderStyle(){return{
                "border-radius": "0% 25% 25% 0%",
                "border-color": "rgba(0,0,0,0.125)"
            }},
            unlocked(){return hasUpgrade("yourGod","time1") && hasUpgrade("t",15)}
        },
        hourBar: {
            direction: UP,
            width: 25,
            height: 196,
            barColor(){
                let color = [0,0,0,0]
                let colorFill = [255,255,255,1]
                let progress = player.t.timePoints.div(player.yourGod.buyables[12].mul(3600).max(3600)).div(player.t.buyables[12].add(1)).min(player.yourGod.buyables[32].add(1))
                for(i=new Decimal(0);i.lt(player.yourGod.buyables[32]);i=i.add(1)){
                    if(progress.gt(1)) {
                        progress = progress.sub(1)
                        color[0] = colorFill[0]
                        color[1] = colorFill[1]
                        color[2] = colorFill[2]
						color[3] = 1
                        colorFill[0] = colorFill[0]/1.1
                        colorFill[1] = colorFill[1]/1.3
                        colorFill[2] = colorFill[2]/1.6
                    }
                }
                return [color, colorFill]
            },
            progress(){
                let progress = player.t.timePoints.div(player.yourGod.buyables[12].mul(3600).max(3600)).div(player.t.buyables[12].add(1)).min(player.yourGod.buyables[32].add(1))
                for(i=new Decimal(0);i.lt(player.yourGod.buyables[32]);i=i.add(1)){
                    if(progress.gt(1)) progress = progress.sub(1)
                }
                return progress
            },
            style(){return{
                "border-radius": "0% 25% 25% 0%",
                "background-color": "rgba("+tmp.t.bars.hourBar.barColor[0][0]+","+tmp.t.bars.hourBar.barColor[0][1]+","+tmp.t.bars.hourBar.barColor[0][2]+","+tmp.t.bars.hourBar.barColor[0][3]+")"
            }},
            fillStyle(){return{
                "background-color": "rgba("+tmp.t.bars.hourBar.barColor[1][0]+","+tmp.t.bars.hourBar.barColor[1][1]+","+tmp.t.bars.hourBar.barColor[1][2]+","+tmp.t.bars.hourBar.barColor[1][3]+")"
            }},
            borderStyle(){return{
                "border-radius": "0% 25% 25% 0%",
                "border-color": "rgba(0,0,0,0.125)"
            }},
            unlocked(){return hasUpgrade("yourGod","time1") && hasUpgrade("t",25)}
        }
    },
    buyables: {
        11: {
            title: "Minutes",
            display(){return `Seconds are too irrelevant for time display anyways.<br>Massively boosts your point gain.<br><br>Minutes passed: ${format(player.t.buyables[11])}<br>Current effect: x${format(this.effect())}<br>Cost: ${format(this.cost())} time points`},
            cost(){
                let cost = new Decimal(60).mul(player.t.buyables[11].add(1))
                return cost
            },
            effect(){return player.t.buyables[11].gte(1)?new Decimal(4).pow(player.t.buyables[11].add(hasUpgrade("yourGod","time1")?player.t.timePoints.div(this.cost()).min(Decimal.mul(1, tmp.yourGod.buyables[32].effect)):0)):new Decimal(1)}, 
            canAfford(){return player.t.timePoints.gte(this.cost())},
            buy(){
                player.t.timePoints = player.t.timePoints.sub(this.cost())
                player.t.buyables[11] = player.t.buyables[11].add(1)
            },
            style(){return{
                "width": (hasUpgrade("yourGod","time1")?"175":"200")+"px",
                "border-radius": (hasUpgrade("yourGod","time1")?"25% 0% 0% 25%":"25%"),
            }},
            unlocked(){return hasUpgrade("t",15)},
        },
        12: {
            title: "Hours",
            display(){return `i guess we're doing conversation simulator now<br>Massively boosts your time point gain... Sort of.<br>Converts minutes into hours on purchase.<br><br>Hours passed: ${format(player.t.buyables[12])}<br>Current effect: x${format(this.effect())}<br>Net Gain:<br>${player.t.buyables[11].sub(player.t.buyables[12].mul(60)).lt(0)?`-`:`+`}${format(player.t.buyables[11].div(60).sub(player.t.buyables[12]).mul(player.t.buyables[11].sub(player.t.buyables[12].mul(60)).lt(0)?-1:1))} hours<br>${player.t.buyables[11].sub(player.t.buyables[12].mul(60)).lt(0)?`-`:`+`}x${format(this.effectPurchase().sub(this.effect()).mul(player.t.buyables[11].sub(player.t.buyables[12].mul(60)).lt(0)?-1:1))} effect`},
            effect(){return player.t.buyables[12].gt(0)?new Decimal(4).pow(player.t.buyables[12].add(hasUpgrade("yourGod","time1")?player.t.timePoints.div(this.cost()).min(Decimal.mul(1, tmp.yourGod.buyables[32].effect)):0)):new Decimal(1)}, 
            effectPurchase(){return player.t.buyables[12].add(player.t.buyables[11].div(60).sub(player.t.buyables[12])).gt(0)?new Decimal(4).pow(player.t.buyables[12].add(player.t.buyables[11].div(60).sub(player.t.buyables[12])).add(hasUpgrade("yourGod","time1") && player.t.buyables[12].gte(1)?player.t.timePoints.div(this.cost()).min(Decimal.mul(1, tmp.yourGod.buyables[32].effect)):0)):new Decimal(1)}, 
            canAfford(){return player.t.buyables[11].div(60).gt(player.t.buyables[12])},
            buy(){
                player.t.buyables[12] = player.t.buyables[11].div(60)
                player.t.buyables[11] = new Decimal(0)
            },
            style(){return{
                "width": (hasUpgrade("yourGod","time1")?"175":"200")+"px",
                "border-radius": (hasUpgrade("yourGod","time1")?"25% 0% 0% 25%":"25%"),
            }},
            unlocked(){return hasUpgrade("t",25)},
        },
    },
    color: "white",
    requires(){return new Decimal(!player.t.unlocked?"6.9e69":player.t.points.gte(7)?37.90425164522593:player.t.points.gte(6)?44.52:player.t.points.gte(5)?5.617737:player.t.points.gte(4)?6.456822:player.t.points.gte(3)?23.00245:player.t.points.gte(1)?60:600)}, // Can be a function that takes requirement increases into account
    resource: "time", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 60,
    exponent: 0.828799, // Prestige currency exponent
    gainAdd() { // Calculate the multiplier for main currency from bonuses
        let add = new Decimal(0)
        return add
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult.div(tmp.t.upgrades[24].effect)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    tabFormat: ["main-display", "prestige-button","resource-display",["display-text",function(){return `You have ${format(player.t.timePoints)} time points and you gain ${format(tmp.t.timeGain)} of it per second, slowly decreasing the more time points you get.`}],"blank",["display-text",function(){return `Time upgrades's effects are all dependant on time since purchase unless specified otherwise in upgrade descriptions`}],"blank","upgrades","blank",["row", [["buyable", 11], ["bar", "minuteBar"],"blank",["buyable", 12], ["bar", "hourBar"]]]],
    branches: ["p"],
    layerShown(){return player["tree-tab"].shown[3]}
})

addLayer("v", {
    name: "vovka", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "V", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    nodeStyle(){return{
		"background": player.v.unlocked?"linear-gradient(to top, rgb(46, 109, 211) 50%, rgb(31,37,51) 50%)":"",
		"border": options.hqStyle[0].substr(1),
        "text-shadow": options.hqStyle[2].substr(1),
        "z-index":"1", 
        "box-shadow": "0px 0px "+(canReset("v")?20:0)+"px white,0px 0px "+(!options.mobileShortcuts?player["tree-tab"].coolMobileStuff[0].mul(100):new Decimal(100).sub(player["tree-tab"].coolMobileStuff[0].mul(100)))+"px "+tmp.v.color+",0px 0px "+(!options.additionalMobileShortcuts?player["tree-tab"].coolMobileStuff[1].mul(100):new Decimal(100).sub(player["tree-tab"].coolMobileStuff[1].mul(100)))+"px "+tmp.v.color+options.hqStyle[1] 
    }},
    passiveGeneration(){
        return player.a.unlockedTabs[1]?new Decimal(player.v.unlocked?player.a.finalStatsRPG[2].div(100):0):false
    },
	tooltipLocked(){return "Endgame."},
    color: "#2E6DD3",
    requires: new Decimal(1000000000000000000000000000000000), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainAdd() { // Calculate the multiplier for main currency from bonuses
        let add = new Decimal(0)
        return add
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult.mul(player.a.unlockedTabs[1]?player.a.finalStatsRPG[0]:1)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	branches: ["t", "s"],
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "v", description: "V: Reset for vovka privileges", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player["tree-tab"].shown[4]},
})

addLayer("???", {
    startData(){return  {
        unlocked: true,
        whatAreYouDoing: 0
    }},
    name: "help",
    position: 999999999999,
    symbol: "P",
    color: "yellow",
    row: "side", // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "xeikar": {
            content: [["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`],["display-image", `mrbeast.png`]],
            unlocked(){return false}
        },
        "guide": {
			content: [["display-text", function(){return `alright so you shouldn't technically be here and it's more of me mumbling about said layers sooo uhhh yeah. if you somehow guessed it, congrats.<br><br>but enough talk, HAVE AT YOU!<br><br>`+(player["tree-tab"].shown[0]?`<h2>Prestige Layer</h2><br><h3>"The Bane of Every TMT Design's Existence"</h3><br>I mean, it doesn't get any more basic than that.<h5>(at least most of the time)</h5>There's not much to do with this layer besides buying and resetting until you accumulate enough resources to unlock one of Row 2 layers, and then the other one a bit later.<br><br>`:``)+(player["tree-tab"].shown[1]?`<h2>Achievements Layer</h2><br><h3>"An Excuse To Balance the Game Without Actually Balancing It"</h3><br>This is where you usually find silly references and inside jokes. Achievements in this layer not only grant boosts occassionally, but they also increase your Power Level. Speaking of which, you can gain the main 3 stats through completing quests (as of now).<br><br>also title sometime changes for la creatura to insult you like poopoo peepee mano or whatever<br><br>`:``)+(player.s.unlocked?`<h2>Space Layer</h2><br><h3>"The Worst Decision before Multiplier Tree Came Into Existence"</h3><br>To be honest with you. I like this space.<br><h5>except for the part where it sucked ass in MVGT-</h5>One of the two layers originally planned for Antimatter Tree before it was turned into Shenanigans Tree. You can purchase Space buyables to boost various resource gains and upgrades to increase them further beyond, directly or not. It is best to not reset as much at the beginning until you get good enough prestige points to passively gain Spaces.<br><br>`:``)+(player.t.unlocked?`<h2>Time Layer</h2><br><h3>"Forced Timewall"</h3><br>A more passive cousin to Space Layer and is one of two layers originally planned for Antimatter Tree before it was turned into Shenanigans Tree. The layer takes more idle approach as you have to purchase Time and wait for time points to accumulate to purchase upgrades (and eventually buyables) to get the goods. The further you progress, the harder it becomes to gain more time points until you eventually get stuck. It's probably for the best that you do not purchase minutes much later unless there are buyables that requires it or the said upgrade is far out of your reach.<br><br>`:``)+(player.yourGod.isAlreadyHere?`<h2>Anti-Balance Layer</h2><br><h3>"the annoying thing"</h3><br>the infamous nightmare fuel that kept screwing up everything.<br><br>from making shenanigans tree nearly unenjoyable (both for me and others)<br>to<br>effectively making MVGT mid.<br><br>i hate this thing and i want it to pack stuff OUT of this tree.<br><br>and yet, that thing IS the main gimmick of this tree, and it's your problem now.<br><br>`:``)+(player.her.sheWasSeen?`<h2>??? Layer</h2><br><h3>"Protagonist? Antagonist? Deuteragonist? Who knows."</h3><br>a sub-layer of "Anti-Balance" layer that apparently also possesses some kind of consciousness, albeit much calm and less annoying one<h5>(looking at you, stupid gamebreaking fuck)<br>((i meant the one you're dealing with rn, not you))</h5><br><br>most likely rioting against the said la creatura in quiet, sabotaging its plans and helping you out so long as you assist and comply with her<br><br>probably russian`:``)}]],
			unlocked(){return false}
        },
        "options": {
		content: [["raw-html", function(){return `<table>
            <tr>
                <td><button class="opt" onclick="player.her.japanese=!player.her.japanese">Translate Japanese: ${!player.her.japanese?"ON":"OFF"}</button></td>
                <td><button class="opt" onclick="limitThiShitPlease(['Choose your Strength','Choose your Agility.','Choose your Intelligence'],'player.a.statsRPG[i+1] = new Decimal(numbah[i])',true,true)">Change Your Stats</button></td>
                <td><button class="opt" onclick="limitThiShitPlease(['Set your speed'],'player.her.fuckOFFIMALLOWEDTOCHEATNOW = numbah[i]',true,true)";>Change Your Speed: x${format(player.her.fuckOFFIMALLOWEDTOCHEATNOW)}</button></td>
            </tr>
        </table>`}]],
			unlocked(){return false}
        },
		"avgn": {
			content: [["raw-html", function(){return `
				<div class="player">
				  <video id="avgn" autoplay>
					<source src="video/avgn.mp4" type="video/mp4" />
				  </video>
				</div>
				`
			}]],
			unlocked(){return false}
		}
    },
    layerShown(){return false}
})