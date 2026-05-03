/**
 * Italian universities Edubros supports applications to. Edit / add / remove freely.
 * The card shows: name, founding year, brief specialty, and a generic shield SVG mark.
 *
 * Founding years are well-documented public facts.
 */

export type University = {
  name: string;
  short: string; // short label, e.g. "PoliMi"
  city: string;
  founded: number;
  field: string;
};

export const universities: University[] = [
  {
    name: "Università di Bologna",
    short: "UniBo",
    city: "Bologna",
    founded: 1088,
    field: "Oldest in the West",
  },
  {
    name: "Università di Padova",
    short: "UniPd",
    city: "Padova",
    founded: 1222,
    field: "Medicine · Sciences",
  },
  {
    name: "Sapienza Università di Roma",
    short: "Sapienza",
    city: "Roma",
    founded: 1303,
    field: "Largest in Europe",
  },
  {
    name: "Università di Firenze",
    short: "UniFi",
    city: "Firenze",
    founded: 1321,
    field: "Humanities · Design",
  },
  {
    name: "Politecnico di Milano",
    short: "PoliMi",
    city: "Milano",
    founded: 1863,
    field: "Engineering · Design",
  },
  {
    name: "Politecnico di Torino",
    short: "PoliTo",
    city: "Torino",
    founded: 1859,
    field: "Engineering · Architecture",
  },
  {
    name: "Università Bocconi",
    short: "Bocconi",
    city: "Milano",
    founded: 1902,
    field: "Business · Economics",
  },
  {
    name: "Politecnica delle Marche",
    short: "UnivPM",
    city: "Ancona",
    founded: 1969,
    field: "Engineering · Economics",
  },
];
