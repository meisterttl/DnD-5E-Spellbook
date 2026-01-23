import React, { useEffect, useState } from "react";
import { classJSON, sourceJSON, spellJSON } from "./constants";
import Loader from "./components/Loader";
import LightDarkMode from "./components/LightDarkMode";
import Header from "./components/Header";
import Spells from "./components/Spells";
import { loadAllSlots, loadAllSpells, loadSettings } from "./utils/helpers";
import type { DDSpell, DDSpellSlots } from "./types";
import "normalize.css";
import "./App.css";

// Load filters from localStorage
const initialFilters = loadSettings("spellSources");

type Props = {
  allSpells: DDSpell[];
  allSpellSlots: DDSpellSlots[];
  isLoading: boolean;
  children: React.ReactNode;
};

function Main({ allSpells, allSpellSlots, isLoading, children }: Props) {
  // Set parameters for loading initial spells
  const spells = allSpells
    .filter((spell) => initialFilters!.includes(spell.source.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const [filteredSpells, setFilteredSpells] = useState<DDSpell[]>(spells);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {}, [allSpellSlots]);

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
      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        !!allSpells.length && (
          <Spells filteredSpells={filteredSpells} searchTerm={searchTerm}>
            <div className="spell-counter">
              {filteredSpells.length} of {allSpells.length} Spells
            </div>
          </Spells>
        )
      )}
    </>
  );
}

function App() {
  const [allSpells, setAllSpells] = useState<DDSpell[]>([]);
  const [allSpellSlots, setAllSpellSlots] = useState<DDSpellSlots[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // TODO: Potentially rework this so it doesn't load spells all at once
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);

      const spells = await loadAllSpells(spellJSON, sourceJSON);
      setAllSpells(spells);

      const slots = await loadAllSlots(classJSON);
      setAllSpellSlots(slots);

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    fetch();
  }, []);

  return (
    <Main
      allSpells={allSpells}
      allSpellSlots={allSpellSlots}
      isLoading={isLoading}
    >
      <LightDarkMode />
    </Main>
  );
}

export default App;
