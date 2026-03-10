# Layout & Navigation Components

Structural and navigation components from `@aura-adaptive/aura-ui-adaptor`.

---

## AdaptiveGrid

Responsive adaptive grid. Column count automatically reduces for users with lower visual complexity preferences.

```jsx
import { AdaptiveGrid, AdaptiveCard } from "@aura-adaptive/aura-ui-adaptor";

<AdaptiveGrid cols={3} gap="md">
  <AdaptiveCard>Item 1</AdaptiveCard>
  <AdaptiveCard>Item 2</AdaptiveCard>
  <AdaptiveCard>Item 3</AdaptiveCard>
</AdaptiveGrid>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cols` | `number` | `3` | Maximum columns (reduced for low-literacy profiles) |
| `gap` | `"sm" \| "md" \| "lg"` | `"md"` | Space between grid items |
| `children` | `ReactNode` | — | Grid items |

---

## AdaptiveNavbar

Pre-built accessible navigation bar with adaptive spacing and touch targets.

```jsx
import { AdaptiveNavbar } from "@aura-adaptive/aura-ui-adaptor";

<AdaptiveNavbar
  brand="My App"
  links={[
    { label: "Home",    href: "/" },
    { label: "Docs",    href: "/docs" },
    { label: "Pricing", href: "/pricing" },
  ]}
/>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `brand` | `string` | Brand name displayed on the left |
| `links` | `{ label, href }[]` | Navigation links |
| `rightSlot` | `ReactNode` | Extra content on the right (e.g. login button) |

---

## AdaptiveMenu

Context menu or command list. Adapts item size and spacing to motor profiles.

```jsx
import { AdaptiveMenu } from "@aura-adaptive/aura-ui-adaptor";

<AdaptiveMenu
  items={[
    { label: "Edit",   onClick: handleEdit },
    { label: "Delete", onClick: handleDelete, variant: "danger" },
  ]}
/>
```

---

## AdaptiveDropdown

Button with an anchored dropdown list of actions.

```jsx
import { AdaptiveDropdown } from "@aura-adaptive/aura-ui-adaptor";

<AdaptiveDropdown
  label="Actions"
  items={[
    { label: "Export CSV", onClick: handleExport },
    { label: "Print",      onClick: handlePrint },
  ]}
/>
```

---

## AdaptivePagination

Accessible pagination controls for paginated content.

```jsx
import { AdaptivePagination } from "@aura-adaptive/aura-ui-adaptor";

<AdaptivePagination
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
/>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `currentPage` | `number` | Active page (1-indexed) |
| `totalPages` | `number` | Total number of pages |
| `onPageChange` | `function` | Called with new page number on navigation |

---

## Adaptive Behavior

| Profile | Navigation Adaptation |
|---------|-----------------------|
| Motor impairment | Larger nav links, more spacing between items |
| Visual impairment | High-contrast active states, clearer separators |
