import type { DDSpellTypeList } from "../../types";
import { sanitizeEntry } from "../../utils/helpers";

export default function SpellTypeList({ entry }: { entry: DDSpellTypeList }) {
  return (
    <ul>
      {entry.items.map((item, index) => (
        <li key={`list-${index}`}>{sanitizeEntry(item)}</li>
      ))}
    </ul>
  );
}
