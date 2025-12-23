// import { BASE_URL } from "./constants";

/* 
 *
Moving away from D&D 5e SRD API because:
1. Source material is limited to Player HandBook only
2. Some spells are missing
*
*/

// export const fetchSpells = async () => {
//   const res = await fetch(`${BASE_URL}/spells`);
//   if (!res.ok) {
//     throw new Error("Failed to fetch spells.");
//   }
//   return res.json();
// };

// export const fetchSpellsByClass = async (name: string) => {
//   const res = await fetch(`${BASE_URL}/classes/${name}/spells`);

//   if (!res.ok) {
//     throw new Error("Failed to fetch spells.");
//   }

//   return res.json();
// };

// export const fetchSpellDetails = async (name: string) => {
//   const res = await fetch(`${BASE_URL}/spells/${name}`);

//   if (!res.ok) {
//     throw new Error("Failed to fetch spells.");
//   }

//   return res.json();
// };
