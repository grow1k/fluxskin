import { n as SKINS } from "./data-DIqr_Wz0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cases-DhZL-Ls7.js
var CASES = [
	{
		id: "flux-core",
		name: "Flux Core",
		nameRu: "Flux Core",
		blurb: "Винтовки и пистолеты — основа любого лоадаута.",
		tone: "core"
	},
	{
		id: "prime-line",
		name: "Prime Line",
		nameRu: "Prime Line",
		blurb: "Классика: Asiimov, Redline, Printstream и соседние тайные.",
		tone: "prime"
	},
	{
		id: "night-shift",
		name: "Night Shift",
		nameRu: "Night Shift",
		blurb: "Тёмные финиши, перчатки и скрытые ножи.",
		tone: "night"
	},
	{
		id: "edge-protocol",
		name: "Edge Protocol",
		nameRu: "Edge Protocol",
		blurb: "Ножи, перчатки и верхняя редкость.",
		tone: "edge"
	}
];
var byRarity = (cat, rarities) => SKINS.filter((s) => cat.includes(s.category) && rarities.includes(s.rarity));
var CORE_POOL = {
	milspec: byRarity([
		"Rifles",
		"Pistols",
		"SMGs"
	], ["Mil-Spec Grade"]),
	restricted: byRarity(["Rifles", "Pistols"], ["Restricted"]),
	classified: byRarity(["Rifles", "Pistols"], ["Classified"]),
	covert: byRarity(["Rifles", "Pistols"], ["Covert"]),
	gold: SKINS.filter((s) => s.category === "Knives").slice(0, 40)
};
var PRIME_PATTERNS = [
	"Asiimov",
	"Redline",
	"Printstream",
	"Neo-Noir",
	"Hyper Beast",
	"The Empress",
	"Bloodsport",
	"Vulcan",
	"Fade",
	"Lightning Strike",
	"Howl",
	"Dragon Lore",
	"Kill Confirmed",
	"Blaze",
	"Hot Rod",
	"Mecha Industries"
];
var PRIME_SKINS = SKINS.filter((s) => PRIME_PATTERNS.includes(s.pattern));
var POOLS = {
	"flux-core": CORE_POOL,
	"prime-line": {
		milspec: PRIME_SKINS.filter((s) => s.rarity === "Mil-Spec Grade").concat(CORE_POOL.milspec),
		restricted: PRIME_SKINS.filter((s) => s.rarity === "Restricted").concat(CORE_POOL.restricted),
		classified: PRIME_SKINS.filter((s) => s.rarity === "Classified").concat(CORE_POOL.classified),
		covert: PRIME_SKINS.filter((s) => s.rarity === "Covert").concat(CORE_POOL.covert),
		gold: SKINS.filter((s) => s.category === "Knives" && [
			"Fade",
			"Doppler",
			"Marble Fade",
			"Tiger Tooth",
			"Slaughter"
		].includes(s.pattern))
	},
	"night-shift": {
		milspec: byRarity([
			"SMGs",
			"Heavy",
			"Pistols"
		], ["Mil-Spec Grade", "Industrial Grade"]),
		restricted: byRarity([
			"SMGs",
			"Pistols",
			"Rifles"
		], ["Restricted"]),
		classified: byRarity([
			"Rifles",
			"Pistols",
			"Gloves"
		], ["Classified"]),
		covert: byRarity(["Rifles", "Pistols"], ["Covert"]),
		gold: SKINS.filter((s) => s.category === "Gloves")
	},
	"edge-protocol": {
		milspec: byRarity(["Rifles", "Pistols"], ["Restricted"]),
		restricted: byRarity(["Rifles", "Pistols"], ["Classified"]),
		classified: byRarity(["Rifles", "Pistols"], ["Covert"]).slice(0, 24),
		covert: byRarity(["Rifles", "Pistols"], ["Covert"]).slice(24, 48),
		gold: SKINS.filter((s) => s.category === "Knives" || s.category === "Gloves")
	}
};
function rollRarity() {
	const r = Math.random();
	if (r < .0026) return "gold";
	if (r < .009) return "covert";
	if (r < .041) return "classified";
	if (r < .201) return "restricted";
	return "milspec";
}
function pick(arr) {
	if (!arr.length) return void 0;
	return arr[Math.floor(Math.random() * arr.length)];
}
function rollCaseSkin(caseId) {
	const pool = POOLS[caseId] ?? CORE_POOL;
	const order = [
		rollRarity(),
		"covert",
		"classified",
		"restricted",
		"milspec",
		"gold"
	];
	for (const rarity of order) {
		const skin = pick(pool[rarity]);
		if (skin) return {
			skin,
			rarity
		};
	}
	return {
		skin: SKINS[Math.floor(Math.random() * SKINS.length)],
		rarity: "milspec"
	};
}
function caseContents(caseId) {
	const pool = POOLS[caseId] ?? CORE_POOL;
	const take = (arr, n) => arr.slice(0, n);
	return [
		...take(pool.gold, 6),
		...take(pool.covert, 6),
		...take(pool.classified, 8),
		...take(pool.restricted, 10),
		...take(pool.milspec, 12)
	];
}
//#endregion
export { caseContents as n, rollCaseSkin as r, CASES as t };
