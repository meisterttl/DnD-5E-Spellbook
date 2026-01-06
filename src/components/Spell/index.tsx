import SpellEntry from "./SpellEntry";
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
  descriptionToggled: boolean;
  spell: DDSpell;
  searchTerm: string;
  msnry: RefObject<Masonry | null>;
};

export default function Spell({
  descriptionToggled,
  spell,
  searchTerm,
  msnry,
}: Props) {
  const newStyleSources = ["XPHB", "EFA", "FRHoF"];
  const spellName = `${highlightSearchTerms(
    spell.name.normalize("NFD"),
    searchTerm
  )}${"PHB" === spell.source ? ` (Legacy)` : ""}`;

  return (
    <div
      className={`grid-item ${styles.spell}`}
      data-index={spell.index}
      data-source={spell.source}
    >
      <div className={styles.spellCard}>
        {/* TODO: Find a way to not use dangeroruslySetInnerHTML */}
        <dt
          dangerouslySetInnerHTML={{
            __html: spellName,
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
              : getSpellType(
                  spell.level,
                  spell.school,
                  spell.meta,
                  spell.source
                )}
          </i>
        </dd>

        <dd className={styles.spellCastingTime}>
          <b>Casting Time:</b>{" "}
          {newStyleSources.includes(spell.source)
            ? getCastTimeXPHB(spell.time, spell.meta)
            : getCastTime(spell.time)}
        </dd>

        <dd>
          <b>Range:</b>{" "}
          {newStyleSources.includes(spell.source)
            ? getRangeXPHB(spell.range)
            : getRange(spell.range)}
        </dd>

        <dd className={styles.spellComponents}>
          <b>Components:</b> {getComponents(spell.components)}
        </dd>

        <dd>
          <b>Duration:</b> {getDuration(spell.duration)}
        </dd>

        {"LLK" === spell.source && (
          <dd>
            <b>Classes: </b> {getClasses(spell.classes!)}
          </dd>
        )}

        <SpellEntry
          slug={spell.index!}
          entries={spell.entries}
          entriesHigherLevel={spell.entriesHigherLevel}
          msnry={msnry}
          descriptionToggled={descriptionToggled}
        />
      </div>
    </div>
  );
}
