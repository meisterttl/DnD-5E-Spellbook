import SpellEntry from "./SpellEntry";
import {
  getCastTime,
  getComponents,
  getDuration,
  getRange,
  getSpellType,
} from "../../utils/formatSpells";
import { highlightSearchTerms } from "../../utils/helpers";
import type { DDSpell } from "../../types";
import styles from "./spell.module.css";

type Props = {
  spell: DDSpell;
  searchTerm: string;
};

export default function Spell({ spell, searchTerm }: Props) {
  return (
    <div className={`grid-item ${styles.spell}`} data-index={spell.index}>
      <div className={styles.spellCard}>
        <dt
          dangerouslySetInnerHTML={{
            __html: highlightSearchTerms(spell.name, searchTerm),
          }}
        ></dt>

        <dd>
          <i>{getSpellType(spell.level, spell.school, spell.meta)}</i>
        </dd>

        <dd>
          <b>Casting Time:</b> {getCastTime(spell.time)}
        </dd>

        <dd>
          <b>Range:</b> {getRange(spell.range)}
        </dd>

        <dd>
          <b>Components:</b> {getComponents(spell.components)}
        </dd>

        <dd>
          <b>Duration:</b> {getDuration(spell.duration)}
        </dd>

        <SpellEntry
          slug={spell.index!}
          entries={spell.entries}
          entriesHigherLevel={spell.entriesHigherLevel}
        />
      </div>
    </div>
  );
}
