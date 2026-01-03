import gettingStarted from "./getting-started.md?raw";
import installation from "./installation.md?raw";
import personalization from "./personalization.md?raw";
import apiReference from "./api-reference.md?raw";
import adaptiveButton from "./components/adaptive-button.md?raw";
import adaptiveCard from "./components/adaptive-card.md?raw";

const sections = [
  {
    title: "Introduction",
    items: [
      { label: "Getting Started", to: "/docs/getting-started", key: "getting-started" },
      { label: "Installation", to: "/docs/installation", key: "installation" },
    ],
  },
  {
    title: "Core Concepts",
    items: [{ label: "Personalization Profiles", to: "/docs/personalization", key: "personalization" }],
  },
  {
    title: "Components",
    items: [
      { label: "Adaptive Button", to: "/docs/components/adaptive-button", key: "components/adaptive-button" },
      { label: "Adaptive Card", to: "/docs/components/adaptive-card", key: "components/adaptive-card" },
    ],
  },
  {
    title: "API",
    items: [{ label: "API Reference", to: "/docs/api-reference", key: "api-reference" }],
  },
];

const docsMap = {
  "getting-started": gettingStarted,
  "installation": installation,
  "personalization": personalization,
  "api-reference": apiReference,
  "components/adaptive-button": adaptiveButton,
  "components/adaptive-card": adaptiveCard,
};

export { sections, docsMap };
