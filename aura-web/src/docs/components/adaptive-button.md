# AdaptiveButton

Adaptive replacement for a standard `<button>`. Automatically scales size, padding, border radius, and focus styles based on the active personalization profile.

---

## Import

```jsx
import { AdaptiveButton } from "@aura-adaptive/aura-ui-adaptor";
```

---

## Basic Usage

```jsx
<AdaptiveButton variant="primary">
  Continue
</AdaptiveButton>
```

---

## Variants

```jsx
<AdaptiveButton variant="primary">Primary</AdaptiveButton>
<AdaptiveButton variant="secondary">Secondary</AdaptiveButton>
<AdaptiveButton variant="ghost">Ghost</AdaptiveButton>
<AdaptiveButton variant="danger">Danger</AdaptiveButton>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary" \| "secondary" \| "ghost" \| "danger"` | `"primary"` | Visual style |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Base size (adaptive engine may override) |
| `disabled` | `boolean` | `false` | Disables the button |
| `onClick` | `() => void` | — | Click handler |
| `children` | `ReactNode` | — | Button label |
| `className` | `string` | — | Additional CSS classes |

---

## Adaptive Behavior

When a motor impairment profile is active, `AdaptiveButton` automatically:
- Increases `min-height` and `min-width` for easier tapping
- Adds wider padding
- Enlarges focus rings for keyboard navigation

These overrides happen at the token level inside `AdaptiveProvider` — no extra props needed.

---

## Full Example

```jsx
import { AdaptiveProvider, AdaptiveButton } from "@aura-adaptive/aura-ui-adaptor";

function App() {
  return (
    <AdaptiveProvider>
      <div style={{ display: "flex", gap: "1rem" }}>
        <AdaptiveButton variant="primary" onClick={() => alert("Clicked!")}>
          Save
        </AdaptiveButton>
        <AdaptiveButton variant="ghost">
          Cancel
        </AdaptiveButton>
      </div>
    </AdaptiveProvider>
  );
}
```
