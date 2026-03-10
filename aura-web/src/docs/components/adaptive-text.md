# AdaptiveText

The foundational typography component. Renders any text element — headings, body, captions, labels — and automatically adjusts font size, line height, and weight based on the active personalization profile.

---

## Import

```jsx
import { AdaptiveText } from "@aura-adaptive/aura-ui-adaptor";
```

---

## Variants

```jsx
<AdaptiveText variant="h1">Page Title</AdaptiveText>
<AdaptiveText variant="h2">Section Heading</AdaptiveText>
<AdaptiveText variant="h3">Sub-heading</AdaptiveText>
<AdaptiveText variant="body">Body paragraph text.</AdaptiveText>
<AdaptiveText variant="caption">Small helper text</AdaptiveText>
<AdaptiveText variant="label">Form label</AdaptiveText>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"h1" \| "h2" \| "h3" \| "body" \| "caption" \| "label"` | `"body"` | Semantic and visual variant |
| `as` | `string` | — | Override the HTML element (e.g. `as="span"`) |
| `children` | `ReactNode` | — | Text content |
| `className` | `string` | — | Additional classes |

---

## Adaptive Behavior

| Profile | Adaptation |
|---------|------------|
| Visual impairment | Larger base font size, increased line height |
| Low literacy | Simplified weight, wider letter spacing |
| Motor (no text change) | Not applicable |

---

## Example

```jsx
import { AdaptiveProvider, AdaptiveText } from "@aura-adaptive/aura-ui-adaptor";

function Article() {
  return (
    <AdaptiveProvider>
      <AdaptiveText variant="h1">Understanding Accessibility</AdaptiveText>
      <AdaptiveText variant="body">
        Adaptive UI ensures your content reaches every user effectively,
        regardless of their individual needs.
      </AdaptiveText>
      <AdaptiveText variant="caption">Last updated: March 2026</AdaptiveText>
    </AdaptiveProvider>
  );
}
```
