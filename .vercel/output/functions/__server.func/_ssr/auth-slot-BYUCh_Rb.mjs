import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useCurrentUserState } from "./utils-DFOk07bp.mjs";
import { n as UserButton } from "./gates-DpKPLzwi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-slot-BYUCh_Rb.js
var import_jsx_runtime = require_jsx_runtime();
function AuthSlot() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-8 animate-pulse rounded-full bg-card-2" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/login",
		className: "inline-flex h-11 items-center rounded-sm bg-primary px-4 text-sm font-medium text-primary-foreground",
		children: "Войти"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {});
}
//#endregion
export { AuthSlot as t };
