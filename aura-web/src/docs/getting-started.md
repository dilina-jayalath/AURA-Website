# Getting Started

AURA is an **adaptive UI framework for React** that personalizes interfaces for **visual, motor, and literacy diversity**. It is built to feel native in your app, with safe defaults and optional ML hooks.

## What AURA Solves

Most UIs assume a one-size-fits-all user. AURA adapts layouts and components to better support:

- Visual needs (contrast, font size, color clarity)
- Motor needs (target size, spacing, reduced precision)
- Literacy and skill differences (simplified layouts, assistive hints)

Adaptations are **non-intrusive**, **reversible**, and **WCAG-aligned** by default.

## Core Concepts

### 1) Adaptive Components

Drop-in React components that respond to a personalization profile.

```jsx
import { AdaptiveButton } from "@aura/aura-adaptor";

<AdaptiveButton intent="primary">Continue</AdaptiveButton>
```

### 2) Personalization Profiles

Profiles describe user preferences or accessibility needs. AURA ships with demo profiles and lets you supply your own.

```js
const profile = {
  textScale: 1.2,
  contrast: "high",
  spacing: "relaxed",
  targetSize: "large",
};
```

### 3) Adaptation Engine

The adaptation engine maps profile data to UI changes. You can use AURA's defaults or connect a custom backend for real-time signals.

## Quick Start

1) Install the package

```bash
npm install @aura/aura-adaptor
```

2) Wrap your app with the provider

```jsx
import { AuraProvider } from "@aura/aura-adaptor";

const demoProfile = {
  textScale: 1.1,
  contrast: "high",
  spacing: "relaxed",
};

export default function App() {
  return (
    <AuraProvider profile={demoProfile}>
      <YourApp />
    </AuraProvider>
  );
}
```

3) Use adaptive components

```jsx
import { AdaptiveButton, AdaptiveCard } from "@aura/aura-adaptor";

<AdaptiveCard>
  <h3>Welcome back</h3>
  <p>Your dashboard adapts automatically.</p>
  <AdaptiveButton intent="primary">Open dashboard</AdaptiveButton>
</AdaptiveCard>
```

## Integrating Your ML Signals (Optional)

If you have a personalization backend, pass a live profile:

```jsx
const profile = await fetch("/api/aura/profile").then((r) => r.json());

<AuraProvider profile={profile}>
  <YourApp />
</AuraProvider>
```

## Accessibility Notes

AURA ships with safe defaults that preserve:

- Semantic structure
- Focus visibility
- Minimum target size
- Color contrast thresholds

You can override defaults if your design system needs it, but we recommend keeping the defaults unless you have strong reasons to change them.

## Next Steps

- Review personalization tokens in the API reference
- Explore adaptive components in the Components section
- Add your survey data to refine models
