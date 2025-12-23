import SpellTypeList from "./SpellTypeList";
import { sanitizeEntry } from "../../utils/helpers";
import type { DDSpellTypeEntries } from "../../types";

type Props = {
  entry: DDSpellTypeEntries;
  entryKey: string;
};

export default function SpellTypeEntries({ entry, entryKey }: Props) {
  return entry.entries.map((subEntry, index) => {
    return "string" !== typeof subEntry &&
      subEntry.type &&
      "list" === subEntry.type ? (
      <SpellTypeList key={`${entryKey}-list-${index}`} entry={subEntry} />
    ) : (
      <p key={`${entryKey}-string-${index}`}>
        {0 === index && <b>{entry.name}. </b>}
        {sanitizeEntry(subEntry as string)}
      </p>
    );
  });
}
