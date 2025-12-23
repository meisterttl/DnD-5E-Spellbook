import Sources from "./data/spells/sources.json";
import PHB from "./data/spells/spells-phb.json";
import type { DDSpell } from "./types";
// import { BASE_URL } from "./constants";

const fromPHB: DDSpell[] = PHB.spell;

fromPHB.map((spell) => {
  const key = spell.name as keyof typeof Sources.PHB;

  // Index property should not exist yet but check anyway
  if (!("index" in spell)) {
    // For creating keys for each spell
    spell.index = spell.name
      .toLowerCase()
      .replace(/[\s/]/g, "-") // Empty space and Forward slash
      .replace(/\u0027/g, ""); // Apostrophe
  }

  // Classes property should not exist yet but check anyway
  if (!("classes" in spell)) {
    // For easy filtering by class
    spell.classes = [];
  }

  if (key in Sources.PHB) {
    if ("class" in Sources.PHB) {
      // @ts-expect-error: For now ignore TODO: Fix
      spell.classes!.push(...Sources.PHB[key].class);
    }

    if ("classVariant" in Sources.PHB) {
      // @ts-expect-error: For now ignore TODO: Fix
      spell.classes!.push(...Sources.PHB[key].classVariant);
    }
  }
});

// Find all keys from JSON spells
// const keys = {};
// fromPHB.forEach((spell) => {
//   for (const prop in spell) {
//     // @ts-expect-error: Can be ignored
//     if (!(prop in keys)) keys[prop] = true;
//   }
// });
// console.log(keys);

export { fromPHB };
