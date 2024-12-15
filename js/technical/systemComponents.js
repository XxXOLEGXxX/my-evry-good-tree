var systemComponents = {
	'tab-buttons': {
		props: ['layer', 'data', 'name', 'title'],
		template: `
			<div class="upgRow">
				<div v-for="tab in Object.keys(data)">
					<button v-if="data[tab].unlocked == undefined || data[tab].unlocked" v-bind:class="{tabButton: true, notify: subtabShouldNotify(layer, name, tab), resetNotify: subtabResetNotify(layer, name, tab)}"
					v-bind:style="[{'border-color': tmp[layer].color}, (subtabShouldNotify(layer, name, tab) ? {'box-shadow': 'var(--hqProperty2a), 0 0 20px '  + (data[tab].glowColor || defaultGlow)} : {}), tmp[layer].componentStyles['tab-button'], data[tab].buttonStyle]"
						v-on:click="function(){player.subtabs[layer][name] = tab; updateTabFormats(); needCanvasUpdate = true;}">{{data[tab].title?data[tab].title:tab}}</button>
				</div>
			</div>
		`
	},

	'tree-node': {
		props: ['layer', 'abb', 'size', 'prev'],
		template: `
		<button v-if="nodeShown(layer)" 
			v-bind:id="layer" 
			v-on:click="function() {
				if (shiftDown && options.forceTooltips) player[layer].forceTooltip = !player[layer].forceTooltip
				else if(tmp[layer].isLayer) {
					if (tmp[layer].leftTab) {
						showNavTab(layer, prev)
						showTab('none')
					}
					else
						showTab(layer, prev)
				}
				else {
					run(layers[layer].onClick, layers[layer])
					}
			}"
			v-bind:class="{
				treeNode: tmp[layer].isLayer,
				treeButton: !tmp[layer].isLayer,
				smallNode: size == 'small',
				[layer]: true,
				tooltipBox: true,
				forceTooltip: player[layer].forceTooltip,
				ghost: tmp[layer].layerShown == 'ghost',
				hidden: !tmp[layer].layerShown,
				locked: tmp[layer].isLayer ? !(player[layer].unlocked || tmp[layer].canReset) : !(tmp[layer].canClick),
				notify: tmp[layer].notify && player[layer].unlocked,
				resetNotify: tmp[layer].prestigeNotify,
				can: ((player[layer].unlocked || tmp[layer].canReset) && tmp[layer].isLayer) || (!tmp[layer].isLayer && tmp[layer].canClick),
				front: !tmp.scrolled,
			}"
			v-bind:style="constructNodeStyle(layer)">
			<span class="nodeLabel" v-html="(abb !== '' && tmp[layer].image === undefined) ? abb : '&nbsp;'"></span>
			<tooltip
      v-if="tmp[layer].tooltip != ''"
			:text="(tmp[layer].isLayer) ? (
				player[layer].unlocked ? (tmp[layer].tooltip ? tmp[layer].tooltip : formatWhole(player[layer].points) + ' ' + tmp[layer].resource)
				: (tmp[layer].tooltipLocked ? tmp[layer].tooltipLocked : 'Reach ' + formatWhole(tmp[layer].requires) + ' ' + tmp[layer].baseResource + ' to unlock (You have ' + formatWhole(tmp[layer].baseAmount) + ' ' + tmp[layer].baseResource + ')')
			)
			: (
				tmp[layer].canClick ? (tmp[layer].tooltip ? tmp[layer].tooltip : 'I am a button!')
				: (tmp[layer].tooltipLocked ? tmp[layer].tooltipLocked : 'I am a button!')
			)"></tooltip>
			<node-mark :layer='layer' :data='tmp[layer].marked'></node-mark></span>
		</button>
		`,
		data() { return { interval: false, click: false, time: 0,}},
		methods: {
			start() {
                if(!this.click){
                    doReset(this.layer)
                    this.click = true
                }
				if (!this.interval) {
					this.interval = setInterval((function() {
						if(this.time >= 5)
							doReset(this.layer)
						this.time = this.time+1
					}).bind(this), 50)}
			},
			stop() {
				clearInterval(this.interval)
				this.interval = false
                this.click = false
			  	this.time = 0
			}
		},
	},

	
	'layer-tab': {
		props: ['layer', 'back', 'spacing', 'embedded'],
		template: `<div v-bind:style="[tmp[layer].style ? tmp[layer].style : {}, (tmp[layer].tabFormat && !Array.isArray(tmp[layer].tabFormat)) ? tmp[layer].tabFormat[player.subtabs[layer].mainTabs].style : {}]" class="noBackground">
		<div v-if="back"><button v-bind:class="back == 'big' ? 'other-back' : 'back'" v-on:click="goBack(layer)">←</button></div>
		<div v-if="!tmp[layer].tabFormat">
			<div v-if="spacing" v-bind:style="{'height': spacing}" :key="this.$vnode.key + '-spacing'"></div>
			<infobox v-if="tmp[layer].infoboxes" :layer="layer" :data="Object.keys(tmp[layer].infoboxes)[0]":key="this.$vnode.key + '-info'"></infobox>
			<main-display v-bind:style="tmp[layer].componentStyles['main-display']" :layer="layer"></main-display>
			<div v-if="tmp[layer].type !== 'none'">
				<prestige-button v-bind:style="tmp[layer].componentStyles['prestige-button']" :layer="layer"></prestige-button>
			</div>
			<resource-display v-bind:style="tmp[layer].componentStyles['resource-display']" :layer="layer"></resource-display>
			<milestones v-bind:style="tmp[layer].componentStyles.milestones" :layer="layer"></milestones>
			<div v-if="Array.isArray(tmp[layer].midsection)">
				<column :layer="layer" :data="tmp[layer].midsection" :key="this.$vnode.key + '-mid'"></column>
			</div>
			<clickables v-bind:style="tmp[layer].componentStyles['clickables']" :layer="layer"></clickables>
			<buyables v-bind:style="tmp[layer].componentStyles.buyables" :layer="layer"></buyables>
			<upgrades v-bind:style="tmp[layer].componentStyles['upgrades']" :layer="layer"></upgrades>
			<challenges v-bind:style="tmp[layer].componentStyles['challenges']" :layer="layer"></challenges>
			<achievements v-bind:style="tmp[layer].componentStyles.achievements" :layer="layer"></achievements>
			<br><br>
		</div>
		<div v-if="tmp[layer].tabFormat">
			<div v-if="Array.isArray(tmp[layer].tabFormat)"><div v-if="spacing" v-bind:style="{'height': spacing}"></div>
				<column :layer="layer" :data="tmp[layer].tabFormat" :key="this.$vnode.key + '-col'"></column>
			</div>
			<div v-else>
				<div class="upgTable" v-bind:style="{'padding-top': (embedded ? '0' : '25px'), 'margin-top': (embedded ? '-10px' : '0'), 'margin-bottom': '24px'}">
					<tab-buttons v-bind:style="tmp[layer].componentStyles['tab-buttons']" :layer="layer" :data="tmp[layer].tabFormat" :name="'mainTabs'"></tab-buttons>
				</div>
				<layer-tab v-if="tmp[layer].tabFormat[player.subtabs[layer].mainTabs].embedLayer" :layer="tmp[layer].tabFormat[player.subtabs[layer].mainTabs].embedLayer" :embedded="true" :key="this.$vnode.key + '-' + layer"></layer-tab>
				<column v-else :layer="layer" :data="tmp[layer].tabFormat[player.subtabs[layer].mainTabs].content" :key="this.$vnode.key + '-col'"></column>
			</div>
		</div></div>
			`
	},

	'overlay-head': {
		template: `			
		<div class="overlayThing" style="padding-bottom:7px; width: 90%; z-index: 1000; position: relative">
		<span v-if="player.devSpeed && player.devSpeed != 1" class="overlayThing">
			<br>Dev Speed: {{format(player.devSpeed)}}x<br>
		</span>
		<span v-if="player.offTime !== undefined"  class="overlayThing">
			<br>Offline Time: {{formatTime(player.offTime.remain)}}<br>
		</span>
		<br>
		<span v-if="player.points.lt('1e1000')"  class="overlayThing">You have </span>
		<h2  class="overlayThing" id="points">{{format(player.points)}}</h2>
		<span v-if="player.points.lt('1e1e6')"  class="overlayThing"> {{modInfo.pointsName}}</span>
		<br>
		<span v-if="canGenPoints()"  class="overlayThing">({{tmp.other.oompsMag != 0 ? format(tmp.other.oomps) + " OOM" + (tmp.other.oompsMag < 0 ? "^OOM" : tmp.other.oompsMag > 1 ? "^" + tmp.other.oompsMag : "") + "s" : formatSmall(getPointGen())}}/sec)</span>
		<div v-for="thing in tmp.displayThings" class="overlayThing"><span v-if="thing" v-html="thing"></span></div>
	</div>
	`
    },

    'info-tab': {
        template: `
        <div>
        <h2>{{modInfo.name}}</h2>
        <br>
        <h3>{{VERSION.withName}}</h3>
        <span v-if="modInfo.author">
            <br>
            Made by {{modInfo.author}}	
        </span>
        <br>
        The Modding Tree <a v-bind:href="'https://github.com/Acamaeda/The-Modding-Tree/blob/master/changelog.md'" target="_blank" class="link" v-bind:style = "{'font-size': '14px', 'display': 'inline'}" >{{TMT_VERSION.tmtNum}}</a> by Acamaeda
        <br>
        The Prestige Tree made by Jacorb and Aarex
		<br><br>
		<div class="link" onclick="showTab('changelog-tab')">Changelog</div><br>
        <span v-if="modInfo.discordLink"><a class="link" v-bind:href="modInfo.discordLink" target="_blank">{{modInfo.discordName}}</a><br></span>
        <a class="link" href="https://discord.gg/F3xveHV" target="_blank" v-bind:style="modInfo.discordLink ? {'font-size': '16px'} : {}">The Modding Tree Discord</a><br>
        <a class="link" href="http://discord.gg/wwQfgPa" target="_blank" v-bind:style="{'font-size': '16px'}">Main Prestige Tree server</a><br>
		<br><br>
        Time Played: {{ formatTime(player.timePlayed) }}<br><br>
        <h3>Hotkeys</h3><br>
        <span v-for="key in hotkeys" v-if="player[key.layer].unlocked && tmp[key.layer].hotkeys[key.id].unlocked"><br>{{key.description}}</span></div>
    `
    },

    'options-tab': {
        template: `
		<table>
			<tr>
				<td><button class="options-tab" onclick="options.currentTab=0">Standard</button></td>
				<td><button class="options-tab" onclick="options.currentTab=1">Extras</button></td>
				<td><button class="options-tab" onclick="options.currentTab=2">Save States</button></td>
			</tr>
			<tbody v-if="options.currentTab==0">
				<tr>
					<td><button class="opt" onclick="save()">Save</button></td>
					<td><button class="opt" onclick="toggleOpt('autosave')">Autosave: {{ options.autosave?"ON":"OFF" }}</button></td>
					<td><button class="opt" onclick="hardReset()">HARD RESET</button></td>
				</tr>
				<tr>
					<td><button class="opt" onclick="exportSave()">Export to clipboard</button></td>
					<td><button class="opt" onclick="importSave()">Import</button></td>
					<td><button class="opt" onclick="toggleOpt('offlineProd')">Offline Prod: {{ options.offlineProd?"ON":"OFF" }}</button></td>
				</tr>
				<tr>
					<td><button class="opt" onclick="switchTheme()">Theme: {{ getThemeName() }}</button></td>
					<td><button class="opt" onclick="adjustMSDisp()">Show Milestones: {{ MS_DISPLAYS[MS_SETTINGS.indexOf(options.msDisplay)]}}</button></td>
					<td><button class="opt" onclick="toggleOpt('hqTree')">High-Quality Tree: {{ options.hqTree?"ON":"OFF" }}</button></td>
				</tr>
				<tr>
					<td><button class="opt" onclick="toggleOpt('hideChallenges')">Completed Challenges: {{ options.hideChallenges?"HIDDEN":"SHOWN" }}</button></td>
					<td><button class="opt" onclick="toggleOpt('forceOneTab'); needsCanvasUpdate = true">Single-Tab Mode: {{ options.forceOneTab?"ALWAYS":"AUTO" }}</button></td>
					<td><button class="opt" onclick="toggleOpt('forceTooltips'); needsCanvasUpdate = true">Shift-Click to Toggle Tooltips: {{ options.forceTooltips?"ON":"OFF" }}</button></td>
				</tr>
			</tbody>
			<tbody v-if="options.currentTab==1">
				<tr>
					<td><button class="opt" onclick="toggleOpt('skipDialogueErasure')">Skip Dialogue Erasure: {{ options.skipDialogueErasure?"ON":"OFF" }}</button></td>
					<td><button class="opt" onclick="toggleOpt('fastForwardDialogue')">Fast Forward Dialogue: {{ options.fastForwardDialogue?"ON":"OFF" }}</button></td>
					<td><button class="opt" onclick="toggleOpt('precisionNumber')">Precise Numbers: {{ options.precisionNumber?"ON":"OFF" }}</button></td>
				</tr>
				<tr>
					<td><button class="opt" onclick="toggleOpt('mobileShortcuts')">Mobile Shortcuts: {{ options.mobileShortcuts?"ON":"OFF" }}</button></td>
					<td><button class="opt" onclick="toggleOpt('additionalMobileShortcuts')">Layer Info Shortcuts: {{ options.additionalMobileShortcuts?"ON":"OFF" }}</button></td>
					<td><button class="opt" onclick="limitThiShitPlease(['Select length [x]','Select height [y]','Select width [z]','Select spisstude [t]'],'options.pissLimit[i] = new Decimal(numbah[i])',false,false)">{{ hasUpgrade("yourGod","space1")?"Terrasect":"Cube" }} Size Customization: [x:{{ formatWhole(options.pissLimit[0]) }}, y:{{ formatWhole(options.pissLimit[1]) }}, z:{{ formatWhole(options.pissLimit[2]) }}, t:{{ formatWhole(options.pissLimit[3]) }}]</button></td>
					</tr> 
				<tr>
					<td><button class="opt" onclick="toggleOpt('musicMute')">Music Mute: {{ options.musicMute?"ON":"OFF" }}</button></td>
					<td><button class="opt" onclick="limitThiShitPlease(['Choose your current font speed'],'options.fontSpeed = new Decimal(numbah[i])',false,false)">Font Display Speed: {{ formatWhole(options.fontSpeed) }}</button></td>
					<td><button class="opt" onclick="toggleOpt('offTimeStatus'); if(options.offTimeStatus) limitThiShitPlease(['Choose the percentage of Offline Time you want to take.'],'options.offTimePercent = Math.min(numbah[i],100)/100',false,true)">Store Offline Time: {{ options.offTimeStatus?"ON":"OFF" }}<br>[{{ format(options.offTimePercent*100) }}%]</button></td>
				</tr>
			</tbody>
			<tbody v-if="options.currentTab==2">
				<tr>
					<td><button v-bind:class="{save: true, saveSuccess: options.saveFileState[0][4]==1, saveCheated: options.saveFileState[0][4]==-1}" onclick="saveFile(0)">Save File #1<br>Time Played: {{ formatTime(options.saveFileState[0][1]) }}<br>Current State: {{ options.saveFileState[0][4] == 1 ? "Endgame" : options.saveFileState[0][0] }} {{options.saveFileState[0][2]?"["+formatWhole(options.saveFileState[0][3])+"]":""}}<br>{{ options.saveFileState[0][4] == -1 ? "(Game.RuinTheFun())":""}}</button></td>
					<td><button v-bind:class="{save: true, saveSuccess: options.saveFileState[1][4]==1, saveCheated: options.saveFileState[1][4]==-1}" onclick="saveFile(1)">Save File #2<br>Time Played: {{ formatTime(options.saveFileState[1][1]) }}<br>Current State: {{ options.saveFileState[1][4] == 1 ? "Endgame" : options.saveFileState[1][0] }} {{options.saveFileState[1][2]?"["+formatWhole(options.saveFileState[1][3])+"]":""}}<br>{{ options.saveFileState[1][4] == -1 ? "(Game.RuinTheFun())":""}}</button></td>
					<td><button v-bind:class="{save: true, saveSuccess: options.saveFileState[2][4]==1, saveCheated: options.saveFileState[2][4]==-1}" onclick="saveFile(2)">Save File #3<br>Time Played: {{ formatTime(options.saveFileState[2][1]) }}<br>Current State: {{ options.saveFileState[2][4] == 1 ? "Endgame" : options.saveFileState[2][0] }} {{options.saveFileState[2][2]?"["+formatWhole(options.saveFileState[2][3])+"]":""}}<br>{{ options.saveFileState[2][4] == -1 ? "(Game.RuinTheFun())":""}}</button></td>
				</tr>
				<tr>
					<td><button v-bind:class="{save: true, saveSuccess: options.saveFileState[3][4]==1, saveCheated: options.saveFileState[3][4]==-1}" onclick="saveFile(3)">Save File #4<br>Time Played: {{ formatTime(options.saveFileState[3][1]) }}<br>Current State: {{ options.saveFileState[3][4] == 1 ? "Endgame" : options.saveFileState[3][0] }} {{options.saveFileState[3][2]?"["+formatWhole(options.saveFileState[3][3])+"]":""}}<br>{{ options.saveFileState[3][4] == -1 ? "(Game.RuinTheFun())":""}}</button></td>
					<td><button v-bind:class="{save: true, saveSuccess: options.saveFileState[4][4]==1, saveCheated: options.saveFileState[4][4]==-1}" onclick="saveFile(4)">Save File #5<br>Time Played: {{ formatTime(options.saveFileState[4][1]) }}<br>Current State: {{ options.saveFileState[4][4] == 1 ? "Endgame" : options.saveFileState[4][0] }} {{options.saveFileState[4][2]?"["+formatWhole(options.saveFileState[4][3])+"]":""}}<br>{{ options.saveFileState[4][4] == -1 ? "(Game.RuinTheFun())":""}}</button></td>
					<td><button v-bind:class="{save: true, saveSuccess: options.saveFileState[5][4]==1, saveCheated: options.saveFileState[5][4]==-1}" onclick="saveFile(5)">Save File #6<br>Time Played: {{ formatTime(options.saveFileState[5][1]) }}<br>Current State: {{ options.saveFileState[5][4] == 1 ? "Endgame" : options.saveFileState[5][0] }} {{options.saveFileState[5][2]?"["+formatWhole(options.saveFileState[5][3])+"]":""}}<br>{{ options.saveFileState[5][4] == -1 ? "(Game.RuinTheFun())":""}}</button></td>
				</tr>
				<tr>
					<td><button v-bind:class="{save: true, saveSuccess: options.saveFileState[6][4]==1, saveCheated: options.saveFileState[6][4]==-1}" onclick="saveFile(6)">Save File #7<br>Time Played: {{ formatTime(options.saveFileState[6][1]) }}<br>Current State: {{ options.saveFileState[6][4] == 1 ? "Endgame" : options.saveFileState[6][0] }} {{options.saveFileState[6][2]?"["+formatWhole(options.saveFileState[6][3])+"]":""}}<br>{{ options.saveFileState[6][4] == -1 ? "(Game.RuinTheFun())":""}}</button></td>
					<td><button v-bind:class="{save: true, saveSuccess: options.saveFileState[7][4]==1, saveCheated: options.saveFileState[7][4]==-1}" onclick="saveFile(7)">Save File #8<br>Time Played: {{ formatTime(options.saveFileState[7][1]) }}<br>Current State: {{ options.saveFileState[7][4] == 1 ? "Endgame" : options.saveFileState[7][0] }} {{options.saveFileState[7][2]?"["+formatWhole(options.saveFileState[7][3])+"]":""}}<br>{{ options.saveFileState[7][4] == -1 ? "(Game.RuinTheFun())":""}}</button></td>
					<td><button v-bind:class="{save: true, saveSuccess: options.saveFileState[8][4]==1, saveCheated: options.saveFileState[8][4]==-1}" onclick="saveFile(8)">Save File #9<br>Time Played: {{ formatTime(options.saveFileState[8][1]) }}<br>Current State: {{ options.saveFileState[8][4] == 1 ? "Endgame" : options.saveFileState[8][0] }} {{options.saveFileState[8][2]?"["+formatWhole(options.saveFileState[8][3])+"]":""}}<br>{{ options.saveFileState[8][4] == -1 ? "(Game.RuinTheFun())":""}}</button></td>
				</tr>
			</tbody>
        </table>`
    },

    'back-button': {
        template: `
        <button v-bind:class="back" onclick="goBack()">←</button>
        `
    },


	'tooltip' : {
		props: ['text'],
		template: `<div class="tooltip" v-html="text"></div>
		`
	},

	'node-mark': {
		props: {'layer': {}, data: {}, offset: {default: 0}, scale: {default: 1}},
		template: `<div v-if='data'>
			<div v-if='data === true' class='star' v-bind:style='{position: "absolute", left: (offset-10) + "px", top: (offset-10) + "px", transform: "scale( " + scale||1 + ", " + scale||1 + ")"}'></div>
			<img v-else class='mark' v-bind:style='{position: "absolute", left: (offset-22) + "px", top: (offset-15) + "px", transform: "scale( " + scale||1 + ", " + scale||1 + ")"}' v-bind:src="data"></div>
		</div>
		`
	},

	'particle': {
		props: ['data', 'index'],
		template: `<div><div class='particle instant' v-bind:style="[constructParticleStyle(data), data.style]" 
			v-on:click="run(data.onClick, data)"  v-on:mouseenter="run(data.onMouseOver, data)" v-on:mouseleave="run(data.onMouseLeave, data)" ><span v-html="data.text"></span>
		</div>
		<svg version="2" v-if="data.color">
		<mask v-bind:id="'pmask' + data.id">
        <image id="img" v-bind:href="data.image" x="0" y="0" :height="data.width" :width="data.height" />
    	</mask>
    	</svg>
		</div>
		`
	},

	'bg': {
		props: ['layer'],
		template: `<div class ="bg" v-bind:style="[tmp[layer].style ? tmp[layer].style : {}, (tmp[layer].tabFormat && !Array.isArray(tmp[layer].tabFormat)) ? tmp[layer].tabFormat[player.subtabs[layer].mainTabs].style : {}]"></div>
		`
	}

}

