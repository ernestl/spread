import type { Store } from "./types";
import { createSamplePlan } from "./sample";

const KEY = "plan-canvas.v1";

export function loadStore(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const sample = createSamplePlan();
      return { plans: [sample], activePlanId: sample.id };
    }
    const parsed = JSON.parse(raw) as Store;
    if (!parsed.plans?.length) {
      const sample = createSamplePlan();
      return { plans: [sample], activePlanId: sample.id };
    }
    return {
      plans: parsed.plans,
      activePlanId: parsed.activePlanId ?? parsed.plans[0]?.id ?? null,
    };
  } catch {
    const sample = createSamplePlan();
    return { plans: [sample], activePlanId: sample.id };
  }
}

export function saveStore(store: Store) {
  localStorage.setItem(KEY, JSON.stringify(store));
}
