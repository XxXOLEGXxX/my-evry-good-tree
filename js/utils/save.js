// ************ Save stuff ************
function save(force) {
	NaNcheck(player)
	if (NaNalert && !force) return
	localStorage.setItem(modInfo.id, btoa(unescape(encodeURIComponent(JSON.stringify(player)))));
	localStorage.setItem(modInfo.id+"_options", btoa(unescape(encodeURIComponent(JSON.stringify(options)))));

}

function timelineShenanigans(iAmHere, imGoingThere) {
	if(iAmHere==imGoingThere){
		alert(`...`)
		alert(`Looks like the machine isn't working when attempting to travel to the same universe.`)
	}
	else{
		if(imGoingThere==0){ 
			let fuckYou = JSON.parse(player.her.timelineSave)
			fuckYou.her.timelinePoints = player.her.timelinePoints
			fuckYou.her.buyables["level1"] = player.her.buyables["level1"]
			fuckYou.her.buyables["level2"] = player.her.buyables["level2"]
			fuckYou.her.buyables["level3"] = player.her.buyables["level3"]
			fuckYou.her.buyables["level4"] = player.her.buyables["level4"]
			fuckYou.her.buyables["level5"] = player.her.buyables["level5"]
			fuckYou.her.buyables["level6"] = player.her.buyables["level6"]
			fuckYou.her.experience = player.her.experience
			fuckYou.her.levels = player.her.levels
			importSave(btoa(JSON.stringify(fuckYou)), true)
			player.her.timelineSave = ""
		}
		else{ 
			if(player.her.timelineSave=="") player.her.timelineSave = JSON.stringify(player)
			player.yourGod.selectedQuest = 4
			tmp[["mainTimeline","rootTimeline","antiRPGTimeline"][imGoingThere]].onEnter()
		}
		player.her.timeline[1] = imGoingThere
		save();
		window.location.reload();
	}
}

function saveFile(savefile) {
	let state = prompt("Export or Import?")
	if(state.toLowerCase()=="export"){
		let str = options.saveFiles[savefile]
		const el = document.createElement("textarea");
		el.value = str;
		document.body.appendChild(el);
		el.select();
		el.setSelectionRange(0, 99999);
		document.execCommand("copy");
		document.body.removeChild(el);
	}
	else if(state.toLowerCase()=="import"){
		let imported = prompt("Paste your save here");
		try {
			tempPlr = Object.assign(getStartPlayer(), JSON.parse(atob(imported)));
			if (tempPlr.versionType != modInfo.id ){
				alert("I wouldn't put that into save file if I were you.")
				return;
			}
			options.saveFileState[savefile][0] = [["Player","Space","Time"],["Player","Space","Time"]][JSON.parse(atob(imported))["her"].timeline[1]][JSON.parse(atob(imported))["tree-tab"].dialoguePath]
			options.saveFileState[savefile][1] = JSON.parse(atob(imported))["timePlayed"];
			options.saveFileState[savefile][2] = new Decimal(JSON.parse(atob(imported))["her"]["buyables"]["progress"]).gte(2)?true:false;
			options.saveFileState[savefile][3] = JSON.parse(atob(imported))["her"]["timeline"][1];
			options.saveFileState[savefile][4] = JSON.parse(atob(imported))["her"]["gameState"];
			options.saveFiles[savefile] = imported;
			fixSave();
			versionCheck();
			NaNcheck(save)
			save();
		} catch (e) {
			return;
		}
	}
}

function startPlayerBase() {
	return {
		tab: layoutInfo.startTab,
		navTab: (layoutInfo.showTree ? layoutInfo.startNavTab : "none"),
		time: Date.now(),
		notify: {},
		versionType: modInfo.id,
		version: VERSION.num,
		beta: VERSION.beta,
		timePlayed: 0,
		keepGoing: false,
		hasNaN: false,

		points: modInfo.initialStartPoints,
		subtabs: {},
		lastSafeTab: (readData(layoutInfo.showTree) ? "none" : layoutInfo.startTab)
	};
}
function getStartPlayer() {
	playerdata = startPlayerBase();

	if (addedPlayerData) {
		extradata = addedPlayerData();
		for (thing in extradata)
			playerdata[thing] = extradata[thing];
	}

	playerdata.infoboxes = {};
	for (layer in layers) {
		playerdata[layer] = getStartLayerData(layer);

		if (layers[layer].tabFormat && !Array.isArray(layers[layer].tabFormat)) {
			playerdata.subtabs[layer] = {};
			playerdata.subtabs[layer].mainTabs = Object.keys(layers[layer].tabFormat)[0];
		}
		if (layers[layer].microtabs) {
			if (playerdata.subtabs[layer] == undefined)
				playerdata.subtabs[layer] = {};
			for (item in layers[layer].microtabs)
				playerdata.subtabs[layer][item] = Object.keys(layers[layer].microtabs[item])[0];
		}
		if (layers[layer].infoboxes) {
			if (playerdata.infoboxes[layer] == undefined)
				playerdata.infoboxes[layer] = {};
			for (item in layers[layer].infoboxes)
				playerdata.infoboxes[layer][item] = false;
		}

	}
	return playerdata;
}
function getStartLayerData(layer) {
	layerdata = {};
	if (layers[layer].startData)
		layerdata = layers[layer].startData();

	if (layerdata.unlocked === undefined)
		layerdata.unlocked = true;
	if (layerdata.total === undefined)
		layerdata.total = decimalZero;
	if (layerdata.best === undefined)
		layerdata.best = decimalZero;
	if (layerdata.resetTime === undefined)
		layerdata.resetTime = 0;
	if (layerdata.forceTooltip === undefined)
		layerdata.forceTooltip = false;

	layerdata.buyables = getStartBuyables(layer);
	if (layerdata.noRespecConfirm === undefined) layerdata.noRespecConfirm = false
	if (layerdata.clickables == undefined)
		layerdata.clickables = getStartClickables(layer);
	layerdata.spentOnBuyables = decimalZero;
	layerdata.upgrades = [];
	layerdata.milestones = [];
	layerdata.lastMilestone = null;
	layerdata.achievements = [];
	layerdata.challenges = getStartChallenges(layer);
	layerdata.grid = getStartGrid(layer);
	layerdata.prevTab = ""

	return layerdata;
}
function getStartBuyables(layer) {
	let data = {};
	if (layers[layer].buyables) {
		for (id in layers[layer].buyables)
			if (isPlainObject(layers[layer].buyables[id]))
				data[id] = decimalZero;
	}
	return data;
}
function getStartClickables(layer) {
	let data = {};
	if (layers[layer].clickables) {
		for (id in layers[layer].clickables)
			if (isPlainObject(layers[layer].clickables[id]))
				data[id] = "";
	}
	return data;
}
function getStartChallenges(layer) {
	let data = {};
	if (layers[layer].challenges) {
		for (id in layers[layer].challenges)
			if (isPlainObject(layers[layer].challenges[id]))
				data[id] = 0;
	}
	return data;
}
function getStartGrid(layer) {
	let data = {};
	if (! layers[layer].grid) return data
	if (layers[layer].grid.maxRows === undefined) layers[layer].grid.maxRows=layers[layer].grid.rows
	if (layers[layer].grid.maxCols === undefined) layers[layer].grid.maxCols=layers[layer].grid.cols

	for (let y = 1; y <= layers[layer].grid.maxRows; y++) {
		for (let x = 1; x <= layers[layer].grid.maxCols; x++) {
			data[100*y + x] = layers[layer].grid.getStartData(100*y + x)
		}
	}
	return data;
}

function fixSave() {
	defaultData = getStartPlayer();
	fixData(defaultData, player);

	for (layer in layers) {
		if (player[layer].best !== undefined)
			player[layer].best = new Decimal(player[layer].best);
		if (player[layer].total !== undefined)
			player[layer].total = new Decimal(player[layer].total);

		if (layers[layer].tabFormat && !Array.isArray(layers[layer].tabFormat)) {

			if (!Object.keys(layers[layer].tabFormat).includes(player.subtabs[layer].mainTabs))
				player.subtabs[layer].mainTabs = Object.keys(layers[layer].tabFormat)[0];
		}
		if (layers[layer].microtabs) {
			for (item in layers[layer].microtabs)
				if (!Object.keys(layers[layer].microtabs[item]).includes(player.subtabs[layer][item]))
					player.subtabs[layer][item] = Object.keys(layers[layer].microtabs[item])[0];
		}
	}
}
function fixData(defaultData, newData) {
	for (item in defaultData) {
		if (defaultData[item] == null) {
			if (newData[item] === undefined)
				newData[item] = null;
		}
		else if (Array.isArray(defaultData[item])) {
			if (newData[item] === undefined)
				newData[item] = defaultData[item];

			else
				fixData(defaultData[item], newData[item]);
		}
		else if (defaultData[item] instanceof Decimal) { // Convert to Decimal
			if (newData[item] === undefined)
				newData[item] = defaultData[item];

			else
				newData[item] = new Decimal(newData[item]);
		}
		else if ((!!defaultData[item]) && (typeof defaultData[item] === "object")) {
			if (newData[item] === undefined || (typeof defaultData[item] !== "object"))
				newData[item] = defaultData[item];

			else
				fixData(defaultData[item], newData[item]);
		}
		else {
			if (newData[item] === undefined)
				newData[item] = defaultData[item];
		}
	}
}
function load() {
	let get = localStorage.getItem(modInfo.id);

	if (get === null || get === undefined) {
		player = getStartPlayer();
		options = getStartOptions();
	}
	else {
		player = Object.assign(getStartPlayer(), JSON.parse(decodeURIComponent(escape(atob(get)))));
		fixSave();
		loadOptions();
	}

	if (options.offlineProd) {
		if (player.offTime === undefined)
			player.offTime = { remain: 0 };
		player.offTime.remain += (Date.now() - player.time) / 1000;
	}
	player.time = Date.now();
	versionCheck();
	changeTheme();
	updateLayers();
	setupModInfo();

	setupTemp();
	updateTemp();
	updateTemp();
	updateTabFormats()
	loadVue();
}

function loadOptions() {
	let get2 = localStorage.getItem(modInfo.id+"_options");
	if (get2) 
		options = Object.assign(getStartOptions(), JSON.parse(decodeURIComponent(escape(atob(get2)))));
	else 
		options = getStartOptions()
	if (themes.indexOf(options.theme) < 0) theme = "default"
	fixData(options, getStartOptions())

}

function setupModInfo() {
	modInfo.changelog = changelog;
	modInfo.winText = winText ? winText : `Congratulations! You have reached the end and beaten this game, but for now...`;

}
function fixNaNs() {
	NaNcheck(player);
}
function NaNcheck(data) {
	for (item in data) {
		if (data[item] == null) {
		}
		else if (Array.isArray(data[item])) {
			NaNcheck(data[item]);
		}
		else if (data[item] !== data[item] || checkDecimalNaN(data[item])) {
			if (!NaNalert) {
				clearInterval(interval);
				NaNalert = true;
				alert("Invalid value found in player, named '" + item + "'. Please let the creator of this mod know! You can refresh the page, and you will be un-NaNed.")
				return
			}
		}
		else if (data[item] instanceof Decimal) {
		}
		else if ((!!data[item]) && (data[item].constructor === Object)) {
			NaNcheck(data[item]);
		}
	}
}
function exportSave() {
	//if (NaNalert) return
	let str = btoa(JSON.stringify(player));

	const el = document.createElement("textarea");
	el.value = str;
	document.body.appendChild(el);
	el.select();
	el.setSelectionRange(0, 99999);
	document.execCommand("copy");
	document.body.removeChild(el);
}
function importSave(imported = undefined, forced = false) {
	if (imported === undefined)
		imported = prompt("Paste your save here");
	try {
		tempPlr = Object.assign(getStartPlayer(), JSON.parse(atob(imported)));
		if (tempPlr.versionType != modInfo.id && !forced && !confirm("This save appears to be for a different mod! Are you sure you want to import?")) // Wrong save (use "Forced" to force it to accept.)
			return;
		player = tempPlr;
		player.versionType = modInfo.id;
		fixSave();
		versionCheck();
		NaNcheck(save)
		save();
		window.location.reload();
	} catch (e) {
		return;
	}
}
function versionCheck() {
	let setVersion = true;

	if (player.versionType === undefined || player.version === undefined) {
		player.versionType = modInfo.id;
		player.version = 0;
	}

	if (setVersion) {
		if (player.versionType == modInfo.id && VERSION.num > player.version) {
			player.keepGoing = false;
			if (fixOldSave)
				fixOldSave(player.version);
		}
		player.versionType = getStartPlayer().versionType;
		player.version = VERSION.num;
		player.beta = VERSION.beta;
	}
}
var saveInterval = setInterval(function () {
	if (player === undefined)
		return;
	if (tmp.gameEnded && !player.keepGoing)
		return;
	if (options.autosave)
		save();
}, 5000);

window.onbeforeunload = () => {
    if (player.autosave) {
        save();
    }
};