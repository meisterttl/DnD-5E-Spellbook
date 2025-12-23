import SpellTypeBasic from "./SpellTypeBasic";
import SpellTypeEntries from "./SpellTypeEntries";
import SpellTypeList from "./SpellTypeList";
import SpellTypeTable from "./SpellTypeTable";
import { sanitizeEntry } from "../../utils/helpers";
import type {
  DDSpellEntries,
  DDSpellTypeEntries,
  DDSpellTypeList,
  DDSpellTypeEntriesTable,
} from "../../types";
import styles from "./spell.module.css";

type Props = {
  slug: string;
  entries: DDSpellEntries[];
  entriesHigherLevel: DDSpellTypeEntries[] | undefined;
};

export default function SpellEntry({
  slug,
  entries,
  entriesHigherLevel,
}: Props) {
  return (
    <div className={styles.spellEntries}>
      <dd>
        {entries &&
          entries.map((entry, index) => {
            if ("string" === typeof entry)
              return (
                <SpellTypeBasic
                  key={`${slug}-${String(index)}`}
                  entry={entry}
                />
              );

            if (entry.type && "entries" === entry.type)
              return (
                <SpellTypeEntries
                  key={`${slug}-${String(index)}`}
                  entry={entry as DDSpellTypeEntries}
                  entryKey={`${slug}-${String(index)}`}
                />
              );

            if (entry.type && "list" === entry.type)
              return (
                <SpellTypeList
                  key={`${slug}-${String(index)}`}
                  entry={entry as DDSpellTypeList}
                />
              );

            if (entry.type && "table" === entry.type)
              return (
                <SpellTypeTable
                  key={`${slug}-${String(index)}`}
                  entry={entry as DDSpellTypeEntriesTable}
                />
              );
          })}
      </dd>

      {entriesHigherLevel && (
        <dd>
          <p>
            <b>{entriesHigherLevel[0].name}. </b>
            {sanitizeEntry(entriesHigherLevel[0].entries[0] as string)}
          </p>
        </dd>
      )}
    </div>
  );
}
