# Adaptive Card

Surface container that adapts spacing, typography scale, and contrast.

## Usage

```jsx
import { AdaptiveCard } from "@aura/aura-adaptor";

<AdaptiveCard>
  <h3>Insights</h3>
  <p>Cards adjust density and contrast automatically.</p>
</AdaptiveCard>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `density` | `"compact" \| "default" \| "relaxed"` | `"default"` | Padding preset |
| `tone` | `"default" \| "muted"` | `"default"` | Surface tone |

## Notes

Cards inherit profile tokens for spacing and text scale.
