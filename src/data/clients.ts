export interface Client {
  name: string;
  /** One-colour logo in /public/clients; without one the name is set as text. */
  logo?: { src: string; width: number; height: number };
  /** Optical size, relative to the row height: wordmarks and marks don't
      read the same size at the same height. */
  scale?: number;
  /** Case study for this client, if there is one. */
  projectSlug?: string;
}

export const clients: Client[] = [
  {
    name: "Lloyds Banking Group",
    logo: { src: "/clients/lloyds-banking-group.png", width: 515, height: 144 },
    projectSlug: "lloyds-banking-group",
  },
  {
    name: "Nike",
    logo: { src: "/clients/nike.svg", width: 240, height: 84 },
    scale: 0.8,
    projectSlug: "nike",
  },
  {
    name: "River Life Church",
    logo: { src: "/clients/river-life-church.png", width: 288, height: 144 },
    scale: 1.15,
    projectSlug: "river-life-church",
  },
  {
    name: "Trakr",
    logo: { src: "/clients/trakr.svg", width: 455, height: 176 },
    scale: 1.1,
    projectSlug: "trakr",
  },
  {
    name: "BanterPlug",
    logo: { src: "/clients/banterplug.png", width: 270, height: 144 },
    scale: 1.1,
  },
];
