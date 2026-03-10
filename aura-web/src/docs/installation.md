# Installation

## Requirements

| Dependency | Version |
|------------|---------|
| React | ≥ 17.0 |
| react-dom | ≥ 17.0 |

`@aura-adaptive/aura-ui-adaptor` lists `react` and `react-dom` as **peer dependencies** — you need them installed in your project.

---

## npm

```bash
npm install @aura-adaptive/aura-ui-adaptor
```

## yarn

```bash
yarn add @aura-adaptive/aura-ui-adaptor
```

## pnpm

```bash
pnpm add @aura-adaptive/aura-ui-adaptor
```

---

## TypeScript

The package ships with TypeScript definitions. No `@types/` package is required.

---

## Verify the install

After installing, you can confirm it's working with this minimal snippet:

```jsx
import { AdaptiveProvider, AdaptiveButton } from "@aura-adaptive/aura-ui-adaptor";

function App() {
  return (
    <AdaptiveProvider>
      <AdaptiveButton variant="primary">Hello AURA</AdaptiveButton>
    </AdaptiveProvider>
  );
}

export default App;
```

If this renders without errors, you're all set.

---

## Next Steps

- [Getting Started →](/docs/getting-started) — understand core concepts
- [API Reference →](/docs/api-reference) — full props and hook reference
