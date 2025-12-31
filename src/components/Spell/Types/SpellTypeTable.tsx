import type {
  DDSpellTypeEntriesTable,
  DDSpellTypeEntriesCell,
} from "../../../types";
import { getSpellTableCell } from "../../../utils/formatSpells";
import { generateSlug, sanitizeEntry } from "../../../utils/helpers";
import styles from "../spell.module.css";

type Props = {
  styles: string[];
  rows: (DDSpellTypeEntriesCell | string)[][];
};

function TableBody({ styles, rows }: Props) {
  return (
    <tbody>
      {rows.map((row, index) => (
        <tr key={`row-${index}`}>
          {row.map((cell, index) =>
            "string" === typeof cell ? (
              <td
                key={`string-cell-${index}`}
                className={styles[index]}
                dangerouslySetInnerHTML={{
                  __html: sanitizeEntry(cell)!,
                }}
              ></td>
            ) : (
              <td
                key={`object-cell-${index}`}
                className={styles[index]}
                dangerouslySetInnerHTML={{
                  __html: sanitizeEntry(
                    getSpellTableCell(cell as DDSpellTypeEntriesCell)!
                  )!,
                }}
              ></td>
            )
          )}
        </tr>
      ))}
    </tbody>
  );
}

export default function SpellTypeTable({
  entry,
}: {
  entry: DDSpellTypeEntriesTable;
}) {
  return (
    <div className={styles.spellEntriesTable}>
      <table>
        <caption>{entry.caption}</caption>

        <thead>
          <tr>
            {entry.colLabels.map((header, index) => (
              <th
                key={`${generateSlug(sanitizeEntry(header)!)}`}
                className={entry.colStyles[index]}
              >
                {sanitizeEntry(header)}
              </th>
            ))}
          </tr>
        </thead>

        <TableBody
          styles={entry.colStyles}
          rows={entry.rows as (DDSpellTypeEntriesCell | string)[][]}
        />
      </table>
    </div>
  );
}
