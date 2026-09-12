import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cn } from "./utils-DFOk07bp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logo-C-oYsY_8.js
var import_jsx_runtime = require_jsx_runtime();
function LogoMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: cn("size-6", className),
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M4 4h10.5c3.2 0 5.5 2.1 5.5 5.2 0 2.4-1.4 4.2-3.6 4.9L22 20h-5.2l-4.8-5.4H9V20H4V4Zm5 7.2h4.4c1.5 0 2.4-.8 2.4-2S14.9 7.2 13.4 7.2H9v4Z",
			fill: "currentColor"
		})
	});
}
function Logo({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-2 text-foreground", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-[1.05rem] font-semibold tracking-tight",
			children: "Fluxskin"
		})]
	});
}
//#endregion
export { Logo as t };
