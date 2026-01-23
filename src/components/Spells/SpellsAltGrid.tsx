import React, { useEffect, useRef } from "react";
import Spell from "../Spell";
import Collapsible from "../Collapsible";
import Masonry from "masonry-layout";
import type { DDSpell } from "../../types";
import styles from "./spells.module.css";

type GridAltProps = {
  preparedSpells: DDSpell[];
  setPreparedSpells: React.Dispatch<React.SetStateAction<DDSpell[]>>;
  searchTerm: string;
};

export default function SpellsAltGrid({
  preparedSpells,
  setPreparedSpells,
}: GridAltProps) {
  const noResult = useRef<boolean>(true);
  const msnry = useRef<Masonry>(null);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const isVisible = e.currentTarget.ariaExpanded;
    e.currentTarget.ariaExpanded =
      "true" === isVisible ? String(!isVisible) : String(!!isVisible);

    if (0 !== preparedSpells.length) {
      msnry.current!.layout!();
    }
  };

  useEffect(() => {
    if (0 !== preparedSpells.length && noResult.current) {
      const gridElem = document.querySelector(".alt-grid")!;

      msnry.current = new Masonry(gridElem, {
        itemSelector: ".grid-item",
        percentPosition: true,
        gutter: 16,
      });
      msnry.current!.layout!();

      noResult.current = false;
    }

    if (0 !== preparedSpells.length) {
      msnry.current!.reloadItems!();
      msnry.current!.layout!();
    } else {
      if (msnry.current) msnry.current!.destroy!();
      noResult.current = true;
    }
  }, [preparedSpells, msnry]);

  return (
    <Collapsible
      handleClick={handleToggle}
      id="collapsibleSpells"
      label={`Prepared Spells (${preparedSpells.length})`}
    >
      <div className="grid-container">
        {0 !== preparedSpells.length && (
          <dl className="alt-grid">
            {preparedSpells.map((spell) => (
              <Spell
                key={`${spell.source.toLowerCase()}-${spell.index}-prepared`}
                searchTerm={null}
                preparedSpells={preparedSpells}
                isPrepared={true}
                spell={spell}
                msnry={msnry}
              >
                <dd className={styles.spellStatus}>
                  <button
                    role="switch"
                    type="button"
                    onClick={() => {
                      const newSpells = preparedSpells
                        .filter((prepared) => spell !== prepared)
                        .sort(
                          (a, b) =>
                            a.level - b.level || a.name.localeCompare(b.name),
                        );
                      setPreparedSpells(newSpells);
                    }}
                    aria-label={`Remove ${spell.name}`}
                    aria-checked="true"
                  >
                    Remove
                  </button>
                </dd>

                <dd className={styles.spellSlots}></dd>
              </Spell>
            ))}
          </dl>
        )}
      </div>

      {0 === preparedSpells.length && (
        <div className="no-results">
          <p className="lead alert">You do not have any spells prepared!</p>
        </div>
      )}
    </Collapsible>
  );
}
