import { useSyncExternalStore } from "react";

const LINK_KEY = "finos_distributor_link";
const CLIENTS_KEY = "finos_linked_clients";

export interface LinkedClient {
  code: string;
  investorName: string;
  linkedAt: number;
}

export function getStoredDistributorLink(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(LINK_KEY);
}

export function setStoredDistributorLink(code: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(LINK_KEY, code);
}

const EMPTY_CLIENTS: LinkedClient[] = [];

let cachedRaw: string | null = null;
let cachedClients: LinkedClient[] = EMPTY_CLIENTS;

// useSyncExternalStore requires a stable reference when nothing changed, so
// we only re-parse sessionStorage when the raw string actually differs.
export function getLinkedClients(): LinkedClient[] {
  if (typeof window === "undefined") return cachedClients;
  const raw = sessionStorage.getItem(CLIENTS_KEY) ?? "[]";
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedClients = raw === "[]" ? EMPTY_CLIENTS : (JSON.parse(raw) as LinkedClient[]);
    } catch {
      cachedClients = EMPTY_CLIENTS;
    }
  }
  return cachedClients;
}

export function addLinkedClient(client: Omit<LinkedClient, "linkedAt">) {
  if (typeof window === "undefined") return;
  const existing = getLinkedClients().filter((c) => c.code !== client.code);
  const updated = [...existing, { ...client, linkedAt: Date.now() }];
  sessionStorage.setItem(CLIENTS_KEY, JSON.stringify(updated));
  window.dispatchEvent(new StorageEvent("storage", { key: CLIENTS_KEY }));
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getServerSnapshot() {
  return EMPTY_CLIENTS;
}

export function useLinkedClients(): LinkedClient[] {
  return useSyncExternalStore(subscribe, getLinkedClients, getServerSnapshot);
}
