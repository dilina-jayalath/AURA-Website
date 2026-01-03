# Installation

Install the AURA package and add the provider to your app.

## Requirements

- React 18+
- Vite, Next.js, or CRA
- Node 18+

## Install

```bash
npm install @aura/aura-adaptor
```

Or with pnpm:

```bash
pnpm add @aura/aura-adaptor
```

## Add the Provider

```jsx
import { AuraProvider } from "@aura/aura-adaptor";

const demoProfile = {
  textScale: 1.1,
  contrast: "high",
  spacing: "relaxed",
  targetSize: "large",
};

export default function App() {
  return (
    <AuraProvider profile={demoProfile}>
      <YourApp />
    </AuraProvider>
  );
}
```

## Optional: Theme Tokens

You can pass tokens to align AURA with your design system:

```jsx
const tokens = {
  radius: "12px",
  focusRing: "2px solid var(--color-primary)",
};

<AuraProvider profile={demoProfile} tokens={tokens}>
  <YourApp />
</AuraProvider>
```
