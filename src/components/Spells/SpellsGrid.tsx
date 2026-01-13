import React, { useEffect, useRef } from "react";
import Spell from "../Spell";
import Masonry from "masonry-layout";
import type { DDSpell } from "../../types";

type Props = {
  filteredSpells: DDSpell[];
  preparedSpells: DDSpell[];
  setPreparedSpells: React.Dispatch<React.SetStateAction<DDSpell[]>>;
  searchTerm: string;
};

export default function SpellsGrid({
  filteredSpells,
  preparedSpells,
  setPreparedSpells,
  searchTerm,
}: Props) {
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
    <dl className="grid">
      {0 !== filteredSpells.length &&
        filteredSpells.map((spell) => {
          const isPrepared =
            0 !== preparedSpells.length &&
            !!preparedSpells.find(
              (prepared) =>
                spell.name === prepared.name && spell.source === prepared.source
            );

          return (
            <Spell
              key={`${spell.source.toLowerCase()}-${spell.index}`}
              searchTerm={searchTerm}
              preparedSpells={preparedSpells}
              isPrepared={isPrepared}
              spell={spell}
              msnry={msnry}
            >
              <button
                onClick={() => {
                  const newSpells = !isPrepared
                    ? [...preparedSpells, spell]
                    : preparedSpells.filter(
                        (prepared) =>
                          spell.name !== prepared.name &&
                          spell.source !== prepared.source
                      );
                  newSpells.sort(
                    (a, b) => a.level - b.level || a.name.localeCompare(b.name)
                  );

                  setPreparedSpells(newSpells);
                }}
                aria-label={`${!isPrepared ? "Prepare" : "Remove"} ${
                  spell.name
                }`}
                aria-checked={isPrepared}
              >
                {!isPrepared ? "Prepare" : "Remove"}
              </button>
            </Spell>
          );
        })}
    </dl>
  );
}
