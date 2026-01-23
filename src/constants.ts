export const spellJSON = [
  "./data/spells/spells-phb.json",
  "./data/spells/spells-xphb.json",
  "./data/spells/spells-xge.json",
  "./data/spells/spells-tce.json",
  "./data/spells/spells-ftd.json",
  "./data/spells/spells-bmt.json",
  "./data/spells/spells-frhof.json",
  "./data/spells/spells-efa.json",
  "./data/spells/spells-ggr.json",
  "./data/spells/spells-ai.json",
  "./data/spells/spells-egw.json",
  "./data/spells/spells-scc.json",
  "./data/spells/spells-aag.json",
  "./data/spells/spells-aitfr-avt.json",
  "./data/spells/spells-idrotf.json",
  "./data/spells/spells-llk.json",
  "./data/spells/spells-sato.json",
  "./data/spells/spells-tdcsr.json",
];

// export const spellJSON = [
//   {
//     name: "phb",
//     path: "./data/spells/spells-phb.json",
//   },{
//     name: "xphb",
//     path:  "./data/spells/spells-xphb.json",
//   },{
//     name: "xge",
//     path: "./data/spells/spells-xge.json",
//   },{
//     name: "tce",
//     path: "./data/spells/spells-tce.json",
//   },{
//     name: "ftd",
//     path: "./data/spells/spells-ftd.json",
//   },{
//     name: "bmt",
//     path: "./data/spells/spells-bmt.json",
//   },{
//     name: "frhof",
//     path: "./data/spells/spells-frhof.json",
//   },{
//     name: "efa",
//     path: "./data/spells/spells-efa.json",
//   },{
//     name: "ggr",
//     path: "./data/spells/spells-ggr.json",
//   },{
//     name: "ai",
//     path: "./data/spells/spells-ai.json",
//   },{
//     name: "egw",
//     path: "./data/spells/spells-egw.json",
//   },{
//     name: "scc",
//     path: "./data/spells/spells-scc.json",
//   },{
//     name: "aag",
//     path: "./data/spells/spells-aag.json",
//   },{
//     name: "aitfr",
//     path: "./data/spells/spells-aitfr-avt.json",
//   },{
//     name: "idrotf",
//     path: "./data/spells/spells-idrotf.json",
//   },{
//     name: "llk",
//     path: "./data/spells/spells-llk.json",
//   },{
//     name: "sato",
//     path: "./data/spells/spells-sato.json",
//   },{
//     name: "tdcsr",
//     path: "./data/spells/spells-tdcsr.json",
//   },
// ];

export const sourceJSON = "./data/spells/sources.json";

export const classJSON = [
  "./data/class/class-artificer.json",
  "./data/class/class-bard.json",
  "./data/class/class-cleric.json",
  "./data/class/class-druid.json",
  "./data/class/class-monk.json",
  "./data/class/class-paladin.json",
  "./data/class/class-ranger.json",
  "./data/class/class-sorcerer.json",
  "./data/class/class-warlock.json",
  "./data/class/class-wizard.json",
];

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
