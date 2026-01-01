import React from "react";
import Filters from "./Filters";
import { generateSlug, stringMatch } from "../../utils/helpers";
import type { DDSpell } from "../../types";
import styles from "./header.module.css";

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
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const spellName = e.currentTarget.value;
    setSearchTerm(spellName);

    const slug = generateSlug(spellName);
    const needle = slug.endsWith("-") ? slug.slice(0, -1) : slug;
    const results = allSpells
      .filter((spell) => activeSources.includes(spell.source.toLowerCase()))
      .filter((spell) => stringMatch(spell.index!, needle))
      .sort((a, b) => a.name.localeCompare(b.name));
    setFilteredSpells(results);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearchTerm("");
  };

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

          <div className={styles.filterSelectContainer}>
            <label htmlFor="classes">Filter by Class</label>
            <select id="classes">
              <option value="" selected disabled>
                Select a class
              </option>
              <option value="artificer">Artificer</option>
              <option value="bard">Bard</option>
              <option value="cleric">Cleric</option>
              <option value="druid">Druid</option>
              <option value="monk">Monk</option>
              <option value="paladin">Paladin</option>
              <option value="ranger">Ranger</option>
              <option value="sorcerer">Sorcerer</option>
              <option value="warlock">Warlock</option>
              <option value="wizard">Wizard</option>
            </select>
          </div>

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
