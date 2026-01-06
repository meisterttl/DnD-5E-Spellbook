import React, { useState } from "react";
import styles from "../header.module.css";

type Props = {
  id: string;
  label: string;
  min: number;
  max: number;
  activeLevel: number;
  setActiveLevel: React.Dispatch<React.SetStateAction<number>>;
};

export default function Steps({
  id,
  label,
  min,
  max,
  activeLevel,
  setActiveLevel,
}: Props) {
  const [status, setStatus] = useState<string>("");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const classList = e.currentTarget.classList;

    if (classList.contains("plus")) {
      if (max !== activeLevel) {
        setActiveLevel((n) => n + 1);
        setStatus(`Increasing ${label} by 1`);
      }
    } else {
      if (0 !== activeLevel) {
        setActiveLevel((n) => n - 1);

        setStatus(`Decreasing ${label} by 1`);
      }
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setActiveLevel(Number(e.currentTarget.value));

  return (
    <div className={styles.filterSelectContainer}>
      <label htmlFor="stepper">Filter by {label}</label>

      <div className={styles.stepper}>
        <button
          className="button minus"
          disabled={0 === activeLevel}
          aria-label={`Decrease ${label}`}
          aria-disabled={0 === activeLevel}
          onClick={handleClick}
        >
          -
        </button>

        <select
          id={`${id}-stepper`}
          name={`${id}-stepper-input`}
          min={`${String(min)}`}
          max={`${String(max)}`}
          data-selected={String(activeLevel)}
          value={String(activeLevel)}
          onChange={handleSelect}
        >
          <option value="-1">---</option>

          {Array.from({ length: max + 1 }, (_, i) => (
            <option key={`level${i}`} value={String(i)}>
              {0 === i ? "Cantrip" : i}
            </option>
          ))}
        </select>

        <button
          className="button plus"
          disabled={max === activeLevel}
          aria-label={`Increase ${label}`}
          aria-disabled={max === activeLevel}
          onClick={handleClick}
        >
          +
        </button>
      </div>

      <div
        aria-live="polite"
        className="hidden"
        id={`${id}-stepper-status-target`}
      >
        {status}
      </div>
    </div>
  );
}
