import { useEffect, useRef, useState } from "react";
import allSpells from "./data";
import Header from "./components/Header";
import Spells from "./components/Spells";
import Masonry from "masonry-layout";
import { loadFilters } from "./utils/helpers";
import type { DDSpell } from "./types";
import "normalize.css";
import "./App.css";

function App() {
  // Load filters from localStorage
  const initialFilters = loadFilters("spellSources");

  // Set parameters for loading initial spells
  const [activeSources, setActiveSources] = useState<string[]>(initialFilters!);
  const spells = allSpells
    .filter((spell) => activeSources.includes(spell.source.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const [filteredSpells, setFilteredSpells] = useState<DDSpell[]>(spells);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const noResult = useRef<boolean>(true);
  const msnry = useRef<Masonry>(null);

  useEffect(() => {
    // Needs to re-initialize Masonry layout when there are 0 spells visible on the screen
    if (0 !== filteredSpells.length && noResult.current) {
      const gridElem = document.querySelector(".grid")!;

      msnry.current = new Masonry(gridElem, {
        itemSelector: ".grid-item",
        percentPosition: true,
      });
      msnry.current!.layout!(); // Just in case it's not laid out properly

      noResult.current = false;
    }

    // Reload and lay out spells
    msnry.current!.reloadItems!();
    msnry.current!.layout!();

    if (0 === filteredSpells.length) noResult.current = true;
  }, [filteredSpells]);

  return (
    <>
      <Header
        allSpells={allSpells}
        activeSources={activeSources}
        setActiveSources={setActiveSources}
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
        <Spells spells={filteredSpells} searchTerm={searchTerm} msnry={msnry} />
      )}
    </>
  );
}

export default App;
