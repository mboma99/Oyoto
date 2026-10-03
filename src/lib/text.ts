/** "LLOYDS BANKING GROUP" -> "Lloyds Banking Group". Project titles are stored in caps. */
export const titleCase = (s: string) =>
  s.toLowerCase().replace(/(^|\s)(\S)/g, (_, space: string, ch: string) => space + ch.toUpperCase());
