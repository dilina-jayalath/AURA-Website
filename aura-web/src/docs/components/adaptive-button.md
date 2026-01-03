# Adaptive Button

Buttons that adapt size, contrast, and focus handling.

## Usage

```jsx
import { AdaptiveButton } from "@aura/aura-adaptor";

<AdaptiveButton intent="primary">Continue</AdaptiveButton>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `intent` | `"primary" \| "secondary" \| "ghost"` | `"primary"` | Visual emphasis |
| `density` | `"compact" \| "default" \| "relaxed"` | `"default"` | Spacing preset |
| `disabled` | `boolean` | `false` | Disable interaction |

## Accessibility

- Supports keyboard activation
- Ensures minimum target size based on profile
