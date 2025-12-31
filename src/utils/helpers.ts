export const capitalize = (word: string) =>
  `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;

export const generateSlug = (word: string) =>
  word.toLowerCase().replace("\u0027", "").replaceAll(" ", "-");

// TODO: Find a way to highlight accented characters
export const highlightSearchTerms = (word: string, needle: string) => {
  // const wordInUnicode = word.split("").map((each) => each.charCodeAt(0).toString(16).padStart(4, "0"));
  const regex = new RegExp(String.raw`(${needle.split("").join("\\")})`, "gi");

  return "" === needle ? word : word.replace(regex, `<mark>$1</mark>`);
};

// Needed only to change "dispel" and "trigger" for now
export const pastTense = (word: string) => {
  switch (true) {
    case "dispel" === word:
      return "dispelled";
    case word.endsWith("e"):
      return `${word}d`;
    default:
      return `${word}ed`;
  }
};

export const sanitizeEntry = (string: string) => {
  const match = string.indexOf("{@");

  // TODO: Tricky to remove {@note ... } string, so this will have to do for now
  if (string.startsWith("{@note")) return null;

  if (-1 !== match) {
    const regex = /{@(\w+)\s*([a-zA-z0-9&:;|.,()?!=\u0027\u00D7/+-\s]*)}/g;

    return string.replaceAll(regex, stripCurlyBrace);
  }

  return string;
};

const stripCurlyBrace = (_: string, p1: string, p2: string) => {
  switch (p1) {
    case "action":
    case "adventure": // Create Magen
    case "book": // Detect Magic
    case "classFeature": // Nystul's Magic Aura
    case "condition": // Find Familiar
    case "filter":
    case "hazard":
    case "sense":
    case "skill":
      return p2.split("|").shift()!;
    case "chance": // Augury, Slow (2024)
      return `${p2.split("|").shift()!} percent`;
    case "race": // Reincarnate (Needs to be split twice)
      return p2.split("||").pop()!.split("|XPHB").shift()!;
    case "dice":
    case "scaledamage":
    case "scaledice":
      return p2.split("|").pop()!;
    case "d20": // Bigby's Hand
      return `+${p2}`;
    case "dc": // Contact Other Plane
      return `DC ${p2}`;
    case "creature": // Animate Objects (2014),Create Undead, Danse Macabre, Find Famliar
    case "item": // Shillelagh
    case "quickref": // Blade Barrier, Cloudkill
    case "status": // Earthquake (2014), Earthquake (2024)
    case "variantrule": // Acid Splash
      return `${
        2 === p2.split("|").length
          ? p2.split("|").shift()!
          : p2.split("|").pop()!
      }`;
    case "i":
      return `<i>${p2}</i>`;
    case "spell":
      return `<i>${p2.split("|").shift()!}</i>`;
    // case "b":
    // case "damage":
    // case "hit":
    //   return `{@${p1} ${p2}}`;
    default:
      return p2;
  }
};

export const stringMatch = (word: string, needle: string) => {
  const match: boolean | number = word.indexOf(needle);

  if (-1 === match) {
    const needleLength = needle.length;

    if (1 !== needleLength) {
      const wordArray = word.split("");
      const matches = [];

      for (let i = 0; i < wordArray.length - needleLength + 1; i++) {
        const potentialMatch = wordArray.slice(i, i + needleLength).join("");

        if (
          0 ===
          potentialMatch.localeCompare(needle, "en", { sensitivity: "base" })
        ) {
          matches.push(potentialMatch);
        }
      }

      if (0 !== matches.length) return true;
    }
  } else {
    return true;
  }

  return false;
};

// Add 0 in front of 1-9
export const twoDigits = (n: number) => (n < 10 ? `0${n}` : n);
