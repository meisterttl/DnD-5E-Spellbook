import { sanitizeEntry } from "../../utils/helpers";

export default function SpellTypeBasic({ entry }: { entry: string }) {
  return <p>{sanitizeEntry(entry)}</p>;
}
