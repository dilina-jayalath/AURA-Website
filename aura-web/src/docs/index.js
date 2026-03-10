// Core docs
import gettingStarted from "./getting-started.md?raw";
import installation from "./installation.md?raw";
import apiReference from "./api-reference.md?raw";
import useAdaptive from "./use-adaptive.md?raw";

// Component docs
import adaptiveButton from "./components/adaptive-button.md?raw";
import adaptiveCard from "./components/adaptive-card.md?raw";
import adaptiveText from "./components/adaptive-text.md?raw";
import adaptiveInput from "./components/adaptive-input.md?raw";
import adaptiveLayout from "./components/adaptive-layout.md?raw";
import adaptiveModal from "./components/adaptive-modal.md?raw";
import adaptiveTable from "./components/adaptive-table.md?raw";

export const docsMap = {
  // Introduction
  "getting-started": gettingStarted,
  "installation": installation,

  // Core API
  "api-reference": apiReference,
  "use-adaptive": useAdaptive,

  // Forms
  "components/adaptive-button": adaptiveButton,
  "components/adaptive-input": adaptiveInput,
  "components/adaptive-textarea": adaptiveInput,   // same page
  "components/adaptive-select": adaptiveInput,   // same page
  "components/adaptive-checkbox": adaptiveInput,   // same page
  "components/adaptive-switch": adaptiveInput,   // same page

  // Data Display
  "components/adaptive-text": adaptiveText,
  "components/adaptive-card": adaptiveCard,
  "components/adaptive-table": adaptiveTable,
  "components/adaptive-list": adaptiveTable,      // same page

  // Layout & Navigation
  "components/adaptive-grid": adaptiveLayout,
  "components/adaptive-navbar": adaptiveLayout,
  "components/adaptive-menu": adaptiveLayout,
  "components/adaptive-dropdown": adaptiveLayout,
  "components/adaptive-pagination": adaptiveLayout,

  // Overlay & Feedback
  "components/adaptive-alert": adaptiveModal,
  "components/adaptive-dialog": adaptiveModal,
  "components/adaptive-drawer": adaptiveModal,
  "components/adaptive-tooltip": adaptiveModal,
};
