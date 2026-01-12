import { sanitizeEntry } from "../../../utils/helpers";

export default function SpellTypeBasic({ entry }: { entry: string }) {
  return (
    <p
      dangerouslySetInnerHTML={{
        __html: sanitizeEntry(entry)!,
      }}
    ></p>
  );
}
