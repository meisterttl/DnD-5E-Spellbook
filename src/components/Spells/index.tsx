import Spell from "../Spell";
import type { DDSpell } from "../../types";
import styles from "./spells.module.css";

type Props = {
  spells: DDSpell[];
  searchTerm: string;
};

export default function Spells({ spells, searchTerm }: Props) {
  return (
    <div className={styles.spellContainer}>
      {0 !== spells.length && (
        <dl className="grid">
          {spells.map((spell) => (
            <Spell key={spell.index} spell={spell} searchTerm={searchTerm} />
          ))}
        </dl>
      )}
    </div>
  );
}
