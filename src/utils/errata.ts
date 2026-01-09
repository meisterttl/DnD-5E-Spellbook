import type { DDClass, DDSpell, DDSpellRange, DDSpellDuration } from "../types";

type DDErrata = {
  [name: string]: {
    source: string;
    duration?: DDSpellDuration[];
    range?: DDSpellRange;
    classes?: DDClass[];
    backgrounds?: string[];
  };
};

const errata: DDErrata = {
  Dream: {
    source: "XPHB",
    duration: [
      {
        type: "special",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 10,
      },
    },
  },
  "Encode Thoughts": {
    source: "GGR",
    backgrounds: ["Dimir Operative"],
  },
  "Dark Star": {
    source: "EGW",
    classes: [
      { name: "Wizard", source: "PHB", definedInSource: "EGW" },
      { name: "Wizard", source: "XPHB", definedInSource: "EGW" },
    ],
  },
  "Fortune's Favor": {
    source: "EGW",
    classes: [
      { name: "Wizard", source: "PHB", definedInSource: "EGW" },
      { name: "Wizard", source: "XPHB", definedInSource: "EGW" },
    ],
  },
  "Gift of Alacrity": {
    source: "EGW",
    classes: [
      { name: "Wizard", source: "PHB", definedInSource: "EGW" },
      { name: "Wizard", source: "XPHB", definedInSource: "EGW" },
    ],
  },
  "Gravity Fissure": {
    source: "EGW",
    classes: [
      { name: "Wizard", source: "PHB", definedInSource: "EGW" },
      { name: "Wizard", source: "XPHB", definedInSource: "EGW" },
    ],
  },
  "Gravity Sinkhole": {
    source: "EGW",
    classes: [
      { name: "Wizard", source: "PHB", definedInSource: "EGW" },
      { name: "Wizard", source: "XPHB", definedInSource: "EGW" },
    ],
  },
  "Immovable Object": {
    source: "EGW",
    classes: [
      { name: "Wizard", source: "PHB", definedInSource: "EGW" },
      { name: "Wizard", source: "XPHB", definedInSource: "EGW" },
    ],
  },
  "Magnify Gravity": {
    source: "EGW",
    classes: [
      { name: "Wizard", source: "PHB", definedInSource: "EGW" },
      { name: "Wizard", source: "XPHB", definedInSource: "EGW" },
    ],
  },
  "Pulse Wave": {
    source: "EGW",
    classes: [
      { name: "Wizard", source: "PHB", definedInSource: "EGW" },
      { name: "Wizard", source: "XPHB", definedInSource: "EGW" },
    ],
  },
  "Ravenous Void": {
    source: "EGW",
    classes: [
      { name: "Wizard", source: "PHB", definedInSource: "EGW" },
      { name: "Wizard", source: "XPHB", definedInSource: "EGW" },
    ],
  },
  "Reality Break": {
    source: "EGW",
    classes: [
      { name: "Wizard", source: "PHB", definedInSource: "EGW" },
      { name: "Wizard", source: "XPHB", definedInSource: "EGW" },
    ],
  },
  "Sapping Sting": {
    source: "EGW",
    classes: [
      { name: "Wizard", source: "PHB", definedInSource: "EGW" },
      { name: "Wizard", source: "XPHB", definedInSource: "EGW" },
    ],
  },
  "Temporal Shunt": {
    source: "EGW",
    classes: [
      { name: "Wizard", source: "PHB", definedInSource: "EGW" },
      { name: "Wizard", source: "XPHB", definedInSource: "EGW" },
    ],
  },
  "Tether Essence": {
    source: "EGW",
    classes: [
      { name: "Wizard", source: "PHB", definedInSource: "EGW" },
      { name: "Wizard", source: "XPHB", definedInSource: "EGW" },
    ],
  },
  "Time Ravage": {
    source: "EGW",
    classes: [
      { name: "Wizard", source: "PHB", definedInSource: "EGW" },
      { name: "Wizard", source: "XPHB", definedInSource: "EGW" },
    ],
  },
  Wristpocket: {
    source: "EGW",
    classes: [
      { name: "Wizard", source: "PHB", definedInSource: "EGW" },
      { name: "Wizard", source: "XPHB", definedInSource: "EGW" },
    ],
  },
};

const isUpdated = (spell: DDSpell) => {
  const spellName = spell.name as keyof typeof errata & string;

  if (spellName in errata && spell.source === errata[spellName].source) {
    if ("range" in errata[spellName]) spell.range = errata[spellName].range!;
    if ("backgrounds" in errata[spellName])
      spell.backgrounds = [...errata[spellName].backgrounds!];
    if ("classes" in errata[spellName])
      spell.classes!.push(...errata[spellName].classes!);
    if ("duration" in errata[spellName])
      spell.duration = errata[spellName].duration!;
  }

  return spell;
};

export default isUpdated;
