# useAdaptive Hook

The `useAdaptive` hook gives any component inside `<AdaptiveProvider>` direct access to the active personalization state.

---

## Import

```jsx
import { useAdaptive } from "@aura-adaptive/aura-ui-adaptor";
```

---

## Usage

```jsx
function ProfileSummary() {
  const { loading, source, tokens, profile, reload } = useAdaptive();

  if (loading) return <p>Loading personalization...</p>;

  return (
    <section>
      <p>Source: {source}</p>
      <p>Theme: {tokens.flags.theme}</p>
      <button onClick={() => void reload()}>Refresh</button>
    </section>
  );
}
```

---

## Return Values

| Field | Type | Description |
|-------|------|-------------|
| `loading` | `boolean` | `true` while the provider is fetching or predicting a profile |
| `source` | `"extension" \| "simulation" \| "fallback"` | Where the active profile came from |
| `tokens` | `object` | Resolved UI design tokens (sizes, colors, spacing, flags) |
| `profile` | `object` | The raw personalization profile object |
| `reload` | `() => Promise<void>` | Re-fetches or re-predicts the profile on demand |

---

## tokens shape

```js
{
  flags: {
    theme: "dark" | "light",
    reducedMotion: boolean,
    highContrast: boolean,
  },
  sizing: {
    base: number,        // Base font size multiplier
    targetSize: number,  // Min touch target size in px
    spacing: number,     // Spacing multiplier
  },
  colors: {
    primary: string,
    background: string,
    text: string,
  }
}
```

---

## TypeScript

```tsx
import { useAdaptive, AdaptiveTokens } from "@aura-adaptive/aura-ui-adaptor";

const { tokens }: { tokens: AdaptiveTokens } = useAdaptive();
```

---

> **Must be used inside `<AdaptiveProvider>`** — calling this hook outside the provider will throw an error.
