var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", { 
    layerShown: "ghost",
}), 

addNode("blankRow2", { 
    layerShown: "ghost",
    nodeStyle(){return{
        width: (player["tree-tab"].shown[2]&&player["tree-tab"].shown[3]?player["tree-tab"].coolMobileStuff[0].mul(75).add(player["tree-tab"].coolMobileStuff[1].mul(75)).add(player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("t")?70:0):0)+"px"
    }}
}), 

addNode("blankMini", { 
    layerShown: "ghost",
	nodeStyle(){return{
		width: "32px",
		height: "32px",
	}},
	unlocked(){return player["tree-tab"].shown[2] && player["tree-tab"].shown[3]}
}), 

addNode("pNode", {
    color(){return tmp.p.color},
    row: 0,
    position: 1,
	tooltip: "A shortcut to reset",
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
		"border": options.hqStyle[0].substr(1),
        "box-shadow": "0px 0px "+(canReset("p")?20:0)+"px white,0px 0px "+(options.mobileShortcuts?new Decimal(100).sub(player["tree-tab"].coolMobileStuff[0].mul(100)):player["tree-tab"].coolMobileStuff[0].mul(100))+"px "+tmp.p.color+options.hqStyle[1], 
        "text-shadow": options.hqStyle[2].substr(1),
		"font-size":"0px",
        "height": "85px",
        "width": "150px",
        "border-radius": "0% 25% 25% 0%",
    }},
    layerShown(){return player.p.unlocked}
})

addNode("pNodeExtra", {
    color(){return tmp.p.color},
    row: 0,
    position: 1,
	tooltip(){return "Displays secondary stats"+(player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("p")?". Connecting two layers together allows you to reset both layers at once in particular order.":".")},
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
		"border": options.hqStyle[0].substr(1),
        "box-shadow": "0px 0px "+(options.additionalMobileShortcuts?new Decimal(100).sub(player["tree-tab"].coolMobileStuff[1].mul(100)):player["tree-tab"].coolMobileStuff[1].mul(100))+"px "+tmp.p.color+options.hqStyle[1]+",0px 0px "+(canReset("p")&&player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("p")?20:0)+"px white", 
        "text-shadow": options.hqStyle[2].substr(1),
		"font-size":"0px",
        "height": "85px",
        "width": "150px",
        "border-radius": "25% 0% 0% 25%",
    }},
	layerShown(){return player.p.unlocked}
})

addNode("pNodeBond", {
    color(){return tmp.p.color}, 
    row: 0,
    position: 1,
	tooltip: 'Click to "Unbind" layers.',
    symbol(){return `<p style='margin-left: -80px;font-size:16px; transform: scale(0.65,1);'>Order: ${player["tree-tab"].holyFuckingShitNoFuckingWayBro[1].includes("p")?"2":player["tree-tab"].holyFuckingShitNoFuckingWayBro[0].includes("p")?"1":""}</p><br><p style='margin-left: -80px;font-size:16px; transform: scale(0.65,1);'>Click To</p><br><p style='margin-left: -80px;font-size:16px; transform: scale(0.65,1);'>Unbind</p>`},
    canClick() {return true},
	onClick(){
		if(player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("p")){
			player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]="none"
			player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]="none"
		}
	},
	onHold(){
		if(player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("p")){
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
		"border": options.hqStyle[0].substr(1),
        "box-shadow": "0px 0px "+(canReset("p")&&player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("p")?20:0)+"px white", 
        "text-shadow": options.hqStyle[2].substr(1),
		"font-size":"0px",
        "height": "70px",
        "width": "150px",
        "border-radius": "25% 0% 0% 25%",
    }},
    branches(){return [player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]=="p"?player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]+"NodeBond":""]},
    layerShown(){return player.p.unlocked}
})

addNode("pNodeMini", {
    color(){return tmp.p.color},
    row: 0,
    position: 1,
	tooltip(){return `${format(player.points)} / ${format(tmp.p.nextAt)}`},
	tooltipLocked(){return "Unavailable"},
    symbol(){return `<p style='margin-left:${Decimal.mul(-8,formatWhole(getResetGain("p")).length-1).add((formatWhole(getResetGain("p")).length-1)*4.5)}px;transform: scale(${Decimal.div(1.7, formatWhole(getResetGain("p")).length)},1)'>${formatWhole(getResetGain("p"))}`},
    canClick() {return true},
    nodeStyle(){return{
        "height": "50px",
        "width": "50px",
        "border-radius": "50%",
		"border": options.hqStyle[0].substr(1),
		"box-shadow": options.hqStyle[1].substr(1),
        "text-shadow": options.hqStyle[2].substr(1),
    }},
    layerShown(){return player["tree-tab"].shown[0]}
})

addNode("sNode", {
    color: "black",
    row: 1,
    position: 1,
	tooltip: "A shortcut to reset",
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
		"border": options.hqStyle[0].substr(1),
		"color": "white",
		"border-color": "rgba(255,255,255,0.125)",
        "box-shadow": "0px 0px "+(canReset("s")?20:0)+"px white,0px 0px "+(options.mobileShortcuts?new Decimal(100).sub(player["tree-tab"].coolMobileStuff[0].mul(100)):player["tree-tab"].coolMobileStuff[0].mul(100))+"px "+tmp.s.color+options.hqStyle[1], 
        "text-shadow": options.hqStyle[2].substr(1),
		"font-size":"0px",
        "height": "85px",
        "width": "150px",
        "border-radius": "0% 25% 25% 0%",
    }},
    layerShown(){return player.s.unlocked}
})

addNode("sNodeExtra", {
    color: "black",
    row: 0,
    position: 1,
	tooltip(){return "Displays secondary stats"+(player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("s")?". Connecting two layers together allows you to reset both layers at once in particular order.":".")},
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
		"border": options.hqStyle[0].substr(1),
		"color": "white",
		"border-color": "rgba(255,255,255,0.125)",
        "box-shadow": "0px 0px "+(options.additionalMobileShortcuts?new Decimal(100).sub(player["tree-tab"].coolMobileStuff[1].mul(100)):player["tree-tab"].coolMobileStuff[1].mul(100))+"px "+tmp.s.color+options.hqStyle[1]+",0px 0px "+(canReset("s")&&player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("s")?20:0)+"px white", 
        "text-shadow": options.hqStyle[2].substr(1),
		"font-size":"0px",
        "height": "85px",
        "width": "150px",
        "border-radius": "25% 0% 0% 25%",
    }},
	layerShown(){return player.s.unlocked}
})

addNode("sNodeBond", {
    color: "black",
    row: 0,
    position: 1,
	tooltip: 'Click to "Unbind" layers.',
    symbol(){return `<p style='margin-left: -80px;font-size:16px; transform: scale(0.65,1);'>Order: ${player["tree-tab"].holyFuckingShitNoFuckingWayBro[1].includes("s")?"2":player["tree-tab"].holyFuckingShitNoFuckingWayBro[0].includes("s")?"1":""}</p><br><p style='margin-left: -80px;font-size:16px; transform: scale(0.65,1);'>Click To</p><br><p style='margin-left: -80px;font-size:16px; transform: scale(0.65,1);'>Unbind</p>`},
    canClick() {return true},
	onClick(){
		if(player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("s")){
			player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]="none"
			player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]="none"
		}
	},
	onHold(){
		if(player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("s")){
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
		"border": options.hqStyle[0].substr(1),
		"color": "white",
		"border-color": "rgba(255,255,255,0.125)",
        "box-shadow": "0px 0px "+(canReset("s")&&player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("s")?20:0)+"px white", 
        "text-shadow": options.hqStyle[2].substr(1),
		"font-size":"0px",
        "height": "70px",
        "width": "150px",
        "border-radius": "25% 0% 0% 25%",
    }},
    branches(){return [player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]=="s"?player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]+"NodeBond":""]},
    layerShown(){return player.s.unlocked}
})

addNode("sNodeMini", {
    color: "black",
    row: 0,
    position: 1,
	tooltip(){return `${format(player.p.points)} / ${format(tmp.s.nextAt)}`},
	tooltipLocked(){return "Unavailable"},
    symbol(){return `<p style='margin-left:${Decimal.mul(-8,formatWhole(getResetGain("s")).length-1).add((formatWhole(getResetGain("s")).length-1)*4.5)}px;transform: scale(${Decimal.div(1.7, formatWhole(getResetGain("s")).length)},1)'>${formatWhole(getResetGain("s"))}`},
    canClick() {return player.s.unlocked},
    nodeStyle(){return{
        "height": "50px",
        "width": "50px",
        "border-radius": "50%",
		"border": options.hqStyle[0].substr(1),
		"color": player.s.unlocked?"white":"",
		"border-color": player.s.unlocked?"rgba(255,255,255,0.125)":"",
		"box-shadow": options.hqStyle[1].substr(1),
        "text-shadow": options.hqStyle[2].substr(1),
    }},
	branches: ["pNodeMini"],
    layerShown(){return player["tree-tab"].shown[2]}
})

addNode("tNode", {
    color(){return tmp.t.color},
    row: 1,
    position: 1,
	tooltip: "A shortcut to reset",
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
		"border": options.hqStyle[0].substr(1),
        "box-shadow": "0px 0px "+(canReset("t")?20:0)+"px white,0px 0px "+(options.mobileShortcuts?new Decimal(100).sub(player["tree-tab"].coolMobileStuff[0].mul(100)):player["tree-tab"].coolMobileStuff[0].mul(100))+"px "+tmp.t.color+options.hqStyle[1], 
        "text-shadow": options.hqStyle[2].substr(1),
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
	tooltip(){return "Displays secondary stats"+(player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("t")?". Connecting two layers together allows you to reset both layers at once in particular order.":".")},
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
		"border": options.hqStyle[0].substr(1),
        "box-shadow": "0px 0px "+(options.additionalMobileShortcuts?new Decimal(100).sub(player["tree-tab"].coolMobileStuff[1].mul(100)):player["tree-tab"].coolMobileStuff[1].mul(100))+"px "+tmp.t.color+options.hqStyle[1]+",0px 0px "+(canReset("t")&&player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("t")?20:0)+"px white",  
        "text-shadow": options.hqStyle[2].substr(1),
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
	tooltip: 'Click to "Unbind" layers.',
    symbol(){return `<p style='margin-left: -80px;font-size:16px; transform: scale(0.65,1);'>Order: ${player["tree-tab"].holyFuckingShitNoFuckingWayBro[1].includes("t")?"2":player["tree-tab"].holyFuckingShitNoFuckingWayBro[0].includes("t")?"1":""}</p><br><p style='margin-left: -80px;font-size:16px; transform: scale(0.65,1);'>Click To</p><br><p style='margin-left: -80px;font-size:16px; transform: scale(0.65,1);'>Unbind</p>`},
    canClick() {return true},
	onClick(){
		if(player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("t")){
			player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]="none"
			player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]="none"
		}
	},
	onHold(){
		if(player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("t")){
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
		"border": options.hqStyle[0].substr(1),
        "box-shadow": "0px 0px "+(canReset("t")&&player["tree-tab"].holyFuckingShitNoFuckingWayBro.includes("t")?20:0)+"px white", 
        "text-shadow": options.hqStyle[2].substr(1),
		"font-size":"0px",
        "height": "70px",
        "width": "150px",
        "border-radius": "25% 0% 0% 25%",
    }},
    branches(){return [player["tree-tab"].holyFuckingShitNoFuckingWayBro[0]=="t"?player["tree-tab"].holyFuckingShitNoFuckingWayBro[1]+"NodeBond":""]},
    layerShown(){return player.t.unlocked}
})

addNode("tNodeMini", {
    color(){return tmp.t.color},
    row: 0,
    position: 1,
	tooltip(){return `${format(player.points)} / ${format(tmp.t.nextAt)}`},
	tooltipLocked(){return "Unavailable"},
    symbol(){return `<p style='transform: scale(2,1)'>${formatWhole(canReset("t")?getResetGain("t"):0)}`},
    canClick() {return player.t.unlocked},
    nodeStyle(){return{
        "height": "50px",
        "width": "50px",
        "border-radius": "50%",
		"border": options.hqStyle[0].substr(1),
		"box-shadow": options.hqStyle[1].substr(1),
        "text-shadow": options.hqStyle[2].substr(1),
    }},
	branches: ["pNodeMini"],
    layerShown(){return player["tree-tab"].shown[3]}
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
	nodeStyle(){return{
		"border": options.hqStyle[0].substr(1),
        "text-shadow": options.hqStyle[2].substr(1),
		"box-shadow": ((!player.her.sheWasSeen || (player.her.herLog[1]>=1 && player.her.buyables["progress"].eq(0)) || (player.her.whatCouldPossiblyGoWrong && player.her.buyables["progress"].eq(1) && player.her.herPoints.lte(0))) ?"0px 0px 10px rgb(0,255,255)":"0px 0px 0px rgba(0,0,0,0)")+options.hqStyle[1]
	}},
	layerShown(){return !player.her.accessDenied}
})

addNode("mainTimeline", {
	color: "rgb(52,52,152)",
	tooltip(){return (player.her.japanese?"MAIN ZONE"+(player.her.timeline[1]==0?"<h5>[current]":""):"The Main Timeline"+(player.her.timeline[1]==0?"<h5>[You are here!]":""))},
    row: 0,
    position: 1,
    symbol: "0",
    canClick() {return true},
	onClick() {
		player.her.timeline[0] = 0
	},
	onEnter() {
		tmp["tree-tab"].timelineStart()
	},
    nodeStyle(){return{
		"border": options.hqStyle[0].substr(1),
		"box-shadow": (player.her.timeline[0]==0?"0px 0px 10px white"+options.hqStyle[1]:options.hqStyle[1].substr(1)),
        "text-shadow": options.hqStyle[2].substr(1),
	}},
	shouldNotify(){return player.her.timeline[0]==1},
	glowColor(){return tmp.mainTimeline.shouldNotify?"rgb(255,255,255)":"rgba(0,0,0,0)"},
    layerShown(){return true}
})

addNode("rootTimeline", {
	color: "rgb(7.211102550927979,7.211102550927979,12.328828005937954)",
	tooltip(){return (player.her.japanese?"ROOT ZONE"+(player.her.timeline[1]==1?"<h5>[current]":""):"The Root Timeline"+(player.her.timeline[1]==1?"<h5>[You are here!]":""))},
    row: 0,
    position: 1,
    symbol: "√2",
    canClick() {return true},
	onClick() {
		player.her.timeline[0] = 1
	},
	shouldNotify(){return player.her.timeline[0]==1},
	glowColor(){return tmp.rootTimeline.shouldNotify?"rgb(255,255,255)":"rgba(0,0,0,0)"},
	nodeStyle(){return{
		"color": "white"
	}},
	onEnter() {
		tmp["tree-tab"].timelineStart()
	},
    nodeStyle(){return{
		"color": "rgb(247.788897449,247.788897449,242.671171994)",
		"border": options.hqStyle[0].substr(1),
		"box-shadow": (player.her.timeline[0]==1?"0px 0px 10px white"+options.hqStyle[1]:options.hqStyle[1].substr(1)),
        "text-shadow": options.hqStyle[2].substr(1),
	}},
	branches: ["mainTimeline"],
    layerShown(){return true}
})

addNode("antiRPGTimeline", {
	color: "rgb(111,111,111)",
	tooltip(){return (player.her.japanese?"ANTI-RPG ZONE"+(player.her.timeline[1]==2?"<h5>[current]":""):"The RPG-less Timeline"+(player.her.timeline[1]==2?"<h5>[You are here!]":""))},
    row: 0,
    position: 1,
    symbol: "①",
    canClick() {return true},
	onClick() {
		player.her.timeline[0] = 2
	},
	shouldNotify(){return player.her.timeline[0]==2},
	glowColor(){return tmp.rootTimeline.shouldNotify?"rgb(255,255,255)":"rgba(0,0,0,0)"},
	onEnter() {
		tmp["tree-tab"].timelineStart()
	},
    nodeStyle(){return{
		"border": options.hqStyle[0].substr(1),
		"box-shadow": (player.her.timeline[0]==2?"0px 0px 10px white"+options.hqStyle[1]:options.hqStyle[1].substr(1)),
        "text-shadow": options.hqStyle[2].substr(1),
	}},
	branches: ["mainTimeline"],
    layerShown(){return true}
})

addLayer("tree-tab", {
    startData() { return {
        coolMobileStuff: [new Decimal(0),new Decimal(0)],
		holyFuckingShitNoFuckingWayBro: ["none","none"],
        display: "",
        currentDialogueSymbol: 0,
        specialEventsCounter: 0,
        powerLevel: new Decimal(5),
        didyoujustcloseonme: ["", "", "",""],
        dialogueNumber: 0,
		prevDialogueNumber: [0,0,0], //index, current, limit
		splitDialogueChoice: 1,
        requirements: [],
        requirementsCleared: true, 
        bruhCooldown: new Decimal(0),
        nextDialogue: false, 
        dialoguePath: 0,
        versionVibeCheck: "",
        waitingForNextDialogue: [],
        youShouldStopYourselfNOW: false,
		gameState: 0,
        shown: [false, false, false, false, false],
		quickCheck: false,
		alarm:0,
		etaBleh: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)], // Current, Previous, ETA, Timer
		storedOffPoints: new Decimal(0),
		unlockOrder: [0,undefined,undefined,undefined,undefined,undefined,undefined]
    }},
	timelineStart(){
		let statsKeep = player.a.statsRPG
		layerDataReset("p", true)
		layerDataReset("s", true)
		layerDataReset("t", true)
		layerDataReset("a", true)
		layerDataReset("v", true)
		player.yourGod.shown=[false,false,false,false] 
		player.p.unlocked = false 
		player.s.unlocked = false 
		player.t.unlocked = false 
		player.yourGod.questsDone = new Decimal(0)
		player.yourGod.buyables[11] = new Decimal(0)
		player.yourGod.buyables[12] = new Decimal(0)
		player.yourGod.buyables[13] = new Decimal(0)
		player.yourGod.buyables[21] = new Decimal(0)
		player.yourGod.buyables[22] = new Decimal(0)
		player.yourGod.buyables[23] = new Decimal(0)
		player.yourGod.buyables[31] = new Decimal(0)
		player.yourGod.buyables[32] = new Decimal(0)
		player.yourGod.buyables[33] = new Decimal(0)
		player.yourGod.shopPoints = new Decimal(0)
		player.yourGod.perkPoints = new Decimal(1)
		player.points = new Decimal(10)	
		player.p.upgradesUnlocked = []
		player.yourGod.lowerSpaceTimeUpgradeCost = false
		player.subtabs.a.mainTabs = "Achievements"
		player.subtabs.s.mainTabs = "Space"
        player["tree-tab"].display = ""
        player["tree-tab"].currentDialogueSymbol = 0
        player["tree-tab"].specialEventsCounter = 0
        player["tree-tab"].dialogueNumber = 0
		player["tree-tab"].prevDialogueNumber = [0,0,0]
		player["tree-tab"].splitDialogueChoice = 0
        player["tree-tab"].requirements = []
        player["tree-tab"].requirementsCleared = true
        player["tree-tab"].bruhCooldown = new Decimal(0)
        player["tree-tab"].nextDialogue = false
        player["tree-tab"].dialoguePath = 0
        player["tree-tab"].versionVibeCheck = ""
        player["tree-tab"].waitingForNextDialogue = []
        player["tree-tab"].youShouldStopYourselfNOW = false
        player["tree-tab"].shown = [false, false, false, false, false]
		player["tree-tab"].quickCheck = false
		player["tree-tab"].alarm = 0
		player["tree-tab"].etaBleh = [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
		player["tree-tab"].unlockOrder = [0,undefined,undefined]
		player["tree-tab"].storedOffPoints = new Decimal(0)
		player.a.statsRPG[1] = statsKeep[1]
		player.a.statsRPG[2] = statsKeep[2]
		player.a.statsRPG[3] = statsKeep[3]
	},
    update(diff){ 
		if(typeof player["tree-tab"].prevDialogueNumber[0] == "string"){
			player["tree-tab"].prevDialogueNumber[0] = 0
			player["tree-tab"].unlockOrder[1] = !player["tree-tab"].unlockOrder[1]?(player["tree-tab"].shown[2]?0:player["tree-tab"].shown[3]?1:null):player["tree-tab"].unlockOrder[1]
		}
		if(options.offTimePercent>1 || (player.her.fuckOFFIMALLOWEDTOCHEATNOW!=1 && player.her.fuckOFFIMALLOWEDTOCHEATNOW!=0) && player.her.gameState != 1) player.her.gameState  = -1
		if(player.devSpeed>1 && player["tree-tab"].storedOffPoints.gt(0)) player["tree-tab"].storedOffPoints = player["tree-tab"].storedOffPoints.sub(Decimal.sub(diff, diff/player.devSpeed)).max(0)
		if(player["tree-tab"].storedOffPoints.lte(0)) player.devSpeed = 1
		options.hqStyle[0] = options.hqTree?",2px solid":",4px solid rgba(0,0,0,0.125)"
		options.hqStyle[1] = options.hqTree?", -4px -4px 4px rgba(0, 0, 0, 0.25) inset, 0px 0px 20px var(--background)" : ", -4px -4px 4px rgba(0, 0, 0, 0) inset"
		options.hqStyle[2] = options.hqTree?",2px 2px 4px rgba(0, 0, 0, 0.25)":","
		if(player.yourGod.selectedQuest!==4 && [getPointGen(),getResetGain("p").mul(tmp.p.passiveGeneration),getResetGain("s").mul(tmp.s.passiveGeneration),tmp.t.timeGain][player.yourGod.quests[player.yourGod.selectedQuest-1][0][3]].gt(0)) {
			if(player["tree-tab"].etaBleh[1].eq(0)) player["tree-tab"].etaBleh[1] = player.yourGod.selectedQuest!==4?new Decimal(player.yourGod.quests[player.yourGod.selectedQuest-1][0][0]).sub(eval(player.yourGod.quests[player.yourGod.selectedQuest-1][0][2])).div([getPointGen(),getResetGain("p").mul(tmp.p.passiveGeneration),getResetGain("s").mul(tmp.s.passiveGeneration),tmp.t.timeGain][player.yourGod.quests[player.yourGod.selectedQuest-1][0][3]]):new Decimal(0)
			player["tree-tab"].etaBleh[3] = player["tree-tab"].etaBleh[3].add(diff).mul(player.yourGod.selectedQuest!==4?1:0)
			if(player["tree-tab"].etaBleh[3].gte(1)){
				player["tree-tab"].etaBleh[3] = new Decimal(0) 
				player["tree-tab"].etaBleh[0] = new Decimal(player.yourGod.quests[player.yourGod.selectedQuest-1][0][0]).sub(eval(player.yourGod.quests[player.yourGod.selectedQuest-1][0][2])).div([getPointGen(),getResetGain("p").mul(tmp.p.passiveGeneration),getResetGain("s").mul(tmp.s.passiveGeneration),tmp.t.timeGain][player.yourGod.quests[player.yourGod.selectedQuest-1][0][3]])
				player["tree-tab"].etaBleh[2] = (player["tree-tab"].etaBleh[0].eq(0)||player["tree-tab"].etaBleh[1].eq(0)||player["tree-tab"].etaBleh[0].eq(player["tree-tab"].etaBleh[1]))?new Decimal(0):player["tree-tab"].etaBleh[1].div(player["tree-tab"].etaBleh[0]).gte(1)?player["tree-tab"].etaBleh[1].div(player["tree-tab"].etaBleh[0].sub(player["tree-tab"].etaBleh[1])).mul(-1):player["tree-tab"].etaBleh[0].add(player["tree-tab"].etaBleh[1].sub(player["tree-tab"].etaBleh[0]).mul(player["tree-tab"].etaBleh[1].div(player["tree-tab"].etaBleh[0].sub(player["tree-tab"].etaBleh[1])).mul(-1)))
				player["tree-tab"].etaBleh[1] = player["tree-tab"].etaBleh[0]
			}
		}
		player["tree-tab"].splitDialogueChoice=Math.max(findPreviousDialogues()[1],1)
		player["tree-tab"].prevDialogueNumber[2] = findPreviousDialogues()[0][player["tree-tab"].prevDialogueNumber[0]]?findPreviousDialogues()[0][player["tree-tab"].prevDialogueNumber[0]][Object.keys(findPreviousDialogues()[0][player["tree-tab"].prevDialogueNumber[0]])[0]].length:1
		if(player["tree-tab"].youShouldStopYourselfNOW) {
			if(player.her.gameState != 1) player.her.gameState = 1
			player.devSpeed = 0
			player.her.fuckOFFIMALLOWEDTOCHEATNOW = 0
		}
        player["tree-tab"].coolMobileStuff[0] = player["tree-tab"].coolMobileStuff[0].add(diff*(options.mobileShortcuts?1:-1)).max(0).min(1)
        player["tree-tab"].coolMobileStuff[1] = player["tree-tab"].coolMobileStuff[1].add(diff*(options.additionalMobileShortcuts?1:-1)).max(0).min(1)
		if(player.p.upgrades.length>0 && !player["tree-tab"].shown[0]) {
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
			player.her.gameState = 0
            player["tree-tab"].youShouldStopYourselfNOW = false
            player["tree-tab"].versionVibeCheck = VERSION.num
        }
        if(!player["tree-tab"].didyoujustcloseonme[0]==''&&player.infoboxes["tree-tab"]["lore"]){
			alert(["Blah","blah","bl","blah","bluh","bruh","Blah","blah","bl","blah","dude, stop.","there's literally no point in shutting my mouth twice","let alone thrice","we already had to work even more on dialogues and reduce shenanigans just so you wouldn't get your save files lost\n\nand softlocks too","my name is NOT what you think. also I'm fairy hello hi please stop shutting my mouth :3","Seriously, though","I don't have much to say","besides","separating","messages","so uhhh","yeah","go back to playing","we are not fixing this again if you somehow break that one as well","bye","oh and by the way","incase if you haven't noticed","everytime you press this button","i force the save() function just for you","okay but seriously bye for real"][player["tree-tab"].alarm=player["tree-tab"].alarm])
			player["tree-tab"].alarm=player["tree-tab"].alarm+1
			player["tree-tab"].bruhCooldown = new Decimal(5)
        }
        if(player.infoboxes["tree-tab"]["lore"]){
			player.infoboxes["tree-tab"]["lore"] = false
            if(!player["tree-tab"].didyoujustcloseonme[0].includes("Noise")){
            player["tree-tab"].didyoujustcloseonme[0] = player["tree-tab"].display+"Noise"
            player["tree-tab"].didyoujustcloseonme[1] = player["tree-tab"].nextDialogue
            player["tree-tab"].didyoujustcloseonme[2] = player["tree-tab"].waitingForNextDialogue
            player["tree-tab"].didyoujustcloseonme[3] = player["tree-tab"].nextDialogue
			player["tree-tab"].nextDialogue = false
            player["tree-tab"].display = `<br><br><br><p style ='transform: scale(1.85,12);color: red;text-shadow: 0px 0px 4px purple;font-family: Comic Sans MS;font-size:20px;'>don't do it ever again.</p><br><br><br><br><br><br><br><h5 style='opacity:0.5;color:white'>(please)<br>(-CheeseOverlord)`
            }
			player["tree-tab"].bruhCooldown = new Decimal(5)
			exportSave()
            save(true)
        }
		if(player["tree-tab"].bruhCooldown.lte(0)&&player["tree-tab"].didyoujustcloseonme[0].includes("Noise")){
			player["tree-tab"].display = player["tree-tab"].didyoujustcloseonme[0].replace("Noise","")
            player["tree-tab"].nextDialogue = player["tree-tab"].didyoujustcloseonme[1]
            player["tree-tab"].waitingForNextDialogue = player["tree-tab"].didyoujustcloseonme[2]
            player["tree-tab"].nextDialogue = player["tree-tab"].didyoujustcloseonme[3]
			player["tree-tab"].didyoujustcloseonme = ["","","",""]
		}
        let randomizer = new Decimal(Math.random() * Math.PI)
        if(player["tree-tab"].waitingForNextDialogue==``) player["tree-tab"].waitingForNextDialogue = player["tree-tab"].waitingForNextDialogue.concat(
            0,false,[[`hasUpgrade("p",22)`,`player.yourGod.hasBeenSeen&&player.tab !== 'yourGod'&&player.tab !== 'her'`,`false`]]
        )
		if(player["tree-tab"].waitingForNextDialogue[2].length<=2) player["tree-tab"].waitingForNextDialogue[2] = player["tree-tab"].waitingForNextDialogue[2].concat('false')
        if(eval(player["tree-tab"].waitingForNextDialogue[2][player["tree-tab"].waitingForNextDialogue[0]])&&player["tree-tab"].waitingForNextDialogue[1]&&player["tree-tab"].didyoujustcloseonme[0]==''){
            if(player["tree-tab"].waitingForNextDialogue[0]==0) player["tree-tab"].shown[1] = true
            player["tree-tab"].waitingForNextDialogue[0] = player["tree-tab"].waitingForNextDialogue[0] + 1
            player["tree-tab"].waitingForNextDialogue[1] = false
        }
        player["tree-tab"].bruhCooldown = player["tree-tab"].bruhCooldown.sub((player["tree-tab"].bruhCooldown.gte(0) || !(player["tree-tab"].didyoujustcloseonme[0]=='')) ? diff : 0).mul(options.fastForwardDialogue&&player["tree-tab"].didyoujustcloseonme[0]=='' ? 0 : 1)
        if(!tmp.gameEnded && !player["tree-tab"].youShouldStopYourselfNOW && player["tree-tab"].didyoujustcloseonme[0]=='' && player["tree-tab"].currentDialogueSymbol<tmp["tree-tab"].theThing[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].dialogueNumber].length && player["tree-tab"].bruhCooldown.lte(0) && !player["tree-tab"].waitingForNextDialogue[1]){
            for(i=0;player["tree-tab"].requirementsCleared&&player["tree-tab"].bruhCooldown.lte(0)&&i<options.fontSpeed&&!(player["tree-tab"].currentDialogueSymbol>=tmp["tree-tab"].theThing[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].dialogueNumber].length && player["tree-tab"].dialogueNumber != tmp["tree-tab"].theThing[player.her.timeline[1]][player["tree-tab"].dialoguePath].length && !player["tree-tab"].nextDialogue && player["tree-tab"].requirementsCleared && player["tree-tab"].didyoujustcloseonme[0]=='');i++){
				switch(tmp["tree-tab"].theThing[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].dialogueNumber][player["tree-tab"].currentDialogueSymbol]){
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
						if(tmp["tree-tab"].specialEvents[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][0]=="requirements"){
							player["tree-tab"].requirements =  [
								[[[new Decimal(16).mul(randomizer.root(2)).round(), modInfo.pointsName, "player.points", "none"], [new Decimal(4).mul(new Decimal(Math.PI-randomizer).root(4)).round(), tmp.p.resource, "player.p.points", "p"]]],
								[[[new Decimal(600).mul(randomizer.root(2)).round(), modInfo.pointsName, "player.points", "none"], [new Decimal(100).mul(new Decimal(Math.PI-randomizer).root(4)).round(), tmp.p.resource, "player.p.points", "p"],["PICK ONE OF UPGRADES", 'hasUpgrade("p",21)||hasUpgrade("p",23)']]],
								[[[new Decimal(69000).mul(randomizer.root(2)).round(), modInfo.pointsName, "player.points", "none"], [new Decimal(4200).mul(new Decimal(Math.PI-randomizer).root(4)).round(), tmp.p.resource, "player.p.points", "p"]]],
								[[[new Decimal(17742.85714).mul(randomizer.root(2)).round(), modInfo.pointsName, "player.points", "none"], [new Decimal(10800).mul(new Decimal(Math.PI-randomizer).root(4)).round(), tmp.p.resource, "player.p.points", "p"]]],
								[[["GET THE OTHER UPGRADE", 'hasUpgrade("p",23)']]],
								[[["GET THE OTHER UPGRADE", 'hasUpgrade("p",21)']]],
							][tmp["tree-tab"].specialEvents[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1]]
							player["tree-tab"].requirementsCleared = false
							let display = ``
							for(i=0;i<player["tree-tab"].requirements[0].length;i++){
								if(player["tree-tab"].requirements[0][i].length == 2) display = display+`<br>${player["tree-tab"].requirements[0][i][0].toUpperCase()}`
								else display = display+`<br>${formatWhole(player["tree-tab"].requirements[0][i][0])} ${player["tree-tab"].requirements[0][i][1].toUpperCase()}`
							}
							player["tree-tab"].display = player["tree-tab"].display + `<br><br>REQUIREMENTS:`+display
						}
						else if(tmp["tree-tab"].specialEvents[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][0]=="addPlayerValue"){
							for(let i=0;i+1<tmp["tree-tab"].specialEvents[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][1].length;i++){
								player[tmp["tree-tab"].specialEvents[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][0]][tmp["tree-tab"].specialEvents[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][1][0]] = player[tmp["tree-tab"].specialEvents[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][0]][tmp["tree-tab"].specialEvents[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][1][0]].concat(tmp["tree-tab"].specialEvents[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][1][i+1])
							}
						}
						else if(tmp["tree-tab"].specialEvents[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][0]=="changePlayerValue"){
							for(let i=0;i+1<tmp["tree-tab"].specialEvents[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][1].length;i++){
								if (tmp["tree-tab"].specialEvents[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][1].length==2) player[tmp["tree-tab"].specialEvents[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][0]][[tmp["tree-tab"].specialEvents[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][1][0]][0]] = tmp["tree-tab"].specialEvents[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][1][i+1]
								else player[tmp["tree-tab"].specialEvents[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][0]][[tmp["tree-tab"].specialEvents[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][1][0]][0]][i] = tmp["tree-tab"].specialEvents[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].specialEventsCounter][1][1][i+1]
							}
						}
						player["tree-tab"].specialEventsCounter = player["tree-tab"].specialEventsCounter+1
						break;
					case '|':
						player["tree-tab"].waitingForNextDialogue[1] = true 
						break;
					default:
						player["tree-tab"].display = player["tree-tab"].display + tmp["tree-tab"].theThing[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].dialogueNumber][player["tree-tab"].currentDialogueSymbol]
						break;
				}
				player["tree-tab"].currentDialogueSymbol = player["tree-tab"].currentDialogueSymbol+1
			}
        }
		if(player["tree-tab"].currentDialogueSymbol>=tmp["tree-tab"].theThing[player.her.timeline[1]][player["tree-tab"].dialoguePath][player["tree-tab"].dialogueNumber].length && player["tree-tab"].dialogueNumber != tmp["tree-tab"].theThing[player.her.timeline[1]][player["tree-tab"].dialoguePath].length && !player["tree-tab"].nextDialogue && player["tree-tab"].requirementsCleared && player["tree-tab"].didyoujustcloseonme[0]==''){
            player["tree-tab"].bruhCooldown = new Decimal(2)
            player["tree-tab"].nextDialogue = true
        }
        if(player["tree-tab"].requirements!==''&&!player["tree-tab"].requirementsCleared && player["tree-tab"].didyoujustcloseonme[0]==''){
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
        if(player["tree-tab"].bruhCooldown.lte(0) && player["tree-tab"].nextDialogue && !player["tree-tab"].waitingForNextDialogue[1] && player["tree-tab"].didyoujustcloseonme[0]==''){
            if(player["tree-tab"].display.endsWith(">")) player["tree-tab"].display = player["tree-tab"].display.slice(0,-4*options.fontSpeed)
            else player["tree-tab"].display = options.skipDialogueErasure ? '' : player["tree-tab"].display.slice(0,-1*options.fontSpeed)
            if(player["tree-tab"].display==''){
                player["tree-tab"].currentDialogueSymbol = 0
                player["tree-tab"].bruhCooldown = new Decimal(2)
                player["tree-tab"].dialogueNumber = player["tree-tab"].dialogueNumber + 1
				player["tree-tab"].nextDialogue = false
            }
        }
    },
    specialEvents(){return [
            [[//MAIN TIMELINE
                ["changePlayerValue", ["tree-tab",["shown",true,false,false,false,false]]],
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
                ["changePlayerValue", ["tree-tab",["shown",true,true,true,true,false]]],
				["changePlayerValue", ["yourGod",["lowerSpaceTimeUpgradeCost",true]]],
                ["requirements", 4],
            ],
            [
                ["changePlayerValue", ["t",["unlocked",true]]],
                ["requirements", 3],
                ["changePlayerValue", ["yourGod",["isAlreadyHere",true]]],
                ["changePlayerValue", ["yourGod",["unlocked",true]]],
                ["changePlayerValue", ["tree-tab",["shown",true,true,true,true,false]]],
				["changePlayerValue", ["yourGod",["lowerSpaceTimeUpgradeCost",true]]],
                ["requirements", 5],
            ],
            [
                ["changePlayerValue", ["s",["unlocked",true]]],
                ["changePlayerValue", ["t",["unlocked",true]]],
                ["changePlayerValue", ["tree-tab",["shown",true,true,true,true,true]]],
            ],
            [
                ["changePlayerValue", ["yourGod",["youreFuckedBuddy",true]]],
            ]],
			[[//ROOT TIMELINE
                ["changePlayerValue", ["tree-tab",["shown",true,false,false,false,false]]],
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
                ["changePlayerValue", ["tree-tab",["shown",true,true,true,true,false]]],
				["changePlayerValue", ["yourGod",["lowerSpaceTimeUpgradeCost",true]]],
                ["requirements", 4],
            ],
            [
                ["changePlayerValue", ["t",["unlocked",true]]],
                ["requirements", 3],
                ["changePlayerValue", ["yourGod",["isAlreadyHere",true]]],
                ["changePlayerValue", ["yourGod",["unlocked",true]]],
                ["changePlayerValue", ["tree-tab",["shown",true,true,true,true,false]]],
				["changePlayerValue", ["yourGod",["lowerSpaceTimeUpgradeCost",true]]],
                ["requirements", 5],
            ],
            [
                ["changePlayerValue", ["s",["unlocked",true]]],
                ["changePlayerValue", ["t",["unlocked",true]]],
                ["changePlayerValue", ["tree-tab",["shown",true,true,true,true,true]]],
            ],
            [
                ["changePlayerValue", ["yourGod",["youreFuckedBuddy",true]]],
            ]],
			[[//ANTI RPG TIMELINE
                ["changePlayerValue", ["tree-tab",["shown",true,false,false,false,false]]],
                ["requirements", 0],
                ["addPlayerValue", ["p",["upgradesUnlocked",12,13,22]]],
                ["changePlayerValue", ["a",["funkyStyle",30,8,"lightgreen"]]],
                ["changePlayerValue", ["a",["unlockedTabs",true,false]]],
                ["addPlayerValue", ["p",["upgradesUnlocked",21,23]]],
                ["requirements", 1],
            ],
            [
                ["changePlayerValue", ["s",["unlocked",true]]],
                ["requirements", 2],
                ["changePlayerValue", ["yourGod",["isAlreadyHere",true]]],
                ["changePlayerValue", ["yourGod",["unlocked",true]]],
                ["changePlayerValue", ["tree-tab",["shown",true,true,true,true,false]]],
				["changePlayerValue", ["yourGod",["lowerSpaceTimeUpgradeCost",true]]],
                ["requirements", 4],
            ],
            [
                ["changePlayerValue", ["t",["unlocked",true]]],
                ["requirements", 3],
                ["changePlayerValue", ["yourGod",["isAlreadyHere",true]]],
                ["changePlayerValue", ["yourGod",["unlocked",true]]],
                ["changePlayerValue", ["tree-tab",["shown",true,true,true,true,false]]],
				["changePlayerValue", ["yourGod",["lowerSpaceTimeUpgradeCost",true]]],
                ["requirements", 5],
            ],
            [
                ["changePlayerValue", ["s",["unlocked",true]]],
                ["changePlayerValue", ["t",["unlocked",true]]],
                ["changePlayerValue", ["tree-tab",["shown",true,true,true,true,true]]],
            ],
            [
                ["changePlayerValue", ["yourGod",["youreFuckedBuddy",true]]],
            ]]
        ]
    },
    theThing(){return [
            [[//MAIN TIMELINE
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
			`silly billy`,
			`HEY, YOU DID IT!@{YOU FINALLY REACHED 1 BILLION SOMETHING.@WHATEVER, YOU UNLOCKED THE OTHER LAYER!&&`,
			`WITH THAT BEING SAID, UH...@{I DIDN'T THINK YOU'D ACTUALLY GET THIS FAR.`,
			`NOW, OBVIOUSLY, I CAN'T JUST LEAVE YOU ALL BY@YOURSELF.@{NOT WITHOUT AN ANOTHER LAYER, AT LEAST.`,
			`DON'T WORRY, YOU WON'T HAVE TO GRIND IT THIS@TIME##;@@(NO PROMISES GUARANTEED!)&|`
			],
            [
            `bitch we haven't even started@@just@@get the fuck outta my game&|`,
            `im bussin *SONIC.EXE LAUGHTER*`
            ]],
            [[//ROOT TIMELINE
            `HEY YOU.{YES, YOU.{IT IS A PLEASURE TO MEET YOU AGAIN.@{SO BASICALLY##; I NEED YOUR HELP.`,
            `YEAH, I KNOW WHAT YOU MIGHT BE THINKING, "WHO@IS THIS SELF-ESTEEMED AND HANDSOME LOOKING@INDIVIDUAL?"{IT DOESN'T MATTER.`,
            `WHAT MATTERS IS THAT YOU NEED TO GATHER@RESOURCES.{"WHY?", YOU MAY ASK##; WELL##; UH, YOU KNOW.@{STUFF.{CAN'T PROGRESS WITHOUT LAYERS, YOU KNOW.`,
            `I THINK WE BOTH KNOW WHERE THIS IS GOING NOW;&&`,
            `##; HUH, THAT'S ODD.@{I DON'T REMEMBER SETTING RESET GAIN THIS LOW...`,
			`OH WELL.@{THOSE ARE NONE OF MY PROBLEMS, ANYWAYS.`,
            `I APPRECIATE YOUR EFFORT, DESPITE ODDITIES.`,
            `I'VE DECIDED THAT YOU DESERVE SOMETHING.{HERE ARE SOME UPGRADES FOR NOW;&@{I'LL BE BACK FOR SOME MORE.`,
            `UNTIL THEN, GOODBYE.|`,
            `HEY, WOULD YOU LOOK AT THAT; YOU JUST UNLOCKED@THE ACHIEVEMENT LAYER.{@COOL, HUH?`,
            `# # ; OKAY MAYBE NOT, BUT IT'S STILL SOMETHING.@{WE CAN DO BETTER.{LET ME JUST##&;`,
            `ALRIGHT, THIS SHOULD DO IT.@{UH. NO, THAT WON'T DO.@{YOU'RE GONNA NEED THIS, TRUST ME.&`,
            `HOW'S THAT FOR ACHIEVEMENT LAYER?@{YEAH, IT'S KINDA DULL.`,
            `##; RIGHT, THE LAYERS.{YOU NEED MORE OF THEM TO SET ME FREE.`,
            `I'LL LEND YOU MORE UPGRADES JUST INCASE.@{NOW CHOP CHOP AND DO ME A THING OR TWO.`,
			`# # ; something ain't right here.&&`
            ],
            [
            `silly`,
            `HMMM, SO YOU CHOSE SPACE LAYER, HUH.@{INTERESTING##; LIKE I COULD GIVE A DAMN ABOUT IT.`,
            `EITHER WAY, WELL DONE UN&LOCKING THAT LAYER##;@{SPEAKING OF, WE NEED THE CONTENT.`,
            `MY RESOURCES ARE STILL VERY LIMINAL.@{NONETHELESS, I'LL TRY MY BEST TO EXPAND IT.@@(GET IT?)`,
            `BUT ENOUGH CHIT CHATTING, I STILL HAVE ONE MORE@FEATURE TO IMPLEMENT.`,
            `TRUST ME, BUDDY.@{IT.{WILL.{BE.{WORTH IT;&`,
            `. . . TOOK YOU A WHILE, HUH.@{JUST FOR THE RECORD, I NEVER ENCOUNTERED@SUCH BUG BEFORE, CAN'T BE BOTHERED TO FIX IT@THOUGH.`,
            `WELL, AS PROMISED, I'LL BESTOW YOU WITH THE@BEST IDEA I HAD IN MIND.@{I JUST NEED SOME TIME TO IMPLEMENT IT PROPERLY.`,
            `DOWNLOADING L-X.ZIP##;@{EXPORTING L-X.ZIP: 0%  } 1% } 2% } 6% } 25% } 34% } 63% } 76% } 84% } 89% } 93% } 94% } 96% } 97% } 98% } 99% } 100%_*_*_*`,
            `/INSTALL ANTI_BALANCER.LAYER##;&@{ANTI_BALANCER.LAYER HAS BEEN SUCCESSFULLY@INSTALLED.`,
            `. . . WELL? WHAT ARE YOU WAITING FOR?@{WHY WON'T YOU TAKE A LOOK FOR YOURSELF?`,
            `... OH RIGHT, I FORGOT TO UNLOCK IT.@{EITHER WAY, I'LL BE BACK ONCE YOU'RE DONE@ADMIRING ITS HEIGHTENED PERFECTION.&|`,
			`where the fuck did quests go- oh sh}}}}}}}}}`,
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
            `. . . TOOK YOU A WHILE, HUH.@{JUST FOR THE RECORD, I NEVER ENCOUNTERED@SUCH BUG BEFORE, CAN'T BE BOTHERED TO FIX IT@THOUGH.`,
            `WELL, AS PROMISED, I'LL BESTOW YOU WITH THE@BEST IDEA I HAD IN MIND.@{I JUST NEED SOME TIME TO IMPLEMENT IT PROPERLY.`,
            `DOWNLOADING L-X.ZIP##;@{EXPORTING L-X.ZIP: 0%  } 1% } 2% } 6% } 25% } 34% } 63% } 76% } 84% } 89% } 93% } 94% } 96% } 97% } 98% } 99% } 100%_*_*_*`,
            `/INSTALL ANTI_BALANCER.LAYER##;&@{ANTI_BALANCER.LAYER HAS BEEN SUCCESSFULLY@INSTALLED.`,
            `. . . WELL? WHAT ARE YOU WAITING FOR?@{WHY WON'T YOU TAKE A LOOK FOR YOURSELF?`,
            `... OH RIGHT, I FORGOT TO UNLOCK IT.@{EITHER WAY, I'LL BE BACK ONCE YOU'RE DONE@ADMIRING ITS HEIGHTENED PERFECTION.&|`,
			`where the fuck did quests go- oh sh}}}}}}}}}`,
            `WELL... UH, I FORGOT WHAT I WANTED TO SAY.@{SINCE YOU'RE ALREADY HERE, MIGHT AS WELL LET@YOU GET THE OTHER LAYER.`,
            `I'LL HAND YOU OVER THAT LAYER#&#;@{EXCEPT NOW YOU HAVE TO UNLOCK IT TOO.@{JUST LIKE IN EA.`,
			`ALL I'M GONNA SAY IS GOOD LUCK WITH THAT ONE;&&`
            ],
			[
			`silly billy`,
			`HEY, YOU DID IT!@{YOU FINALLY REACHED 1 BILLION SOMETHING.@WHATEVER, YOU UNLOCKED THE OTHER LAYER!&&`,
			`WITH THAT BEING SAID, UH...@{I DIDN'T THINK YOU'D ACTUALLY GET THIS FAR.`,
			`NOW, OBVIOUSLY, I CAN'T JUST LEAVE YOU ALL BY@YOURSELF.@{NOT WITHOUT AN ANOTHER LAYER, AT LEAST.`,
			`DON'T WORRY, YOU WON'T HAVE TO GRIND IT THIS@TIME##;@@(NO PROMISES GUARANTEED!)&|`
			],
            [
            `bitch we haven't even started@@just@@get the fuck outta my game&|`,
            `im bussin *SONIC.EXE LAUGHTER*`
            ]],
            [[//ANTI RPG TIMELINE
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
            `HOW'S THAT FOR ACHIEVEMENT LAYER?@{YEAH, IT'S KINDA-}}}}}}}}}}}}}`, 
			`# # ; WHERE DID STATS TAB GO?@{I MEAN, IT IS KINDA MADE SPECIFICALLY FOR NERDS.@{ON SECOND THOUGH, IT REALLY NEVER WORKED OUT@WELL ANYWAYS.`,
			`YOU'LL BE FINE WITHOUT THOSE UNNECESSARY@NUMBERS, DON'T THINK TOO HARD ABOUT IT.`,
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
			`silly billy`,
			`HEY, YOU DID IT!@{YOU FINALLY REACHED 1 BILLION SOMETHING.@WHATEVER, YOU UNLOCKED THE OTHER LAYER!&&`,
			`WITH THAT BEING SAID, UH...@{I DIDN'T THINK YOU'D ACTUALLY GET THIS FAR.`,
			`NOW, OBVIOUSLY, I CAN'T JUST LEAVE YOU ALL BY@YOURSELF.@{NOT WITHOUT AN ANOTHER LAYER, AT LEAST.`,
			`DON'T WORRY, YOU WON'T HAVE TO GRIND IT THIS@TIME##;@@(NO PROMISES GUARANTEED!)&|`
			],
            [
            `bitch we haven't even started@@just@@get the fuck outta my game&|`,
            `im bussin *SONIC.EXE LAUGHTER*`
            ]]
        ]
    },
    buyables: {
        backward: {
            display(){return `<h1 style='font-size:16px;'><`},
            buy(){
                player.devSpeed = Math.round(player.devSpeed-1)
            },
            canAfford(){return player.devSpeed>1},
            style(){return {
                "height": "32px",
                "width": "32px",
				"color": "lime",
                "background": "repeating-linear-gradient(black, rgba(0,255,0,"+(Math.random()*0.2+0.1)+"), black, black 5px)",
				"background-position": "0px "+player.timePlayed*10+"px",
                "border": "lime 4px solid",
                "border-right": "lime 2px solid",
                "border-bottom": "lime 2px solid",
				"border-radius": "50% 0% 0% 0%",
                "box-shadow": "0px 0px 4px lime",
            }},
			unlocked(){return player["tree-tab"].storedOffPoints.gt(0) && options.offlineProd}
        },
        current: {
            display(){return `<p style='font-size:20px;'>x${format(player.devSpeed==0||player.devSpeed==undefined?1:player.devSpeed)}`},
            style(){return {
                "height": "32px",
                "width": "96px",
				"color": "lime",
                "background": "repeating-linear-gradient(black, rgba(0,255,0,"+(Math.random()*0.2+0.1)+"), black, black 5px)",
				"background-position": "0px "+player.timePlayed*10+"px",
                "border": "lime 2px solid",
                "border-top": "lime 4px solid",
				"border-radius":"0%",
                "box-shadow": "0px 0px 4px lime",
            }},
			unlocked(){return player["tree-tab"].storedOffPoints.gt(0) && options.offlineProd}
        },
        forward: {
            display(){return `<h1 style='font-size:16px;'>>`},
            buy(){
                player.devSpeed = !player.devSpeed?Math.round(player.devSpeed=2):Math.round(player.devSpeed+1)
            },
            canAfford(){return true},
            style(){return {
                "height": "32px",
                "width": "32px",
				"color": "lime",
                "background": "repeating-linear-gradient(black, rgba(0,255,0,"+(Math.random()*0.2+0.1)+"), black, black 5px)",
				"background-position": "0px "+player.timePlayed*10+"px",
                "border": "lime 4px solid",
                "border-left": "lime 2px solid",
                "border-bottom": "lime 2px solid",
				"border-radius": "0% 50% 0% 0%",
                "box-shadow": "0px 0px 4px lime",
            }},
			unlocked(){return player["tree-tab"].storedOffPoints.gt(0) && options.offlineProd}
        },
        five: {
            display(){return `<p style='font-size:20px;'>5%`},
            buy(){
				if (player.offTime === undefined)
					player.offTime = { remain: 0 };
				options.hiddenOffTimeStatus = true
				player.offTime.remain = player.offTime.remain+(player["tree-tab"].storedOffPoints*0.05)
				player["tree-tab"].storedOffPoints = player["tree-tab"].storedOffPoints.mul(0.95)
            },
            canAfford(){return true},
            style(){return {
                "height": "32px",
                "width": "32px",
				"color": "lime",
                "background": "repeating-linear-gradient(black, rgba(0,255,0,"+(Math.random()*0.2+0.1)+"), black, black 5px)",
				"background-position": "0px "+player.timePlayed*10+"px",
                "border": "lime 4px solid",
                "border-top": "lime 2px solid",
                "border-right": "lime 2px solid",
				"border-radius": "0% 0% 0% 50%",
                "box-shadow": "0px 0px 4px lime",
            }},
			unlocked(){return player["tree-tab"].storedOffPoints.gt(0) && options.offlineProd}
        },
        ten: {
            display(){return `<p style='font-size:20px; transform: translateX(-4px) scale(0.8,1);'>10%`},
            buy(){
				if (player.offTime === undefined)
					player.offTime = { remain: 0 };
				options.hiddenOffTimeStatus = true
                player.offTime.remain =  player.offTime.remain+(player["tree-tab"].storedOffPoints*0.1)
				player["tree-tab"].storedOffPoints = player["tree-tab"].storedOffPoints.mul(0.9)
            },
            canAfford(){return true},
            style(){return {
                "height": "32px",
                "width": "32px",
				"color": "lime",
                "background": "repeating-linear-gradient(black, rgba(0,255,0,"+(Math.random()*0.2+0.1)+"), black, black 5px)",
				"background-position": "0px "+player.timePlayed*10+"px",
                "border": "lime 4px solid",
                "border-left": "lime 2px solid",
                "border-top": "lime 2px solid",
                "border-right": "lime 2px solid",
				"border-radius": "0%",
                "box-shadow": "0px 0px 4px lime",
            }},
			unlocked(){return player["tree-tab"].storedOffPoints.gt(0) && options.offlineProd}
        },
        twentyfive: {
            display(){return `<p style='font-size:20px; transform: translateX(-4px) scale(0.8,1);'>25%`},
            buy(){
				if (player.offTime === undefined)
					player.offTime = { remain: 0 };
				options.hiddenOffTimeStatus = true
                player.offTime.remain =  player.offTime.remain+(player["tree-tab"].storedOffPoints*0.25)
				player["tree-tab"].storedOffPoints = player["tree-tab"].storedOffPoints.mul(0.75)
            },
            canAfford(){return true},
            style(){return {
                "height": "32px",
                "width": "32px",
				"color": "lime",
                "background": "repeating-linear-gradient(black, rgba(0,255,0,"+(Math.random()*0.2+0.1)+"), black, black 5px)",
				"background-position": "0px "+player.timePlayed*10+"px",
                "border": "lime 4px solid",
                "border-left": "lime 2px solid",
                "border-top": "lime 2px solid",
                "border-right": "lime 2px solid",
				"border-radius": "0%",
                "box-shadow": "0px 0px 4px lime",
            }},
			unlocked(){return player["tree-tab"].storedOffPoints.gt(0) && options.offlineProd}
        },
        fifty: {
            display(){return `<p style='font-size:20px; transform: translateX(-4px) scale(0.8,1);'>50%`},
            buy(){
				if (player.offTime === undefined)
					player.offTime = { remain: 0 };
				options.hiddenOffTimeStatus = true
                player.offTime.remain =  player.offTime.remain+(player["tree-tab"].storedOffPoints*0.5)
				player["tree-tab"].storedOffPoints = player["tree-tab"].storedOffPoints.mul(0.5)
            },
            canAfford(){return true},
            style(){return {
                "height": "32px",
                "width": "32px",
				"color": "lime",
                "background": "repeating-linear-gradient(black, rgba(0,255,0,"+(Math.random()*0.2+0.1)+"), black, black 5px)",
				"background-position": "0px "+player.timePlayed*10+"px",
                "border": "lime 4px solid",
                "border-left": "lime 2px solid",
                "border-top": "lime 2px solid",
                "border-right": "lime 2px solid",
				"border-radius": "0%",
                "box-shadow": "0px 0px 4px lime",
            }},
			unlocked(){return player["tree-tab"].storedOffPoints.gt(0) && options.offlineProd}
        },
        hundred: {
            display(){return `<p style='font-size:20px; transform: translateX(-8px) scale(0.6,1);'>100%`},
            buy(){
				if (player.offTime === undefined)
					player.offTime = { remain: 0 };
				options.hiddenOffTimeStatus = true
                player.offTime.remain =  player.offTime.remain+(player["tree-tab"].storedOffPoints)
				player["tree-tab"].storedOffPoints = new Decimal(0)
            },
            canAfford(){return true},
            style(){return {
                "height": "32px",
                "width": "32px",
				"color": "lime",
                "background": "repeating-linear-gradient(black, rgba(0,255,0,"+(Math.random()*0.2+0.1)+"), black, black 5px)",
				"background-position": "0px "+player.timePlayed*10+"px",
                "border": "lime 4px solid",
                "border-left": "lime 2px solid",
                "border-top": "lime 2px solid",
				"border-radius": "0% 0% 50% 0%",
                "box-shadow": "0px 0px 4px lime",
            }},
			unlocked(){return player["tree-tab"].storedOffPoints.gt(0) && options.offlineProd}
        },
	},
	infoboxes: {
        lore: {
            title(){return `<p style ='transform: scale(1.333333333, 1);color: rgba(0,0,0,0);font-family: Impact, Impacto;font-size:20px;-webkit-text-stroke:1px cyan;'>...`},
            body() { return `<p style ='transform: scale(1.333333333, 1);color: rgba(0,0,0,0);font-family: Impact, Impacto;font-size:20px;-webkit-text-stroke:1px cyan;text-align:left;margin-left:82px;'>`+player["tree-tab"].display },
            titleStyle(){
                return {
                    "width": "128px",
                    "background": "repeating-linear-gradient(black, rgba(0,255,0,"+(Math.random()*0.2+0.1)+"), black, black 5px)",
					"background-position": "0px "+player.timePlayed*10+"px",
                    "border": "lime 4px solid",
					"border-bottom": "lime 0px solid",
                    "box-shadow": "0px 0px 4px lime",
                    "margin-left":`${player["tree-tab"].didyoujustcloseonme[0] == '' ? "0px" : "50000px"}`
                }
            },
            bodyStyle(){
                return {
                    "height":"256px",
                    "color": "lime",
                    "background": "repeating-linear-gradient(black, rgba(0,255,0,"+(Math.random()*0.2+0.1)+"), black, black 5px)",
					"background-position": "0px "+player.timePlayed*10+"px",
                    "box-shadow": "0px 0px 4px lime",
                    "margin-bottom": "-4px"
                }
            }
        },
    },
    tabFormat: [["row",[["buyable","backward"],["buyable","current"],["buyable","forward"]]],["row",[["buyable","five"],["buyable","ten"],["buyable","twentyfive"],["buyable","fifty"],["buyable","hundred"]]],["infobox", "lore"], ["tree", function() {return [["pNodeBond","pNodeExtra","p", "pNode"],["sNodeBond","sNodeExtra","s","sNode","blankRow2","tNodeBond","tNodeExtra","t","tNode"],["v"]]}]],
    previousTab: "",
    leftTab: true,
})