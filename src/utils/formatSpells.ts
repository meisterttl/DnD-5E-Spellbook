import * as helpers from "./helpers";
import type {
  DDSpellCastTime,
  DDSpellComponents,
  DDSpellDuration,
  DDSpellRange,
  DDSpellTypeEntriesCell,
} from "../types";

export const getCastTime = (time: DDSpellCastTime[]) => {
  const newTime = time.map((each) => {
    const castTimeSuffix =
      "bonus" === each.unit.toLowerCase() ? "bonus action" : each.unit;

    return `${each.number} ${castTimeSuffix}`;
  });

  return newTime.join(" or ");
};

export const getComponents = (components: DDSpellComponents) => {
  const componentList = [];

  if (components.v) componentList.push("V");
  if (components.s) componentList.push("S");
  if (components.m) {
    const material =
      "string" === typeof components.m ? components.m : components.m.text;

    componentList.push(`M (${material})`);
  }

  return componentList.join(", ");
};

export const getDuration = (durationArray: DDSpellDuration[]) => {
  const duration = durationArray[0];

  switch (duration.type.toLowerCase()) {
    case "instant":
      return "Instantaneous";
    case "timed":
      return `${duration.concentration ? "Concentration, up to" : ""} ${
        duration.duration!.amount
      } ${
        1 === duration.duration!.amount
          ? duration.duration!.type
          : `${duration.duration!.type}s`
      }`;
    case "permanent":
      return `Until ${duration
        .ends!.map((trigger) => helpers.pastTense(trigger))
        .join(" or ")}`;
    default:
      break;
  }
};

export const getLevelSuffix = (n: number) => {
  switch (n) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const getSchool = (name: string) => {
  switch (name.toLowerCase()) {
    case "a":
      return "abjuration";
    case "c":
      return "conjuration";
    case "d":
      return "divination";
    case "e":
      return "enchantment";
    case "i":
      return "illusion";
    case "n":
      return "necromancy";
    case "t":
      return "transmutation";
    case "v":
      return "evocation";
    default:
      break;
  }
};

export const getRange = (range: DDSpellRange) => {
  switch (range.type.toLowerCase()) {
    case "point":
      return range.distance!.amount
        ? `${range.distance!.amount} ${range.distance!.type}`
        : helpers.capitalize(range.distance!.type);
    case "cone":
    case "cube":
    case "line":
    case "hemisphere":
    case "radius":
      return `Self (${range.distance!.amount}-foot ${range.type})`;
    case "sphere":
      return `Self (${range.distance!.amount}-foot-radius ${range.type})`;
    default:
      return helpers.capitalize(range.type);
  }
};

export const getSpellType = (
  level: number,
  school: string,
  meta: { ritual: boolean } | undefined
) => {
  const isRitual = meta && meta.ritual ? " (ritual)" : "";
  const levelSuffix = getLevelSuffix(level);
  const spellSchool = getSchool(school.toLowerCase())!;

  return 0 === level
    ? `${helpers.capitalize(spellSchool!)} cantrip`
    : `${level}${levelSuffix}-level ${spellSchool}${isRitual}`;
};

export const getSpellTableCell = (obj: DDSpellTypeEntriesCell) => {
  switch (true) {
    case "exact" in obj.roll:
      return String(obj.roll.exact);
    case "min" in obj.roll && "max" in obj.roll:
      return "pad" in obj.roll
        ? `${helpers.twoDigits(obj.roll.min!)}-${helpers.twoDigits(
            obj.roll.max!
          )}`
        : `${obj.roll.min!}-${obj.roll.max!}`;
    default:
      return;
  }
};
