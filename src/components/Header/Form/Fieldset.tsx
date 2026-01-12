import React from "react";
import Checkbox from "./Checkbox";
import styles from "../header.module.css";

type Props = {
  legend: string;
  sources: { id: string; name: string }[];
  props: {
    activeSources: string[];
    handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
};

export default function Fieldset({ legend, sources, props }: Props) {
  return (
    <div className={styles.filterContainer}>
      <fieldset>
        <legend>{legend}</legend>

        {sources.map((source, index) => (
          <Checkbox
            key={`${legend.toLowerCase()}-${index}`}
            label={source.name}
            sourceId={source.id}
            activeSources={props.activeSources}
            handleFilter={props.handleFilter}
          />
        ))}
      </fieldset>
    </div>
  );
}
