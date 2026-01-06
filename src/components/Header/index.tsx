import React, { useCallback, useEffect, useState } from "react";
import { spellClasses, spellSchools } from "../../constants";
import Filters from "./Filters";
import Select from "./Form/Select";
import Steps from "./Form/Steps";
import { generateSlug, stringMatch } from "../../utils/helpers";
import type { DDSpell } from "../../types";
import styles from "./header.module.css";

type Props = {
  allSpells: DDSpell[];
  activeSources: string[];
  setActiveSources: React.Dispatch<React.SetStateAction<string[]>>;
  filteredSpells: DDSpell[];
  setFilteredSpells: React.Dispatch<React.SetStateAction<DDSpell[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

type sortKey = "name" | "school";

export default function Header({
  allSpells,
  activeSources,
  setActiveSources,
  filteredSpells,
  setFilteredSpells,
  searchTerm,
  setSearchTerm,
}: Props) {
  const [activeClass, setActiveClass] = useState<string>("");
  const [activeSchool, setActiveSchool] = useState<string>("");
  const [activeLevel, setActiveLevel] = useState<number>(-1);
  const [sortBy, setSortBy] = useState<string>("name");

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
        .sort((a, b) =>
          "level" === sortBy
            ? a[sortBy] - b[sortBy]
            : a[sortBy as sortKey].localeCompare(b[sortBy as sortKey])
        );

      return results;
    },
    [activeClass, activeLevel, activeSchool, activeSources, allSpells, sortBy]
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

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSortBy(e.currentTarget.value);

  useEffect(() => {
    const results = filterSpells(searchTerm);
    setFilteredSpells(results);
  }, [filterSpells, searchTerm, setFilteredSpells]);

  return (
    <>
      <header className={styles.header}>
        <h1>SpellBook</h1>

        <div className={styles.spellSearch}>
          <form className={styles.spellSearchForm} onSubmit={handleSubmit}>
            <Filters
              activeSources={activeSources}
              setActiveSources={setActiveSources}
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

      <div className={styles.status}>
        <div className={styles.sortContainer}>
          <label htmlFor="sort">Sort by</label>

          <select id="sort" value={sortBy} onChange={handleSort}>
            <option value="name">Name</option>
            <option value="school">School</option>
            <option value="level">Level</option>
          </select>
        </div>

        <div className={styles.spellCounter}>
          {filteredSpells.length} of {allSpells.length} Spells
        </div>
      </div>
    </>
  );
}
