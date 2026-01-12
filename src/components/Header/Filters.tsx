import React from "react";
import { coreSources, filterSets } from "../../constants";
import { saveSettings } from "../../utils/helpers";
import Fieldset from "./Form/Fieldset";
import Collapsible from "../Collapsible";

type Props = {
  activeSources: string[];
  setActiveSources: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function Filters({ activeSources, setActiveSources }: Props) {
  const handleToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
    saveSettings("spellSources", newActiveSources.join(","));
  };

  return (
    <>
      <Fieldset
        legend="Core"
        sources={coreSources}
        props={{ activeSources, handleFilter }}
      />

      <Collapsible
        handleClick={handleToggle}
        id="collapsibleContent"
        label="More Sources"
      >
        {filterSets.map((set, index) => (
          <Fieldset
            key={`${set.label.toLowerCase()}-${index}`}
            legend={set.label}
            sources={set.data}
            props={{ activeSources, handleFilter }}
          />
        ))}
      </Collapsible>
    </>
  );
}
