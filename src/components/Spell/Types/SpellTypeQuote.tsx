import { sanitizeEntry } from "../../../utils/helpers";
import type { DDSpellTypeQuote } from "../../../types";
import styles from "../spell.module.css";

type Props = {
  entry: DDSpellTypeQuote;
  entryKey: string;
};

export default function SpellTypeQuote({ entry, entryKey }: Props) {
  return (
    <div className={styles.blockQuoteContainer}>
      <blockquote>
        {entry.entries.map((quote, index) => (
          <p key={`${entryKey}-bqc-${index}`}>{sanitizeEntry(quote)}</p>
        ))}
      </blockquote>
      <p>— {entry.by}</p>
    </div>
  );
}
