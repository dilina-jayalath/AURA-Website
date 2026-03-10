# Getting Started

Welcome to **AURA UI Adaptor** — a React library for building ML-driven adaptive interfaces.

```bash
npm install @aura-adaptive/aura-ui-adaptor
```

---

## What is AURA UI Adaptor?

`@aura-adaptive/aura-ui-adaptor` is a React component library that **personalizes your UI in real-time** based on each user's needs. It adapts interfaces automatically for users with:

- **Visual challenges** — adjusts contrast, font size, and color clarity
- **Motor challenges** — increases target sizes, spacing, and reduces precision requirements
- **Literacy & skill differences** — simplifies layouts, adds assistive hints

All adaptations are **non-intrusive**, **WCAG-aligned**, and **fully reversible**.

---

## Quick Start

### 1. Install

```bash
npm install @aura-adaptive/aura-ui-adaptor
# or
yarn add @aura-adaptive/aura-ui-adaptor
```

### 2. Wrap your app

```jsx
import { AdaptiveProvider } from "@aura-adaptive/aura-ui-adaptor";

function App() {
  return (
    <AdaptiveProvider>
      <YourApp />
    </AdaptiveProvider>
  );
}
```

### 3. Use Adaptive components

```jsx
import {
  AdaptiveText,
  AdaptiveButton,
} from "@aura-adaptive/aura-ui-adaptor";

function Page() {
  return (
    <>
      <AdaptiveText variant="h1">Welcome</AdaptiveText>
      <AdaptiveButton variant="primary">Continue</AdaptiveButton>
    </>
  );
}
```

---

## How Personalization Works

The `AdaptiveProvider` supports **three loading paths**:

| Mode | Description |
|------|-------------|
| **Extension Mode** | Reads the active profile from the AURA browser extension (default behavior) |
| **Simulation Mode** | Use `simulateExtensionInstalled={true}` for local mock data during development |
| **Fallback Mode** | When no extension is found, uses a bundled prediction model and cached data |

---

## Next Steps

- [Installation →](/docs/installation) — full setup including peer dependencies
- [API Reference →](/docs/api-reference) — `AdaptiveProvider` props, `useAdaptive` hook
- [AdaptiveButton →](/docs/components/adaptive-button) — component-level docs
