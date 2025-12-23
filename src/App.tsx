import { useEffect, useRef, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { fetchSpells } from "./dal";
import * as spells from "./data";
import Header from "./components/Header";
import Spells from "./components/Spells";
import Masonry from "masonry-layout";
import "normalize.css";
import "./App.css";

function App() {
  const allSpells = [...spells.fromPHB];
  const [filteredSpells, setFilteredSpells] = useState(allSpells);
  const [searchTerm, setSearchTerm] = useState("");
  const msnry = useRef<Masonry>(null);

  // const { data: spells = [], isLoading } = useQuery({
  //   queryKey: ["spells"],
  //   queryFn: async () => {
  //     const data = await fetchSpells();

  //     return data.results;
  //   },
  // });

  useEffect(() => {
    const gridElem = document.querySelector(".grid")!;

    msnry.current = new Masonry(gridElem, {
      itemSelector: ".grid-item",
      percentPosition: true,
    });
  }, []);

  useEffect(() => {
    msnry.current!.reloadItems!();
    msnry.current!.layout!();
  }, [filteredSpells]);

  return (
    <>
      <Header
        allSpells={allSpells}
        setFilteredSpells={setFilteredSpells}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {0 !== allSpells.length && (
        <Spells spells={filteredSpells} searchTerm={searchTerm} />
      )}
    </>
  );
}

export default App;
