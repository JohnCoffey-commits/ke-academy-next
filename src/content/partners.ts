export type PartnerSize = "wide" | "tall" | "square";

export interface Partner {
    id: string;
    name: string;
    logo: string; // data URI (SVG)
    size: PartnerSize;
}

const makeLogo = (name: string, mark: string, bg: string, fg: string) => {
    const safeName = name.toUpperCase();
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="240" height="90" viewBox="0 0 240 90">
  <rect width="240" height="90" rx="14" fill="${bg}"/>
  <text x="120" y="54" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="700" fill="${fg}" text-anchor="middle">${mark}</text>
  <text x="120" y="76" font-family="Inter, Arial, sans-serif" font-size="10" font-weight="600" fill="${fg}" text-anchor="middle" letter-spacing="2">${safeName}</text>
</svg>
`.trim();

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const partners: Partner[] = [
    {
        id: "northbridge",
        name: "Northbridge University",
        logo: makeLogo("Northbridge University", "NU", "#102a43", "#ffffff"),
        size: "wide"
    },
    {
        id: "redstone",
        name: "Redstone Institute",
        logo: makeLogo("Redstone Institute", "RI", "#243b53", "#e2e8f0"),
        size: "tall"
    },
    {
        id: "meridian",
        name: "Meridian College",
        logo: makeLogo("Meridian College", "MC", "#4ECDC4", "#102a43"),
        size: "square"
    },
    {
        id: "pinecrest",
        name: "Pinecrest School",
        logo: makeLogo("Pinecrest School", "PS", "#FF6B6B", "#102a43"),
        size: "square"
    },
    {
        id: "beacon",
        name: "Beacon Education Group",
        logo: makeLogo("Beacon Education Group", "BEG", "#FFE66D", "#102a43"),
        size: "wide"
    },
    {
        id: "harborview",
        name: "Harborview Academy",
        logo: makeLogo("Harborview Academy", "HA", "#334e68", "#ffffff"),
        size: "tall"
    },
    {
        id: "summit",
        name: "Summit International",
        logo: makeLogo("Summit International", "SI", "#4ECDC4", "#102a43"),
        size: "square"
    },
    {
        id: "westlake",
        name: "Westlake Institute",
        logo: makeLogo("Westlake Institute", "WI", "#FF6B6B", "#102a43"),
        size: "square"
    },
    {
        id: "aurora",
        name: "Aurora Learning Lab",
        logo: makeLogo("Aurora Learning Lab", "ALL", "#102a43", "#ffffff"),
        size: "wide"
    }
];
