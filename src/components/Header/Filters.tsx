import Fieldset from "./Form/Fieldset";
import styles from "./header.module.css";
import type { DDSpell } from "../../types";

const coreSources = [
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
const filterSets = [
  { label: "Supplements", data: supplements },
  { label: "Campaigns", data: campaigns },
  { label: "Adventures", data: adventures },
  { label: "Others", data: otherSources },
];

type Props = {
  allSpells: DDSpell[];
  activeSources: string[];
  setActiveSources: React.Dispatch<React.SetStateAction<string[]>>;
  setFilteredSpells: React.Dispatch<React.SetStateAction<DDSpell[]>>;
};

export default function Filters({
  allSpells,
  activeSources,
  setActiveSources,
  setFilteredSpells,
}: Props) {
  const handleCollapse = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const isVisible = e.currentTarget.ariaExpanded;
    e.currentTarget.ariaExpanded =
      "true" === isVisible ? String(!isVisible) : String(!!isVisible);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sourceId = e.currentTarget.id;
    const newActiveSources = activeSources.includes(sourceId)
      ? activeSources.filter((source) => sourceId !== source)
      : [...activeSources, sourceId];
    setActiveSources(newActiveSources);

    const newSpells = allSpells
      .filter(
        (spell) => -1 !== newActiveSources.indexOf(spell.source.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
    setFilteredSpells(newSpells);
  };

  return (
    <>
      <Fieldset
        legend="Core"
        sources={coreSources}
        props={{ activeSources, handleFilter }}
      />

      <div className={styles.filterCollapsible}>
        <button
          className={styles.filterCollapsibleToggle}
          aria-expanded="false"
          aria-controls="collapsibleContent"
          onClick={handleCollapse}
        >
          <span>More Sources</span>
          <svg role="img" width="30" height="30" alt="Toggle Content">
            <use href="#chevron" xlinkHref="#chevron"></use>
          </svg>
        </button>

        <div
          className={styles.filterCollapsibleContent}
          id="collapsibleContent"
        >
          {filterSets.map((set, index) => (
            <Fieldset
              key={`${set.label.toLowerCase()}-${index}`}
              legend={set.label}
              sources={set.data}
              props={{ activeSources, handleFilter }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
