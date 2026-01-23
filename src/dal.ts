import type { DDSpell } from "./types";

export const fetchJSON = async (json: string) => {
  const res = await fetch(json);
  const data = await res.json();

  return data;
};

export const fetchAllSlots = async (jsons: string[]) => {
  const promises = jsons.map((json) =>
    fetch(json).then(async (response) => {
      const data = await response.json();

      return data.class;
    }),
  );
  const data = await Promise.all(promises);

  return data;
};

export const fetchAllSpells = async (jsons: string[], source: string) => {
  const promises = jsons.map((json: string) =>
    fetch(json).then(async (response) => {
      const data: { spell: DDSpell[] } = await response.json();

      return data.spell;
    }),
  );
  const [
    PHB,
    XPHB,
    XGE,
    TCE,
    FTD,
    BMT,
    FRHoF,
    EFA,
    GGR,
    AI,
    EGW,
    SCC,
    AAG,
    AitFR,
    IDRotF,
    LLK,
    SatO,
    TDCSR,
  ] = await Promise.all(promises);
  const sources = await fetchJSON(source);

  // v2.22.2
  return {
    PHB: { spell: PHB, classes: sources.PHB }, // Player's Handbook [2014] (361) ✓?
    XPHB: { spell: XPHB, classes: sources.XPHB }, // Player's Handbook [2024] (391) ✓?
    XGE: { spell: XGE, classes: sources.XGE }, // Xanathar's Guide to Everything (95) ✓
    TCE: { spell: TCE, classes: sources.TCE }, // Tasha's Cauldron of Everything  (21) ✓
    FTD: { spell: FTD, classes: sources.FTD }, // Fizban's Treasury of Dragons (7) ✓
    BMT: { spell: BMT, classes: sources.BMT }, // The Book of Many Things (3) ✓
    FRHoF: { spell: FRHoF, classes: sources.FRHoF }, // Forgotten Realms: Heroes of Faerûn (19) ✓
    EFA: { spell: EFA, classes: sources.EFA }, // Eberron: Forge of the Artificer (1) ✓
    GGR: { spell: GGR, classes: null }, // Guildmasters' Guide to Ravnica (1) ✓
    AI: { spell: AI, classes: sources.AI }, // Acquisitions Incorporated (7) ✓
    EGW: { spell: EGW, classes: null }, // Explorer's Guide to Wildemount (15) ✓
    SCC: { spell: SCC, classes: sources.SCC }, // Strixhaven: A curriculum of Chaos (7) ✓
    AAG: { spell: AAG, classes: sources.AAG }, // Astral Adventurer's Guide (2) ✓
    AitFR: { spell: AitFR, classes: sources["AitFR-AVT"] }, // Adventures in the Forgotten Realms - A Verdant Tomb (2) ✓ [Blade of Disaster found in XGE]
    IDRotF: { spell: IDRotF, classes: sources.IDRotF }, // Icewind Dale: Rime of the Frostmaiden (3) ✓ [Blade of Disaster found in TCE]
    LLK: { spell: LLK, classes: sources.LLK }, // Lost Laboratory of Kwalish (3) ✓
    SatO: { spell: SatO, classes: sources.SatO }, // Sigil and the Outlands (2) ✓
    TDCSR: { spell: TDCSR, classes: null }, // Tal'Dorei Campaign Setting: Reborn (2) ✓
  };
};
