import React from "react";
import SpellEntry from "./SpellEntry";
import { allSources } from "../../constants";
import {
  getCastTime,
  getCastTimeXPHB,
  getClasses,
  getComponents,
  getDuration,
  getRange,
  getRangeXPHB,
  getSpellType,
  getSpellTypeXPHB,
} from "../../utils/formatSpells";
import { highlightSearchTerms } from "../../utils/helpers";
import Masonry from "masonry-layout";
import type { RefObject } from "react";
import type { DDSpell } from "../../types";
import styles from "./spell.module.css";

type Props = {
  searchTerm: string | null;
  preparedSpells: DDSpell[];
  isPrepared: boolean;
  spell: DDSpell;
  msnry: RefObject<Masonry | null>;
  children: React.ReactNode;
};

export default function Spell({
  searchTerm,
  isPrepared,
  spell,
  msnry,
  children,
}: Props) {
  const newStyleSources = ["XPHB", "EFA", "FRHoF"];
  const spellName = searchTerm
    ? highlightSearchTerms(spell.name.normalize("NFD"), searchTerm)
    : spell.name;
  const additionalClass = isPrepared ? ` ${styles.spellPrepared}` : "";
  const sourceInfo = allSources.find(
    (source) => spell.source.toLowerCase() === source.id
  );

  return (
    <div
      className={`grid-item ${styles.spell} ${styles.spellCard}${additionalClass}`}
      data-index={spell.index}
      data-source={spell.source}
    >
      {/* TODO: Find a way to not use dangeroruslySetInnerHTML */}
      <dt
        dangerouslySetInnerHTML={{
          __html: `${spellName}${"PHB" === spell.source ? " (Legacy)" : ""}`,
        }}
      ></dt>

      <dd>
        <i>
          {newStyleSources.includes(spell.source)
            ? getSpellTypeXPHB(
                spell.level,
                spell.school,
                spell.classes!,
                spell.source
              )
            : getSpellType(spell.level, spell.school, spell.meta, spell.source)}
        </i>
      </dd>

      <dd className={styles.spellCastingTime}>
        <b>Casting Time: </b>
        {newStyleSources.includes(spell.source)
          ? getCastTimeXPHB(spell.time, spell.meta)
          : getCastTime(spell.time)}
      </dd>

      <dd>
        <b>Range: </b>
        {newStyleSources.includes(spell.source)
          ? getRangeXPHB(spell.range)
          : getRange(spell.range)}
      </dd>

      <dd className={styles.spellComponents}>
        <b>Components: </b>
        {getComponents(spell.components)}
      </dd>

      <dd>
        <b>Duration: </b>
        {getDuration(spell.duration)}
      </dd>

      {"LLK" === spell.source && (
        <dd>
          <b>Classes: </b>
          {getClasses(spell.classes!)}
        </dd>
      )}

      <SpellEntry
        slug={spell.index!}
        entries={spell.entries}
        entriesHigherLevel={spell.entriesHigherLevel}
        isPrepared={null === searchTerm && isPrepared} // Expand Spell Descriptions on Prepared Spells section
        msnry={msnry}
      />

      {children}

      <dd className={styles.spellSource}>
        <i>
          {sourceInfo!.name}, page {spell.page}
        </i>
      </dd>
    </div>
  );
}
