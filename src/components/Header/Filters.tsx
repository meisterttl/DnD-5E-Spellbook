import { coreSources, filterSets } from "../../constants";
import { saveFilters } from "../../utils/helpers";
import Fieldset from "./Form/Fieldset";
import styles from "./header.module.css";

type Props = {
  activeSources: string[];
  setActiveSources: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function Filters({ activeSources, setActiveSources }: Props) {
  const handleCollapse = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const isVisible = e.currentTarget.ariaExpanded;
    e.currentTarget.ariaExpanded =
      "true" === isVisible ? String(!isVisible) : String(!!isVisible);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sourceId = e.currentTarget.id;
    const newActiveSources = activeSources.includes(sourceId)
      ? activeSources.filter((source) => sourceId !== source)
      : [...activeSources, sourceId];
    setActiveSources(newActiveSources);
    saveFilters("spellSources", newActiveSources.join(","));
  };

  return (
    <>
      <Fieldset
        legend="Core"
        sources={coreSources}
        props={{ activeSources, handleFilter }}
      />

      <div className={styles.filterCollapsible}>
        <button
          className={styles.filterCollapsibleToggle}
          aria-expanded="false"
          aria-controls="collapsibleContent"
          onClick={handleCollapse}
        >
          <span>More Sources</span>
          <svg role="img" width="30" height="30" alt="Toggle Content">
            <use href="#chevron" xlinkHref="#chevron"></use>
          </svg>
        </button>

        <div
          className={styles.filterCollapsibleContent}
          id="collapsibleContent"
        >
          {filterSets.map((set, index) => (
            <Fieldset
              key={`${set.label.toLowerCase()}-${index}`}
              legend={set.label}
              sources={set.data}
              props={{ activeSources, handleFilter }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
