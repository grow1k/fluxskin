//#region node_modules/.nitro/vite/services/ssr/assets/wear-BsdxYetA.js
var WEAR_LABEL = {
	"Factory New": "Прямо с завода",
	"Minimal Wear": "Немного поношенное",
	"Field-Tested": "После полевых",
	"Well-Worn": "Поношенное",
	"Battle-Scarred": "Закалённое в боях"
};
var WEAR_SHORT = {
	"Factory New": "FN",
	"Minimal Wear": "MW",
	"Field-Tested": "FT",
	"Well-Worn": "WW",
	"Battle-Scarred": "BS"
};
function wearFromFloat(f) {
	if (f < .07) return "Factory New";
	if (f < .15) return "Minimal Wear";
	if (f < .38) return "Field-Tested";
	if (f < .45) return "Well-Worn";
	return "Battle-Scarred";
}
function clampFloat(value, min, max) {
	const lo = Number.isFinite(min) ? min : 0;
	return Math.min(Number.isFinite(max) ? max : 1, Math.max(lo, value));
}
function randomFloat(min, max) {
	const lo = Number.isFinite(min) ? min : 0;
	const hi = Number.isFinite(max) ? max : 1;
	const t = Math.random();
	const biased = t * t * .55 + t * .45;
	return Number((lo + (hi - lo) * biased).toFixed(10));
}
function formatFloat(n) {
	return n.toFixed(8).replace(/0+$/, "0");
}
//#endregion
export { randomFloat as a, formatFloat as i, WEAR_SHORT as n, wearFromFloat as o, clampFloat as r, WEAR_LABEL as t };
