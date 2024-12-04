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
	num: "0.1",
	name: "New Beginning",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1: New Beginning</h3><br>
		- Starts off with 3 main layers.<br>
		- Hidden Lore??!?!????.<br>
		- Some goddamn decent mobile QoLs<br>
		- Some secrets were added as well<Br>
		- orange cat wasn't added much to everyone's disappointment<br>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

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
    if(player.a.unlockedTabs[1]) gain = gain.mul(player.a.statsRPG[0])
    if(player["tree-tab"].shown[2]) gain = gain.mul(tmp.s.buyables[11].effect)
    if(player["tree-tab"].shown[3]) gain = gain.mul(tmp.t.buyables[11].effect)
    if(hasUpgrade("p",21)) gain = gain.mul(tmp.p.upgrades[21].effect)
    if(hasUpgrade("s",11)) gain = gain.mul(tmp.s.upgrades[11].effect)
    if(hasUpgrade("t",13)) gain = gain.mul(tmp.t.upgrades[13].effect)
    if(hasUpgrade("t",21)) gain = gain.mul(tmp.t.upgrades[21].effect)
    if(hasUpgrade("t",23)) gain = gain.mul(tmp.t.upgrades[12].effect)   
	if(gain.gte(277777,7777777778)) gain = gain = gain.pow(new Decimal(1/3600).mul(player.a.finalStatsRPG[1]).min(3600)).times(new Decimal(277777,7777777778).pow(decimalOne.sub(new Decimal(1/3600).mul(player.a.finalStatsRPG[1]).min(1))))
	gain = gain.mul(tmp.her.buyables["level4"].effect)
	return !(player["tree-tab"].didyoujustcloseonme[0]=='') ? new Decimal(0) : gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function(){ 
		let displayShit = ``
		displayShit = displayShit+(player.yourGod.selectedQuest!==4?`${["Strength","Agility","Intelligence"][player.yourGod.selectedQuest-1]} Quest progression: ${format(eval(player.yourGod.quests[player.yourGod.selectedQuest-1][0][2]))} / ${format(player.yourGod.quests[player.yourGod.selectedQuest-1][0][0])} ${player.yourGod.quests[player.yourGod.selectedQuest-1][0][1]} (${formatTime(player.yourGod.quests[i][1][0])} left)<br>`:``)
		displayShit = displayShit+(getPointGen().gte(277777,7777777778)?`Your point gain is raised to the power of ^${format(new Decimal(1).div(new Decimal(3600).div(player.a.finalStatsRPG[1])).min(1))}. FUCK YOU.`:"")
		if(player.p.points.gte(969696969)) displayShit = displayShit+`<br>"I'm sorry Dave, I'm afraid I can't do that"`
		if(player["tree-tab"].youShouldStopYourselfNOW) displayShit = `<h1>THE TIME HAS BEEN STOPPED.<br>[ENDGAME]`
		return displayShit
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