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
  meta?: {
    ritual: boolean;
  };
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
  scaling: {
    "1"?: string;
    "5": string;
    "11": string;
    "17": string;
  };
};

export type DDFilter = {
  sources: string[];
  classType: string;
  school: string;
  level: number;
};

export type DDCharacterClass = {
  name: string;
  source: string;
  page?: number;
  otherSources?: DDSpellSources[];
  reprintedAs?: string[];
  edition: string;
  primaryAbility?: DDPrimaryAbilities[];
  hd: DDHitDice;
  proficiency: string[];
  spellcastingAbility: string;
  casterProgression: string;
  preparedSpells: string;
  preparedSpellsProgression?: number[];
  preparedSpellsChange: string;
  cantripProgression: number[];
  featProgression?: DDFeatProgression[];
  optionalfeatureProgression?: DDOptionalProgression;
  startingProficiencies: DDClassProficiencies;
  skills?: DDClassSpells[];
  startingEquipment: DDStartingEquipment;
  multicasting: DDMulticasting;
  classTableGroups: DDClassTableGroup[];
  classFeatures: (DDClassFeatures | string)[];
  subclassTitle: string;
  hasFluff: boolean;
  hasFluffImages: boolean;
};

export type DDSpellSlots = {
  className: string;
  source: string;
  slots: DDSlots;
};

type DDSlots = (string | number)[][];

type DDPrimaryAbilities = {
  str?: boolean;
  dex?: boolean;
  int?: boolean;
  wis?: boolean;
  cha?: boolean;
};

type DDHitDice = { number: number; faces: number };

type DDFeatProgression = {
  name: string;
  category: string[];
  progression: {
    "19": number;
  };
};

type DDOptionalProgression = {
  name: string;
  featureType: string[];
  progression: number[];
};

type DDBasicProficiencies = { proficiency: "string"; optional: boolean };

type DDClassProficiencies = {
  armor: string[];
  weapons?: (DDBasicProficiencies | string)[];
  tools: string[];
  toolProficiencies: DDToolProficiencies;
  skills?: DDClassSpells[];
};

type DDToolProficiencies = {
  "thieves' tools"?: boolean;
  "tinker's tools"?: boolean;
  anyArtisansTool?: number;
};

type DDClassSpells = {
  choose: {
    from: string[];
  };
  count?: number;
};

type DDStartingEquipment = {
  additionalFromBackground: boolean;
  default?: string[];
  goldAlternative?: string;
  defaultData: (
    | { _: { equipmentType: string; quantity: number }[] }
    | { a: string[]; b: string[] }
    | { A: { item: string }[]; B: { value: number }[] }
    | { _: string[] }
  )[];
  entries?: string[];
};

type DDMulticasting = {
  requirements?: DDPrimaryAbilities;
  proficienciesGained: DDClassProficiencies;
};

type DDClassTableGroup = {
  title?: string[] | string;
  colLabels: string[];
  rows?: (number | string)[][];
  rowsSpellProgression?: DDSlots;
};

type DDClassFeatures = { classFeature: string; gainSubclassFeature: boolean };
