export type DDSpell = {
  name: string;
  index?: string;
  alias?: string[];
  source: string;
  page: number;
  srd?: string | boolean;
  basicRules?: string[] | boolean;
  otherSources?: DDSpellSources[];
  reprintedAs?: string[];
  level: number;
  classes?: DDClass[] | [];
  school: string;
  time: DDSpellCastTime[];
  range: DDSpellRange;
  components: DDSpellComponents;
  duration: DDSpellDuration[];
  meta?: DDSpellMeta;
  entries: DDSpellEntries[];
  entriesHigherLevel?: DDSpellTypeEntries[];
  scalingLevelDice?: DDSpellScalingLevelDice;
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

type DDClass = {
  name: string;
  source: string;
  definedInSource?: string;
};

type DDSpellSources = {
  source: string;
  page: number;
};

export type DDSpellCastTime = {
  number: number;
  unit: string;
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
  | DDSpellTypeList
  | DDSpellTypeEntries
  | DDSpellTypeEntriesTable
  | string;

export type DDSpellTypeList = {
  type: string;
  items: string[];
};

export type DDSpellTypeEntries = {
  type: string;
  name: string;
  entries: (DDSpellTypeList | string)[];
};

export type DDSpellTypeEntriesTable = {
  type: string;
  caption: string;
  colLabels: string[];
  colStyles: string[];
  rows: (DDSpellTypeEntriesCell | string)[][];
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

type DDSpellScalingLevelDice = {
  label: string;
  scaling: DDSpellScaling;
};

type DDSpellScaling = {
  "1": string;
  "5": string;
  "11": string;
  "17": string;
};

// export type DDSpell = {
//   index: string;
//   name: string;
//   level: number;
//   url: string;
//   detailLoaded: boolean;
//   desc?: string[];
//   higher_level?: string[] | [];
//   range?: string;
//   components?: string[];
//   material?: string;
//   ritual?: boolean;
//   duration?: string;
//   concentration?: boolean;
//   casting_time?: string;
//   attack_type?: string;
//   damage?: DDSpellDamage;
//   dc?: DDSpellDC;
//   school?: DDSpellTemplate;
//   classes?: DDSpellTemplate[];
//   subclasses?: DDSpellTemplate[] | [];
//   updated_at?: Date;
// };

// type DDSpellTemplate = {
//   index: string;
//   name: string;
//   url: string;
// };

// type DDSpellDamage = {
//   damage_type: DDSpellTemplate;
//   damage_at_slot_level: DDSpellDamageLevel[];
// };

// type DDSpellDamageLevel = {
//   [lvl: number]: string;
// };

// type DDSpellDC = {
//   dc_type: DDSpellTemplate;
//   dc_success: string;
// };
