# AdaptiveCard

A content container that adapts its padding, border radius, shadow depth, and background based on the active personalization profile.

---

## Import

```jsx
import { AdaptiveCard } from "@aura-adaptive/aura-ui-adaptor";
```

---

## Basic Usage

```jsx
<AdaptiveCard>
  <p>This content is inside an adaptive card.</p>
</AdaptiveCard>
```

---

## With Title and Actions

```jsx
import { AdaptiveCard, AdaptiveText, AdaptiveButton } from "@aura-adaptive/aura-ui-adaptor";

<AdaptiveCard>
  <AdaptiveText variant="h2">Card Title</AdaptiveText>
  <AdaptiveText variant="body">
    Some descriptive content about this card.
  </AdaptiveText>
  <AdaptiveButton variant="primary">Action</AdaptiveButton>
</AdaptiveCard>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Card content |
| `className` | `string` | — | Additional CSS classes |
| `elevated` | `boolean` | `false` | Adds a stronger shadow |
| `bordered` | `boolean` | `true` | Shows a border |

---

## Adaptive Behavior

| Profile | Adaptation |
|---------|------------|
| Motor impairment | Larger padding, increased tap targets within card |
| Low literacy | Simplified background, reduced visual noise |
| Visual impairment | Higher contrast border, bolder shadow |

---

## Full Example

```jsx
import {
  AdaptiveProvider,
  AdaptiveCard,
  AdaptiveText,
  AdaptiveButton,
} from "@aura-adaptive/aura-ui-adaptor";

function ProfileCard({ name, role }) {
  return (
    <AdaptiveProvider>
      <AdaptiveCard elevated>
        <AdaptiveText variant="h3">{name}</AdaptiveText>
        <AdaptiveText variant="body" style={{ color: "gray" }}>
          {role}
        </AdaptiveText>
        <div style={{ marginTop: "1rem" }}>
          <AdaptiveButton variant="primary">View Profile</AdaptiveButton>
        </div>
      </AdaptiveCard>
    </AdaptiveProvider>
  );
}
```
