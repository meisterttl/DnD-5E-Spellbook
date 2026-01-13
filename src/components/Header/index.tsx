import React from "react";
import Filters from "./Filters";
import type { DDSpell } from "../../types";
import styles from "./header.module.css";

type Props = {
  allSpells: DDSpell[];
  initialFilters: string[];
  filteredSpells: DDSpell[];
  setFilteredSpells: React.Dispatch<React.SetStateAction<DDSpell[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  children: React.ReactNode;
};

export default function Header({
  allSpells,
  initialFilters,
  filteredSpells,
  setFilteredSpells,
  searchTerm,
  setSearchTerm,
  children,
}: Props) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.switchContainer}>
          <h1>SpellBook</h1>

          {children}
        </div>
      </header>

      <Filters
        allSpells={allSpells}
        initialFilters={initialFilters!}
        filteredSpells={filteredSpells}
        setFilteredSpells={setFilteredSpells}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </>
  );
}
