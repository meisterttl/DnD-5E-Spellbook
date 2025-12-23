export const capitalize = (word: string) =>
  `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;

export const generateSlug = (word: string) =>
  word.toLowerCase().replace(" ", "-");

export const highlightSearchTerms = (word: string, needle: string) => {
  const regex = new RegExp(String.raw`(${needle})`, "gi");

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
    const regex = /{@(\w+)\s*([a-zA-z0-9&;|,()!=\u0027\u00D7/+-\s]*)}/g;
    // if (null === string.match(regex)) console.log(string, string.match(regex));
    return string.replaceAll(regex, stripCurlyBrace);
  }

  return string;
};

const stripCurlyBrace = (_: string, p1: string, p2: string) => {
  switch (p1) {
    case "book": // Detect Magic
    case "classFeature": // Nystul's Magic Aura
    case "filter":
      return p2.split("|").shift()!;
    case "chance": // Augury
      return `${p2.split("|").shift()!} percent`;
    case "condition": // Find Familiar
    case "race": // Reincarnation
      return p2.split("||").pop()!;
    case "creature":
    case "dice":
    case "scaledamage":
    case "scaledice":
    case "status":
      return p2.split("|").pop()!;
    case "d20": // Bigby's Hand
      return `+${p2}`;
    case "dc": // Contact Other Plane
      return `DC ${p2}`;
    case "quickref": // Blade Barrier, Cloudkill
      return `${
        2 === p2.split("|").length
          ? p2.split("|").shift()!
          : p2.split("|").pop()!
      }`;
    case "item": // Shillelagh
      return `${
        2 === p2.split("|").length
          ? p2.split("|").shift()!
          : p2.split("|").pop()!
      }`;
    case "skill":
      return `(${p2})`;
    default:
      return p2!;
  }
};

// Add 0 in front of 1-9
export const twoDigits = (n: number) => (n < 10 ? `0${n}` : n);
