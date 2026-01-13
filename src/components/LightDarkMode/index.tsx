import React, { useEffect } from "react";
import { loadSettings, saveSettings } from "../../utils/helpers";
import styles from "./mode.module.css";

const docElement = document.documentElement;

export default function LightDarkMode() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      saveSettings("darkMode", "enabled");
    } else {
      saveSettings("darkMode", "disabled");
    }

    docElement.classList.toggle("dark");
    docElement.classList.toggle("light");
  };

  useEffect(() => {
    const modeToggle = document.querySelector("#toggle") as HTMLInputElement;
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = isDarkMode
      ? !!isDarkMode
      : loadSettings("darkMode") === "enabled";

    if (dark) {
      docElement.classList.add("dark");
      modeToggle.checked = true;
      saveSettings("darkMode", "enabled");
    } else {
      docElement.classList.add("light");
      modeToggle.checked = false;
      saveSettings("darkMode", "disabled");
    }
  }, []);

  return (
    <label className={styles.Toggle} htmlFor="toggle">
      <input
        type="checkbox"
        name="toggle"
        id="toggle"
        className={styles.ToggleInput}
        onChange={handleChange}
      />
      <span className={styles.ToggleDisplay} hidden>
        <svg
          aria-hidden="true"
          focusable="false"
          className={`${styles.ToggleIcon} ${styles.ToggleIconCheckmark}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 3V0h2v3H7ZM9 13v3H7v-3h2ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM0 9h3V7H0v2ZM16 7h-3v2h3V7ZM3.757 5.172 1.636 3.05 3.05 1.636l2.122 2.121-1.415 1.415ZM12.243 10.828l2.121 2.122-1.414 1.414-2.122-2.121 1.415-1.415ZM3.05 14.364l2.122-2.121-1.415-1.415-2.121 2.122 1.414 1.414ZM12.95 1.636l-2.122 2.121 1.415 1.415 2.121-2.122-1.414-1.414Z"
            fill="currentcolor"
          />
        </svg>
        <svg
          aria-hidden="true"
          focusable="false"
          className={`${styles.ToggleIcon} ${styles.ToggleIconCross}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 8A8.002 8.002 0 0 1 4.707.707l.947.947a6.5 6.5 0 0 0 8.691 8.691l.948.948A8.002 8.002 0 0 1 0 8ZM11.5 7 9 4.5 11.5 2 14 4.5 11.5 7Z"
            fill="currentcolor"
          />
        </svg>
      </span>
      <span className="hidden">Dark Mode</span>
    </label>
  );
}
