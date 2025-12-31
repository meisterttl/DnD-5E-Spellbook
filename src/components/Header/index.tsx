import React from "react";
import { generateSlug, stringMatch } from "../../utils/helpers";
import type { DDSpell } from "../../types";
import styles from "./header.module.css";

type Props = {
  allSpells: DDSpell[];
  setFilteredSpells: React.Dispatch<React.SetStateAction<DDSpell[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export default function Header({
  allSpells,
  setFilteredSpells,
  searchTerm,
  setSearchTerm,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const spellName = e.currentTarget.value;
    setSearchTerm(spellName);

    const slug = generateSlug(spellName);
    const needle = slug.endsWith("-") ? slug.slice(0, -1) : slug;
    const results = allSpells
      .filter((spell) => stringMatch(spell.index!, needle))
      .sort((a, b) => a.name.localeCompare(b.name));
    const oldresults = allSpells
      .filter((spell) => -1 !== spell.index!.indexOf(needle))
      .sort((a, b) => a.name.localeCompare(b.name));

    console.log(results.length, oldresults.length);
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
          <label htmlFor="spell">Search spells by name</label>
          <input
            id="spell"
            name="spell"
            type="text"
            value={searchTerm}
            onChange={handleChange}
          />

          <button type="submit">Search</button>
        </form>

        {/* Adding filters later */}
      </div>
    </header>
  );
}
