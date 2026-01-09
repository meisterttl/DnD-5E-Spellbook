import { useState } from "react";
import allSpells from "./data";
import Header from "./components/Header";
import Spells from "./components/Spells";
import { loadFilters } from "./utils/helpers";
import type { DDSpell } from "./types";
import "normalize.css";
import "./App.css";

function App() {
  // Load filters from localStorage
  const initialFilters = loadFilters("spellSources");

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
      />

      {0 === filteredSpells.length && (
        <div className="no-results">
          <p className="lead alert">
            No spells found {!!searchTerm && `(Search term: ${searchTerm})`}
          </p>
        </div>
      )}

      {0 !== filteredSpells.length && (
        <Spells filteredSpells={filteredSpells} searchTerm={searchTerm} />
      )}
    </>
  );
}

export default App;
