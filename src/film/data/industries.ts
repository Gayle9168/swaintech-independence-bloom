/** The SwainTech industry ecosystem — numbering preserved from the brand artwork. */
export type Industry = {
  no: string;
  label: string;
  /** simple vector glyph, drawn inside a 24x24 box */
  icon: "rocket" | "grid" | "cap" | "desk" | "tower" | "chair" | "cross" | "home" | "cart" | "building" | "bag" | "coin" | "truck" | "flag";
};

export const INDUSTRIES: Industry[] = [
  { no: "01", label: "STARTUPS", icon: "rocket" },
  { no: "02", label: "SMEs", icon: "grid" },
  { no: "03", label: "EDUCATIONAL INSTITUTES", icon: "cap" },
  { no: "04", label: "SMALL OFFICE SETUP", icon: "desk" },
  { no: "05", label: "ENTERPRISES", icon: "tower" },
  { no: "06", label: "MODERN OFFICE SETUP", icon: "chair" },
  { no: "07", label: "HEALTH CARE", icon: "cross" },
  { no: "08", label: "REAL ESTATE", icon: "home" },
  { no: "09", label: "SUPER MARKET", icon: "cart" },
  { no: "10", label: "CORPORATE OFFICE", icon: "building" },
  { no: "11", label: "RETAIL & E-COMMERCE", icon: "bag" },
  { no: "13", label: "FINANCIAL SERVICES", icon: "coin" },
  { no: "14", label: "LOGISTICS", icon: "truck" },
  { no: "15", label: "COMPANY SETUP", icon: "flag" },
];
