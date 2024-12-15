// ************ Big Feature related ************

function respecBuyables(layer) {
	if (!layers[layer].buyables) return
	if (!layers[layer].buyables.respec) return
	if (!player[layer].noRespecConfirm && !confirm(tmp[layer].buyables.respecMessage || "Are you sure you want to respec? This will force you to do a \"" + (tmp[layer].name ? tmp[layer].name : layer) + "\" reset as well!")) return
	run(layers[layer].buyables.respec, layers[layer].buyables)
	updateBuyableTemp(layer)
	document.activeElement.blur()
}
	
function caesarCipher(str, shift) {  let result = "";  for (let i = 0; i < str.length; i++) {    let charCode = str.charCodeAt(i);    if (charCode >= 65 && charCode <=  90) {      result += String.fromCharCode((charCode - 65 + shift) % 26 + 65);    } else if (charCode >= 97 && charCode <= 122) {      result += String.fromCharCode((charCode - 97 + shift) % 26 + 97);       } else {      result += str[i];     }  }   return result;}

function canAffordUpgrade(layer, id) {
	let upg = tmp[layer].upgrades[id]
	if(tmp[layer].deactivated) return false
	if (tmp[layer].upgrades[id].canAfford === false) return false
	let cost = tmp[layer].upgrades[id].cost
	if (cost !== undefined) 
		return canAffordPurchase(layer, upg, cost)

	return true
}

function findPreviousDialogues(){
	let theThingClean = [
        [[//MAIN TIMELINE
        `HEY YOU.<br>YES, YOU.<br>IT IS A PLEASURE TO MEET YOU AGAIN.<br><br>SO BASICALLY... I NEED YOUR HELP.`,
        `YEAH, I KNOW WHAT YOU MIGHT BE THINKING, "WHO<br>IS THIS SELF-ESTEEMED AND HANDSOME LOOKING<br>INDIVIDUAL?"<br>IT DOESN'T MATTER.`,
        `WHAT MATTERS IS THAT YOU NEED TO GATHER<br>RESOURCES.<br>"WHY?", YOU MAY ASK... WELL... UH, YOU KNOW.<br><br>STUFF.<br>CAN'T PROGRESS WITHOUT LAYERS, YOU KNOW.`,
        `I THINK WE BOTH KNOW WHERE THIS IS GOING NOW.`,
        `WELL DONE.`,
        `I APPRECIATE YOUR EFFORT, I'M HONEST... FORGET<br>WHAT I WAS ABOUT TO WRITE BEFORE.`,
        `I'VE DECIDED THAT YOU DESERVE SOMETHING.<br>HERE ARE SOME UPGRADES FOR NOW.<br><br>I'LL BE BACK FOR SOME MORE.`,
        `UNTIL THEN, GOODBYE.`,
        `HEY, WOULD YOU LOOK AT THAT. YOU JUST UNLOCKED<br>THE ACHIEVEMENT LAYER.<br><br>COOL, HUH?`,
        `. . . OKAY MAYBE NOT, BUT IT'S STILL SOMETHING.<br><br>WE CAN DO BETTER.<br>LET ME JUST...`,
        `ALRIGHT, THIS SHOULD DO IT.<br><br>UH. NO, THAT WON'T DO.<br><br>YOU'RE GONNA NEED THIS, TRUST ME.`,
        `HOW'S THAT FOR ACHIEVEMENT LAYER?<br><br>YEAH, IT'S KINDA DULL.`,
        `... RIGHT, THE LAYERS.<br>YOU NEED MORE OF THEM TO SET ME FREE.`,
        `I'LL LEND YOU MORE UPGRADES JUST INCASE.<br><br>NOW CHOP CHOP AND DO ME A THING OR TWO.`,
        ],
        [
        `silly`,
        `HMMM, SO YOU CHOSE SPACE LAYER, HUH.<br><br>INTERESTING... LIKE I COULD GIVE A DAMN ABOUT IT.`,
        `EITHER WAY, WELL DONE UNLOCKING THAT LAYER...<br><br>SPEAKING OF, WE NEED THE CONTENT.`,
        `MY RESOURCES ARE STILL VERY LIMINAL.<br><br>NONETHELESS, I'LL TRY MY BEST TO EXPAND IT.<br><br>(GET IT?)`,
        `BUT ENOUGH CHIT CHATTING, I STILL HAVE ONE MORE<br>FEATURE TO IMPLEMENT.`,
        `TRUST ME, BUDDY.<br><br>IT.<br>WILL.<br>BE.<br>WORTH IT.`,
        `LET'S FUCKING GOOOOOOOOOOOOOOOOOO-<br><br><br>my bad lmao.`,
        `WELL, AS PROMISED, I'LL BESTOW YOU WITH THE<br>BEST IDEA I HAD IN MIND.<br><br>I JUST NEED SOME TIME TO IMPLEMENT IT PROPERLY.`,
        `DOWNLOADING L-X.ZIP...<br><br>EXPORTING L-X.ZIP: 100%`,
        `/INSTALL ANTI_BALANCER.LAYER...<br><br>ANTI_BALANCER.LAYER HAS BEEN SUCCESSFULLY<br>INSTALLED.`,
        `. . . WELL? WHAT ARE YOU WAITING FOR?<br><br>WHY WON'T YOU TAKE A LOOK FOR YOURSELF?`,
        `... OH RIGHT, I FORGOT TO UNLOCK IT.<br><br>EITHER WAY, I'LL BE BACK ONCE YOU'RE DONE<br>ADMIRING ITS HEIGHTENED PERFECTION.`,
        `WELL... UH, I FORGOT WHAT I WANTED TO SAY.<br><br>SINCE YOU'RE ALREADY HERE, MIGHT AS WELL LET<br>YOU GET THE OTHER LAYER.`,
        `I'LL HAND YOU OVER THAT LAYER...<br><br>EXCEPT NOW YOU HAVE TO UNLOCK IT TOO.<br><br>JUST LIKE IN EA.`,
        `ALL I'M GONNA SAY IS GOOD LUCK WITH THAT ONE.`,
        `WELL DONE.<br>VERY, WELL DONE.`,
        ],
        [
        `ollie`,
        `HMMM, SO YOU CHOSE TIME LAYER, HUH.<br><br>INTERESTING... LIKE I HAVE A TIME TO CARE ABOUT IT.`,
        `EITHER WAY, WELL DONE UNLOCKING THAT LAYER...<br><br>SPEAKING OF, WE NEED THE CONTENT.`,
        `MY RESOURCES ARE STILL VERY DILATED.<br><br>NONETHELESS, I'LL TRY MY BEST TO ACCELERATE IT.<br><br>(GET IT?)`,
        `BUT ENOUGH CHIT CHATTING, I STILL HAVE ONE MORE<br>FEATURE TO IMPLEMENT.`,
        `TRUST ME, BUDDY.<br><br>IT.<br>WILL.<br>BE.<br>WORTH IT.`,
        `LET'S FUCKING GOOOOOOOOOOOOOOOOOO-<br><br><br><br>my bad lmao.`,
        `WELL, AS PROMISED, I'LL BESTOW YOU WITH THE<br>BEST IDEA I HAD IN MIND.<br><br>I JUST NEED SOME TIME TO IMPLEMENT IT PROPERLY.`,
        `DOWNLOADING L-X.ZIP...<br><br>EXPORTING L-X.ZIP: 0%   1%  2%  6%  25%  34%  63%  76%  84%  89%  93%  94%  96%  97%  98%  99%  100%_*_*_*`,
        `/INSTALL ANTI_BALANCER.LAYER...<br><br>ANTI_BALANCER.LAYER HAS BEEN SUCCESSFULLY<br>INSTALLED.`,
        `. . . WELL? WHAT ARE YOU WAITING FOR?<br><br>WHY WON'T YOU TAKE A LOOK FOR YOURSELF?`,
        `... OH RIGHT, I FORGOT TO UNLOCK IT.<br><br>EITHER WAY, I'LL BE BACK ONCE YOU'RE DONE<br>ADMIRING ITS HEIGHTENED PERFECTION.`,
        `WELL... UH, I FORGOT WHAT I WANTED TO SAY.<br><br>SINCE YOU'RE ALREADY HERE, MIGHT AS WELL LET<br>YOU GET THE OTHER LAYER.`,
        `I'LL HAND YOU OVER THAT LAYER...<br><br>EXCEPT NOW YOU HAVE TO UNLOCK IT TOO.<br><br>JUST LIKE IN EA.`,
        `ALL I'M GONNA SAY IS GOOD LUCK WITH THAT ONE.`
        ],
		[
		`silly billy`,
		`HEY, YOU DID IT!<br><br>YOU FINALLY REACHED 1 BILLION SOMETHING.<br>WHATEVER, YOU UNLOCKED THE OTHER LAYER!&&`,
		`WITH THAT BEING SAID, UH...<br><br>I DIDN'T THINK YOU'D ACTUALLY GET THIS FAR.`,
		`NOW, OBVIOUSLY, I CAN'T JUST LEAVE YOU ALL BY<br>YOURSELF.<br><br>NOT WITHOUT AN ANOTHER LAYER, AT LEAST.`,
		`DON'T WORRY, YOU WON'T HAVE TO GRIND IT THIS<br>TIME...<br><br>(NO PROMISES GUARANTEED!)`
		],
        [
        `bitch we haven't even started<br><br>just<br><br>get the fuck outta my game`,
        `im bussin *SONIC.EXE LAUGHTER*`
        ]],
        [[//ROOT TIMELINE
        `HEY YOU.<br>YES, YOU.<br>IT IS A PLEASURE TO MEET YOU AGAIN.<br><br>SO BASICALLY... I NEED YOUR HELP.`,
        `YEAH, I KNOW WHAT YOU MIGHT BE THINKING, "WHO<br>IS THIS SELF-ESTEEMED AND HANDSOME LOOKING<br>INDIVIDUAL?"<br>IT DOESN'T MATTER.`,
        `WHAT MATTERS IS THAT YOU NEED TO GATHER<br>RESOURCES.<br>"WHY?", YOU MAY ASK... WELL... UH, YOU KNOW.<br><br>STUFF.<br>CAN'T PROGRESS WITHOUT LAYERS, YOU KNOW.`,
        `I THINK WE BOTH KNOW WHERE THIS IS GOING NOW.`,
        `... HUH, THAT'S ODD.<br><br>I DON'T REMEMBER SETTING RESET GAIN THIS LOW...`,
		`OH WELL.<br><br>THOSE ARE NONE OF MY PROBLEMS, ANYWAYS.`,
        `I APPRECIATE YOUR EFFORT, DESPITE ODDITIES.`,
        `I'VE DECIDED THAT YOU DESERVE SOMETHING.<br>HERE ARE SOME UPGRADES FOR NOW.<br><br>I'LL BE BACK FOR SOME MORE.`,
        `UNTIL THEN, GOODBYE.`,
        `HEY, WOULD YOU LOOK AT THAT. YOU JUST UNLOCKED<br>THE ACHIEVEMENT LAYER.<br><br>COOL, HUH?`,
        `. . . OKAY MAYBE NOT, BUT IT'S STILL SOMETHING.<br><br>WE CAN DO BETTER.<br>LET ME JUST...`,
        `ALRIGHT, THIS SHOULD DO IT.<br><br>UH. NO, THAT WON'T DO.<br><br>YOU'RE GONNA NEED THIS, TRUST ME.`,
        `HOW'S THAT FOR ACHIEVEMENT LAYER?<br><br>YEAH, IT'S KINDA DULL.`,
        `... RIGHT, THE LAYERS.<br>YOU NEED MORE OF THEM TO SET ME FREE.`,
        `I'LL LEND YOU MORE UPGRADES JUST INCASE.<br><br>NOW CHOP CHOP AND DO ME A THING OR TWO.`,
		`. . . something ain't right here.`
        ],
        [
        `silly`,
        `HMMM, SO YOU CHOSE SPACE LAYER, HUH.<br><br>INTERESTING... LIKE I COULD GIVE A DAMN ABOUT IT.`,
        `EITHER WAY, WELL DONE UNLOCKING THAT LAYER...<br><br>SPEAKING OF, WE NEED THE CONTENT.`,
        `MY RESOURCES ARE STILL VERY LIMINAL.<br><br>NONETHELESS, I'LL TRY MY BEST TO EXPAND IT.<br><br>(GET IT?)`,
        `BUT ENOUGH CHIT CHATTING, I STILL HAVE ONE MORE<br>FEATURE TO IMPLEMENT.`,
        `TRUST ME, BUDDY.<br><br>IT.<br>WILL.<br>BE.<br>WORTH IT.`,
        `. . . TOOK YOU A WHILE, HUH.<br><br>JUST FOR THE RECORD, I NEVER ENCOUNTERED<br>SUCH BUG BEFORE, CAN'T BE BOTHERED TO FIX IT<br>THOUGH.`,
        `WELL, AS PROMISED, I'LL BESTOW YOU WITH THE<br>BEST IDEA I HAD IN MIND.<br><br>I JUST NEED SOME TIME TO IMPLEMENT IT PROPERLY.`,
        `DOWNLOADING L-X.ZIP...<br><br>EXPORTING L-X.ZIP: 100%*`,
        `/INSTALL ANTI_BALANCER.LAYER...<br><br>ANTI_BALANCER.LAYER HAS BEEN SUCCESSFULLY<br>INSTALLED.`,
        `. . . WELL? WHAT ARE YOU WAITING FOR?<br><br>WHY WON'T YOU TAKE A LOOK FOR YOURSELF?`,
        `... OH RIGHT, I FORGOT TO UNLOCK IT.<br><br>EITHER WAY, I'LL BE BACK ONCE YOU'RE DONE<br>ADMIRING ITS HEIGHTENED PERFECTION.`,
		`LOOK HERE, "bUddY".<br>I DON'T KNOW WHAT THE HELL IS HAPPENING WITH<br>MY TREE OR WHAT'S THE CAUSE OF IT, BUT IT ALL<br>WORKED JUST PERFECTLY FINE SECONDS AGO.<br><br>I DON'T CARE WHAT YOU ARE OR WHAT IS YOUR<br>GOAL, I WILL MAKE YOU FIND OUT REAL SOON.`,
        `WELL... UH, I FORGOT WHAT I WANTED TO SAY.<br><br>SINCE YOU'RE ALREADY HERE, MIGHT AS WELL LET<br>YOU GET THE OTHER LAYER.`,
        `I'LL HAND YOU OVER THAT LAYER...<br><br>EXCEPT NOW YOU HAVE TO UNLOCK IT TOO.<br><br>JUST LIKE IN EA.`,
        `ALL I'M GONNA SAY IS GOOD LUCK WITH THAT ONE.`,
        `WELL DONE.<br>VERY, WELL DONE.`,
        ],
        [
        `ollie`,
        `HMMM, SO YOU CHOSE TIME LAYER, HUH.<br><br>INTERESTING... LIKE I HAVE A TIME TO CARE ABOUT IT.`,
        `EITHER WAY, WELL DONE UNLOCKING THAT LAYER...<br><br>SPEAKING OF, WE NEED THE CONTENT.`,
        `MY RESOURCES ARE STILL VERY DILATED.<br><br>NONETHELESS, I'LL TRY MY BEST TO ACCELERATE IT.<br><br>(GET IT?)`,
        `BUT ENOUGH CHIT CHATTING, I STILL HAVE ONE MORE<br>FEATURE TO IMPLEMENT.`,
        `TRUST ME, BUDDY.<br><br>IT.<br>WILL.<br>BE.<br>WORTH IT.`,
        `. . . TOOK YOU A WHILE, HUH.<br><br>JUST FOR THE RECORD, I NEVER ENCOUNTERED<br>SUCH BUG BEFORE, CAN'T BE BOTHERED TO FIX IT<br>THOUGH.`,
        `WELL, AS PROMISED, I'LL BESTOW YOU WITH THE<br>BEST IDEA I HAD IN MIND.<br><br>I JUST NEED SOME TIME TO IMPLEMENT IT PROPERLY.`,
        `DOWNLOADING L-X.ZIP...<br><br>EXPORTING L-X.ZIP: 100%`,
        `/INSTALL ANTI_BALANCER.LAYER...<br><br>ANTI_BALANCER.LAYER HAS BEEN SUCCESSFULLY<br>INSTALLED.`,
        `. . . WELL? WHAT ARE YOU WAITING FOR?<br><br>WHY WON'T YOU TAKE A LOOK FOR YOURSELF?`,
        `... OH RIGHT, I FORGOT TO UNLOCK IT.<br><br>EITHER WAY, I'LL BE BACK ONCE YOU'RE DONE<br>ADMIRING ITS HEIGHTENED PERFECTION.`,
		`LOOK HERE, "bUddY".<br>I DON'T KNOW WHAT THE HELL IS HAPPENING WITH<br>MY TREE OR WHAT'S THE CAUSE OF IT, BUT IT ALL<br>WORKED JUST PERFECTLY FINE SECONDS AGO.<br><br>I DON'T CARE WHAT YOU ARE OR WHAT IS YOUR<br>GOAL, I WILL MAKE YOU FIND OUT REAL SOON.`,
        `WELL... UH, I FORGOT WHAT I WANTED TO SAY.<br><br>SINCE YOU'RE ALREADY HERE, MIGHT AS WELL LET<br>YOU GET THE OTHER LAYER.`,
        `I'LL HAND YOU OVER THAT LAYER...<br><br>EXCEPT NOW YOU HAVE TO UNLOCK IT TOO.<br><br>JUST LIKE IN EA.`,
        `ALL I'M GONNA SAY IS GOOD LUCK WITH THAT ONE.`,
        `WELL DONE.<br>VERY, WELL DONE.`,
        ],
		[
		`silly billy`,
		`HEY, YOU DID IT!<br><br>YOU FINALLY REACHED 1 BILLION SOMETHING.<br>WHATEVER, YOU UNLOCKED THE OTHER LAYER!&&`,
		`WITH THAT BEING SAID, UH...<br><br>I DIDN'T THINK YOU'D ACTUALLY GET THIS FAR.`,
		`NOW, OBVIOUSLY, I CAN'T JUST LEAVE YOU ALL BY<br>YOURSELF.<br><br>NOT WITHOUT AN ANOTHER LAYER, AT LEAST.`,
		`DON'T WORRY, YOU WON'T HAVE TO GRIND IT THIS<br>TIME...<br><br>(NO PROMISES GUARANTEED!)`
		],
        [
        `bitch we haven't even started<br><br>just<br><br>get the fuck outta my game`,
        `im bussin *SONIC.EXE LAUGHTER*`
        ]],
        [[//ANTI RPG TIMELINE
        `HEY YOU.<br>YES, YOU.<br>IT IS A PLEASURE TO MEET YOU AGAIN.<br><br>SO BASICALLY... I NEED YOUR HELP.`,
        `YEAH, I KNOW WHAT YOU MIGHT BE THINKING, "WHO<br>IS THIS SELF-ESTEEMED AND HANDSOME LOOKING<br>INDIVIDUAL?"<br>IT DOESN'T MATTER.`,
        `WHAT MATTERS IS THAT YOU NEED TO GATHER<br>RESOURCES.<br>"WHY?", YOU MAY ASK... WELL... UH, YOU KNOW.<br><br>STUFF.<br>CAN'T PROGRESS WITHOUT LAYERS, YOU KNOW.`,
        `I THINK WE BOTH KNOW WHERE THIS IS GOING NOW.`,
        `WELL DONE.`,
        `I APPRECIATE YOUR EFFORT, I'M HONEST... FORGET<br>WHAT I WAS ABOUT TO WRITE BEFORE.`,
        `I'VE DECIDED THAT YOU DESERVE SOMETHING.<br>HERE ARE SOME UPGRADES FOR NOW.<br><br>I'LL BE BACK FOR SOME MORE.`,
        `UNTIL THEN, GOODBYE.`,
        `HEY, WOULD YOU LOOK AT THAT. YOU JUST UNLOCKED<br>THE ACHIEVEMENT LAYER.<br><br>COOL, HUH?`,
        `. . . OKAY MAYBE NOT, BUT IT'S STILL SOMETHING.<br><br>WE CAN DO BETTER.<br>LET ME JUST...`,
        `ALRIGHT, THIS SHOULD DO IT.<br><br>UH. NO, THAT WON'T DO.<br><br>YOU'RE GONNA NEED THIS, TRUST ME.`,
        `HOW'S THAT FOR ACHIEVEMENT LAYER?<br><br>YEAH, IT'S KINDA-`, 
		`. . . WHERE DID STATS TAB GO?<br><br>I MEAN, IT IS KINDA MADE SPECIFICALLY FOR NERDS.<br><br>ON SECOND THOUGH, IT REALLY NEVER WORKED OUT<br>WELL ANYWAYS.`,
		`YOU'LL BE FINE WITHOUT THOSE UNNECESSARY<br>NUMBERS, DON'T THINK TOO HARD ABOUT IT.`,
        `... RIGHT, THE LAYERS.<br>YOU NEED MORE OF THEM TO SET ME FREE.`,
        `I'LL LEND YOU MORE UPGRADES JUST INCASE.<br><br>NOW CHOP CHOP AND DO ME A THING OR TWO.`,
        ],
        [
        `silly`,
        `HMMM, SO YOU CHOSE SPACE LAYER, HUH.<br><br>INTERESTING... LIKE I COULD GIVE A DAMN ABOUT IT.`,
        `EITHER WAY, WELL DONE UNLOCKING THAT LAYER...<br><br>SPEAKING OF, WE NEED THE CONTENT.`,
        `MY RESOURCES ARE STILL VERY LIMINAL.<br><br>NONETHELESS, I'LL TRY MY BEST TO EXPAND IT.<br><br>(GET IT?)`,
        `BUT ENOUGH CHIT CHATTING, I STILL HAVE ONE MORE<br>FEATURE TO IMPLEMENT.`,
        `TRUST ME, BUDDY.<br><br>IT.<br>WILL.<br>BE.<br>WORTH IT.`,
        `LET'S FUCKING GOOOOOOOOOOOOOOOOOO-<br><br><br>my bad lmao.`,
        `WELL, AS PROMISED, I'LL BESTOW YOU WITH THE<br>BEST IDEA I HAD IN MIND.<br><br>I JUST NEED SOME TIME TO IMPLEMENT IT PROPERLY.`,
        `DOWNLOADING L-X.ZIP...<br><br>EXPORTING L-X.ZIP: 100%`,
        `/INSTALL ANTI_BALANCER.LAYER...<br><br>ANTI_BALANCER.LAYER HAS BEEN SUCCESSFULLY<br>INSTALLED.`,
        `. . . WELL? WHAT ARE YOU WAITING FOR?<br><br>WHY WON'T YOU TAKE A LOOK FOR YOURSELF?`,
        `... OH RIGHT, I FORGOT TO UNLOCK IT.<br><br>EITHER WAY, I'LL BE BACK ONCE YOU'RE DONE<br>ADMIRING ITS HEIGHTENED PERFECTION.`,
        `WELL... UH, I FORGOT WHAT I WANTED TO SAY.<br><br>SINCE YOU'RE ALREADY HERE, MIGHT AS WELL LET<br>YOU GET THE OTHER LAYER.`,
        `I'LL HAND YOU OVER THAT LAYER...<br><br>EXCEPT NOW YOU HAVE TO UNLOCK IT TOO.<br><br>JUST LIKE IN EA.`,
        `ALL I'M GONNA SAY IS GOOD LUCK WITH THAT ONE.`,
        `WELL DONE.<br>VERY, WELL DONE.`,
        ],
        [
        `ollie`,
        `HMMM, SO YOU CHOSE TIME LAYER, HUH.<br><br>INTERESTING... LIKE I HAVE A TIME TO CARE ABOUT IT.`,
        `EITHER WAY, WELL DONE UNLOCKING THAT LAYER...<br><br>SPEAKING OF, WE NEED THE CONTENT.`,
        `MY RESOURCES ARE STILL VERY DILATED.<br><br>NONETHELESS, I'LL TRY MY BEST TO ACCELERATE IT.<br><br>(GET IT?)`,
        `BUT ENOUGH CHIT CHATTING, I STILL HAVE ONE MORE<br>FEATURE TO IMPLEMENT.`,
        `TRUST ME, BUDDY.<br><br>IT.<br>WILL.<br>BE.<br>WORTH IT.`,
        `LET'S FUCKING GOOOOOOOOOOOOOOOOOO-<br><br><br><br>my bad lmao.`,
        `WELL, AS PROMISED, I'LL BESTOW YOU WITH THE<br>BEST IDEA I HAD IN MIND.<br><br>I JUST NEED SOME TIME TO IMPLEMENT IT PROPERLY.`,
        `DOWNLOADING L-X.ZIP...<br><br>EXPORTING L-X.ZIP: 0%   1%  2%  6%  25%  34%  63%  76%  84%  89%  93%  94%  96%  97%  98%  99%  100%_*_*_*`,
        `/INSTALL ANTI_BALANCER.LAYER...<br><br>ANTI_BALANCER.LAYER HAS BEEN SUCCESSFULLY<br>INSTALLED.`,
        `. . . WELL? WHAT ARE YOU WAITING FOR?<br><br>WHY WON'T YOU TAKE A LOOK FOR YOURSELF?`,
        `... OH RIGHT, I FORGOT TO UNLOCK IT.<br><br>EITHER WAY, I'LL BE BACK ONCE YOU'RE DONE<br>ADMIRING ITS HEIGHTENED PERFECTION.`,
        `WELL... UH, I FORGOT WHAT I WANTED TO SAY.<br><br>SINCE YOU'RE ALREADY HERE, MIGHT AS WELL LET<br>YOU GET THE OTHER LAYER.`,
        `I'LL HAND YOU OVER THAT LAYER...<br><br>EXCEPT NOW YOU HAVE TO UNLOCK IT TOO.<br><br>JUST LIKE IN EA.`,
        `ALL I'M GONNA SAY IS GOOD LUCK WITH THAT ONE.`
        ],
		[
		`silly billy`,
		`HEY, YOU DID IT!<br><br>YOU FINALLY REACHED 1 BILLION SOMETHING.<br>WHATEVER, YOU UNLOCKED THE OTHER LAYER!&&`,
		`WITH THAT BEING SAID, UH...<br><br>I DIDN'T THINK YOU'D ACTUALLY GET THIS FAR.`,
		`NOW, OBVIOUSLY, I CAN'T JUST LEAVE YOU ALL BY<br>YOURSELF.<br><br>NOT WITHOUT AN ANOTHER LAYER, AT LEAST.`,
		`DON'T WORRY, YOU WON'T HAVE TO GRIND IT THIS<br>TIME...<br><br>(NO PROMISES GUARANTEED!)`
		],
        [
        `bitch we haven't even started<br><br>just<br><br>get the fuck outta my game`,
        `im bussin *SONIC.EXE LAUGHTER*`
        ]]
    ]
	let memory = {0:undefined,1:undefined,2:undefined} 
	let howMany = 0
	let fuckYeah = [false,false,false]
	for(i=0;i<(player["tree-tab"].unlockOrder[1]==undefined?player["tree-tab"].dialogueNumber:theThingClean[player.her.timeline[1]][0].length);i++){
		if(!fuckYeah[0]){
			howMany=howMany+1
			fuckYeah[0]=true
			memory[0] = {"Prestige":[]}
		}
		memory[0]["Prestige"][i] = theThingClean[player.her.timeline[1]][0][i]
	}
	for(i=0;i<(player["tree-tab"].unlockOrder[1]==undefined?0:player["tree-tab"].unlockOrder[2]==undefined?player["tree-tab"].dialogueNumber-1:theThingClean[player.her.timeline[1]][1].length-2);i++){
		let indexChoice = [1,2][player["tree-tab"].unlockOrder[1]]
		if(!fuckYeah[1]){
			howMany=howMany+1
			fuckYeah[1]=true
			memory[1] = {[["Space","Time"][player["tree-tab"].unlockOrder[1]]]:[]}
		}
		memory[1][["Space","Time"][player["tree-tab"].unlockOrder[1]]][i] = theThingClean[player.her.timeline[1]][indexChoice][i+1]
	}
	for(i=0;i<(player["tree-tab"].unlockOrder[2]==undefined?0:player["tree-tab"].unlockOrder[3]==undefined?player["tree-tab"].dialogueNumber-1:theThingClean[player.her.timeline[1]][2].length-2);i++){
		if(!fuckYeah[2]){
			howMany=howMany+1
			fuckYeah[2]=true
			memory[2] = {"Space & Time":[]}
		}
		memory[2]["Space & Time"][i] = theThingClean[player.her.timeline[1]][3][i+1]
	}
	return [memory, howMany]
}

function canBuyBuyable(layer, id) {
	let b = temp[layer].buyables[id]
	return (b.unlocked && run(b.canAfford, b) && player[layer].buyables[id].lt(b.purchaseLimit) && !tmp[layer].deactivated)
}



function canAffordPurchase(layer, thing, cost) {
	if (thing.currencyInternalName) {
		let name = thing.currencyInternalName
		if (thing.currencyLocation) {
        return !(thing.currencyLocation[name].lt(cost))
		}
		else if (thing.currencyLayer) {
        let lr = thing.currencyLayer
        return !(player[lr][name].lt(cost))
		}
		else {
        return !(player[name].lt(cost))
		}
	}
	else {
		return !(player[layer].points.lt(cost))
	}
}

function buyUpgrade(layer, id) {
	buyUpg(layer, id)
}

function buyUpg(layer, id) {
	if (!tmp[layer].upgrades || !tmp[layer].upgrades[id]) return
	let upg = tmp[layer].upgrades[id]
	if (!player[layer].unlocked || player[layer].deactivated) return
	if (!tmp[layer].upgrades[id].unlocked) return
	if (player[layer].upgrades.includes(id)) return
	if (upg.canAfford === false) return
	let pay = layers[layer].upgrades[id].pay
	if (pay !== undefined)
		run(pay, layers[layer].upgrades[id])
	else {
		let cost = tmp[layer].upgrades[id].cost

		if (upg.currencyInternalName) {
        let name = upg.currencyInternalName
        if (upg.currencyLocation) {
        	if (upg.currencyLocation[name].lt(cost)) return
        	upg.currencyLocation[name] = upg.currencyLocation[name].sub(cost)
        }
        else if (upg.currencyLayer) {
        	let lr = upg.currencyLayer
        	if (player[lr][name].lt(cost)) return
        	player[lr][name] = player[lr][name].sub(cost)
        }
        else {
        	if (player[name].lt(cost)) return
        	player[name] = player[name].sub(cost)
        }
		}
		else {
        if (player[layer].points.lt(cost)) return
        player[layer].points = player[layer].points.sub(cost)
		}
	}
	player[layer].upgrades.push(id);
	if (upg.onPurchase != undefined)
		run(upg.onPurchase, upg)
	needCanvasUpdate = true
}

function buyMaxBuyable(layer, id) {
	if (!player[layer].unlocked) return
	if (!tmp[layer].buyables[id].unlocked) return
	if (!tmp[layer].buyables[id].canBuy) return
	if (!layers[layer].buyables[id].buyMax) return

	run(layers[layer].buyables[id].buyMax, layers[layer].buyables[id])
	updateBuyableTemp(layer)
}

function buyBuyable(layer, id) {
	if (!player[layer].unlocked) return
	if (!tmp[layer].buyables[id].unlocked) return
	if (!tmp[layer].buyables[id].canBuy) return

	run(layers[layer].buyables[id].buy, layers[layer].buyables[id])
	updateBuyableTemp(layer)
}

function clickClickable(layer, id) {
	if (!player[layer].unlocked || tmp[layer].deactivated) return
	if (!tmp[layer].clickables[id].unlocked) return
	if (!tmp[layer].clickables[id].canClick) return

	run(layers[layer].clickables[id].onClick, layers[layer].clickables[id])
	updateClickableTemp(layer)
}

function clickGrid(layer, id) {
	if (!player[layer].unlocked  || tmp[layer].deactivated) return
	if (!run(layers[layer].grid.getUnlocked, layers[layer].grid, id)) return
	if (!gridRun(layer, 'getCanClick', player[layer].grid[id], id)) return

	gridRun(layer, 'onClick', player[layer].grid[id], id)
}

// Function to determine if the player is in a challenge
function inChallenge(layer, id) {
	let challenge = player[layer].activeChallenge
	if (!challenge) return false
	id = toNumber(id)
	if (challenge == id) return true

	if (layers[layer].challenges[challenge].countsAs)
		return tmp[layer].challenges[challenge].countsAs.includes(id) || false
	return false
}

// ************ Misc ************

var onTreeTab = true

function showTab(name, prev) {
	if (LAYERS.includes(name) && !layerunlocked(name)) return
	if (player.tab !== name) clearParticles(function(p) {return p.layer === player.tab})
	if (tmp[name] && player.tab === name && isPlainObject(tmp[name].tabFormat)) {
		player.subtabs[name].mainTabs = Object.keys(layers[name].tabFormat)[0]
	}
	var toTreeTab = name == "none"
	player.tab = name
	if (tmp[name] && (tmp[name].row !== "side") && (tmp[name].row !== "otherside")) player.lastSafeTab = name
	updateTabFormats()
	needCanvasUpdate = true
	document.activeElement.blur()

}

function showNavTab(name, prev) {
	console.log(prev)
	if (LAYERS.includes(name) && !layerunlocked(name)) return
	if (player.navTab !== name) clearParticles(function(p) {return p.layer === player.navTab})
	if (tmp[name] && tmp[name].previousTab !== undefined) prev = tmp[name].previousTab
	var toTreeTab = name == "tree-tab"
	console.log(name + prev)
	if (name!== "none" && prev && !tmp[prev]?.leftTab == !tmp[name]?.leftTab) player[name].prevTab = prev
	else if (player[name])
		player[name].prevTab = ""
	player.navTab = name
	updateTabFormats()
	needCanvasUpdate = true
}


function goBack(layer) {
	let nextTab = "none"

	if (player[layer].prevTab) nextTab = player[layer].prevTab
	if (player.navTab === "none" && (tmp[layer]?.row == "side" || tmp[layer].row == "otherside")) nextTab = player.lastSafeTab

	if (tmp[layer].leftTab) showNavTab(nextTab, layer)
	else showTab(nextTab, layer)

}

function layOver(obj1, obj2) {
	for (let x in obj2) {
		if (obj2[x] instanceof Decimal) obj1[x] = new Decimal(obj2[x])
		else if (obj2[x] instanceof Object) layOver(obj1[x], obj2[x]);
		else obj1[x] = obj2[x];
	}
}

function prestigeNotify(layer) {
	if (layers[layer].prestigeNotify) return layers[layer].prestigeNotify()
	
	if (isPlainObject(tmp[layer].tabFormat)) {
		for (subtab in tmp[layer].tabFormat){
        if (subtabResetNotify(layer, 'mainTabs', subtab))
        	return true
		}
	}
	for (family in tmp[layer].microtabs) {
		for (subtab in tmp[layer].microtabs[family]){
        if (subtabResetNotify(layer, family, subtab))
        	return true
		}
	}
	if (tmp[layer].autoPrestige || tmp[layer].passiveGeneration) return false
	else if (tmp[layer].type == "static") return tmp[layer].canReset
	else if (tmp[layer].type == "normal") return (tmp[layer].canReset && (tmp[layer].resetGain.gte(player[layer].points.div(10))))
	else return false
}

function notifyLayer(name) {
	if (player.tab == name || !layerunlocked(name)) return
	player.notify[name] = 1
}

function subtabShouldNotify(layer, family, id) {
    let subtab = {}
    if (family == "mainTabs") subtab = tmp[layer].tabFormat[id]
    else subtab = tmp[layer].microtabs[family][id]
	if (!subtab.unlocked) return false
    if (subtab.embedLayer) return tmp[subtab.embedLayer].notify
    else return subtab.shouldNotify
}

function subtabResetNotify(layer, family, id) {
	let subtab = {}
	if (family == "mainTabs") subtab = tmp[layer].tabFormat[id]
	else subtab = tmp[layer].microtabs[family][id]
	if (subtab.embedLayer) return tmp[subtab.embedLayer].prestigeNotify
	else return subtab.prestigeNotify
}

function nodeShown(layer) {
	return layerShown(layer)
}

function layerunlocked(layer) {
	if (tmp[layer] && tmp[layer].type == "none") return (player[layer].unlocked)
	return LAYERS.includes(layer) && (player[layer].unlocked || (tmp[layer].canReset && tmp[layer].layerShown))
}

function keepGoing() {
	player.keepGoing = true;
	needCanvasUpdate = true;
}

function toNumber(x) {
	if (x.mag !== undefined) return x.toNumber()
	if (x + 0 !== x) return parseFloat(x)
	return x
}

function updateMilestones(layer) {
	if (tmp[layer].deactivated) return
	for (id in layers[layer].milestones) {
		if (!(hasMilestone(layer, id)) && layers[layer].milestones[id].done()) {
        player[layer].milestones.push(id)
        if (layers[layer].milestones[id].onComplete) layers[layer].milestones[id].onComplete()
        if (tmp[layer].milestonePopups || tmp[layer].milestonePopups === undefined) doPopup("milestone", tmp[layer].milestones[id].requirementDescription, "Milestone Gotten!", 3, tmp[layer].color);
        player[layer].lastMilestone = id
		}
	}
}

function updateAchievements(layer) {
	if (tmp[layer].deactivated) return
	for (id in layers[layer].achievements) {
		if (isPlainObject(layers[layer].achievements[id]) && !(hasAchievement(layer, id)) && layers[layer].achievements[id].done()) {
        player[layer].achievements.push(id)
        if (layers[layer].achievements[id].onComplete) layers[layer].achievements[id].onComplete()
        if (tmp[layer].achievementPopups || tmp[layer].achievementPopups === undefined) doPopup("achievement", tmp[layer].achievements[id].name, "Achievement Gotten!", 3, tmp[layer].color);
		}
	}
}

function addTime(diff, layer) {
	let data = player
	let time = data.timePlayed
	if (layer) {
		data = data[layer]
		time = data.time
	}

	//I am not that good to perfectly fix that leak. ~ DB Aarex
	if (time + 0 !== time) {
		console.log("Memory leak detected. Trying to fix...")
		time = toNumber(time)
		if (isNaN(time) || time == 0) {
        console.log("Couldn't fix! Resetting...")
        time = layer ? player.timePlayed : 0
        if (!layer) player.timePlayedReset = true
		}
	}
	time += toNumber(diff)

	if (layer) data.time = time
	else data.timePlayed = time
}

shiftDown = false
ctrlDown = false

document.onkeydown = function (e) {
	if (player === undefined) return;
	shiftDown = e.shiftKey
	ctrlDown = e.ctrlKey
	if (tmp.gameEnded && !player.keepGoing) return;
	let key = e.key
	if (ctrlDown) key = "ctrl+" + key
	if (onFocused) return
	if (ctrlDown && hotkeys[key]) e.preventDefault()
	if (hotkeys[key]) {
		let k = hotkeys[key]
		if (player[k.layer].unlocked && tmp[k.layer].hotkeys[k.id].unlocked)
        k.onPress()
	}
}

document.onkeyup = function (e) {
	shiftDown = e.shiftKey
	ctrlDown = e.ctrlKey
}

var onFocused = false
function focused(x) {
	onFocused = x
}


function isFunction(obj) {
	return !!(obj && obj.constructor && obj.call && obj.apply);
};

function isPlainObject(obj) {
	return (!!obj) && (obj.constructor === Object)
}

document.title = modInfo.name

// Converts a string value to whatever it's supposed to be
function toValue(value, oldValue) {
	if (oldValue instanceof Decimal) {
		value = new Decimal (value)
		if (checkDecimalNaN(value)) return decimalZero
		return value
	}
	if (!isNaN(oldValue)) 
		return parseFloat(value) || 0
	return value
}

// Variables that must be defined to display popups
var activePopups = [];
var popupID = 0;

// Function to show popups
function doPopup(type = "none", text = "This is a test popup.", title = "", timer = 3, color = "") {
	switch (type) {
		case "achievement":
        popupTitle = "Achievement Unlocked!";
        popupType = "achievement-popup"
        break;
		case "challenge":
        popupTitle = "Challenge Complete";
        popupType = "challenge-popup"
        break;
		default:
        popupTitle = "Something Happened?";
        popupType = "default-popup"
        break;
	}
	if (title != "") popupTitle = title;
	popupMessage = text;
	popupTimer = timer;

	activePopups.push({ "time": popupTimer, "type": popupType, "title": popupTitle, "message": (popupMessage + "\n"), "id": popupID, "color": color })
	popupID++;
}


//Function to reduce time on active popups
function adjustPopupTime(diff) {
	for (popup in activePopups) {
		activePopups[popup].time -= diff;
		if (activePopups[popup]["time"] < 0) {
        activePopups.splice(popup, 1); // Remove popup when time hits 0
		}
	}
}

function run(func, target, args = null) {
	if (isFunction(func)) {
		let bound = func.bind(target)
		return bound(args)
	}
	else
		return func;
}

function gridRun(layer, func, data, id) {
	if (isFunction(layers[layer].grid[func])) {
		let bound = layers[layer].grid[func].bind(layers[layer].grid)
		return bound(data, id)
	}
	else
		return layers[layer].grid[func];
}