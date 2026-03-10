# Data Display Components

Components for presenting data in `@aura-adaptive/aura-ui-adaptor`.

---

## AdaptiveTable

Accessible, adaptive data table. Font size, row height, and contrast adapt to visual profiles.

```jsx
import { AdaptiveTable } from "@aura-adaptive/aura-ui-adaptor";

<AdaptiveTable
  columns={[
    { key: "name",   label: "Name" },
    { key: "role",   label: "Role" },
    { key: "status", label: "Status" },
  ]}
  data={[
    { name: "Alice", role: "Admin",  status: "Active" },
    { name: "Bob",   role: "Editor", status: "Inactive" },
  ]}
/>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `columns` | `{ key: string, label: string }[]` | Column definitions |
| `data` | `object[]` | Row data — one object per row, keys matching column keys |
| `sortable` | `boolean` | Enable client-side column sorting |
| `onRowClick` | `function` | Called with the row data when a row is clicked |

---

## AdaptiveList

Semantic ordered or unordered list with adaptive spacing and font size.

```jsx
import { AdaptiveList } from "@aura-adaptive/aura-ui-adaptor";

<AdaptiveList
  items={["Install the package", "Wrap your app", "Use adaptive components"]}
  ordered
/>

<AdaptiveList
  items={["WCAG-aligned", "Zero config", "MIT licensed"]}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `string[] \| ReactNode[]` | — | List entries |
| `ordered` | `boolean` | `false` | Renders an `<ol>` if true, `<ul>` if false |

---

## AdaptiveCard

Content container with adaptive padding, border radius, and shadow.

```jsx
import { AdaptiveCard, AdaptiveText, AdaptiveButton } from "@aura-adaptive/aura-ui-adaptor";

<AdaptiveCard elevated>
  <AdaptiveText variant="h3">Card Title</AdaptiveText>
  <AdaptiveText variant="body">
    Some descriptive content about this card.
  </AdaptiveText>
  <AdaptiveButton variant="primary">Action</AdaptiveButton>
</AdaptiveCard>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Card content |
| `elevated` | `boolean` | `false` | Adds a stronger shadow |
| `bordered` | `boolean` | `true` | Shows a border |
| `className` | `string` | — | Additional CSS classes |

---

## AdaptiveText

The core typography component. Renders headings, body, captions, and labels with adaptive sizing.

```jsx
import { AdaptiveText } from "@aura-adaptive/aura-ui-adaptor";

<AdaptiveText variant="h1">Page Title</AdaptiveText>
<AdaptiveText variant="h2">Section Heading</AdaptiveText>
<AdaptiveText variant="body">Regular body text content.</AdaptiveText>
<AdaptiveText variant="caption">Small annotation or helper text.</AdaptiveText>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"h1" \| "h2" \| "h3" \| "body" \| "caption" \| "label"` | `"body"` | Semantic and visual variant |
| `as` | `string` | — | Override the HTML element rendered |
| `children` | `ReactNode` | — | Text content |

---

## Adaptive Behavior

| Profile | Adaptation |
|---------|------------|
| Visual impairment | Larger font size, increased line height, higher contrast |
| Low literacy | Simplified layout, reduced text density in tables |
| Motor impairment | Wider row click targets in AdaptiveTable |
