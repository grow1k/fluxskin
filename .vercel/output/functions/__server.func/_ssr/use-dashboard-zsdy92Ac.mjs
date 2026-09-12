import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { Dt as boolean, Ft as string, Mt as object, jt as number, wt as _enum } from "../_libs/@better-auth/core+[...].mjs";
import { t as authMiddleware } from "./middleware-CsxwVmT6.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-dashboard-zsdy92Ac.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("a7343109f52ea1f9c4130b5f17fa6197f52120ffb227a40470f1f6d82dd399e3"));
var addSchema = object({
	skinId: string().min(1),
	floatValue: number().min(0).max(1),
	stattrak: boolean(),
	nametag: string().max(20).optional(),
	source: string().max(24).optional()
});
var addItem = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => addSchema.parse(d)).handler(createSsrRpc("a88ab65316a4250d9611fa97830d2d420c41075e8d99d9d3ae1e27a4c5261b0b"));
var itemIdSchema = object({ id: string().min(1) });
var removeItem = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => itemIdSchema.parse(d)).handler(createSsrRpc("ea1a754f93e43de18a10fa3e4d1d2cc3b435126839c4883a027ccb4c5e15f3c1"));
var updateSchema = object({
	id: string().min(1),
	floatValue: number().min(0).max(1).optional(),
	stattrak: boolean().optional(),
	nametag: string().max(20).nullable().optional()
});
var updateItem = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => updateSchema.parse(d)).handler(createSsrRpc("7cb8f5edf66f9decd283c106ee6a337086f2c325409476b5cd7530c8fa6921c0"));
var equipItem = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => itemIdSchema.parse(d)).handler(createSsrRpc("095003ca09fb815b1d802b01b837175e6a4d61c4d331419e620b469cc3517d16"));
var caseSchema = object({ caseId: string().min(1) });
var openCase = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => caseSchema.parse(d)).handler(createSsrRpc("68903cab4bd33a63ef5ffabb0e0bdb809ada27c5af31623a22aae43f5b28bdee"));
var buyKey = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("a3e74e6e1e6c649f179264fb01c25e254b09d47c0ab7b357a311b2187e735ddb"));
var starsSchema = object({ pack: _enum(["s200", "s800"]) });
var buyStars = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => starsSchema.parse(d)).handler(createSsrRpc("47511a1cdb3d3f744e548d409358fb0e03c669210ef3c3e157c23d2b3456ecc7"));
var planSchema = object({ plan: _enum([
	"week",
	"month",
	"lifetime"
]) });
var buyPlan = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => planSchema.parse(d)).handler(createSsrRpc("484fa47641b9b3c5a142a687f939b848ddb86536ca64058fe533ecfa8b296bf9"));
var rotateAccessKey = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("28f9e69d6df652207e0b9693e26b9b5934eadc8956ac948bd53f7aebabcd49a8"));
var KEY = ["dashboard"];
function errMessage(e) {
	if (e instanceof Error && e.message) return e.message;
	return "Не удалось выполнить действие";
}
function useDashboard(enabled = true) {
	return useQuery({
		queryKey: KEY,
		queryFn: () => getDashboard(),
		enabled
	});
}
function useSetDash(fn) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: fn,
		onSuccess: (data) => qc.setQueryData(KEY, data),
		onError: (e) => toast.error(errMessage(e))
	});
}
function useAddItem() {
	return useSetDash((d) => addItem({ data: d }));
}
function useRemoveItem() {
	return useSetDash((id) => removeItem({ data: { id } }));
}
function useUpdateItem() {
	return useSetDash((d) => updateItem({ data: d }));
}
function useEquipItem() {
	return useSetDash((id) => equipItem({ data: { id } }));
}
function useBuyKey() {
	return useSetDash(() => buyKey());
}
function useBuyStars() {
	return useSetDash((pack) => buyStars({ data: { pack } }));
}
function useBuyPlan() {
	return useSetDash((plan) => buyPlan({ data: { plan } }));
}
function useRotateKey() {
	return useSetDash(() => rotateAccessKey());
}
function useOpenCase() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (caseId) => openCase({ data: { caseId } }),
		onSuccess: (res) => qc.setQueryData(KEY, res.dashboard),
		onError: (e) => toast.error(errMessage(e))
	});
}
//#endregion
export { useDashboard as a, useRemoveItem as c, useBuyStars as i, useRotateKey as l, useBuyKey as n, useEquipItem as o, useBuyPlan as r, useOpenCase as s, useAddItem as t, useUpdateItem as u };
