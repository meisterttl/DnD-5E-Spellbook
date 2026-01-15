export const spellClasses = [
  "Artificer",
  "Bard",
  "Cleric",
  "Druid",
  "Monk",
  "Paladin",
  "Ranger",
  "Sorcerer",
  "Warlock",
  "Wizard",
];

export const spellSchools = [
  "Abjuration",
  "Conjuration",
  "Divination",
  "Enchantment",
  "Evocation",
  "Illusion",
  "Necromancy",
  "Transmutation",
];

export const coreSources = [
  { id: "phb", name: "Player's Handbook (2014)" },
  { id: "xphb", name: "Player's Handbook (2024)" },
];

const supplements = [
  { id: "xge", name: "Xanathar's Guide to Everything" },
  { id: "tce", name: "Tasha's Cauldron of Everything" },
  { id: "ftd", name: "Fizban's Treasury of Dragons" },
  {
    id: "bmt",
    name: "The Book of Many Things",
  },
  {
    id: "frhof",
    name: "Forgotten Realms: Heroes of Faerûn",
  },
  { id: "efa", name: "Eberron: Forge of the Artificer" },
];

const campaigns = [
  { id: "ggr", name: "Guildmasters' Guide to Ravnica" },
  { id: "ai", name: "Acquisitions Incorporated" },
  { id: "egw", name: "Explorer's Guide to Wildemount" },
  { id: "scc", name: "Strixhaven: A curriculum of Chaos" },
  { id: "aag", name: "Astral Adventurer's Guide" },
  {
    id: "aitfr-avt",
    name: "Adventures in the Forgotten Realms - A Verdant Tomb",
  },
  { id: "sato", name: "Sigil and the Outlands" },
];

const adventures = [
  { id: "idrotf", name: "Icewind Dale: Rime of the Frostmaiden" },
];

const otherSources = [
  { id: "llk", name: "Lost Laboratory of Kwalish" },
  { id: "tdcsr", name: "Tal'Dorei Campaign Setting: Reborn" },
];

export const filterSets = [
  { label: "Supplements", data: supplements },
  { label: "Campaigns", data: campaigns },
  { label: "Adventures", data: adventures },
  { label: "Others", data: otherSources },
];

export const allSources = [
  ...coreSources,
  ...supplements,
  ...campaigns,
  ...adventures,
  ...otherSources,
];

// const wizardSpellSlots = {
//   source: "phb",
//   level: {
//     "1": [2],
//     "2": [3],
//     "3": [4, 2],
//     "4": [4, 3],
//     "5": [4, 3, 2],
//     "6": [4, 3, 3],
//     "7": [4, 3, 3, 1],
//     "8": [4, 3, 3, 2],
//     "9": [4, 3, 3, 3, 1],
//     "10": [4, 3, 3, 3, 2],
//     "11": [4, 3, 3, 3, 2, 1],
//     "12": [4, 3, 3, 3, 2, 1],
//     "13": [4, 3, 3, 3, 2, 1, 1],
//     "14": [4, 3, 3, 3, 2, 1, 1],
//     "15": [4, 3, 3, 3, 2, 1, 1, 1],
//     "16": [4, 3, 3, 3, 2, 1, 1, 1],
//     "17": [4, 3, 3, 3, 2, 1, 1, 1, 1],
//     "18": [4, 3, 3, 3, 3, 1, 1, 1, 1],
//     "19": [4, 3, 3, 3, 3, 2, 1, 1, 1],
//     "20": [4, 3, 3, 3, 3, 2, 2, 1, 1],
//   },
// };
