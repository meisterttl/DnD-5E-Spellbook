import type { DDSpellTypeItem, DDSpellTypeList } from "../../../types";
import { sanitizeEntry } from "../../../utils/helpers";
import styles from "../spell.module.css";

function SubEntryItem({ entry }: { entry: DDSpellTypeList }) {
  const entryOutput = (entries: string[], name: string) =>
    `<b>${name}. </b> ${entries.map((string: string) =>
      sanitizeEntry(string)
    )}`;

  return (
    <div className={styles.spellEntriesItem}>
      {(entry.items as DDSpellTypeItem[]).map((item, index) => (
        <p
          key={`item-${index}`}
          dangerouslySetInnerHTML={{
            __html: entryOutput(item.entries, item.name),
          }}
        ></p>
      ))}
    </div>
  );
}

function SubEntryList({ entry }: { entry: DDSpellTypeList }) {
  return (
    <ul>
      {(entry.items as string[]).map((item, index) => (
        <li
          key={`list-${index}`}
          dangerouslySetInnerHTML={{
            __html: sanitizeEntry(item)!,
          }}
        ></li>
      ))}
    </ul>
  );
}

export default function SpellTypeList({ entry }: { entry: DDSpellTypeList }) {
  return entry.style && "list-hang-notitle" === entry.style ? (
    <SubEntryItem entry={entry} />
  ) : (
    <SubEntryList entry={entry} />
  );
}
