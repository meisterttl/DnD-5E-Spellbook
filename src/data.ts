import Sources from "./data/spells/sources.json";
import PHB from "./data/spells/spells-phb.json";
import XPHB from "./data/spells/spells-xphb.json";
import XGE from "./data/spells/spells-xge.json";
import TCE from "./data/spells/spells-tce.json";
import FTD from "./data/spells/spells-ftd.json";
import BMT from "./data/spells/spells-bmt.json";
import FRHoF from "./data/spells/spells-frhof.json";
import EFA from "./data/spells/spells-efa.json";
import GGR from "./data/spells/spells-ggr.json";
import AI from "./data/spells/spells-ai.json";
import EGW from "./data/spells/spells-egw.json";
import SCC from "./data/spells/spells-scc.json";
import AAG from "./data/spells/spells-aag.json";
import AitFR from "./data/spells/spells-aitfr-avt.json";
import IDRotF from "./data/spells/spells-idrotf.json";
import LLK from "./data/spells/spells-llk.json";
import SatO from "./data/spells/spells-sato.json";
import TDCSR from "./data/spells/spells-tdcsr.json";
import isUpdated from "./utils/errata";
import { getSchool } from "./utils/formatSpells";
import { capitalize } from "./utils/helpers";
import type { DDSpell, DDClassTypes } from "./types";

// v2.22.0
const DDData = {
  PHB: { spell: PHB.spell, classes: Sources.PHB }, // Player's Handbook [2014] (361) ✓?
  XPHB: { spell: XPHB.spell, classes: Sources.XPHB }, // Player's Handbook [2024] (391) ✓?
  XGE: { spell: XGE.spell, classes: Sources.XGE }, // Xanathar's Guide to Everything (95) ✓
  TCE: { spell: TCE.spell, classes: Sources.TCE }, // Tasha's Cauldron of Everything  (21) ✓
  FTD: { spell: FTD.spell, classes: Sources.FTD }, // Fizban's Treasury of Dragons (7) ✓
  BMT: { spell: BMT.spell, classes: Sources.BMT }, // The Book of Many Things (3) ✓
  FRHoF: { spell: FRHoF.spell, classes: Sources.FRHoF }, // Forgotten Realms: Heroes of Faerûn (19) ✓
  EFA: { spell: EFA.spell, classes: Sources.EFA }, // Eberron: Forge of the Artificer (1) ✓
  GGR: { spell: GGR.spell, classes: null }, // Guildmasters' Guide to Ravnica (1) ✓
  AI: { spell: AI.spell, classes: Sources.AI }, // Acquisitions Incorporated (7) ✓
  EGW: { spell: EGW.spell, classes: null }, // Explorer's Guide to Wildemount (15) ✓
  SCC: { spell: SCC.spell, classes: Sources.SCC }, // Strixhaven: A curriculum of Chaos (7) ✓
  AAG: { spell: AAG.spell, classes: Sources.AAG }, // Astral Adventurer's Guide (2) ✓
  AitFR: { spell: AitFR.spell, classes: Sources["AitFR-AVT"] }, // Adventures in the Forgotten Realms - A Verdant Tomb (2) ✓ [Blade of Disaster found in XGE]
  IDRotF: { spell: IDRotF.spell, classes: Sources.IDRotF }, // Icewind Dale: Rime of the Frostmaiden (3) ✓ [Blade of Disaster found in TCE]
  LLK: { spell: LLK.spell, classes: Sources.LLK }, // Lost Laboratory of Kwalish (3) ✓
  SatO: { spell: SatO.spell, classes: Sources.SatO }, // Sigil and the Outlands (2) ✓
  TDCSR: { spell: TDCSR.spell, classes: Sources.TDCSR }, // Tal'Dorei Campaign Setting: Reborn (2) ✓
};
const DDSpells: DDSpell[] = [];

for (const source in DDData) {
  const bKey = source as keyof typeof DDData; // Book Key
  const spellData = DDData[bKey].spell;
  const classData = DDData[bKey].classes;

  const newSpellData = spellData.map((spell: DDSpell) => {
    const sClasses = classData
      ? (classData![spell.name as keyof typeof classData] as DDClassTypes)
      : null;

    const spellModified: DDSpell = {
      name: spell.name,
      index: spell.name
        .toLowerCase()
        .replace(/[\s/]/g, "-") // Empty space and Forward slash
        .replace(/\u0027/g, ""), // Apostrophe
      source: spell.source,
      page: spell.page,
      level: spell.level,
      classes: [],
      school: capitalize(getSchool(spell.school)!),
      time: spell.time,
      range: spell.range,
      components: spell.components,
      duration: spell.duration,
      entries: spell.entries,
      isPrepared: false,
    };

    if ("otherSources" in spell) {
      spellModified.otherSources = spell.otherSources;
    }

    if ("meta" in spell) {
      spellModified.meta = spell.meta;
    }

    if ("entriesHigherLevel" in spell) {
      spellModified.entriesHigherLevel = spell.entriesHigherLevel;
    }

    if ("scalingLevelDice" in spell) {
      spellModified.scalingLevelDice = spell.scalingLevelDice;
    }

    if (sClasses && "class" in sClasses) {
      spellModified.classes!.push(...sClasses.class!);
    }

    if (sClasses && "classVariant" in sClasses) {
      spellModified.classes!.push(...sClasses.classVariant!);
    }

    return isUpdated(spellModified);
  });

  DDSpells.push(...newSpellData);
}

export default DDSpells;
