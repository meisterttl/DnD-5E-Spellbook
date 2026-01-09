import { useEffect, useRef, useState } from "react";
import Spell from "../Spell";
import Masonry from "masonry-layout";
import type { DDSpell } from "../../types";
import styles from "./spells.module.css";

type Props = {
  filteredSpells: DDSpell[];
  searchTerm: string;
};

export default function Spells({ filteredSpells, searchTerm }: Props) {
  // const [descriptionToggled, setDescriptionToggled] = useState<boolean>(false);
  const [preparedSpells, setPreparedSpells] = useState<DDSpell[]>([]);
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
  }, [filteredSpells, msnry]);

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

      {0 !== filteredSpells.length && (
        <dl className="grid">
          {filteredSpells.map((spell) => (
            <Spell
              key={`${spell.index}-${spell.source.toLowerCase()}`}
              spell={spell}
              searchTerm={searchTerm}
              msnry={msnry}
            />
          ))}
        </dl>
      )}
    </div>
  );
}
