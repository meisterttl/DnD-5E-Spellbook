export type DDSpell = {
  name: string;
  index?: string;
  alias?: string[];
  source: string;
  page: number;
  srd?: string | boolean;
  srd52?: string | boolean;
  basicRules2024?: boolean;
  basicRules?: string[] | boolean;
  otherSources?: DDSpellSources[];
  reprintedAs?: string[];
  level: number;
  classes?: DDClass[];
  backgrounds?: string[];
  school: string;
  time: DDSpellCastTime[];
  range: DDSpellRange;
  components: DDSpellComponents;
  duration: DDSpellDuration[];
  meta?: DDSpellMeta;
  entries: DDSpellEntries[];
  entriesHigherLevel?: DDSpellTypeEntries[];
  scalingLevelDice?: DDSpellScalingLevelDice[] | DDSpellScalingLevelDice;
  damageInflict?: string[];
  conditionInflict?: string[];
  damageImmune?: string[];
  conditionImmune?: string[];
  damageResist?: string[];
  damageVulnerable?: string[];
  spellAttack?: string[];
  savingThrow?: string[];
  abilityCheck?: string[];
  affectsCreatureType?: string[];
  miscTags?: string[];
  areaTags?: string[];
  hasFluffImages?: boolean;
};

export type DDClassTypes = {
  class?: DDClass[];
  classVariant?: DDClass[];
};

export type DDClass = {
  name: string;
  source: string;
  definedInSource?: string;
};

type DDSpellSources = {
  source: string;
  page?: number;
};

export type DDSpellCastTime = {
  number: number;
  unit: string;
  condition?: string;
};

export type DDSpellRange = {
  type: string;
  distance?: DDSpellTypeAmount;
};

export type DDSpellComponents = {
  v?: boolean;
  s?: boolean;
  m?: DDSpellMaterialCost | string;
};

type DDSpellMaterialCost = {
  text: string;
  cost?: number;
  consume?: boolean | string;
};

export type DDSpellDuration = {
  type: string;
  concentration?: boolean;
  duration?: DDSpellTypeAmount;
  ends?: string[];
};

type DDSpellMeta = {
  ritual: boolean;
};

type DDSpellTypeAmount = {
  type: string;
  amount?: number;
};

export type DDSpellEntries =
  | DDSpellTypeItem
  | DDSpellTypeList
  | DDSpellTypeEntries
  | DDSpellTypeEntriesTable
  | DDSpellTypeQuote
  | string;

export type DDSpellTypeItem = {
  type: string;
  name: string;
  entries: string[];
};

export type DDSpellTypeList = {
  type: string;
  style?: string;
  items: (DDSpellTypeItem | string)[];
};

export type DDSpellTypeEntries = {
  type: string;
  name: string;
  entries: (DDSpellTypeList | DDSpellTypeEntriesTable | string)[];
};

export type DDSpellTypeEntriesCell = {
  type: string;
  roll: {
    min?: number;
    max?: number;
    exact?: number;
    pad?: boolean;
  };
};

export type DDSpellTypeEntriesTable = {
  type: string;
  caption?: string;
  colLabels: string[];
  colStyles: string[];
  rows: (DDSpellTypeEntriesCell | string)[][];
};

export type DDSpellTypeQuote = {
  type: string;
  entries: string[];
  by: string;
};

type DDSpellScalingLevelDice = {
  label: string;
  scaling: DDSpellScaling;
};

type DDSpellScaling = {
  "1"?: string;
  "5": string;
  "11": string;
  "17": string;
};
