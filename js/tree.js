var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", { 
    layerShown: "ghost",
    nodeStyle(){return{
        width: (player["tree-tab"].shown[2]&&player["tree-tab"].shown[3]?player["tree-tab"].coolMobileStuff[0].mul(75).add(player["tree-tab"].coolMobileStuff[1].mul(75)).add(player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("t")?70:0):0)+"px"
    }}
}), 

addNode("pNode", {
    color(){return tmp.p.color},
    row: 0,
    position: 1,
    symbol(){return `<span style='margin-left: 64px;font-size:16px;'>Prestige<br><span style='margin-left: 64px;font-size:16px;'>Reset<br><span style='margin-left: 64px;font-size:15px;'>(+${formatWhole(getResetGain("p"))})<br><p style='margin-left: 64px;font-size:8px; transform: scale(1.25, 1.5);'>Points:<br><p style='margin-left: 64px;font-size:8px; transform: scale(1.25, 1.5);'>[${format(player.points)} / ${format(tmp.p.nextAt)}]`},
    canClick() {return true},
	onClick() {if (canReset("p")) doReset("p")},
    onHold() {if (canReset("p")) doReset("p")},
    nodeStyle(){return{
        "position": "absolute",
        "transform": "scale("+(player.p.unlocked?player["tree-tab"].coolMobileStuff[0]:0)+","+new Decimal(1.176470588).sub(player["tree-tab"].coolMobileStuff[0].mul(0.176470588))+")",
        "margin-left": player["tree-tab"].coolMobileStuff[0].mul(55).sub(135)+"px",   
        "margin-top": "8px",
        "z-index": "0",
        "box-shadow": "0px 0px "+(canReset("p")?20:0)+"px white,0px 0px "+(options.mobileShortcuts?new Decimal(100).sub(player["tree-tab"].coolMobileStuff[0].mul(100)):player["tree-tab"].coolMobileStuff[0].mul(100))+"px "+tmp.p.color, 
        "font-size":"0px",
        "height": "85px",
        "width": "150px",
        "border-radius": "0% 25% 25% 0%",
    }},
    layerShown(){return player["tree-tab"].shown[0]}
})

addNode("pNodeExtra", {
    color(){return tmp.p.color},
    row: 0,
    position: 1,
    symbol(){return `<span style='margin-left: -60px;font-size:16px;'>Passive<br><span style='margin-left: -60px;font-size:16px;'>Gain:<br><span style='margin-left: -60px;font-size:15px;'>${format(getResetGain("p").mul(tmp.p.passiveGeneration))}/sec`},
    canClick() {return true},
	onClick(){
		if(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]=="none") player["tree-tab"].holyFuckingShitNoFuckingWayBro[0] = "p"
		else if(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]=="none"&&player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]!=="p") player["tree-tab"].holyFuckingShitNoFuckingWayBro[1] = "p"
		else if((player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]=="p"&&player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]!=="none")||(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]=="p"&&player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]!=="none")){
			if (canReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0])) doReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0])
			if (canReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1])) doReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1])
		}
	},
    onHold() {
		if(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]=="none") player["tree-tab"].holyFuckingShitNoFuckingWayBro[0] = "p"
		else if(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]=="none"&&player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]!=="p") player["tree-tab"].holyFuckingShitNoFuckingWayBro[1] = "p"
		else if((player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]=="p"&&player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]!=="none")||(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]=="p"&&player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]!=="none")){
			if (canReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0])) doReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0])
			if (canReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1])) doReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1])
		}
	},
    nodeStyle(){return{
        "position": "absolute",
        "transform": "scale("+(player.p.unlocked?player["tree-tab"].coolMobileStuff[1]:0)+","+new Decimal(1.176470588).sub(player["tree-tab"].coolMobileStuff[1].mul(0.176470588))+")",
        "margin-left": player["tree-tab"].coolMobileStuff[1].mul(55).add(15).mul(-1)+"px",   
        "margin-top": "8px",
        "z-index": "0",
        "box-shadow": "0px 0px "+(options.additionalMobileShortcuts?new Decimal(100).sub(player["tree-tab"].coolMobileStuff[1].mul(100)):player["tree-tab"].coolMobileStuff[1].mul(100))+"px "+tmp.p.color+",0px 0px "+(canReset("p")&&player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("p")?20:0)+"px white", 
        "font-size":"0px",
        "height": "85px",
        "width": "150px",
        "border-radius": "25% 0% 0% 25%",
    }},
    layerShown(){return player["tree-tab"].shown[0]}
})

addNode("pNodeBond", {
    color(){return tmp.p.color}, 
    row: 0,
    position: 1,
    symbol(){return `<p style='margin-left: -80px;font-size:16px; transform: scale(0.65,1);'>Order: ${player["tree-tab"].holyFuckingShitNoFuckingWayBro[1].includes("p")?"2":player["tree-tab"].holyFuckingShitNoFuckingWayBro[0].includes("p")?"1":""}</p><br><p style='margin-left: -80px;font-size:16px; transform: scale(0.65,1);'>Click To</p><br><p style='margin-left: -80px;font-size:16px; transform: scale(0.65,1);'>Unbond</p>`},
    canClick() {return true},
	onClick(){
		if(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0].includes("p")){
			player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]="none"
			player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]="none"
		}
	},
	onHold(){
		if(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0].includes("p")){
			player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]="none"
			player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]="none"
		}
	},
    nodeStyle(){return{
        "position": "absolute",
        "transform": "scale("+(player.p.unlocked&&(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]=="p"||player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]=="p")?player["tree-tab"].coolMobileStuff[1]:0)+","+new Decimal(1.176470588).sub(player["tree-tab"].coolMobileStuff[1].mul(0.176470588))+")",
        "margin-left": player["tree-tab"].coolMobileStuff[1].mul(120).add(15).mul(-1)+"px",   
        "margin-top": "16px",
        "z-index": "0",
        "box-shadow": "0px 0px "+(canReset("p")&&player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("p")?20:0)+"px white", 
        "font-size":"0px",
        "height": "70px",
        "width": "150px",
        "border-radius": "25% 0% 0% 25%",
    }},
    layerShown(){return player["tree-tab"].shown[0]}
})

addNode("sNode", {
    color(){return tmp.s.color},
    row: 1,
    position: 1,
    symbol(){return `<span style='margin-left: 64px;font-size:16px;'>Space<br><span style='margin-left: 64px;font-size:16px;'>Reset<br><span style='margin-left: 64px;font-size:15px;'>(+${formatWhole(getResetGain("s"))})<br><p style='margin-left: 64px;font-size:8px; transform: scale(1.25, 1.5);'>Prestige Points:<br><p style='margin-left: 64px;font-size:8px; transform: scale(1.25, 1.5);'>[${format(player.p.points)} / ${format(tmp.s.nextAt)}]`},
    canClick() {return true},
	onClick() {if (canReset("s")) doReset("s")},
    onHold() {if (canReset("s")) doReset("s")},
    nodeStyle(){return{
        "position": "absolute",
        "transform": "scale("+(player.s.unlocked?player["tree-tab"].coolMobileStuff[0]:0)+","+new Decimal(1.176470588).sub(player["tree-tab"].coolMobileStuff[0].mul(0.176470588))+")",
        "margin-left": player["tree-tab"].coolMobileStuff[0].mul(55).sub(135)+"px",    
        "margin-top": "8px",
        "z-index": "0",
        "box-shadow": "0px 0px "+(canReset("s")?20:0)+"px white,0px 0px "+(options.mobileShortcuts?new Decimal(100).sub(player["tree-tab"].coolMobileStuff[0].mul(100)):player["tree-tab"].coolMobileStuff[0].mul(100))+"px "+tmp.s.color, 
        "font-size":"0px",
        "height": "85px",
        "width": "150px",
        "border-radius": "0% 25% 25% 0%",
    }},
    layerShown(){return player.s.unlocked}
})

addNode("sNodeExtra", {
    color(){return tmp.s.color},
    row: 0,
    position: 1,
    symbol(){return `<span style='margin-left: -60px;font-size:16px;'>Passive<br><span style='margin-left: -60px;font-size:16px;'>Gain:<br><span style='margin-left: -60px;font-size:15px;'>${format(getResetGain("s").mul(tmp.s.passiveGeneration))}/sec<br><p style='margin-left: -60px;font-size:8px; transform: scale(1.25, 1.5);'>Total Size:<br><p style='margin-left: -60px;font-size:8px; transform: scale(1.25, 1.5);'>${format(tmp.s.totalSize)}px³`},
    canClick() {return true},
	onClick(){
		if(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]=="none") player["tree-tab"].holyFuckingShitNoFuckingWayBro[0] = "s"
		else if(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]=="none"&&player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]!=="s") player["tree-tab"].holyFuckingShitNoFuckingWayBro[1] = "s"
		else if((player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]=="s"&&player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]!=="none")||(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]=="s"&&player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]!=="none")){
			if (canReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0])) doReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0])
			if (canReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1])) doReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1])
		}
	},
    onHold() {
		if(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]=="none") player["tree-tab"].holyFuckingShitNoFuckingWayBro[0] = "s"
		else if(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]=="none"&&player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]!=="s") player["tree-tab"].holyFuckingShitNoFuckingWayBro[1] = "s"
		else if((player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]=="s"&&player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]!=="none")||(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]=="s"&&player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]!=="none")){
			if (canReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0])) doReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0])
			if (canReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1])) doReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1])
		}
	},
    nodeStyle(){return{
        "position": "absolute",
        "transform": "scale("+(player.s.unlocked?player["tree-tab"].coolMobileStuff[1]:0)+","+new Decimal(1.176470588).sub(player["tree-tab"].coolMobileStuff[1].mul(0.176470588))+")",
        "margin-left": player["tree-tab"].coolMobileStuff[1].mul(55).add(15).mul(-1)+"px",   
        "margin-top": "8px",
        "z-index": "0",
        "box-shadow": "0px 0px "+(options.additionalMobileShortcuts?new Decimal(100).sub(player["tree-tab"].coolMobileStuff[1].mul(100)):player["tree-tab"].coolMobileStuff[1].mul(100))+"px "+tmp.s.color+",0px 0px "+(canReset("s")&&player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("s")?20:0)+"px white", 
        "font-size":"0px",
        "height": "85px",
        "width": "150px",
        "border-radius": "25% 0% 0% 25%",
    }},
    layerShown(){return player.s.unlocked}
})

addNode("sNodeBond", {
    color(){return tmp.s.color}, 
    row: 0,
    position: 1,
    symbol(){return `<p style='margin-left: -80px;font-size:16px; transform: scale(0.65,1);'>Order: ${player["tree-tab"].holyFuckingShitNoFuckingWayBro[1].includes("s")?"2":player["tree-tab"].holyFuckingShitNoFuckingWayBro[0].includes("s")?"1":""}</p><br><p style='margin-left: -80px;font-size:16px; transform: scale(0.65,1);'>Click To</p><br><p style='margin-left: -80px;font-size:16px; transform: scale(0.65,1);'>Unbond</p>`},
    canClick() {return true},
	onClick(){
		if(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0].includes("s")){
			player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]="none"
			player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]="none"
		}
	},
	onHold(){
		if(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0].includes("s")){
			player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]="none"
			player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]="none"
		}
	},
    nodeStyle(){return{
        "position": "absolute",
        "transform": "scale("+(player.p.unlocked&&(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]=="s"||player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]=="s")?player["tree-tab"].coolMobileStuff[1]:0)+","+new Decimal(1.176470588).sub(player["tree-tab"].coolMobileStuff[1].mul(0.176470588))+")",
        "margin-left": player["tree-tab"].coolMobileStuff[1].mul(120).add(15).mul(-1)+"px",   
        "margin-top": "16px",
        "z-index": "0",
        "box-shadow": "0px 0px "+(canReset("s")&&player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("s")?20:0)+"px white", 
        "font-size":"0px",
        "height": "70px",
        "width": "150px",
        "border-radius": "25% 0% 0% 25%",
    }},
    layerShown(){return player.s.unlocked}
})

addNode("tNode", {
    color(){return tmp.t.color},
    row: 1,
    position: 1,
    symbol(){return `<span style='margin-left: 64px;font-size:16px;'>Time<br><span style='margin-left: 64px;font-size:16px;'>Reset<br><span style='margin-left: 64px;font-size:15px;'>(+${formatWhole(canReset("t")?1:0)})<br><p style='margin-left: 64px;font-size:8px; transform: scale(1.25, 1.5);'>Points:<br><p style='margin-left: 64px;font-size:8px; transform: scale(1.25, 1.5);'>[${format(player.points)} / ${format(tmp.t.nextAt)}]`},
    canClick() {return true},
	onClick() {if (canReset("t")) doReset("t")},
    onHold() {if (canReset("t")) doReset("t")},
    nodeStyle(){return{
        "position": "absolute",
        "transform": "scale("+(player.t.unlocked?player["tree-tab"].coolMobileStuff[0]:0)+","+new Decimal(1.176470588).sub(player["tree-tab"].coolMobileStuff[0].mul(0.176470588))+")",
        "margin-left": player["tree-tab"].coolMobileStuff[0].mul(55).sub(135)+"px",   
        "margin-top": "8px",
        "z-index": "0",
        "box-shadow": "0px 0px "+(canReset("t")?20:0)+"px white,0px 0px "+(options.mobileShortcuts?new Decimal(100).sub(player["tree-tab"].coolMobileStuff[0].mul(100)):player["tree-tab"].coolMobileStuff[0].mul(100))+"px "+tmp.t.color, 
        "font-size":"0px",
        "height": "85px",
        "width": "150px",
        "border-radius": "0% 25% 25% 0%",
    }},
    layerShown(){return player.t.unlocked}
})

addNode("tNodeExtra", {
    color(){return tmp.t.color},
    row: 0,
    position: 1,
    symbol(){return `<span style='margin-left: -60px;font-size:16px;'>Passive<br><span style='margin-left: -60px;font-size:16px;'>Gain:<br><span style='margin-left: -60px;font-size:15px;'>${format(getResetGain("t").mul(tmp.t.passiveGeneration))}/sec<br><p style='margin-left: -60px;font-size:8px; transform: scale(1.25, 1.5);'>Time Points:<br><p style='margin-left: -60px;font-size:8px; transform: scale(1.25, 1.5);'>${format(player.t.timePoints)} time points`},
    canClick() {return true},
	onClick(){
		if(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]=="none") player["tree-tab"].holyFuckingShitNoFuckingWayBro[0] = "t"
		else if(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]=="none"&&player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]!=="t") player["tree-tab"].holyFuckingShitNoFuckingWayBro[1] = "t"
		else if((player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]=="t"&&player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]!=="none")||(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]=="t"&&player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]!=="none")){
			if (canReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0])) doReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0])
			if (canReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1])) doReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1])
		}
	},
    onHold() {
		if(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]=="none") player["tree-tab"].holyFuckingShitNoFuckingWayBro[0] = "t"
		else if(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]=="none"&&player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]!=="t") player["tree-tab"].holyFuckingShitNoFuckingWayBro[1] = "t"
		else if((player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]=="t"&&player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]!=="none")||(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]=="t"&&player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]!=="none")){
			if (canReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0])) doReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0])
			if (canReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1])) doReset(player["tree-tab"].holyFuckingShitNoFuckingWayBro[1])
		}
	},
    nodeStyle(){return{
        "position": "absolute",
        "transform": "scale("+(player.t.unlocked?player["tree-tab"].coolMobileStuff[1]:0)+","+new Decimal(1.176470588).sub(player["tree-tab"].coolMobileStuff[1].mul(0.176470588))+")",
        "margin-left": player["tree-tab"].coolMobileStuff[1].mul(55).add(15).mul(-1)+"px",   
        "margin-top": "8px",
        "z-index": "0",
        "box-shadow": "0px 0px "+(options.additionalMobileShortcuts?new Decimal(100).sub(player["tree-tab"].coolMobileStuff[1].mul(100)):player["tree-tab"].coolMobileStuff[1].mul(100))+"px "+tmp.t.color+",0px 0px "+(canReset("t")&&player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("t")?20:0)+"px white",  
        "font-size":"0px",
        "height": "85px",
        "width": "150px",
        "border-radius": "25% 0% 0% 25%",
    }},
    layerShown(){return player.t.unlocked}
})

addNode("tNodeBond", {
    color(){return tmp.t.color}, 
    row: 0,
    position: 1,
    symbol(){return `<p style='margin-left: -80px;font-size:16px; transform: scale(0.65,1);'>Order: ${player["tree-tab"].holyFuckingShitNoFuckingWayBro[1].includes("t")?"2":player["tree-tab"].holyFuckingShitNoFuckingWayBro[0].includes("t")?"1":""}</p><br><p style='margin-left: -80px;font-size:16px; transform: scale(0.65,1);'>Click To</p><br><p style='margin-left: -80px;font-size:16px; transform: scale(0.65,1);'>Unbond</p>`},
    canClick() {return true},
	onClick(){
		if(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]=="t"||player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]!=="t"){
			player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]="none"
			player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]="none"
		}
	},
	onHold(){
		if(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]=="t"||player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]!=="t"){
			player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]="none"
			player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]="none"
		}
	},
    nodeStyle(){return{
        "position": "absolute",
        "transform": "scale("+(player.p.unlocked&&(player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]=="t"||player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]=="t")?player["tree-tab"].coolMobileStuff[1]:0)+","+new Decimal(1.176470588).sub(player["tree-tab"].coolMobileStuff[1].mul(0.176470588))+")",
        "margin-left": player["tree-tab"].coolMobileStuff[1].mul(120).add(15).mul(-1)+"px",   
        "margin-top": "16px",
        "z-index": "0",
        "box-shadow": "0px 0px "+(canReset("t")&&player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("t")?20:0)+"px white", 
        "font-size":"0px",
        "height": "70px",
        "width": "150px",
        "border-radius": "25% 0% 0% 25%",
    }},
    layerShown(){return player.t.unlocked}
})

addNode("penis", {
    row: 0,
    position: 1,
    symbol: "P",
    canClick() {return true},
	onClick() {
		player.tab = "her"
		player.her.sheWasSeen = true
	},
	shouldNotify(){return (player.her.herLog[1]==1 && player.her.buyables["progress"].eq(0)) || (player.her.whatCouldPossiblyGoWrong && player.her.buyables["progress"].eq(1) && player.her.herPoints.lte(0))},
	glowColor(){return "rgb(0,255,255)"},
    layerShown(){return !player.her.accessDenied}
})

addLayer("tree-tab", {
    startData() { return {
        coolMobileStuff: [new Decimal(0),new Decimal(0)],
		holyFuckingShitNoFuckingWayBro: ["none","none"],
        display: "",
        currentDialogueSymbol: 0,
        specialEventsCounter: 0,
        powerLevel: new Decimal(5),
        didyoujustcloseonme: ["", "", ""],
        dialogueNumber: 0,
        requirements: [],
        requirementsCleared: true,
        bruhCooldown: new Decimal(0),
        nextDialogue: false, 
        dialoguePath: 0,
        versionVibeCheck: "",
        resetCounters: [0,0,"",0],
        waitingForNextDialogue: [],
        youShouldStopYourselfNOW: false,
		heFuckingCheated: false,
        shown: [false, false, false, false]
    }},
    update(diff){ 
		if(player["tree-tab"].youShouldStopYourselfNOW) player.devSpeed = -1.7976931348623157e+308
        player["tree-tab"].coolMobileStuff[0] = player["tree-tab"].coolMobileStuff[0].add(diff*(options.mobileShortcuts?1:-1)).max(0).min(1)
        player["tree-tab"].coolMobileStuff[1] = player["tree-tab"].coolMobileStuff[1].add(diff*(options.additionalMobileShortcuts?1:-1)).max(0).min(1)
        if(player.p.points.gt(969696969)) player.p.points = new Decimal(969696969)
		if(player.p.upgrades.length>0 && !player["tree-tab"].shown[0] && player["tree-tab"].dialoguePath !== 3) {
            player["tree-tab"].dialoguePath = 4
            player["tree-tab"].currentDialogueSymbol = 0
            player["tree-tab"].dialogueNumber = 0
            player["tree-tab"].display = ''
            player["tree-tab"].specialEventsCounter = 0
        }
        player.s.secondDimension = tmp.s.secondDimension
        if(player["tree-tab"].versionVibeCheck=="") player["tree-tab"].versionVibeCheck = VERSION.num
        if(player["tree-tab"].versionVibeCheck!==VERSION.num){
            tmp.gameEnded = false
            player["tree-tab"].youShouldStopYourselfNOW = false
            player["tree-tab"].versionVibeCheck = VERSION.num
        }
        if(!(player["tree-tab"].didyoujustcloseonme[0]=='')){
            options.skipDialogueErasure = false
            options.fastForwardDialogue = false
            player["tree-tab"].nextDialogue = false
            if(player["tree-tab"].bruhCooldown.lte(0)){
                player["tree-tab"].waitingForNextDialogue = player["tree-tab"].didyoujustcloseonme[2]
                player["tree-tab"].nextDialogue = player["tree-tab"].didyoujustcloseonme[1]
                player["tree-tab"].display = player["tree-tab"].didyoujustcloseonme[0]
                player["tree-tab"].didyoujustcloseonme[0] = ''
            }
        }
        if(player.infoboxes["tree-tab"]["lore"] && !(player["tree-tab"].didyoujustcloseonme[0]=='')){
            player = getStartPlayer()
            save();
            window.location.reload();
        }
        if(player.infoboxes["tree-tab"]["lore"]){
            player.infoboxes["tree-tab"]["lore"] = false
            player["tree-tab"].didyoujustcloseonme[0] = player["tree-tab"].display
            player["tree-tab"].didyoujustcloseonme[1] = player["tree-tab"].nextDialogue
            player["tree-tab"].didyoujustcloseonme[2] = player["tree-tab"].waitingForNextDialogue
            player["tree-tab"].nextDialogue = false
            player["tree-tab"].display = `<p style ='transform: scale(1.85,12);color: red;text-shadow: 0px 0px 4px purple;font-family: Comic Sans;font-size:20px;'>don't do it ever fucking again.`
            player["tree-tab"].bruhCooldown = new Decimal(5)
			exportSave()
            save(true)
        }
        let randomizer = new Decimal(Math.random() * Math.PI)
        if(player["tree-tab"].waitingForNextDialogue==``) player["tree-tab"].waitingForNextDialogue = player["tree-tab"].waitingForNextDialogue.concat(
            0,false,[[`hasUpgrade("p",22)`,`player.yourGod.hasBeenSeen&&player.tab !== 'yourGod'&&player.tab !== 'her'`]]
        )
        if(eval(player["tree-tab"].waitingForNextDialogue[2][player["tree-tab"].waitingForNextDialogue[0]])&&player["tree-tab"].waitingForNextDialogue[1]){
            if(player["tree-tab"].waitingForNextDialogue[0]==0) player["tree-tab"].shown[1] = true
            player["tree-tab"].waitingForNextDialogue[0] = player["tree-tab"].waitingForNextDialogue[0] + 1
            player["tree-tab"].waitingForNextDialogue[1] = false
        }
        player["tree-tab"].bruhCooldown = options.fastForwardDialogue ? new Decimal(0) : player["tree-tab"].bruhCooldown.sub((player["tree-tab"].bruhCooldown.gte(0) || !(player["tree-tab"].didyoujustcloseonme[0]=='')) ? diff : 0)
        if(!tmp.gameEnded && !player["tree-tab"].youShouldStopYourselfNOW && player["tree-tab"].display!=`<p style ='transform: scale(1.85,12);color: red;text-shadow: 0px 0px 4px purple;font-family: Comic Sans;font-size:20px;'>don't do it ever fucking again.` && player["tree-tab"].currentDialogueSymbol<tmp["tree-tab"].theThing[player["tree-tab"].dialoguePath][player["tree-tab"].dialogueNumber].length && player["tree-tab"].bruhCooldown.lte(0) && !player["tree-tab"].waitingForNextDialogue[1]){
            switch(tmp["tree-tab"].theThing[player["tree-tab"].dialoguePath][player["tree-tab"].dialogueNumber][player["tree-tab"].currentDialogueSymbol]){
                case '@':
                    player["tree-tab"].display = player["tree-tab"].display + "<br>"
                    break;
                case `^`:
                    let a = player["tree-tab"].display
                    tmp.gameEnded = true
                    player["tree-tab"].youShouldStopYourselfNOW = true
                    clearParticles()
                    player["tree-tab"].display = a
                    break;
                case '{':
                    player["tree-tab"].display = player["tree-tab"].display + "<br>"
                    player["tree-tab"].bruhCooldown = new Decimal(2)
                    break;
                case '}':
                    player["tree-tab"].display = player["tree-tab"].display.slice(0,-4)
                    break;
                case '*':
                    player["tree-tab"].display = player["tree-tab"].display.slice(0,-1)
                    break;
                case ';':
                    player["tree-tab"].display = player["tree-tab"].display + "."
                    player["tree-tab"].bruhCooldown = new Decimal(2)
                    break;
                case '#':
                    player["tree-tab"].display = player["tree-tab"].display + "."
                    player["tree-tab"].bruhCooldown = new Decimal(1)
                    break;
                case '@':
                    player["tree-tab"].display = player["tree-tab"].display + "."
                    player["tree-tab"].bruhCooldown = new Decimal(1)
                    break;
                case '?':
                    player["tree-tab"].display = player["tree-tab"].display + "?"
                    player["tree-tab"].bruhCooldown = new Decimal(1)
                    break;
                case '!':
                    player["tree-tab"].display = player["tree-tab"].display + "!"
                    player["tree-tab"].bruhCooldown = new Decimal(1)
                    break;
                case ',':
                    player["tree-tab"].display = player["tree-tab"].display + ","
                    player["tree-tab"].bruhCooldown = new Decimal(0.5)
                    break;
                case '&':
                    if(tmp["tree-tab"].specialEvents[player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][0]=="requirements"){
                        player["tree-tab"].requirements =  [
                            [[[new Decimal(16).mul(randomizer.root(2)).round(), modInfo.pointsName, "player.points", "none"], [new Decimal(4).mul(new Decimal(Math.PI-randomizer).root(4)).round(), tmp.p.resource, "player.p.points", "p"]]],
                            [[[new Decimal(600).mul(randomizer.root(2)).round(), modInfo.pointsName, "player.points", "none"], [new Decimal(100).mul(new Decimal(Math.PI-randomizer).root(4)).round(), tmp.p.resource, "player.p.points", "p"],["PICK ONE OF UPGRADES", 'hasUpgrade("p",21)||hasUpgrade("p",23)']]],
                            [[[new Decimal(69000).mul(randomizer.root(2)).round(), modInfo.pointsName, "player.points", "none"], [new Decimal(4200).mul(new Decimal(Math.PI-randomizer).root(4)).round(), tmp.p.resource, "player.p.points", "p"]]],
                            [[[new Decimal(17742.85714).mul(randomizer.root(2)).round(), modInfo.pointsName, "player.points", "none"], [new Decimal(10800).mul(new Decimal(Math.PI-randomizer).root(4)).round(), tmp.p.resource, "player.p.points", "p"]]],
                            [[["GET THE OTHER UPGRADE", 'hasUpgrade("p",23)']]],
                            [[["GET THE OTHER UPGRADE", 'hasUpgrade("p",21)']]],
                        ][tmp["tree-tab"].specialEvents[player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1]]
                        player["tree-tab"].requirementsCleared = false
                        let display = ``
                        for(i=0;i<player["tree-tab"].requirements[0].length;i++){
                            if(player["tree-tab"].requirements[0][i].length == 2) display = display+`<br>${player["tree-tab"].requirements[0][i][0].toUpperCase()}`
                            else display = display+`<br>${formatWhole(player["tree-tab"].requirements[0][i][0])} ${player["tree-tab"].requirements[0][i][1].toUpperCase()}`
                        }
                        player["tree-tab"].display = player["tree-tab"].display + `<br><br>REQUIREMENTS:`+display
                    }
                    else if(tmp["tree-tab"].specialEvents[player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][0]=="addPlayerValue"){
                        for(let i=0;i+1<tmp["tree-tab"].specialEvents[player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][1].length;i++){
                            player[tmp["tree-tab"].specialEvents[player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][0]][tmp["tree-tab"].specialEvents[player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][1][0]] = player[tmp["tree-tab"].specialEvents[player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][0]][tmp["tree-tab"].specialEvents[player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][1][0]].concat(tmp["tree-tab"].specialEvents[player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][1][i+1])
                        }
                    }
                    else if(tmp["tree-tab"].specialEvents[player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][0]=="changePlayerValue"){
                        for(let i=0;i+1<tmp["tree-tab"].specialEvents[player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][1].length;i++){
                            if (tmp["tree-tab"].specialEvents[player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][1].length==2) player[tmp["tree-tab"].specialEvents[player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][0]][[tmp["tree-tab"].specialEvents[player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][1][0]][0]] = tmp["tree-tab"].specialEvents[player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][1][i+1]
                            else player[tmp["tree-tab"].specialEvents[player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][0]][[tmp["tree-tab"].specialEvents[player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][1][0]][0]][i] = tmp["tree-tab"].specialEvents[player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][1][i+1]
                        }
                    }
                    player["tree-tab"].specialEventsCounter = player["tree-tab"].specialEventsCounter+1
                    break;
                case '|':
                    player["tree-tab"].waitingForNextDialogue[1] = true 
                    break;
                default:
                    player["tree-tab"].display = player["tree-tab"].display + tmp["tree-tab"].theThing[player["tree-tab"].dialoguePath][player["tree-tab"].dialogueNumber][player["tree-tab"].currentDialogueSymbol]
                    break;
            }
            player["tree-tab"].currentDialogueSymbol = player["tree-tab"].currentDialogueSymbol+1
        }
        if(player["tree-tab"].currentDialogueSymbol>=tmp["tree-tab"].theThing[player["tree-tab"].dialoguePath][player["tree-tab"].dialogueNumber].length && player["tree-tab"].dialogueNumber != tmp["tree-tab"].theThing[player["tree-tab"].dialoguePath].length && !player["tree-tab"].nextDialogue && player["tree-tab"].requirementsCleared){
            player["tree-tab"].bruhCooldown = new Decimal(2)
            player["tree-tab"].nextDialogue = true
        }
        if(player["tree-tab"].requirements!==''&&!player["tree-tab"].requirementsCleared){
            let check = 0
            for(i=0;i<player["tree-tab"].requirements[0].length;i++){
                if(player["tree-tab"].requirements[0][i].length==2) check = check+(eval(player["tree-tab"].requirements[0][i][1])?1:0)
                else check = check+(eval(player["tree-tab"].requirements[0][i][2]).gte(player["tree-tab"].requirements[0][i][0])?1:0)
            }
            if(new Decimal(check).gte(player["tree-tab"].requirements[0].length)){
                for(i=0;i<player["tree-tab"].requirements[0].length;i++){
                    if(player["tree-tab"].requirements[0][i].length==2) check = check
                    else if(player["tree-tab"].requirements[0][i][3]=="none") player.points = player.points.sub(player["tree-tab"].requirements[0][i][0])
                    else player[player["tree-tab"].requirements[0][i][3]].points =  player[player["tree-tab"].requirements[0][i][3]].points.sub(new Decimal(player["tree-tab"].requirements[0][i][0]))
                }
                player["tree-tab"].display = ""
                player["tree-tab"].requirementsCleared = true
                player["tree-tab"].nextDialogue = true
            }
        }
        if(player["tree-tab"].bruhCooldown.lte(0) && player["tree-tab"].nextDialogue && !player["tree-tab"].waitingForNextDialogue[1]){
            if(player["tree-tab"].display.endsWith(">")) player["tree-tab"].display = player["tree-tab"].display.slice(0,-4)
            else player["tree-tab"].display = options.skipDialogueErasure ? '' : player["tree-tab"].display.slice(0,-1)
            if(player["tree-tab"].display==''){
                player["tree-tab"].currentDialogueSymbol = 0
                player["tree-tab"].bruhCooldown = new Decimal(2)
                player["tree-tab"].dialogueNumber = player["tree-tab"].dialogueNumber + 1
                player["tree-tab"].nextDialogue = false
            }
        }
    },
    specialEvents(){return [
            [
                ["changePlayerValue", ["tree-tab",["shown",true,false,false,false]]],
                ["requirements", 0],
                ["addPlayerValue", ["p",["upgradesUnlocked",12,13,22]]],
                ["changePlayerValue", ["a",["funkyStyle",30,8,"lightgreen"]]],
                ["changePlayerValue", ["a",["unlockedTabs",true,true]]],
                ["addPlayerValue", ["p",["upgradesUnlocked",21,23]]],
                ["requirements", 1],
            ],
            [
                ["changePlayerValue", ["s",["unlocked",true]]],
                ["requirements", 2],
                ["changePlayerValue", ["yourGod",["isAlreadyHere",true]]],
                ["changePlayerValue", ["yourGod",["unlocked",true]]],
                ["changePlayerValue", ["tree-tab",["shown",true,true,true,true]]],
				["changePlayerValue", ["yourGod",["lowerSpaceTimeUpgradeCost",true]]],
                ["requirements", 4],
            ],
            [
                ["changePlayerValue", ["t",["unlocked",true]]],
                ["requirements", 3],
                ["changePlayerValue", ["yourGod",["isAlreadyHere",true]]],
                ["changePlayerValue", ["yourGod",["unlocked",true]]],
                ["changePlayerValue", ["tree-tab",["shown",true,true,true,true]]],
				["changePlayerValue", ["yourGod",["lowerSpaceTimeUpgradeCost",true]]],
                ["requirements", 5],
            ],
            [
                ["changePlayerValue", ["s",["unlocked",true]]],
                ["changePlayerValue", ["t",["unlocked",true]]],
            ],
            [
                ["changePlayerValue", ["yourGod",["youreFuckedBuddy",true]]],
            ]
        ]
    },
    theThing(){return [
            [
            `HEY YOU.{YES, YOU.{IT IS A PLEASURE TO MEET YOU AGAIN.@{SO BASICALLY##; I NEED YOUR HELP.`,
            `YEAH, I KNOW WHAT YOU MIGHT BE THINKING, "WHO@IS THIS SELF-ESTEEMED AND HANDSOME LOOKING@INDIVIDUAL?"{IT DOESN'T MATTER.`,
            `WHAT MATTERS IS THAT YOU NEED TO GATHER@RESOURCES.{"WHY?", YOU MAY ASK##; WELL##; UH, YOU KNOW.@{STUFF.{CAN'T PROGRESS WITHOUT LAYERS, YOU KNOW.`,
            `I THINK WE BOTH KNOW WHERE THIS IS GOING NOW;&&`,
            `TERRIBLE JOB SUPERSH}}}}}I MEAN-}}WELL DONE.`,
            `I APPRECIATE YOUR EFFORT, I'M HONEST##; FORGET@WHAT I WAS ABOUT TO WRITE BEFORE.`,
            `I'VE DECIDED THAT YOU DESERVE SOMETHING.{HERE ARE SOME UPGRADES FOR NOW;&@{I'LL BE BACK FOR SOME MORE.`,
            `UNTIL THEN, GOODBYE.|`,
            `HEY, WOULD YOU LOOK AT THAT; YOU JUST UNLOCKED@THE ACHIEVEMENT LAYER.{@COOL, HUH?`,
            `# # ; OKAY MAYBE NOT, BUT IT'S STILL SOMETHING.@{WE CAN DO BETTER.{LET ME JUST##&;`,
            `ALRIGHT, THIS SHOULD DO IT.@{UH. NO, THAT WON'T DO.@{YOU'RE GONNA NEED THIS, TRUST ME.&`,
            `HOW'S THAT FOR ACHIEVEMENT LAYER?@{YEAH, IT'S KINDA DULL.`,
            `##; RIGHT, THE LAYERS.{YOU NEED MORE OF THEM TO SET ME FREE.`,
            `I'LL LEND YOU MORE UPGRADES JUST INCASE.@{NOW CHOP CHOP AND DO ME A THING OR TWO.&&`,
            ],
            [
            `silly`,
            `HMMM, SO YOU CHOSE SPACE LAYER, HUH.@{INTERESTING##; LIKE I COULD GIVE A DAMN ABOUT IT.`,
            `EITHER WAY, WELL DONE UN&LOCKING THAT LAYER##;@{SPEAKING OF, WE NEED THE CONTENT.`,
            `MY RESOURCES ARE STILL VERY LIMINAL.@{NONETHELESS, I'LL TRY MY BEST TO EXPAND IT.@@(GET IT?)`,
            `BUT ENOUGH CHIT CHATTING, I STILL HAVE ONE MORE@FEATURE TO IMPLEMENT.`,
            `TRUST ME, BUDDY.@{IT.{WILL.{BE.{WORTH IT;&`,
            `LET'S FUCKING GOOOOOOOOOOOOOOOOOO-}}}}}}}}}@@@{my bad lmao.`,
            `WELL, AS PROMISED, I'LL BESTOW YOU WITH THE@BEST IDEA I HAD IN MIND.@{I JUST NEED SOME TIME TO IMPLEMENT IT PROPERLY.`,
            `DOWNLOADING L-X.ZIP##;@{EXPORTING L-X.ZIP: 0%  } 1% } 2% } 6% } 25% } 34% } 63% } 76% } 84% } 89% } 93% } 94% } 96% } 97% } 98% } 99% } 100%_*_*_*`,
            `/INSTALL ANTI_BALANCER.LAYER##;&@{ANTI_BALANCER.LAYER HAS BEEN SUCCESSFULLY@INSTALLED.`,
            `. . . WELL? WHAT ARE YOU WAITING FOR?@{WHY WON'T YOU TAKE A LOOK FOR YOURSELF?`,
            `... OH RIGHT, I FORGOT TO UNLOCK IT.@{EITHER WAY, I'LL BE BACK ONCE YOU'RE DONE@ADMIRING ITS HEIGHTENED PERFECTION.&|`,
            `WELL... UH, I FORGOT WHAT I WANTED TO SAY.@{SINCE YOU'RE ALREADY HERE, MIGHT AS WELL LET@YOU GET THE OTHER LAYER.`,
            `I'LL HAND YOU OVER THAT LAYER#&#;@{EXCEPT NOW YOU HAVE TO UNLOCK IT TOO.@{JUST LIKE IN EA.`,
			`ALL I'M GONNA SAY IS GOOD LUCK WITH THAT ONE;&&`,
			`WELL DONE.@}VERY, WELL DONE.&`,
			
            ],
            [
            `ollie`,
            `HMMM, SO YOU CHOSE TIME LAYER, HUH.@{INTERESTING##; LIKE I HAVE A TIME TO CARE ABOUT IT.`,
            `EITHER WAY, WELL DONE UN&LOCKING THAT LAYER##;@{SPEAKING OF, WE NEED THE CONTENT.`,
            `MY RESOURCES ARE STILL VERY DILATED.@{NONETHELESS, I'LL TRY MY BEST TO ACCELERATE IT.@@(GET IT?)`,
            `BUT ENOUGH CHIT CHATTING, I STILL HAVE ONE MORE@FEATURE TO IMPLEMENT.`,
            `TRUST ME, BUDDY.@{IT.{WILL.{BE.{WORTH IT;&`,
            `LET'S FUCKING GOOOOOOOOOOOOOOOOOO-}}}}}}}}}@@@{my bad lmao.`,
            `WELL, AS PROMISED, I'LL BESTOW YOU WITH THE@BEST IDEA I HAD IN MIND.@{I JUST NEED SOME TIME TO IMPLEMENT IT PROPERLY.`,
            `DOWNLOADING L-X.ZIP##;@{EXPORTING L-X.ZIP: 0%  } 1% } 2% } 6% } 25% } 34% } 63% } 76% } 84% } 89% } 93% } 94% } 96% } 97% } 98% } 99% } 100%_*_*_*`,
            `/INSTALL ANTI_BALANCER.LAYER##;&@{ANTI_BALANCER.LAYER HAS BEEN SUCCESSFULLY@INSTALLED.`,
            `. . . WELL? WHAT ARE YOU WAITING FOR?@{WHY WON'T YOU TAKE A LOOK FOR YOURSELF?`,
            `... OH RIGHT, I FORGOT TO UNLOCK IT.@{EITHER WAY, I'LL BE BACK ONCE YOU'RE DONE@ADMIRING ITS HEIGHTENED PERFECTION.&|`,
            `WELL... UH, I FORGOT WHAT I WANTED TO SAY.@{SINCE YOU'RE ALREADY HERE, MIGHT AS WELL LET@YOU GET THE OTHER LAYER.`,
            `I'LL HAND YOU OVER THAT LAYER#&#;@{EXCEPT NOW YOU HAVE TO UNLOCK IT TOO.@{JUST LIKE IN EA.`,
			`ALL I'M GONNA SAY IS GOOD LUCK WITH THAT ONE;&&`
            ],
            [
            `bitch we haven't even started@@just@@get the fuck outta my game&|`,
            `im bussin *SONIC.EXE LAUGHTER*`
            ]
        ]
    },
    infoboxes: {
        lore: {
            title(){return `<p style ='transform: scale(1.333333333, 1);color: black;font-family: Impact;font-size:20px;-webkit-text-stroke:1px cyan;'>...`},
            body() { return `<p style ='transform: scale(1.333333333, 1);color: black;font-family: Impact;font-size:20px;-webkit-text-stroke:1px cyan;text-align:left;margin-left:82px;'>`+player["tree-tab"].display },
            titleStyle(){
                return {
                    "width": "128px",
                    "background-color": "black",
                    "border": "lime 4px solid",
                    "box-shadow": "0px 0px 4px lime",
                    "margin-left":`${player["tree-tab"].didyoujustcloseonme[0] == '' ? "0px" : "50000px"}`
                }
            },
            bodyStyle(){
                return {
                    "height":"256px",
                    "color": "lime",
                    "background-color": "black",
                    "box-shadow": "0px 0px 4px lime",
                    "margin-bottom": "-4px"
                }
            }
        },
    },
    tabFormat: [["infobox", "lore"], ["tree", function() {return [["pNodeBond","pNodeExtra","p", "pNode"],["sNodeBond","sNodeExtra","s","sNode","blank","tNodeBond","tNodeExtra","t","tNode"]]}]],
    previousTab: "",
    leftTab: true,
})

