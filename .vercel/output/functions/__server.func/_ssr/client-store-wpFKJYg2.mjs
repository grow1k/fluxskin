import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-store-wpFKJYg2.js
var useClientStore = create()(persist((set) => ({
	running: false,
	lastSync: null,
	setRunning: (running) => set({ running }),
	markSync: () => set({ lastSync: (/* @__PURE__ */ new Date()).toISOString() })
}), { name: "fluxskin-client" }));
//#endregion
export { useClientStore as t };
