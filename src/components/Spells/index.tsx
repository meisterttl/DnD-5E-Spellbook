import React, { useEffect, useState } from "react";
import SpellsGrid from "./SpellsGrid";
import SpellsAltGrid from "./SpellsAltGrid";
import { loadSettings, saveSettings } from "../../utils/helpers";
import type { DDSpell } from "../../types";
import styles from "./spells.module.css";

const savedSpells = loadSettings("preparedSpells");

type Props = {
  filteredSpells: DDSpell[];
  searchTerm: string;
  children: React.ReactNode;
};

export default function Spells({
  filteredSpells,
  searchTerm,
  children,
}: Props) {
  const [preparedSpells, setPreparedSpells] = useState<DDSpell[]>(savedSpells);

  useEffect(() => {
    saveSettings("preparedSpells", JSON.stringify(preparedSpells));
  }, [preparedSpells]);

  return (
    <div className={styles.spellContainer}>
      {/* Details tag and React (or any other framework) doesn't play well */}
      {/* To implement Toggle All button, it may be better to switch to somwthing other than Details tag, will decide later */}
      {/* <div className={styles.descriptionToggle}>
        <button
          role="switch"
          aria-checked={descriptionToggled}
          onClick={() => setDescriptionToggled(!descriptionToggled)}
        >
          Toggle All Descriptions
        </button>
      </div> */}

      <SpellsAltGrid
        preparedSpells={preparedSpells}
        setPreparedSpells={setPreparedSpells}
        searchTerm={searchTerm}
      />

      {children}

      <SpellsGrid
        filteredSpells={filteredSpells}
        preparedSpells={preparedSpells}
        setPreparedSpells={setPreparedSpells}
        searchTerm={searchTerm}
      />
    </div>
  );
}
