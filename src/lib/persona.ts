import { useSyncExternalStore } from "react";
import { PersonaId } from "@/data/quiz";

const KEY = "finai_persona";

export function getStoredPersona(): PersonaId | null {
  if (typeof window === "undefined") return null;
  return (sessionStorage.getItem(KEY) as PersonaId | null) ?? null;
}

export function setStoredPersona(personaId: PersonaId) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY, personaId);
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getServerSnapshot() {
  return null;
}

export function useStoredPersona(): PersonaId | null {
  return useSyncExternalStore(subscribe, getStoredPersona, getServerSnapshot);
}
