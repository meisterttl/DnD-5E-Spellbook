import React, { useCallback, useEffect, useState } from "react";
import Fieldset from "./Form/Fieldset";
import Select from "./Form/Select";
import Steps from "./Form/Steps";
import Collapsible from "../Collapsible";
import {
  coreSources,
  filterSets,
  spellClasses,
  spellSchools,
} from "../../constants";
import { generateSlug, saveSettings, stringMatch } from "../../utils/helpers";
import type { DDSpell } from "../../types";
import styles from "./header.module.css";

type Props = {
  allSpells: DDSpell[];
  initialFilters: string[];
  filteredSpells: DDSpell[];
  setFilteredSpells: React.Dispatch<React.SetStateAction<DDSpell[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

type sortKey = "name" | "school";

export default function Filters({
  allSpells,
  initialFilters,
  setFilteredSpells,
  searchTerm,
  setSearchTerm,
}: Props) {
  const [activeSources, setActiveSources] = useState<string[]>(initialFilters!);
  const [activeClass, setActiveClass] = useState<string>("");
  const [activeSchool, setActiveSchool] = useState<string>("");
  const [activeLevel, setActiveLevel] = useState<number>(-1);
  const [sortBy, setSortBy] = useState<string>("name");

  const filterSpells = useCallback(
    (name: string) => {
      const slug = generateSlug(name);
      const needle = slug.endsWith("-") ? slug.slice(0, -1) : slug;
      const results = allSpells
        .filter((spell) => activeSources.includes(spell.source.toLowerCase()))
        .filter((spell) =>
          "" !== activeClass
            ? spell.classes!.find(
                (type) => activeClass === type.name.toLowerCase()
              )
            : true
        )
        .filter((spell) =>
          "" !== activeSchool
            ? activeSchool === spell.school.toLowerCase()
            : true
        )
        .filter((spell) =>
          -1 !== activeLevel ? activeLevel === spell.level : true
        )
        .filter((spell) => stringMatch(spell.index!, needle))
        .sort((a, b) =>
          "level" === sortBy
            ? a.level - b.level
            : a[sortBy as sortKey].localeCompare(b[sortBy as sortKey])
        );

      return results;
    },
    [activeClass, activeLevel, activeSchool, activeSources, allSpells, sortBy]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const spellName = e.currentTarget.value;
    setSearchTerm(spellName);

    const results = filterSpells(spellName);
    setFilteredSpells(results);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearchTerm("");
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSortBy(e.currentTarget.value);

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

  useEffect(() => {
    const results = filterSpells(searchTerm);
    setFilteredSpells(results);
  }, [filterSpells, searchTerm, setFilteredSpells]);

  return (
    <>
      <div className={styles.spellSearch}>
        <form className={styles.spellSearchForm} onSubmit={handleSubmit}>
          <Fieldset
            legend="Core"
            sources={coreSources}
            props={{ activeSources, handleFilter }}
          />

          <Collapsible
            handleClick={handleToggle}
            id="collapsibleSources"
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

          <Collapsible
            handleClick={handleToggle}
            id="collapsibleFilters"
            label="Filters"
          >
            <Select
              selectOptions={spellClasses}
              id="classes"
              label="Class"
              activeClass={activeClass}
              setter={setActiveClass}
            />

            <Select
              selectOptions={spellSchools}
              id="schools"
              label="School"
              activeClass={activeSchool}
              setter={setActiveSchool}
            />

            <Steps
              id="level"
              label="Spell Level"
              max={9}
              activeLevel={activeLevel}
              setActiveLevel={setActiveLevel}
            />

            <div className={styles.searchContainer}>
              <label htmlFor="spell">Search spells by name</label>

              <input
                id="spell"
                name="spell"
                type="text"
                value={searchTerm}
                onChange={handleSearch}
              />

              <button type="submit">Search</button>
            </div>
          </Collapsible>
        </form>
      </div>

      <div className={styles.status}>
        <div className={styles.sortContainer}>
          <label htmlFor="sort">Sort by</label>

          <select id="sort" value={sortBy} onChange={handleSort}>
            <option value="name">Name</option>
            <option value="school">School</option>
            <option value="level">Level</option>
          </select>
        </div>
      </div>
    </>
  );
}
