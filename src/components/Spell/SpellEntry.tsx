import SpellTypeBasic from "./Entries/SpellTypeBasic";
import SpellTypeEntries from "./Entries/SpellTypeEntries";
import SpellTypeList from "./Entries/SpellTypeList";
import SpellTypeTable from "./Entries/SpellTypeTable";
import SpellTypeQuote from "./Entries/SpellTypeQuote";
import { sanitizeEntry } from "../../utils/helpers";
import Masonry from "masonry-layout";
import type { RefObject } from "react";
import type {
  DDSpellEntries,
  DDSpellTypeList,
  DDSpellTypeEntries,
  DDSpellTypeEntriesTable,
  DDSpellTypeQuote,
} from "../../types";
import styles from "./spell.module.css";

type Props = {
  slug: string;
  entries: DDSpellEntries[];
  entriesHigherLevel: DDSpellTypeEntries[] | undefined;
  isPrepared: boolean;
  msnry: RefObject<Masonry | null>;
};

export default function SpellEntry({
  slug,
  entries,
  entriesHigherLevel,
  isPrepared,
  msnry,
}: Props) {
  const handleToggle = () => {
    if (msnry.current) msnry.current.layout!();
  };

  return (
    <dd>
      <div className={styles.spellEntries}>
        <details onToggle={handleToggle} open={isPrepared}>
          <summary>Spell Description</summary>

          {entries &&
            entries.map((entry, index) => {
              if ("string" === typeof entry)
                return (
                  <SpellTypeBasic
                    key={`${slug}-string-${String(index)}`}
                    entry={entry}
                  />
                );

              if (entry.type && "entries" === entry.type)
                return (
                  <SpellTypeEntries
                    key={`${slug}-entries-${String(index)}`}
                    entry={entry as DDSpellTypeEntries}
                    entryKey={`${slug}-entries-${String(index)}`}
                  />
                );

              if (entry.type && "list" === entry.type)
                return (
                  <SpellTypeList
                    key={`${slug}-list-${String(index)}`}
                    entry={entry as DDSpellTypeList}
                  />
                );

              if (entry.type && "quote" === entry.type)
                return (
                  <SpellTypeQuote
                    key={`${slug}-quote-${String(index)}`}
                    entry={entry as DDSpellTypeQuote}
                    entryKey={`${slug}-quote-${String(index)}`}
                  />
                );

              if (entry.type && "table" === entry.type)
                return (
                  <SpellTypeTable
                    key={`${slug}-table-${String(index)}`}
                    entry={entry as DDSpellTypeEntriesTable}
                  />
                );
            })}

          {entriesHigherLevel &&
            entriesHigherLevel.map((entry) =>
              entry.entries.map((subEntry, subIndex) => {
                if ("string" === typeof subEntry)
                  return (
                    <p key={`${slug}-high-level-string-${String(subIndex)}`}>
                      {0 === subIndex && <b>{entry.name}. </b>}
                      {sanitizeEntry(subEntry as string)}
                    </p>
                  );

                if (subEntry.type && "table" === subEntry.type)
                  return (
                    <SpellTypeTable
                      key={`${slug}-high-level-table-${String(subIndex)}`}
                      entry={subEntry as DDSpellTypeEntriesTable}
                    />
                  );
              })
            )}
        </details>
      </div>
    </dd>
  );
}
