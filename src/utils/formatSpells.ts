import { capitalize, pastTense, sanitizeEntry, twoDigits } from "./helpers";
import type {
  DDClass,
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
    const condition = each.condition
      ? `, ${sanitizeEntry(each.condition)}`
      : ``;

    return `${each.number} ${
      1 === each.number ? castTimeSuffix : `${castTimeSuffix}s`
    }${condition}`;
  });

  return newTime.join(" or ");
};

export const getCastTimeXPHB = (
  time: DDSpellCastTime[],
  meta: { ritual: boolean } | undefined
) => {
  const isRitual = meta && meta.ritual ? " or Ritual" : "";

  const newTime = time.map((each) => {
    const condition = each.condition
      ? `, ${sanitizeEntry(each.condition)}`
      : ``;
    let output = "";

    switch (each.unit) {
      case "bonus":
        output = "Bonus Action";
        break;
      case "action":
      case "reaction":
        output = capitalize(each.unit);
        break;
      default:
        output = `${each.number} ${
          1 === each.number ? each.unit : ` ${capitalize(each.unit)}s`
        }`;
        break;
    }

    return `${output}${condition}`;
  });

  return `${newTime.join()}${isRitual}`;
};

export const getClasses = (classes: DDClass[]) => {
  const list = classes
    .map((each) => each.name)
    .filter((value, index, array) => array.indexOf(value) === index)
    .sort();

  return list
    .map((name, index) => (0 !== index ? name.toLowerCase() : name))
    .join(", ");
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
        .ends!.map((trigger) => pastTense(trigger))
        .join(" or ")}`;
    default:
      return capitalize(duration.type);
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
        : capitalize(range.distance!.type);
    case "emanation":
      return "Self";
    case "cone":
    case "cube":
    case "line":
    case "hemisphere":
    case "radius":
      return `Self (${range.distance!.amount}-foot ${range.type})`;
    case "sphere":
      return `Self (${range.distance!.amount}-foot-radius ${range.type})`;
    default:
      return capitalize(range.type);
  }
};

export const getRangeXPHB = (range: DDSpellRange) => {
  switch (range.type.toLowerCase()) {
    case "point":
      return range.distance!.amount
        ? `${range.distance!.amount} ${range.distance!.type}`
        : capitalize(range.distance!.type);
    case "cone":
    case "cube":
    case "emanation":
    case "line":
    case "hemisphere":
    case "radius":
      return "Self";
    default:
      return capitalize(range.type);
  }
};

export const getSpellType = (
  level: number,
  school: string,
  meta: { ritual: boolean } | undefined,
  source: string = "PHB"
) => {
  const altStyleSource = ["BMT", "FTD", "SCC", "AAG", "SatO"];
  const isRitual = meta && meta.ritual ? " (ritual)" : "";
  const levelSuffix = getLevelSuffix(level);
  const wordLevel = altStyleSource.includes(source) ? "Level" : "level";
  const spellSchool = altStyleSource.includes(source)
    ? capitalize(getSchool(school)!)
    : getSchool(school)!;

  return 0 === level
    ? `${capitalize(spellSchool!)} cantrip`
    : `${level}${levelSuffix}-${wordLevel} ${spellSchool}${isRitual}`;
};

export const getSpellTypeXPHB = (
  level: number,
  school: string,
  classes: DDClass[]
) => {
  const spellSchool = getSchool(school.toLowerCase())!;
  const spellClasses = `(${classes
    .map((each) =>
      "XPHB" === each.source || "EFA" === each.source || "FRHoF" === each.source
        ? each.name
        : undefined
    )
    .filter((each) => each)
    .join(", ")})`;
  const output =
    0 === level
      ? `${capitalize(spellSchool!)} Cantrip`
      : `Level ${level} ${capitalize(spellSchool!)}`;

  return `${output} ${spellClasses}`;
};

export const getSpellTableCell = (obj: DDSpellTypeEntriesCell) => {
  switch (true) {
    case "exact" in obj.roll:
      return String(obj.roll.exact);
    case "min" in obj.roll && "max" in obj.roll:
      return "pad" in obj.roll
        ? `${twoDigits(obj.roll.min!)}-${twoDigits(obj.roll.max!)}`
        : `${obj.roll.min!}-${obj.roll.max!}`;
    default:
      return;
  }
};
