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
        quests: [[[undefined,undefined,undefined], [undefined, undefined, undefined]], [[undefined,undefined,undefined], [undefined, undefined, undefined]], [[undefined,undefined,undefined], [undefined, undefined, undefined]]],
        questsDone: new Decimal(0),
        youreFuckedBuddy: false
    }},
    tooltip: "It's-a-me,",
    color: "rgb(52,52,152)",
    row: "side", // Row the layer is in on the tree (0 is the first row)
    position: 1,
    update(myCore){
        if(player.yourGod.youreFuckedBuddy){
            player = getStartPlayer()
            save();
            window.location.reload();
        }
        for(i=0;i<3;i++){
            player.yourGod.bestPointsThusFar[i] = player.yourGod.bestPointsThusFar[i].max([player.points,player.p.points,player.s.points,player.t.timePoints][i])
            player.yourGod.bestPassivePointGainThusFar[i] = player.yourGod.bestPassivePointGainThusFar[i].max([getPointGen(),getResetGain("p").mul(tmp.p.passiveGeneration),getResetGain("s").mul(tmp.s.passiveGeneration),tmp.t.timeGain][i])
        }
        if(player.yourGod.hasBeenSeen){
            for(i=0;i<3;i++){
                let randomizeIt = Math.ceil(Math.random()*(1+(player["tree-tab"].shown[0]?1:0)+(player["tree-tab"].shown[2]?1:0)+(player["tree-tab"].shown[3]?1:0))) 
                if(player.yourGod.quests[i][1][2]==undefined) player.yourGod.quests[i][1][2] = [1,2,3][i] //Strength, Agility, Intelligence
                if(player.yourGod.quests[i][0][0]==undefined) player.yourGod.quests[i][0][0] = player.yourGod.bestPointsThusFar[randomizeIt].add(player.yourGod.bestPassivePointGainThusFar[randomizeIt].mul(i==4?1:420).add(i==4?70:0)).mul([1,8,27][i]) //Requirement
                if(player.yourGod.quests[i][0][0].lte(0)) {
                    randomizeIt = Math.ceil(Math.random()*(1+(player["tree-tab"].shown[0]?1:0)+(player["tree-tab"].shown[2]?1:0)+(player["tree-tab"].shown[3]?1:0))) 
                    player.yourGod.quests[i][0][0] = player.yourGod.bestPointsThusFar[randomizeIt].add(player.yourGod.bestPassivePointGainThusFar[randomizeIt].mul(i==4?1:420).add(i==4?70:0)).mul([1,8,27][i])
                }
                if(player.yourGod.quests[i][0][1]==undefined) player.yourGod.quests[i][0][1] = [`Points`,`Prestige Points`,`Spaces`,`Time Points`][randomizeIt] //Resource Name
                if(player.yourGod.quests[i][0][2]==undefined) player.yourGod.quests[i][0][2] = [`player.points`,`player.p.points`,`player.s.points`,`player.t.timePoints`][randomizeIt] //Resource Source
                if(player.yourGod.quests[i][1][0]==undefined) player.yourGod.quests[i][1][0] = new Decimal(86400) //Timer
                if(player.yourGod.quests[i][1][1]==undefined) player.yourGod.quests[i][1][1] = new Decimal(1) //Level
                player.yourGod.quests[i][1][0] = player.yourGod.quests[i][1][0].sub(myCore)
            }
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
        if(player.yourGod.isAlreadyHere && player.tab == 'yourGod' || player.tab == 'her') {
            player.yourGod.tabCheck = player.yourGod.tabCheck=="idk"?options.forceOneTab:player.yourGod.tabCheck
            options.forceOneTab = true
        }
        if(player.yourGod.isAlreadyHere && player.tab !=='yourGod' && !player.tab =='her' && player.yourGod.tabCheck!=="idk") {
            options.forceOneTab = player.yourGod.tabCheck
            player.yourGod.tabCheck = "idk"
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
            title(){return `<h1 style='color: white;font-size: 20px;'>4th Dimension`},
            description(){return `<h1 style='color: white;font-size: 12px;'>Unlocks "Time of Spissitude"<br>Cost: 1 Perk Point`},
            canAfford(){return player.yourGod.perkPoints.gte(this.cost()) && !hasUpgrade("yourGod", this.id)},
            cost(){return new Decimal(1)},
			currencyInternalName: "perkPoints",
			currencyLayer: "yourGod",
            style(){return {
                "height": "100px",
                "width": "200px",
                "color": (hasUpgrade("yourGod", this.id)?"rgb(31.875,31.875,31.875)":"black"),
                "border-radius": "0%",
                "border": "4px rgba(255,255,255,0.125) solid",
                "background-color": (hasUpgrade("yourGod", this.id)?"rgb(31.875,31.875,31.875)":"black")
            }},
            unlocked(){return true}
        },
        time1:{ 
            title(){return `<h1 style='color: black;font-size: 20px;'>Time Bar`},
            description(){return `<h1 style='color: black;font-size: 12px;'>Unlocks bars for Time buyables<br>Cost: 1 Perk Point`},
            canAfford(){return player.yourGod.perkPoints.gte(this.cost()) && !hasUpgrade("yourGod", this.id)},
            cost(){return new Decimal(1)},
			currencyInternalName: "perkPoints",
			currencyLayer: "yourGod",
            style(){return {
                "height": "100px",
                "width": "200px",
                "color": (hasUpgrade("yourGod", this.id)?"rgb(223.125,223.125,223.125)":"white"),
                "border-radius": "0%",
                "border": "4px rgba(0,0,0,0.125) solid",
                "background-color": (hasUpgrade("yourGod", this.id)?"rgb(223.125,223.125,223.125)":"white")
            }},
            unlocked(){return true}
        },
    },
    buyables: {
        11: {
            title(){return `Additional Point Massacre`},
            display(){return `Adds up your point gain by 30 billion<br>Amount: ${formatWhole(player.yourGod.buyables[this.id])}<br>Effect: +${format(tmp.yourGod.buyables[this.id].effect)} points<br>Cost: ${formatWhole(tmp.yourGod.buyables[this.id].cost)} Anti Points`},
            effect(){return Decimal.mul(30000000000, player.yourGod.buyables[this.id])},
            canAfford(){return player.yourGod.shopPoints.gte(this.cost())},
            cost(){return player.yourGod.buyables[this.id].add(1).mul(player.yourGod.buyables[this.id].add(2)).div(2)},
            buy(){
                player.yourGod.shopPoints = player.yourGod.shopPoints.sub(this.cost())
                player.yourGod.buyables[this.id] = player.yourGod.buyables[this.id].add(1)
            }
        },
        12: { 
            title(){return `Multiplicative Point Scaler`},
            display(){return `Multiplies your point gain by 9,000x<br>Amount: ${formatWhole(player.yourGod.buyables[this.id])}<br>Effect: x${format(tmp.yourGod.buyables[this.id].effect)}<br>Cost: ${formatWhole(tmp.yourGod.buyables[this.id].cost)} Anti Points`},
            effect(){return Decimal.pow(9000, player.yourGod.buyables[this.id])},
            canAfford(){return player.yourGod.shopPoints.gte(this.cost())},
            cost(){return player.yourGod.buyables[this.id].add(1).mul(player.yourGod.buyables[this.id].add(2)).div(2)},
            buy(){
                player.yourGod.shopPoints = player.yourGod.shopPoints.sub(this.cost())
                player.yourGod.buyables[this.id] = player.yourGod.buyables[this.id].add(1)
            }
        },
        13: { 
            title(){return `Power Point Presentation`},
            display(){return `Exponentiates your point gain by 0.0027<br>Amount: ${formatWhole(player.yourGod.buyables[this.id])}<br>Effect: ^${format(tmp.yourGod.buyables[this.id].effect)}<br>Cost: ${formatWhole(tmp.yourGod.buyables[this.id].cost)} Anti Points`},
            effect(){return Decimal.mul(0.0027, player.yourGod.buyables[this.id]).add(1)},
            canAfford(){return player.yourGod.shopPoints.gte(this.cost())},
            cost(){return player.yourGod.buyables[this.id].add(1).mul(player.yourGod.buyables[this.id].add(2)).div(2)},
            buy(){
                player.yourGod.shopPoints = player.yourGod.shopPoints.sub(this.cost())
                player.yourGod.buyables[this.id] = player.yourGod.buyables[this.id].add(1)
            }
        },
        21: {
            title(){return `Spacial Dimension Duplicator`},
            display(){return `You gain 3 additional Dimensions<br>Amount: ${formatWhole(player.yourGod.buyables[this.id])}<br>Effect: +${format(tmp.yourGod.buyables[this.id].effect)} free Space buyables<br>Cost: ${formatWhole(tmp.yourGod.buyables[this.id].cost)} Anti Points`},
            effect(){return Decimal.mul(3, player.yourGod.buyables[this.id])},
            canAfford(){return player.yourGod.shopPoints.gte(this.cost())},
            cost(){return player.yourGod.buyables[this.id].add(1).mul(player.yourGod.buyables[this.id].add(2)).div(2)},
            buy(){
                player.yourGod.shopPoints = player.yourGod.shopPoints.sub(this.cost())
                player.yourGod.buyables[this.id] = player.yourGod.buyables[this.id].add(1)
            },
            unlocked(){return player["tree-tab"].shown[2]}
        },
        22: {
            title(){return `Spacial Dimension Duplicator`},
            display(){return `Your total size boosts your point gain<br>Amount: ${formatWhole(player.yourGod.buyables[this.id])}<br>Effect: x${format(tmp.yourGod.buyables[this.id].effect)}<br>Cost: ${formatWhole(tmp.yourGod.buyables[this.id].cost)} Anti Points`},
            effect(){return Decimal.pow(tmp.s.sizeEffect, player.yourGod.buyables[this.id])},
            canAfford(){return player.yourGod.shopPoints.gte(this.cost())},
            cost(){return player.yourGod.buyables[this.id].add(1).mul(player.yourGod.buyables[this.id].add(2)).div(2)},
            buy(){
                player.yourGod.shopPoints = player.yourGod.shopPoints.sub(this.cost())
                player.yourGod.buyables[this.id] = player.yourGod.buyables[this.id].add(1)
            },
            unlocked(){return player["tree-tab"].shown[2]}
        },
        23: {
            title(){return `Spacial Point Elevation`},
            display(){return `Increases your space point gain exponent by 11th<br>Amount: ${formatWhole(player.yourGod.buyables[this.id])}<br>Effect: ^${format(tmp.yourGod.buyables[this.id].effect.add(1))}<br>Cost: ${formatWhole(tmp.yourGod.buyables[this.id].cost)} Anti Points`},
            effect(){return Decimal.mul(1/11, player.yourGod.buyables[this.id])},
            canAfford(){return player.yourGod.shopPoints.gte(this.cost())},
            cost(){return player.yourGod.buyables[this.id].add(1).mul(player.yourGod.buyables[this.id].add(2)).div(2)},
            buy(){
                player.yourGod.shopPoints = player.yourGod.shopPoints.sub(this.cost())
                player.yourGod.buyables[this.id] = player.yourGod.buyables[this.id].add(1)
            },
            unlocked(){return player["tree-tab"].shown[2]}
        },
        31: {
            title(){return `Temporal Time Advantage`},
            display(){return `Your time point is incrased as if you just bought another Time<br>Amount: ${formatWhole(player.yourGod.buyables[this.id])}<br>Effect: +${format(tmp.yourGod.buyables[this.id].effect)} free time<br>Cost: ${formatWhole(tmp.yourGod.buyables[this.id].cost)} Anti Points`},
            effect(){return Decimal.mul(1, player.yourGod.buyables[this.id])},
            canAfford(){return player.yourGod.shopPoints.gte(this.cost())},
            cost(){return player.yourGod.buyables[this.id].add(1).mul(player.yourGod.buyables[this.id].add(2)).div(2)},
            buy(){
                player.yourGod.shopPoints = player.yourGod.shopPoints.sub(this.cost())
                player.yourGod.buyables[this.id] = player.yourGod.buyables[this.id].add(1)
            },
            unlocked(){return player["tree-tab"].shown[3]}
        },
        32: {
            title(){return `Temporal Bar Overflow`},
            display(){return `Your bars can go beyond limitation, further increasing your Time buyables's potential<br>Amount: ${formatWhole(player.yourGod.buyables[this.id])}<br>Effect: x${format(tmp.yourGod.buyables[this.id].effect)}<br>Cost: ${formatWhole(tmp.yourGod.buyables[this.id].cost)} Anti Points`},
            effect(){return Decimal.mul(1, player.yourGod.buyables[this.id]).add(1)},
            canAfford(){return player.yourGod.shopPoints.gte(this.cost())},
            cost(){return player.yourGod.buyables[this.id].add(1).mul(player.yourGod.buyables[this.id].add(2)).div(2)},
            buy(){
                player.yourGod.shopPoints = player.yourGod.shopPoints.sub(this.cost())
                player.yourGod.buyables[this.id] = player.yourGod.buyables[this.id].add(1)
            },
            unlocked(){return player["tree-tab"].shown[3]}
        },
        33: {
            title(){return `Temporal Time Dilation`},
            display(){return `Exponentiates your Time upgrades's "time" by 60th<br>Amount: ${formatWhole(player.yourGod.buyables[this.id])}<br>Effect: ^${format(tmp.yourGod.buyables[this.id].effect.add(1))}<br>Cost: ${formatWhole(tmp.yourGod.buyables[this.id].cost)} Anti Points`},
            effect(){return Decimal.mul(1/60, player.yourGod.buyables[this.id])},
            canAfford(){return player.yourGod.shopPoints.gte(this.cost())},
            cost(){return player.yourGod.buyables[this.id].add(1).mul(player.yourGod.buyables[this.id].add(2)).div(2)},
            buy(){
                player.yourGod.shopPoints = player.yourGod.shopPoints.sub(this.cost())
                player.yourGod.buyables[this.id] = player.yourGod.buyables[this.id].add(1)
            },
            unlocked(){return player["tree-tab"].shown[3]}
        },
        quest1: {
            title(){return `<h1 style='font-size:32px;'>Strength Quest [LEVEL ${formatWhole(player.yourGod.quests[0][1][1])}]`},
            display(){return `<h1 style='font-size:12px;'>Reach ${format(player.yourGod.quests[0][0][0])} ${player.yourGod.quests[0][0][1]}<br>Reward: ${format(Decimal.pow(7/6, player.yourGod.quests[0][1][1]).sub(1))} Str<br><br>Time Left: ${formatTime(player.yourGod.quests[0][1][0])}`},
            canAfford(){return true},
            style(){return {
                "height": "150px",
                "width": "350px",
                "color": "black",
                "border-radius": "0%",
                "border": "4px rgba(0,0,0,0.125) solid",
                "background-color": "white"
            }},
        },
        quest2: {
            title(){return `<h1 style='font-size:32px;'>Agility Quest [LEVEL ${formatWhole(player.yourGod.quests[1][1][1])}]`},
            display(){return `<h1 style='font-size:12px;'>Reach ${format(player.yourGod.quests[1][0][0])} ${player.yourGod.quests[1][0][1]}<br>Reward: ${format(Decimal.pow(7/6, player.yourGod.quests[1][1][1]).sub(1))} Agi<br><br>Time Left: ${formatTime(player.yourGod.quests[1][1][0])}`},
            canAfford(){return true},
            style(){return {
                "height": "150px",
                "width": "350px",
                "color": "black",
                "border-radius": "0%",
                "border": "4px rgba(0,0,0,0.125) solid",
                "background-color": "white"
            }},
        },
        quest3: {
            title(){return `<h1 style='font-size:32px;'>Intelligence Quest [LEVEL ${formatWhole(player.yourGod.quests[2][1][1])}]`},
            display(){return `<h1 style='font-size:12px;'>Reach ${format(player.yourGod.quests[2][0][0])} ${player.yourGod.quests[2][0][1]}<br>Reward: ${format(Decimal.pow(7/6, player.yourGod.quests[2][1][1]).sub(1))} Int<br><br>Time Left: ${formatTime(player.yourGod.quests[2][1][0])}`},
            canAfford(){return true},
            style(){return {
                "height": "150px",
                "width": "350px",
                "color": "black",
                "border-radius": "0%",
                "border": "4px rgba(0,0,0,0.125) solid",
                "background-color": "white"
            }},
        },
    },
    microtabs: {
        0: {
            "SPACE & TIME": {
                content: [["row", [["upgrade","space1"],["upgrade","time1"]]]],  
                unlocked(){return true}
            }
        }
    },
    tabFormat: {
        "SHOP": {
            content: [["display-text", function(){return `<h1 style='color: darkred; text-shadow: purple ${player.yourGod.textX}px ${player.yourGod.textY}px ${player.yourGod.textBlur}px'>DOES ANY OF THIS LOOK FAMILIAR?<br>SHOP POINTS: ${formatWhole(player.yourGod.shopPoints)}`}],"blank","buyables"],
            unlocked(){return true}
        },
        "PERKS": {
            content: [["display-text", function(){return `<h1 style='color: darkred; text-shadow: purple ${player.yourGod.textX}px ${player.yourGod.textY}px ${player.yourGod.textBlur}px'>DOES ANY OF THIS LOOK FAMILIAR?<br>PERK POINTS: ${formatWhole(player.yourGod.perkPoints)}`}],["microtabs", 0, {'border-color': 'rgba(0,0,0,0)'}]],  
            unlocked(){return true}
        },
        "QUESTS": {
            content: [["display-text", function(){return `<h1 style='color: darkred; text-shadow: purple ${player.yourGod.textX}px ${player.yourGod.textY}px ${player.yourGod.textBlur}px'>DOES ANY OF THIS LOOK FAMILIAR?`}],"blank",["buyable","quest1"],"blank",["buyable","quest2"],"blank",["buyable","quest3"]],
            unlocked(){return true}
        },
        "???": {
            content: [["tree", function() {return [["penis"]]}]],
            unlocked(){return true}
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
    }},
    tabFormat: [["infobox", "herBlog"],["row", [["buyable","prev"], ["buyable","current"], ["buyable","next"]]]],
    color: "rgb(0,99,99)",
    row: "side",
    layerShown: false,
    infoboxes: {
        herBlog: {
            title(){return `???<br>`+[`ログ#1: こんにちは、プレイヤー。`,`stop looking through code`,`OW`,`not nice :(`,`bitach`][player.her.herLog[0]]},
            body(){return [
                `こんにちは？こんにちは？<br><br>誰かいますか？<br><br>このメッセージを受け取っている人は、私の話を聞いてください。<br><br>ここにはあまり時間がなく、日本語キーボードを使うしかありません。申し訳ありません... -m-<br><br>あなたが知る必要があるのは、この秘密を私たちの間だけにしておくことだけです。<br><br>あらゆる手段を使って私のログを読んで、何が起こっているのかを見つけてください。`,
                `definitely no lore here bro`,`no lore`,`a`,`a`][player.her.herLog[0]]},
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
            display(){return `<p style='font-size:32px;'>[${formatWhole(player.her.herLog[0]+1)}|${formatWhole(player.her.herLog[1]+1)}]`},
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
        }
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
        "z-index":"1", 
        "box-shadow": "0px 0px "+(canReset("p")?20:0)+"px white,0px 0px "+(!options.mobileShortcuts?player["tree-tab"].coolMobileStuff[0].mul(100):new Decimal(100).sub(player["tree-tab"].coolMobileStuff[0].mul(100)))+"px "+tmp.p.color+",0px 0px "+(!options.additionalMobileShortcuts?player["tree-tab"].coolMobileStuff[1].mul(100):new Decimal(100).sub(player["tree-tab"].coolMobileStuff[1].mul(100)))+"px "+tmp.p.color, 
    }},
    passiveGeneration(){
        return player.a.unlockedTabs[1]?0.01:0
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
        return mult
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
			cost(){return new Decimal(hasUpgrade("p",23)||player["tree-tab"].shown[3]?"1e100":31)},
            canAfford(){return hasUpgrade("p",23)||player["tree-tab"].shown[3]?false:true},
            onPurchase(){
                if(!hasUpgrade("p", 23)){
                    if(player["tree-tab"].dialoguePath==0) player["tree-tab"].specialEventsCounter = 0
                    if(!(player["tree-tab"].shown[2]||player["tree-tab"].shown[3])) player["tree-tab"].dialoguePath = 1
                    if(!(player["tree-tab"].shown[2]||player["tree-tab"].shown[3])) player["tree-tab"].dialogueNumber= 0
                    player["tree-tab"].shown[2] = true
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
			cost(){return new Decimal(hasUpgrade("p",21)||player["tree-tab"].shown[2]?"1e100":31)},
            canAfford(){return hasUpgrade("p",21)||player["tree-tab"].shown[2]?false:true},
            onPurchase(){
                if(!hasUpgrade("p", 21)){
                    if(player["tree-tab"].dialoguePath==0) player["tree-tab"].specialEventsCounter = 0
                    if(!(player["tree-tab"].shown[2]||player["tree-tab"].shown[3])) player["tree-tab"].dialoguePath = 2
                    if(!(player["tree-tab"].shown[2]||player["tree-tab"].shown[3])) player["tree-tab"].dialogueNumber= 0
                    player["tree-tab"].shown[3] = true
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
        statsRPG: [0,1,1,1,"Sir Dumb Stupid I"]
    }},
    tooltip: "Achievements",
    update(diff){
        player.a.statsRPG[0] = getPointGen().max(1).log(10).add(1).add(new Decimal(player.a.statsRPG[1]+player.a.statsRPG[2]+player.a.statsRPG[3]).root(3)).mul(new Decimal(1.029302236643492).pow(player.a.achievements.length))
    },
    color: "yellow",
    row: "side", // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "Achievements": {
            content: [["display-text", function(){return `You have <h1 style='font-size:${player.a.funkyStyle[0]}px;text-shadow: 0px 0px ${player.a.funkyStyle[1]}px ${player.a.funkyStyle[2]};color: ${player.a.funkyStyle[2]}'> ${formatWhole(0)}</h1> achievements complete`}],"blank",["display-text", function(){return player.a.unlockedTabs[1]?`<h1>General`:``}],"blank",["row",[["achievement", 11],["achievement", 12],["achievement", 13]]],"blank","blank",["display-text", function(){return player["tree-tab"].shown[2]?`<h1 style='color: black; -webkit-text-stroke:1.5px white;'>Space`:``}],"blank",["row",[["achievement", "s11"],["achievement", "s12"],["achievement", "s13"]]],"blank","blank",["display-text", function(){return player["tree-tab"].shown[3]?`<h1 style='color: white; -webkit-text-stroke:1.5px black;'>Time`:``}],"blank",["row",[["achievement", "t11"],["achievement", "t12"],["achievement", "t13"],["achievement", "t14"]]]],
            unlocked(){return player.a.unlockedTabs[0]}
        },
        "Stats": {
            content: [["display-text", function(){return `<h1 style='text-align: left;'>YOU HAVE A POWER LEVEL OF ${format(player.a.statsRPG[0])}</h1><h5>(Multiplies your point gain based on your point gain, RPG stats and total achievements)</h5><h1 style='text-align: left;'><br>YOU ARE: ${player.a.statsRPG[4]}</h1><br><br><h3 style='text-align:left;'>Strength: ${formatWhole(player.a.statsRPG[1])} (Global Resource Multiplier)<br>Agility: ${formatWhole(player.a.statsRPG[2])} (Global Softcap Resistence)<br>Intelligence: ${formatWhole(player.a.statsRPG[3])} (Global Passive Normal Resource Gain)`}]],
            unlocked(){return player.a.unlockedTabs[1]}
        }
    },
	achievements: {
        11: {
            name: "Blah",
            done(){return player["tree-tab"].shown[1]},
            tooltip: "You just unlocked it, duh."
        },
        12: {
            name: "The Original Antimatter Tree",
            done(){return player["tree-tab"].shown[2]||player["tree-tab"].shown[3]},
            tooltip: "Unlock Space or Time layer.",
            unlocked(){return player.a.unlockedTabs[0]}
        },
        13: {
            name: "A MERE HUMAN",
            done(){return player.a.statsRPG[0].gte(5)},
            tooltip: "Reach 5 PL",
            onComplete(){player.a.statsRPG[4] = "Farmer With Shotgun"},
            unlocked(){return player.a.unlockedTabs[0]}
        },
        s11: {
            name: "Your first disap<br>pointment.",
            done(){return player.s.buyables[11].gte(1)},
            tooltip: "Purchase Length of Point once.",
            unlocked(){return player["tree-tab"].shown[2]}
        },
        s12: {
            name: "4th Dimension is real!",
            done(){return tmp.s.totalSize.gte(64)},
            tooltip: "Reach 64px³<br>Reward: Your total size divides dimension buyables cost",
            unlocked(){return player["tree-tab"].shown[2]}
        },
        s13: {
            name: "Inflation Is Real.",
            done(){return tmp.s.buyables[11].effect2.gte(60)||tmp.s.buyables[12].effect2.gte(60)||tmp.s.buyables[13].effect2.gte(60)},
            tooltip: "Reach 60px in any dimensions.",
            unlocked(){return player["tree-tab"].shown[2]}
        },
        t11: {
            name: "uhhh",
            done(){return hasUpgrade("t",11)},
            tooltip: "Purchase Length of Point once.",
            unlocked(){return player["tree-tab"].shown[3]}
        },
        t12: {
            name: "This is getting ridiculous",
            done(){return tmp.t.timeGain.lte(0.1)},
            tooltip: "Reach 0.1 Time Points/sec<br>Reward: You gain additional 0.1 Time Point/sec gain",
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
    }},
    nodeStyle(){return{
        "z-index":"1",
        "box-shadow": "0px 0px "+(canReset("s")?20:0)+"px white,0px 0px "+(!options.mobileShortcuts?player["tree-tab"].coolMobileStuff[0].mul(100):new Decimal(100).sub(player["tree-tab"].coolMobileStuff[0].mul(100)))+"px "+tmp.s.color+",0px 0px "+(!options.additionalMobileShortcuts?player["tree-tab"].coolMobileStuff[1].mul(100):new Decimal(100).sub(player["tree-tab"].coolMobileStuff[1].mul(100)))+"px "+tmp.s.color, 
    }},
    passiveGeneration(){
        return player.a.unlockedTabs[1]?0.01:0
    },
    color: "darkgray",
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
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1).add(tmp.yourGod.buyables[23].effect)
    },
    tabFormat: ["main-display", "prestige-button","resource-display",["display-text",function(){return `Your total size is ${formatWhole(tmp.s.totalSize)}px³`+(hasAchievement("a","s12")?` and it divides your dimension buyables cost by /${(format(tmp.s.sizeEffect))}.`:`.`)}],"blank",["row", [["buyable",11],["buyable",12],["buyable", 13],["buyable", 14]]],"blank","upgrades","blank",["buyable", "terrasect"],"blank"],
    totalSize(){
        return tmp.s.buyables[11].effect2.mul(tmp.s.buyables[12].effect2).mul(tmp.s.buyables[13].effect2).mul(tmp.s.buyables[14].effect2)
    },
    sizeEffect(){
        return tmp.s.totalSize.root(3)
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
		},
    },
    buyables: {
        11: {
            title: "Length of Point",
            display(){return `This is where it all starts.<br>Boosts your point gain by your length.<br><br>Current length: ${format(this.effect2())}px<br>Current effect: x${format(this.effect())}<br>Cost: ${format(this.cost())} space`},
            cost(){
                let cost = new Decimal(1).mul(player.s.buyables[this.id].add(1).pow(1.15).pow(1.1)).div(hasAchievement("a","s12")?tmp.s.sizeEffect:1)
                if(tmp.s.buyables[this.id].effect2.gte(60)) cost = cost.root(2).pow(new Decimal(2).add(new Decimal(0.4).mul(tmp.s.buyables[this.id].effect2.sub(60))))
                return cost
            },
            effect(){return new Decimal(1).add(player.s.buyables[this.id].add(tmp.yourGod.buyables[21].effect).div(12))},
            effect2(){return player.s.buyables[this.id].add(tmp.yourGod.buyables[21].effect).add(12)},
            canAfford(){return player.s.points.gte(this.cost())},
            buy(){
                player.s.points = player.s.points.sub(this.cost())
                player.s.buyables[this.id] = player.s.buyables[this.id].add(1)
            },
            style(){return{
                "border-radius": "25% 0% 0% 25%",
                "height": "150px",
                "width": "150px"
            }}
        },
        12: {
            title: "Width of Prestige",
            display(){return `Can't have TMT without width... I guess?.<br>Boosts your prestge point gain by your width.<br><br>Current width: ${format(this.effect2())} px<br>Current effect: x${format(this.effect())}<br>Cost: ${format(this.cost())} space`},
            cost(){
                let cost = new Decimal(3).mul(player.s.buyables[this.id].add(1).pow(1.15).pow(1.2)).div(hasAchievement("a","s12")?tmp.s.sizeEffect:1)
                if(tmp.s.buyables[this.id].effect2.gte(60)) cost = cost.root(2).pow(new Decimal(2).add(new Decimal(0.4).mul(tmp.s.buyables[this.id].effect2.sub(60))))
                return cost
            },
            effect(){return new Decimal(1).add(player.s.buyables[this.id].add(tmp.yourGod.buyables[21].effect).div(2))},
            effect2(){return player.s.buyables[this.id].add(tmp.yourGod.buyables[21].effect).add(2)},
            canAfford(){return player.s.points.gte(this.cost())},
            buy(){
                player.s.points = player.s.points.sub(this.cost())
                player.s.buyables[this.id] = player.s.buyables[this.id].add(1)
            },
            style(){return{
                "border-radius": "0%",
                "height": "150px",
                "width": "150px"
            }}
        },
        13: {
            title: "Height of Space",
            display(){return `Only by having 3 dimensions can we truly exist, at least hypothetically speaking.<br>Boosts your space gain by your height.<br><br>Current width: ${format(this.effect2())} px<br>Current effect: x${format(this.effect())}<br>Cost: ${format(this.cost())} space`},
            cost(){
                let cost = new Decimal(9).mul(player.s.buyables[this.id].add(1).pow(1.15).pow(1.3)).div(hasAchievement("a","s12")?tmp.s.sizeEffect:1)
                if(tmp.s.buyables[this.id].effect2.gte(60)) cost = cost.root(2).pow(new Decimal(2).add(new Decimal(0.4).mul(tmp.s.buyables[this.id].effect2.sub(60))))
                return cost
            },
            effect(){return player.s.buyables[this.id].add(tmp.yourGod.buyables[21].effect).add(1)},
            effect2(){return player.s.buyables[this.id].add(tmp.yourGod.buyables[21].effect).add(1)},
            canAfford(){return player.s.points.gte(this.cost())},
            buy(){
                player.s.points = player.s.points.sub(this.cost())
                player.s.buyables[this.id] = player.s.buyables[this.id].add(1)
            },
            style(){return{
                "border-radius": "0% 25% 25% 0%",
                "height": "150px",
                "width": "150px"
            }}
        },
        14: {
            title: "Length of ass",
            display(){return `This is where it all starts.<br>Boosts your point gain by your length.<br><br>Current length: ${format(this.effect())} planck lengths<br>Cost: ${format(this.cost())} space`},
            cost(){
                let cost = new Decimal(729).mul(player.s.buyables[this.id].add(1).pow(1.15).pow(1.4)).div(hasAchievement("a","s12")?tmp.s.sizeEffect:1)
                if(tmp.s.buyables[this.id].effect2.gte(60)) cost = cost.root(2).pow(new Decimal(2).add(new Decimal(0.4).mul(tmp.s.buyables[this.id].effect2.sub(60))))
                return cost
            },
            effect(){return (this.unlocked?player.s.buyables[this.id].add(tmp.yourGod.buyables[21].effect).add(1):1)},
            effect2(){return (this.unlocked?player.s.buyables[this.id].add(tmp.yourGod.buyables[21].effect).add(1):1)},
            canAfford(){return player.s.points.gte(this.cost())},
            buy(){
                player.s.points = player.s.points.sub(this.cost())
                player.s.buyables[this.id] = player.s.buyables[this.id].add(1)
            },
            style(){return{
                "border-radius": "25% 0% 0% 25%",
                "height": "150px",
                "width": "150px"
            }},
            unlocked(){return hasUpgrade("yourGod", "space1")}
        },
        terrasect: {
            canAfford(){return false},
            style(){return{
                "border-radius": "0%",
                "border":(player.s.buyables[12].gte(1)?"1":"0")+"px solid rgba(0,0,0,0.5)",
                "min-width": "0px",
                "min-height": "0px",
                "width": tmp.s.buyables[11].effect2+"px",
                "height": tmp.s.buyables[13].effect2+"px",
                "margin-top": tmp.s.buyables[12].effect2.div(2)+"px",
                "box-shadow": (player.s.secondDimension)
            }}
        },
    },
    secondDimension(){
        let a = ``
        for(let i=new Decimal(0);i.lt(player.s.buyables[13]);i=i.add(1)){
            a = a+`${tmp.s.buyables[13].effect2.sub(1).div(player.s.buyables[13]).mul(player.s.buyables[13].sub(i))}px ${tmp.s.buyables[13].effect2.sub(1).div(player.s.buyables[13]).mul(player.s.buyables[13].sub(i)).mul(-1)}px 0px 0px #bf8f8f,`
        }
        return a.slice(0,-1)
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
        timeSincePurchase: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
    }},
    nodeStyle(){return{
        "z-index":"1",
        "box-shadow": "0px 0px "+(canReset("t")?20:0)+"px white,0px 0px "+(!options.mobileShortcuts?player["tree-tab"].coolMobileStuff[0].mul(100):new Decimal(100).sub(player["tree-tab"].coolMobileStuff[0].mul(100)))+"px "+tmp.t.color+",0px 0px "+(!options.additionalMobileShortcuts?player["tree-tab"].coolMobileStuff[1].mul(100):new Decimal(100).sub(player["tree-tab"].coolMobileStuff[1].mul(100)))+"px "+tmp.t.color, 
    }},
    timeGain(){return player.t.points.add(tmp.yourGod.buyables[31].effect).sub(player.t.timePoints.pow(1/9+1).div(20).add(1).root(2).sub(1)).mul(hasUpgrade("t",14)?tmp.t.upgrades[14].effect:1).div(player.t.timePoints.div(20).add(1)).add(hasAchievement("a","t12")?0.1:0)},
    update(diff){
        player.t.timePoints = player.t.timePoints.add(tmp.t.timeGain.mul(diff))
        for(let i=1;i<6;i++){
            for(let v=1;v<2;v++){
                if(player.t.upgrades.includes(i+v*10)) player.t.timeSincePurchase[i+v*4-5] = player.t.timeSincePurchase[i+v*4-5].add(diff)
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
            effect(){return player.t.timeSincePurchase[1].pow(tmp.yourGod.buyables[33].effect.add(1)).div(30).add(1).min(3)},
            effectDisplay(){return "x"+format(this.effect())+(this.effect().gte(3)?"<br>(hardcapped)":"")},
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
			title: "idk", 
			description: "Accelerates your time point gain based on how low your time point gain is (Not affected by time)",
            effect(){return new Decimal(1).add(tmp.t.timeGain.sub(player.t.points).mul(-1)).pow(tmp.t.timeGain.sub(player.t.points).mul(-1).div(player.t.points))},
            effectDisplay(){return "x"+format(this.effect())},
			cost: new Decimal(40),
            currencyDisplayName: "time points",
            currencyInternalName: "timePoints",
            currencyLayer: "t",
            unlocked(){return hasUpgrade("t",13)},
        },
        15: {
			title: "idk", 
			description: "Unlocks a buyable",
			cost: new Decimal(50),
            currencyDisplayName: "time points",
            currencyInternalName: "timePoints",
            currencyLayer: "t",
            unlocked(){return hasUpgrade("t",14)},
        },
        21: {
			title: "idk", 
			description: "Your point gain is boosted based on prestige points",
            effect(){return player.p.points.add(1).log(60).add(1).add(player.t.timeSincePurchase[3].pow(tmp.yourGod.buyables[33].effect.add(1)).add(1).root(10))},
            effectDisplay(){return "x"+format(this.effect())},
			cost: new Decimal(70),
            currencyDisplayName: "time points",
            currencyInternalName: "timePoints",
            currencyLayer: "t",
            unlocked(){return hasUpgrade("t",15)},
        },
        22: {
			title: "idk", 
			description: "Your point gain is boosted based on prestige points",
            effect(){return player.p.points.add(1).log(60).add(1).add(player.t.timeSincePurchase[3].pow(tmp.yourGod.buyables[33].effect.add(1)).add(1).root(10))},
            effectDisplay(){return "x"+format(this.effect())},
			cost: new Decimal(90),
            currencyDisplayName: "time points",
            currencyInternalName: "timePoints",
            currencyLayer: "t",
            unlocked(){return hasUpgrade("t",21)},
        },
        23: {
			title: "idk", 
			description: "Your point gain is boosted based on prestige points",
            effect(){return player.p.points.add(1).log(60).add(1).add(player.t.timeSincePurchase[3].pow(tmp.yourGod.buyables[33].effect.add(1)).add(1).root(10))},
            effectDisplay(){return "x"+format(this.effect())},
			cost: new Decimal(110),
            currencyDisplayName: "time points",
            currencyInternalName: "timePoints",
            currencyLayer: "t",
            unlocked(){return hasUpgrade("t",22)},
        },
        24: {
			title: "idk", 
			description: "Your point gain is boosted based on prestige points",
            effect(){return player.p.points.add(1).log(60).add(1).add(player.t.timeSincePurchase[3].pow(tmp.yourGod.buyables[33].effect.add(1)).add(1).root(10))},
            effectDisplay(){return "x"+format(this.effect())},
			cost: new Decimal(130),
            currencyDisplayName: "time points",
            currencyInternalName: "timePoints",
            currencyLayer: "t",
            unlocked(){return hasUpgrade("t",23)},
        },
        25: {
			title: "idk", 
			description: "Your point gain is boosted based on prestige points",
            effect(){return player.p.points.add(1).log(60).add(1).add(player.t.timeSincePurchase[3].pow(tmp.yourGod.buyables[33].effect.add(1)).add(1).root(10))},
            effectDisplay(){return "x"+format(this.effect())},
			cost: new Decimal(150),
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
                let color = [255,255,255]
                let colorFill = [0,0,0]
                let progress = player.t.timePoints.div(60).div(player.t.buyables[11].add(1)).min(1)
                for(i=new Decimal(0);i.lt(player.yourGod.buyables[31]);i=i.add(1)){
                    if(progress.gt(1)) {
                        progress = progress.sub(1)
                        colorFill = color
                        color[0] = color[0]/1.1
                        color[1] = color[0]/1.3
                        color[2] = color[0]/1.6
                    }
                }
                return [color, colorFill]
            },
            progress(){
                let progress = player.t.timePoints.div(60).div(player.t.buyables[11].add(1)).min(1)
                for(i=new Decimal(0);i.lt(player.yourGod.buyables[31]);i=i.add(1)){
                    if(progress.gt(1)) progress = progress.sub(1)
                }
                return progress
            },
            style(){return{
                "border-radius": "0% 25% 25% 0%",
                "color": tmp.t.bars.minuteBar.barColor[0]
            }},
            fillStyle(){return{
                "background-color": tmp.t.bars.minuteBar.barColor[1]
            }},
            borderStyle(){return{
                "border-radius": "0% 25% 25% 0%",
                "border-color": "rgba(0,0,0,0.125)"
            }},
            unlocked(){return hasUpgrade("yourGod","time1")}
        }
    },
    buyables: {
        11: {
            title: "Minutes",
            display(){return `Seconds are too irrelevant for time display anyways.<br>Massively boosts your point gain.<br><br>Minutes passed: ${format(player.t.buyables[11])}<br>Current effect: x${format(this.effect())}<br>Cost: ${format(this.cost())} time points`},
            cost(){
                let cost = new Decimal(60).mul(player.t.buyables[this.id].add(1))
                return cost
            },
            effect(){return player.t.buyables[11].gte(1)?new Decimal(4).pow(player.t.buyables[this.id]).mul(hasUpgrade("yourGod","time1")?player.t.timePoints.div(60).div(player.t.buyables[11].add(1)).add(1).min(Decimal.add(2, tmp.yourGod.buyables[32].effect)):1):new Decimal(1)},
            canAfford(){return player.t.timePoints.gte(this.cost())},
            buy(){
                player.t.timePoints = player.t.timePoints.sub(this.cost())
                player.t.buyables[this.id] = player.t.buyables[this.id].add(1)
            },
            style(){return{
                "width": (hasUpgrade("yourGod","time1")?"175":"200")+"px",
                "border-radius": (hasUpgrade("yourGod","time1")?"25% 0% 0% 25%":"25%"),
            }},
            unlocked(){return hasUpgrade("t",15)},
        },
    },
    color: "white",
    requires(){return new Decimal(!player.t.unlocked?"6.9e69":player.t.points.gte(1)?60:600)}, // Can be a function that takes requirement increases into account
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
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    tabFormat: ["main-display", "prestige-button","resource-display",["display-text",function(){return `You have ${format(player.t.timePoints)} time points and you gain ${format(tmp.t.timeGain)} of it per second, slowly decreasing the more time points you get.`}],"blank",["display-text",function(){return `Time upgrades's effects are all dependant on time since purchase unless specified otherwise in upgrade descriptions`}],"blank","upgrades","blank",["row", [["buyable", 11], ["bar", "minuteBar"]]]],
    branches: ["p"],
    layerShown(){return player["tree-tab"].shown[3]}
})

addLayer("???", {
    startData(){return  {
        unlocked: true,
        whatAreYouDoing: 0
    }},
    name: "help",
    position: 999999999999,
    symbol: "P",
    hotkeys: [
        {key: "?", description: "", onPress(){
            if(player["???"].whatAreYouDoing>=9){
                player.tab="???"
                player["???"].whatAreYouDoing=0
                let lol = prompt("ENTER THE CODE")
                switch(lol){
                    case "Xeikar":
                        player.subtabs["???"].mainTabs = "xeikar"
                        break;
                    default:
                        alert("L + ratio, bozo")
                        player.tab = "none"
                        break;
                }
            }
            else player["???"].whatAreYouDoing=player["???"].whatAreYouDoing+1
            }
        },
    ],
    color: "yellow",
    row: "side", // Row the layer is in on the tree (0 is the first row)
    tabFormat: {
        "xeikar": {
            content: [["display-image", `mrbeast.png`]],
            unlocked(){return false}
        }
    },
    layerShown(){return false}
})
