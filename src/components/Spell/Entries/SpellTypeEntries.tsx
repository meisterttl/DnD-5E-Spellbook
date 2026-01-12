import SpellTypeList from "./SpellTypeList";
import { sanitizeEntry } from "../../../utils/helpers";
import type { DDSpellTypeEntries, DDSpellTypeList } from "../../../types";

type Props = {
  entry: DDSpellTypeEntries;
  entryKey: string;
};

export default function SpellTypeEntries({ entry, entryKey }: Props) {
  const entryOutput = (entry: string, name: string, i: number) => {
    const output = 0 === i ? `<b>${name}. </b>` : ``;

    return `${output}${sanitizeEntry(entry)}`;
  };

  return entry.entries.map((subEntry, index) =>
    "string" !== typeof subEntry &&
    subEntry.type &&
    "list" === subEntry.type ? (
      <SpellTypeList
        key={`${entryKey}-list-${index}`}
        entry={subEntry as DDSpellTypeList}
      />
    ) : (
      <p
        key={`${entryKey}-string-${index}`}
        dangerouslySetInnerHTML={{
          __html: entryOutput(subEntry as string, entry.name, index),
        }}
      ></p>
    )
  );
}
