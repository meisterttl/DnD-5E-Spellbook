import React from "react";
import styles from "../header.module.css";

type Props = {
  selectOptions: string[];
  id: string;
  label: string;
  activeClass: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
};

export default function Select({
  selectOptions,
  id,
  label,
  activeClass,
  setter,
}: Props) {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setter(e.currentTarget.value);

  return (
    <div className={styles.filterSelectContainer}>
      <label htmlFor={id}>Filter by {label}</label>

      <select id={id} value={activeClass} onChange={handleSelect}>
        <option value="">---</option>

        {selectOptions.map((option) => (
          <option key={option.toLowerCase()} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
