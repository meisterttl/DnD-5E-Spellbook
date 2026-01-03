import React, { useCallback, useEffect, useState } from "react";
import Filters from "./Filters";
import Select from "./Form/Select";
import Steps from "./Form/Steps";
import { generateSlug, stringMatch } from "../../utils/helpers";
import type { DDSpell } from "../../types";
import styles from "./header.module.css";

const spellClasses = [
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

const spellSchools = [
  "Abjuration",
  "Conjuration",
  "Divination",
  "Enchantment",
  "Evocation",
  "Illusion",
  "Necromancy",
  "Transmutation",
];

type Props = {
  allSpells: DDSpell[];
  activeSources: string[];
  setActiveSources: React.Dispatch<React.SetStateAction<string[]>>;
  setFilteredSpells: React.Dispatch<React.SetStateAction<DDSpell[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export default function Header({
  allSpells,
  activeSources,
  setActiveSources,
  setFilteredSpells,
  searchTerm,
  setSearchTerm,
}: Props) {
  const [activeClass, setActiveClass] = useState<string>("");
  const [activeSchool, setActiveSchool] = useState<string>("");
  const [activeLevel, setActiveLevel] = useState<number>(-1);

  const filterSpells = useCallback(
    (name: string) => {
      const slug = generateSlug(name);
      const needle = slug.endsWith("-") ? slug.slice(0, -1) : slug;
      const results = allSpells
        .filter((spell) => activeSources.includes(spell.source.toLowerCase()))
        .filter((spell) =>
          "" !== activeClass
            ? spell.classes!.find(
                (type) => activeClass === type.name.toLowerCase()
              )
            : true
        )
        .filter((spell) =>
          "" !== activeSchool
            ? activeSchool === spell.school.toLowerCase()
            : true
        )
        .filter((spell) =>
          -1 !== activeLevel ? activeLevel === spell.level : true
        )
        .filter((spell) => stringMatch(spell.index!, needle))
        .sort((a, b) => a.name.localeCompare(b.name));

      return results;
    },
    [activeClass, activeLevel, activeSchool, activeSources, allSpells]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const spellName = e.currentTarget.value;
    setSearchTerm(spellName);

    const results = filterSpells(spellName);
    setFilteredSpells(results);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearchTerm("");
  };

  useEffect(() => {
    const results = filterSpells(searchTerm);
    setFilteredSpells(results);
  }, [filterSpells, searchTerm, setFilteredSpells]);

  return (
    <header className={styles.header}>
      <h1>SpellBook</h1>

      <div className={styles.spellSearch}>
        <form className={styles.spellSearchForm} onSubmit={handleSubmit}>
          <Filters
            allSpells={allSpells}
            activeSources={activeSources}
            setActiveSources={setActiveSources}
            setFilteredSpells={setFilteredSpells}
          />

          <Select
            selectOptions={spellClasses}
            id="classes"
            label="Class"
            activeClass={activeClass}
            setter={setActiveClass}
          />

          <Select
            selectOptions={spellSchools}
            id="schools"
            label="School"
            activeClass={activeSchool}
            setter={setActiveSchool}
          />

          <Steps
            id="level"
            label="Spell Level"
            min={0}
            max={9}
            activeLevel={activeLevel}
            setActiveLevel={setActiveLevel}
          />

          <div className={styles.searchContainer}>
            <label htmlFor="spell">Search spells by name</label>
            <input
              id="spell"
              name="spell"
              type="text"
              value={searchTerm}
              onChange={handleSearch}
            />

            <button type="submit">Search</button>
          </div>
        </form>
      </div>
    </header>
  );
}
