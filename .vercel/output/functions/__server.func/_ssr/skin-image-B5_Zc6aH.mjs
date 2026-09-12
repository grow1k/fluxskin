import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cn } from "./utils-DFOk07bp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/skin-image-B5_Zc6aH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SkinImage({ src, alt, className }) {
	const [ok, setOk] = (0, import_react.useState)(true);
	if (!ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid aspect-[4/3] place-items-center bg-card-2 text-[11px] text-muted", className),
		children: "Нет изображения"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt,
		loading: "lazy",
		onError: () => setOk(false),
		className: cn("aspect-[4/3] w-full object-contain object-center", className)
	});
}
//#endregion
export { SkinImage as t };
