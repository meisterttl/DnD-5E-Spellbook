import React from "react";
import styles from "./collapsible.module.css";

type Props = {
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  id: string;
  label: string;
  children: React.ReactNode;
};

export default function Collapsible({
  handleClick,
  id,
  label,
  children,
}: Props) {
  return (
    <div className={styles.collapsible}>
      <button
        className={styles.collapsibleToggle}
        aria-expanded="false"
        aria-controls={id}
        onClick={handleClick}
      >
        <span>{label}</span>
        <svg role="img" width="30" height="30" alt="Toggle Content">
          <use href="#chevron" xlinkHref="#chevron"></use>
        </svg>
      </button>

      <div className={styles.collapsibleContent} id={id}>
        {children}
      </div>
    </div>
  );
}
