import React, { useEffect, useRef, useState } from "react";
import Spell from "../Spell";
import Collapsible from "../Collapsible";
import Masonry from "masonry-layout";
import type { DDSpell } from "../../types";
import styles from "./spells.module.css";

type Props = {
  filteredSpells: DDSpell[];
  searchTerm: string;
  children: React.ReactNode;
};

type GridProps = {
  filteredSpells: DDSpell[];
  preparedSpells: DDSpell[];
  setPreparedSpells: React.Dispatch<React.SetStateAction<DDSpell[]>>;
  searchTerm: string;
};

type GridAltProps = {
  preparedSpells: DDSpell[];
  setPreparedSpells: React.Dispatch<React.SetStateAction<DDSpell[]>>;
  searchTerm: string;
};

function GridAllSpells({
  filteredSpells,
  preparedSpells,
  setPreparedSpells,
  searchTerm,
}: GridProps) {
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
            0 !== preparedSpells.length && preparedSpells.includes(spell);

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
                    : preparedSpells.filter((prepared) => spell !== prepared);

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

function GridPreparedSpells({
  preparedSpells,
  setPreparedSpells,
  searchTerm,
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
      });
      msnry.current!.layout!();

      noResult.current = false;
    }

    if (0 !== preparedSpells.length) {
      msnry.current!.reloadItems!();
      msnry.current!.layout!();
    }

    if (0 === preparedSpells.length) {
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
      <dl className="alt-grid">
        {0 !== preparedSpells.length &&
          preparedSpells.map((spell) => {
            const isPrepared =
              0 !== preparedSpells.length && preparedSpells.includes(spell);

            return (
              <Spell
                key={`${spell.source.toLowerCase()}-${spell.index}-prepared`}
                searchTerm={searchTerm}
                preparedSpells={preparedSpells}
                isPrepared={isPrepared}
                spell={spell}
                msnry={msnry}
              >
                <button
                  onClick={() => {
                    const newSpells = preparedSpells.filter(
                      (prepared) => spell !== prepared
                    );
                    setPreparedSpells(newSpells);
                  }}
                  aria-label={`Remove ${spell.name}`}
                  aria-checked={isPrepared}
                >
                  Remove
                </button>
              </Spell>
            );
          })}
      </dl>
    </Collapsible>
  );
}

export default function Spells({
  filteredSpells,
  searchTerm,
  children,
}: Props) {
  const [preparedSpells, setPreparedSpells] = useState<DDSpell[]>([]);

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

      <GridPreparedSpells
        preparedSpells={preparedSpells}
        setPreparedSpells={setPreparedSpells}
        searchTerm={searchTerm}
      />

      {children}

      <GridAllSpells
        filteredSpells={filteredSpells}
        preparedSpells={preparedSpells}
        setPreparedSpells={setPreparedSpells}
        searchTerm={searchTerm}
      />
    </div>
  );
}
