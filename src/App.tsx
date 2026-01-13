import React, { useState } from "react";
import allSpells from "./data";
import LightDarkMode from "./components/LightDarkMode";
import Header from "./components/Header";
import Spells from "./components/Spells";
import { loadSettings } from "./utils/helpers";
import type { DDSpell } from "./types";
import "normalize.css";
import "./App.css";

// Load filters from localStorage
const initialFilters = loadSettings("spellSources");

function Main({ children }: { children: React.ReactNode }) {
  // Set parameters for loading initial spells
  const spells = allSpells
    .filter((spell) => initialFilters!.includes(spell.source.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const [filteredSpells, setFilteredSpells] = useState<DDSpell[]>(spells);
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <>
      <Header
        allSpells={allSpells}
        initialFilters={initialFilters!}
        filteredSpells={filteredSpells}
        setFilteredSpells={setFilteredSpells}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        children={children}
      />

      <Spells filteredSpells={filteredSpells} searchTerm={searchTerm}>
        <div className="spell-counter">
          {filteredSpells.length} of {allSpells.length} Spells
        </div>
      </Spells>
    </>
  );
}

function App() {
  return (
    <Main>
      <LightDarkMode />
    </Main>
  );
}

export default App;
