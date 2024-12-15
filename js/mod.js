let modInfo = {
	name: "My Very Good Tree 2",
	id: "TGVM",
	author: "Oleg (CheeseOverlord)",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.1",
	name: "Timeline Shenanigans",
}

let changelog = `<h1>Changelog:</h1><br>
	<h2>v0.1.1: Timeline Shenanigans</h2><br>
	<h3>[BUG FIXES (and whatnot)]</h3><br>
		- Replaced (game-ruining) feature of kindly folding your save file into its initial state with a simple alert()<br>
		- Polished Hidden Tab's "japanese-ification" and made it reveal itself at certain points<br>
		- Fixed High Quality tree not working properly<br>
		- Fixed few typos everywhere<br>
		- Fixed RPG stats not buffing certain resources/stats<br>
		- Changed Space layer's color to what it intended to look like<br>
	<h3>[QoLs]</h3><br>
		- Added a feature to view previous dialogues<br>
		- Added Save File feature<br>
		- Added a feature to speed up dialogues<br>
		- Added a feature to store offline points<br>
		- Expanded Cube/Terrasect's limit from z and t to all 4 dimensions<br>
		- Added a feature to silence music<br>
	<h3>[CONTENT]</h3><br>
		- Reworked Quests slightly (Requirement decreases instead of changing completely when timer runs out, so long as the quest is at least Level 2 and reset option shows preview instead of outright resetting your quest)<br>
		- Added Timelines<br>
		- Added Space's second tab<br><br>
	<h5>v0.1.0.1: dear god no<br>
		- Fixed bug involving dialog softlocking players (and added comic sans for real this time)
		- Replaced method of accessing secret menu due mobile players not having ability to access it</h3><br>
	<h2>v0.1: New Beginning</h2><br>
		- Starts off with 3 main layers.<br>
		- Hidden Lore??!?!????.<br>
		- Some goddamn decent mobile QoLs<br>
		- Some secrets were added as well<Br>
		- orange cat wasn't added much to everyone's disappointment<br>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything","timelineStart"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!player["tree-tab"].shown[0])
		return new Decimal(0)

	let gain = new Decimal(0).add(tmp.yourGod.buyables[11].effect).mul(tmp.yourGod.buyables[12].effect).mul(tmp.yourGod.buyables[22].effect).pow(tmp.yourGod.buyables[13].effect)
    if(hasUpgrade("p",11) || (!hasUpgrade("p",11) && player.p.points.lt(1) && player.points.lt(10)) && gain.eq(0)) gain = gain.add(1)
    if(hasUpgrade("p",12)) gain = gain.add(1)
    if(hasUpgrade("p",13)) gain = gain.mul(upgradeEffect("p",13))
	for(i=0;i<3;i++){
		if(player.s.hypotheticalIdEffects[i]==0) gain = gain.mul(tmp.s.hypotheticalEffects[i])
	}
	if(player.s.hypotheticalIdEffects[3]==0) gain = gain.div(tmp.s.hypotheticalEffects[3])
    if(player.a.unlockedTabs[1]) gain = gain.mul(player.a.statsRPG[0])
    if(player["tree-tab"].shown[2]) gain = gain.mul(tmp.s.buyables[11].effect)
    if(player["tree-tab"].shown[3]) gain = gain.mul(tmp.t.buyables[11].effect)
    if(hasUpgrade("p",21)) gain = gain.mul(tmp.p.upgrades[21].effect)
    if(hasUpgrade("s",11)) gain = gain.mul(tmp.s.upgrades[11].effect)
    if(hasUpgrade("t",13)) gain = gain.mul(tmp.t.upgrades[13].effect)
    if(hasUpgrade("t",21)) gain = gain.mul(tmp.t.upgrades[21].effect)
    if(hasUpgrade("t",23)) gain = gain.mul(tmp.t.upgrades[12].effect) 
	gain = gain.mul(tmp.her.timelineEffects[1])
	if(player.her.timeline[1]==1) gain = gain.root(2)
	if(gain.gte(277777,7777777778)) gain = gain = gain.pow(new Decimal(1/3600).mul(player.a.unlockedTabs[1]?player.a.finalStatsRPG[1]:1).min(3600)).times(new Decimal(277777,7777777778).pow(decimalOne.sub(new Decimal(1/3600).mul(player.a.unlockedTabs[1]?player.a.finalStatsRPG[1]:1).min(1))))
	gain = gain.mul(tmp.her.buyables["level4"].effect.root(player.her.timeline[1]==1?2:1))
	return !(player["tree-tab"].didyoujustcloseonme[0]=='') ? new Decimal(0) : gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function(){ 
		let etaTime = new Decimal(player.yourGod.quests[player.yourGod.selectedQuest-1][0][0]).sub(eval(player.yourGod.quests[player.yourGod.selectedQuest-1][0][2])).div([getPointGen(),getResetGain("p").mul(tmp.p.passiveGeneration),getResetGain("s").mul(tmp.s.passiveGeneration),tmp.t.timeGain][player.yourGod.quests[player.yourGod.selectedQuest-1][0][3]])
		let displayShit = player.her.buyables["progress"].gte(2)?`<h1>TIMELINE ${formatWhole(player.her.timeline[1])}: ${(player.her.japanese?["MAIN ZONE","ROOT ZONE","ANTI-RPG ZONE"]:["THE MAIN TIMELINE","THE ROOT TIMELINE","THE RPG-LESS TIMELINE"])[player.her.timeline[1]]}</h1><br>`:``
		displayShit = displayShit+(player.yourGod.selectedQuest!==4?`${["Strength","Agility","Intelligence"][player.yourGod.selectedQuest-1]} Quest progression: ${format(eval(player.yourGod.quests[player.yourGod.selectedQuest-1][0][2]))} / ${format(player.yourGod.quests[player.yourGod.selectedQuest-1][0][0])} ${player.yourGod.quests[player.yourGod.selectedQuest-1][0][1]} (${formatTime(player.yourGod.quests[[player.yourGod.selectedQuest-1]][1][0])} left)<br>(Estimated Time: ${formatTime(etaTime).includes("NaN")?"Infinity":formatTime(etaTime)} <span style='color:red;'>[${formatTime(player["tree-tab"].etaBleh[2]).includes("NaN")?"Infinity":formatTime(player["tree-tab"].etaBleh[2])}]</span>)<br><h3 style='font-size:10px;color:gray;'>[based on current resource, requirement, resource gain and <span style='font-size:10px;color:darkred;display: inline; font-family: "Lucida Console", "Courier New", monospace;'>difference in expected ETA and real time</span>. tl;dr. Take this with a huge grain of salt.]</h3><br>`:``)
		displayShit = displayShit+(getPointGen().gte(Decimal.mul(277777.7777777778, tmp.her.buyables["level4"].effect.root(player.her.timeline[1]==1?2:1)))?`Your point gain is raised to the power of ^${format(new Decimal(1).div(new Decimal(3600).div(player.a.unlockedTabs[1]?player.a.finalStatsRPG[1]:1)).min(1))}. FUCK YOU.<br>`:"")
		if(player["tree-tab"].storedOffPoints.gt(0)) displayShit = displayShit + `You have ${format(player["tree-tab"].storedOffPoints)} stored offline points<br>`
		displayShit = player["tree-tab"].youShouldStopYourselfNOW?`<h1>THE TIME HAS BEEN STOPPED.<br>[ENDGAME]`:displayShit+`[Current Endgame: Space and Time layers unlocked]<br>`
		if(player.her.fuckOFFIMALLOWEDTOCHEATNOW!=1) displayShit = displayShit + `Super Secret Speedhack: x${format(player.her.fuckOFFIMALLOWEDTOCHEATNOW)}`
		return displayShit+(player.her.gameState==-1?`<br><h1 style='font-size:10px;opacity:${new Decimal(player.timePlayed+1).log(5.2).div(10).min(1)}'>(you cheated btw)`:"")
	}
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}