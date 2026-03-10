# Overlay & Feedback Components

Components for notifications, confirmations, and contextual overlays in `@aura-adaptive/aura-ui-adaptor`.

---

## AdaptiveAlert

Inline contextual message banner — ideal for form validation messages, info notices, and warnings.

```jsx
import { AdaptiveAlert } from "@aura-adaptive/aura-ui-adaptor";

<AdaptiveAlert variant="success">Profile saved successfully!</AdaptiveAlert>
<AdaptiveAlert variant="warning">Your session expires in 5 minutes.</AdaptiveAlert>
<AdaptiveAlert variant="error">Please fix the errors below.</AdaptiveAlert>
<AdaptiveAlert variant="info">This feature is currently in beta.</AdaptiveAlert>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"info" \| "success" \| "warning" \| "error"` | `"info"` | Alert severity |
| `children` | `ReactNode` | — | Alert message |
| `onDismiss` | `function` | — | If provided, shows a close button |

---

## AdaptiveDialog

A focused confirmation dialog with built-in action buttons. Blocks interaction with the rest of the page.

```jsx
import { AdaptiveDialog, AdaptiveButton } from "@aura-adaptive/aura-ui-adaptor";
import { useState } from "react";

function DeleteExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AdaptiveButton variant="danger" onClick={() => setOpen(true)}>
        Delete Item
      </AdaptiveButton>
      <AdaptiveDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete item?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        variant="danger"
      />
    </>
  );
}
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `open` | `boolean` | Controls visibility |
| `onClose` | `function` | Called when dialog closes |
| `title` | `string` | Dialog heading |
| `description` | `string` | Body text |
| `confirmLabel` | `string` | Confirm button label |
| `cancelLabel` | `string` | Cancel button label |
| `onConfirm` | `function` | Called when user confirms |
| `variant` | `"default" \| "danger"` | Dialog style |

---

## AdaptiveDrawer

Side panel that slides in from left or right — useful for settings panels, detail views, and filters.

```jsx
import { AdaptiveDrawer, AdaptiveButton } from "@aura-adaptive/aura-ui-adaptor";
import { useState } from "react";

function SettingsDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AdaptiveButton onClick={() => setOpen(true)}>Open Settings</AdaptiveButton>
      <AdaptiveDrawer
        open={open}
        onClose={() => setOpen(false)}
        side="right"
        title="Settings"
      >
        <p>Settings content goes here.</p>
      </AdaptiveDrawer>
    </>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controls visibility |
| `onClose` | `function` | — | Called when drawer should close |
| `side` | `"left" \| "right"` | `"right"` | Which side the drawer slides from |
| `title` | `string` | — | Drawer heading |
| `children` | `ReactNode` | — | Drawer content |

---

## AdaptiveTooltip

Accessible tooltip shown on hover or keyboard focus. Adapts timing and size for motor profiles.

```jsx
import { AdaptiveTooltip, AdaptiveButton } from "@aura-adaptive/aura-ui-adaptor";

<AdaptiveTooltip content="Copies the link to your clipboard">
  <AdaptiveButton variant="ghost">Copy Link</AdaptiveButton>
</AdaptiveTooltip>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string \| ReactNode` | — | Tooltip message |
| `placement` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Tooltip position |
| `children` | `ReactNode` | — | The element the tooltip is anchored to |

---

## Adaptive Behavior

| Profile | Overlay Adaptation |
|---------|--------------------|
| Motor impairment | Larger close targets, extended hover delay for tooltips |
| Visual impairment | High-contrast dialog backgrounds, enlarged text |
| Low literacy | Simplified dialog descriptions, prominent action buttons |
