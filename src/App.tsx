import { useEffect, useRef, useState } from "react";
import allSpells from "./data";
import Header from "./components/Header";
import Spells from "./components/Spells";
import Masonry from "masonry-layout";
import "normalize.css";
import "./App.css";

function App() {
  const [filteredSpells, setFilteredSpells] = useState(allSpells);
  const [searchTerm, setSearchTerm] = useState("");
  const msnry = useRef<Masonry>(null);
  const noResult = useRef(true);

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
        setFilteredSpells={setFilteredSpells}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {0 === filteredSpells.length && (
        <div className="no-results">
          <p className="lead alert">No match: {searchTerm}</p>
        </div>
      )}
      {0 !== filteredSpells.length && (
        <Spells spells={filteredSpells} searchTerm={searchTerm} />
      )}
    </>
  );
}

export default App;
