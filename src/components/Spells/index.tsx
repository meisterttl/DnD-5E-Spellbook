import { useState } from "react";
import Spell from "../Spell";
import Masonry from "masonry-layout";
import type { RefObject } from "react";
import type { DDSpell } from "../../types";
import styles from "./spells.module.css";

type Props = {
  spells: DDSpell[];
  searchTerm: string;
  msnry: RefObject<Masonry | null>;
};

export default function Spells({ spells, searchTerm, msnry }: Props) {
  const [descriptionToggled, setDescriptionToggled] = useState<boolean>(false);

  const handleClick = () => setDescriptionToggled(!descriptionToggled);

  return (
    <div className={styles.spellContainer}>
      <div className={styles.descriptionToggle}>
        <button
          role="switch"
          aria-checked={descriptionToggled}
          onClick={handleClick}
        >
          Toggle All Descriptions
        </button>
      </div>

      {0 !== spells.length && (
        <dl className="grid">
          {spells.map((spell) => (
            <Spell
              key={`${spell.index}-${spell.source.toLowerCase()}`}
              spell={spell}
              searchTerm={searchTerm}
              msnry={msnry}
              descriptionToggled={descriptionToggled}
            />
          ))}
        </dl>
      )}
    </div>
  );
}
