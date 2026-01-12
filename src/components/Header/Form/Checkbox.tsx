import React from "react";
import styles from "../header.module.css";

type Props = {
  label: string;
  sourceId: string;
  activeSources: string[];
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Checkbox({
  label,
  sourceId,
  activeSources,
  handleFilter,
}: Props) {
  return (
    <div className={styles.checkboxContainer}>
      <input
        id={sourceId}
        type="checkbox"
        checked={activeSources.includes(sourceId)}
        onChange={handleFilter}
      />
      <label htmlFor={sourceId}>{label}</label>
    </div>
  );
}
