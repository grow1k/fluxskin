import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useCurrentUserState } from "./utils-DFOk07bp.mjs";
import { t as RedirectToSignIn } from "./gates-DpKPLzwi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/require-auth-CfN_imDi.js
var import_jsx_runtime = require_jsx_runtime();
function RequireAuth({ children }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-[50vh] place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-40 animate-pulse rounded-sm bg-card-2" })
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
//#endregion
export { RequireAuth as t };
