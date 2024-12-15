// ************ Options ************

let options = {}

function getStartOptions() {
	return {
		autosave: false,
		msDisplay: "always",
		theme: "default",
		hqTree: false,
		hqStyle: ["","",""],
		offlineProd: false,
		hideChallenges: false,
		showStory: true,
		forceOneTab: false,
		oldStyle: false,
		tooltipForcing: true,
        skipDialogueErasure: false,
        fastForwardDialogue: false,
        precisionNumber: false,
        mobileShortcuts: false,
        additionalMobileShortcuts: false,
        pissLimit: [new Decimal(100),new Decimal(100),new Decimal(100),new Decimal(100)],
		musicMute: false,
		fontSpeed: 1, 
		currentTab: 0,
		offTimeStatus: false,
		offTimePercent: 0,
		hiddenOffTimeStatus: false, 
		saveFiles: ["","","","","","","","",""],
		saveFileState: [["",0,false,0,0],["",0,false,0,0],["",0,false,0,0],["",0,false,0,0],["",0,false,0,0],["",0,false,0,0],["",0,false,0,0],["",0,false,0,0],["",0,false,0,0]]
	}
}

function toggleOpt(name) {
	if (name == "oldStyle" && styleCooldown > 0)
		return;

	options[name] = !options[name];
	if (name == "oldStyle")
		updateStyle();
}
var styleCooldown = 0;
function updateStyle() {
	styleCooldown = 1;
	let css = document.getElementById("styleStuff");
	css.href = options.oldStyle ? "oldStyle.css" : "style.css";
	needCanvasUpdate = true;
}
function toggleAuto(toggle) {
	Vue.set(player[toggle[0]], [toggle[1]], !player[toggle[0]][toggle[1]]);
	needCanvasUpdate=true
}

function secretPlz(){
	if(player["???"].whatAreYouDoing>=9){
                player.tab="???"
                player["???"].whatAreYouDoing=0
                let lol = prompt("ENTER THE CODE")
				if (lol == null) lol = "cancel"
                switch(lol.toLowerCase()){
                    case "xeikar":
                        player.subtabs["???"].mainTabs = "xeikar"
                        break;
                    case "guide":
                        player.subtabs["???"].mainTabs = "guide"
                        break;
                    case "options":
                        player.subtabs["???"].mainTabs = "options"
                        break;
                    case "avgn":
                        player.subtabs["???"].mainTabs = "avgn"
						document.getElementById("avgn").play()
                        break;
                    case "terminal":
						alert("You're going straight to TERMINAL buddy.")
                        window.location.href = "https://angusnicneven.com/lookuponthisansweranytime";
                        break;
                    case "cancel":
						player.tab = "none"
                        break;
					case "Game.RuinTheFun()":
                        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                        break;
					case "dQw4w9WgXcQ":
                        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                        break;
                    default:
                        alert("L + ratio, bozo")
                        player.tab = "none"
                        break;
                }
            }
            else player["???"].whatAreYouDoing=player["???"].whatAreYouDoing+1
}

function limitThiShitPlease(lmao,stuff,negatives,decimals) {
	let numbah = []
	for(i=0;i<lmao.length;i++){
		numbah[i] = prompt(lmao[i])
		if(numbah[i].includes("numbah")){
			alert("i don't know what you're trying to do, but this isn't going to work")
			return;
		}
		if(numbah[i].includes("elseif")){
			alert("else if*")
			return;
		}
		if(numbah[i].includes("if") || numbah[i].includes("else") || numbah[i].includes("player") || numbah[i].includes("layers") || numbah[i].includes("tmt") || numbah[i].includes("console") || numbah[i].includes("Boolean") || numbah[i].includes("let") || numbah[i].includes("var") || numbah[i].includes("int") || numbah[i].includes("str") || numbah[i].includes("const") || numbah[i].includes("function") || numbah[i].includes("=") || numbah[i].includes("+") || numbah[i].includes("*") || numbah[i].includes("^") || numbah[i].includes("eq") || numbah[i].includes("gt") || numbah[i].includes("lt") || numbah[i].includes("Decimal") || numbah[i].includes("dOne") || numbah[i].includes("dZero")){
			alert("your ass ain't albert einstein there's no eval function in this one buddy")
			return;
		}
		if(numbah[i].includes("-")&&!negatives){
			alert("no, this function does not accept any negative numbers. and even if it did somehow work flawlessly, it'd still act as if it was set to 0\n\n\n\nimaginary numbers aren't acceptable as well")
			return;
		}
		if(isNaN(Number(numbah[i]))){
			alert("that's not a number please select something that won't break the game")
			return;
		}
		if(Number(numbah[i])%1!==0&&!decimals){
			alert("what?\n\ndear god dude no\n\nwhy")
			return;
		}
		if(numbah[i]==""){
			return;
		}
		eval(stuff)
	}
}

const MS_DISPLAYS = ["ALL", "LAST, AUTO, INCOMPLETE", "AUTOMATION, INCOMPLETE", "INCOMPLETE", "NONE"];

const MS_SETTINGS = ["always", "last", "automation", "incomplete", "never"];

function adjustMSDisp() {
	options.msDisplay = MS_SETTINGS[(MS_SETTINGS.indexOf(options.msDisplay) + 1) % 5];
}
function milestoneShown(layer, id) {
	complete = player[layer].milestones.includes(id);
	auto = layers[layer].milestones[id].toggles;

	switch (options.msDisplay) {
		case "always":
			return true;
			break;
		case "last":
			return (auto) || !complete || player[layer].lastMilestone === id;
			break;
		case "automation":
			return (auto) || !complete;
			break;
		case "incomplete":
			return !complete;
			break;
		case "never":
			return false;
			break;
	}
	return false;
}
