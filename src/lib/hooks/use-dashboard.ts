import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  addItem,
  buyKey,
  buyPlan,
  buyStars,
  equipItem,
  getDashboard,
  openCase,
  removeItem,
  rotateAccessKey,
  updateItem,
  type Dashboard,
} from "@/lib/api/flux";

const KEY = ["dashboard"] as const;

function errMessage(e: unknown): string {
  if (e instanceof Error && e.message) return e.message;
  return "Не удалось выполнить действие";
}

export function useDashboard(enabled = true) {
  return useQuery({
    queryKey: KEY,
    queryFn: () => getDashboard(),
    enabled,
  });
}

function useSetDash<T>(fn: (input: T) => Promise<Dashboard>) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: (data) => qc.setQueryData(KEY, data),
    onError: (e) => toast.error(errMessage(e)),
  });
}

export function useAddItem() {
  return useSetDash(
    (d: { skinId: string; floatValue: number; stattrak: boolean; nametag?: string; source?: string }) =>
      addItem({ data: d }),
  );
}

export function useRemoveItem() {
  return useSetDash((id: string) => removeItem({ data: { id } }));
}

export function useUpdateItem() {
  return useSetDash(
    (d: { id: string; floatValue?: number; stattrak?: boolean; nametag?: string | null }) =>
      updateItem({ data: d }),
  );
}

export function useEquipItem() {
  return useSetDash((id: string) => equipItem({ data: { id } }));
}

export function useBuyKey() {
  return useSetDash(() => buyKey());
}

export function useBuyStars() {
  return useSetDash((pack: "s200" | "s800") => buyStars({ data: { pack } }));
}

export function useBuyPlan() {
  return useSetDash((plan: "week" | "month" | "lifetime") => buyPlan({ data: { plan } }));
}

export function useRotateKey() {
  return useSetDash(() => rotateAccessKey());
}

export function useOpenCase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (caseId: string) => openCase({ data: { caseId } }),
    onSuccess: (res) => qc.setQueryData(KEY, res.dashboard),
    onError: (e) => toast.error(errMessage(e)),
  });
}
