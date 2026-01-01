import { useEffect, useRef, useState } from "react";
import allSpells from "./data";
import Header from "./components/Header";
import Spells from "./components/Spells";
import Masonry from "masonry-layout";
import type { DDSpell } from "./types";
import "normalize.css";
import "./App.css";

function App() {
  const [activeSources, setActiveSources] = useState<string[]>(["phb"]);
  const spells = allSpells.filter((spell) =>
    activeSources.includes(spell.source.toLowerCase())
  );

  const [filteredSpells, setFilteredSpells] = useState<DDSpell[]>(spells);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const msnry = useRef<Masonry>(null);
  const noResult = useRef<boolean>(true);

  useEffect(() => {
    if (0 !== filteredSpells.length && noResult.current) {
      const gridElem = document.querySelector(".grid")!;

      msnry.current = new Masonry(gridElem, {
        itemSelector: ".grid-item",
        percentPosition: true,
      });

      noResult.current = false;
    }

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
        setFilteredSpells={setFilteredSpells}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="status">
        {filteredSpells.length} of {allSpells.length} Spells
      </div>

      {0 === filteredSpells.length && (
        <div className="no-results">
          <p className="lead alert">
            No spells found {!!searchTerm && `(Search term: ${searchTerm})`}
          </p>
        </div>
      )}

      {0 !== filteredSpells.length && (
        <Spells spells={filteredSpells} searchTerm={searchTerm} />
      )}
    </>
  );
}

export default App;
