export const DARK_BACKGROUND_STORAGE_KEY = "dashboard-dark-background"
export const DARK_CARD_STORAGE_KEY = "dashboard-dark-card"

export const defaultDarkCardColor = "oklch(0.205 0 0)"

export const darkBackgroundPresets = [
  { id: "charcoal", label: "Charcoal", value: "#2C2C2C" },
  { id: "near-black", label: "Near black", value: "#0F0E0E" },
  { id: "slate-blue", label: "Slate blue", value: "#2C3947" },
  { id: "navy", label: "Navy", value: "#30364F" },
  { id: "dark-gray", label: "Dark gray", value: "#222222" },
  { id: "deep-blue", label: "Deep blue", value: "#132440" },
  { id: "blue-gray", label: "Blue gray", value: "#213448" },
  { id: "graphite", label: "Graphite", value: "#2D2D2D" },
  { id: "zinc", label: "Zinc", value: "#18181B" },
  { id: "carbon", label: "Carbon", value: "#161616" },
  { id: "github", label: "GitHub dark", value: "#0D1117" },
  { id: "midnight", label: "Midnight", value: "#1A1A2E" },
  { id: "indigo-night", label: "Indigo night", value: "#1E1E2F" },
  { id: "purple-haze", label: "Purple haze", value: "#1A1625" },
  { id: "storm", label: "Storm", value: "#1C2833" },
  { id: "teal-dark", label: "Teal dark", value: "#152825" },
  { id: "forest", label: "Forest", value: "#172121" },
  { id: "olive", label: "Olive", value: "#1C1F18" },
  { id: "espresso", label: "Espresso", value: "#2C1810" },
  { id: "wine", label: "Wine", value: "#2A1A1F" },
  { id: "slate", label: "Slate", value: "#1E293B" },
  { id: "obsidian", label: "Obsidian", value: "#0B0F14" },
] as const

export type DarkBackgroundPresetId =
  (typeof darkBackgroundPresets)[number]["id"]

export type DarkBackgroundPreset = {
  id: DarkBackgroundPresetId
  label: string
  value: string
}

export const defaultDarkBackgroundPresetId: DarkBackgroundPresetId = "charcoal"

export const darkCardPresets = [
  { id: "default", label: "Default", value: null },
  { id: "zinc", label: "Zinc", value: "#27272A" },
  { id: "graphite", label: "Graphite", value: "#333333" },
  { id: "charcoal", label: "Charcoal", value: "#363636" },
  { id: "slate", label: "Slate", value: "#1E293B" },
  { id: "storm", label: "Storm", value: "#243040" },
  { id: "blue-gray", label: "Blue gray", value: "#2A3A4A" },
  { id: "navy", label: "Navy", value: "#30364F" },
  { id: "midnight", label: "Midnight", value: "#252538" },
  { id: "indigo-night", label: "Indigo night", value: "#2A2A3D" },
  { id: "forest", label: "Forest", value: "#1F2B2B" },
  { id: "espresso", label: "Espresso", value: "#3A2820" },
  { id: "wine", label: "Wine", value: "#35252B" },
  { id: "carbon", label: "Carbon", value: "#212121" },
  { id: "near-black", label: "Near black", value: "#1A1A1A" },
] as const

export type DarkCardPresetId = (typeof darkCardPresets)[number]["id"]

export type DarkCardPreset = {
  id: DarkCardPresetId
  label: string
  value: string | null
}

export const defaultDarkCardPresetId: DarkCardPresetId = "default"

const backgroundPresetMap = Object.fromEntries(
  darkBackgroundPresets.map((preset) => [preset.id, preset.value]),
) as Record<DarkBackgroundPresetId, string>

const cardPresetMap = Object.fromEntries(
  darkCardPresets.map((preset) => [preset.id, preset.value]),
) as Record<DarkCardPresetId, string | null>

export function isDarkBackgroundPresetId(
  value: string,
): value is DarkBackgroundPresetId {
  return value in backgroundPresetMap
}

export function isDarkCardPresetId(value: string): value is DarkCardPresetId {
  return value in cardPresetMap
}

export function getStoredDarkBackgroundPresetId(): DarkBackgroundPresetId {
  if (typeof window === "undefined") {
    return defaultDarkBackgroundPresetId
  }

  const stored = localStorage.getItem(DARK_BACKGROUND_STORAGE_KEY)
  if (stored && isDarkBackgroundPresetId(stored)) {
    return stored
  }

  return defaultDarkBackgroundPresetId
}

export function getDarkBackgroundValue(id: DarkBackgroundPresetId): string {
  return (
    backgroundPresetMap[id] ?? backgroundPresetMap[defaultDarkBackgroundPresetId]
  )
}

export function getStoredDarkCardPresetId(): DarkCardPresetId {
  if (typeof window === "undefined") {
    return defaultDarkCardPresetId
  }

  const stored = localStorage.getItem(DARK_CARD_STORAGE_KEY)
  if (stored && isDarkCardPresetId(stored)) {
    return stored
  }

  return defaultDarkCardPresetId
}

export function getDarkCardValue(id: DarkCardPresetId): string | null {
  return cardPresetMap[id] ?? cardPresetMap[defaultDarkCardPresetId]
}

export function getDarkCardDisplayValue(id: DarkCardPresetId): string {
  return getDarkCardValue(id) ?? defaultDarkCardColor
}

export function isDarkTheme(theme: string | undefined): boolean {
  return theme === "dark"
}

export function applyDarkAppearance(
  options?: {
    backgroundPresetId?: DarkBackgroundPresetId
    cardPresetId?: DarkCardPresetId
    theme?: string | undefined
  },
): void {
  if (typeof window === "undefined") {
    return
  }

  const html = document.documentElement
  const isDark =
    options?.theme !== undefined
      ? isDarkTheme(options.theme)
      : html.classList.contains("dark")

  if (!isDark) {
    html.style.removeProperty("--background")
    html.style.removeProperty("--card")
    return
  }

  const backgroundId =
    options?.backgroundPresetId ?? getStoredDarkBackgroundPresetId()
  html.style.setProperty("--background", getDarkBackgroundValue(backgroundId))

  const cardId = options?.cardPresetId ?? getStoredDarkCardPresetId()
  const cardValue = getDarkCardValue(cardId)
  if (cardValue) {
    html.style.setProperty("--card", cardValue)
  } else {
    html.style.removeProperty("--card")
  }
}

export function applyDarkBackground(
  presetId?: DarkBackgroundPresetId,
  theme?: string | undefined,
): void {
  applyDarkAppearance({ backgroundPresetId: presetId, theme })
}

export function setDarkBackgroundPreset(
  id: DarkBackgroundPresetId,
  theme?: string | undefined,
): void {
  localStorage.setItem(DARK_BACKGROUND_STORAGE_KEY, id)
  applyDarkAppearance({ backgroundPresetId: id, theme })
}

export function setDarkCardPreset(
  id: DarkCardPresetId,
  theme?: string | undefined,
): void {
  localStorage.setItem(DARK_CARD_STORAGE_KEY, id)
  applyDarkAppearance({ cardPresetId: id, theme })
}

export function getAppearanceInitScript(): string {
  const backgroundPresets = JSON.stringify(backgroundPresetMap)
  const cardPresets = JSON.stringify(cardPresetMap)

  return `(function(){try{var backgroundKey=${JSON.stringify(DARK_BACKGROUND_STORAGE_KEY)};var cardKey=${JSON.stringify(DARK_CARD_STORAGE_KEY)};var backgroundPresets=${backgroundPresets};var cardPresets=${cardPresets};var defaultBackgroundId=${JSON.stringify(defaultDarkBackgroundPresetId)};var defaultCardId=${JSON.stringify(defaultDarkCardPresetId)};var backgroundId=localStorage.getItem(backgroundKey)||defaultBackgroundId;var cardId=localStorage.getItem(cardKey)||defaultCardId;var backgroundColor=backgroundPresets[backgroundId]||backgroundPresets[defaultBackgroundId];var cardColor=cardPresets[cardId];var theme=localStorage.getItem("theme");var isDark=theme==="dark"||(theme!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(!isDark)return;var html=document.documentElement;html.style.setProperty("--background",backgroundColor);if(cardColor){html.style.setProperty("--card",cardColor)}else{html.style.removeProperty("--card")}}catch(e){}})();`
}
