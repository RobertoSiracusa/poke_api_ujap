export function intersectNames(
  ...lists: (string[] | undefined | null)[]
): string[] | null {
  const active = lists.filter((l): l is string[] => Array.isArray(l) && l.length > 0);
  if (active.length === 0) return null;
  if (active.length === 1) return [...active[0]];
  return active.reduce((acc, cur) => {
    const set = new Set(cur);
    return acc.filter((n) => set.has(n));
  });
}

export function applyNameSubstring(names: string[], query: string): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return names;
  return names.filter((n) => n.includes(q));
}

import { getFormInfo } from "./formInfo";

export function applyFormFilter(names: string[], formId: string): string[] {
  if (!formId) return names;

  return names.filter((n) => {
    const info = getFormInfo(n);
    if (formId === "normal") {
      return info === null;
    }
    if (formId === "Paradoja") {
      return info && info.formLabel.includes("Paradoja");
    }
    if (formId === "Mega Evolución") {
      return info && info.formLabel.includes("Mega Evolución");
    }
    return info && info.formLabel === formId;
  });
}
