# API Reference

Complete reference for the `@aura-adaptive/aura-ui-adaptor` package (v1.0.1).

---

## Import

```bash
npm install @aura-adaptive/aura-ui-adaptor
```

```jsx
import {
  AdaptiveProvider,
  useAdaptive,
  AdaptiveButton,
  AdaptiveText,
  // ... other components
} from "@aura-adaptive/aura-ui-adaptor";
```

---

## `<AdaptiveProvider />`

Wraps your application and manages personalization state. Must be the parent of all Adaptive components.

```jsx
<AdaptiveProvider simulateExtensionInstalled={false}>
  <App />
</AdaptiveProvider>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `simulateExtensionInstalled` | `boolean` | `false` | When `true`, uses local mock data instead of the AURA browser extension. Useful for development. |
| `children` | `ReactNode` | — | Your application tree |

### Loading Behavior

The provider tries three paths in order:

| Mode | Trigger | Description |
|------|---------|-------------|
| **Extension** | Default | Reads the active profile from the AURA browser extension |
| **Simulation** | `simulateExtensionInstalled={true}` | Uses bundled mock profile for local development |
| **Fallback** | No extension found | Runs a bundled ML prediction model using cached signals |

---

## `useAdaptive()`

React hook that exposes the current personalization state. Must be called inside `<AdaptiveProvider>`.

```jsx
const { loading, source, tokens, profile, reload } = useAdaptive();
```

### Return Values

| Field | Type | Description |
|-------|------|-------------|
| `loading` | `boolean` | `true` while the provider is fetching or predicting |
| `source` | `"extension" \| "simulation" \| "fallback"` | Profile origin |
| `tokens` | `object` | Resolved UI design tokens |
| `profile` | `object` | Raw personalization profile |
| `reload` | `() => Promise<void>` | Re-fetches or re-predicts the profile |

---

## `predictFallbackTokens(signals)`

Utility that runs the bundled ML model to predict UI tokens from cached signals. Used internally by `AdaptiveProvider` — exposed for advanced cases.

```jsx
import { predictFallbackTokens } from "@aura-adaptive/aura-ui-adaptor";

const tokens = await predictFallbackTokens(cachedSignals);
```

---

## All Exports

```jsx
// Utilities
import {
  AdaptiveProvider,
  useAdaptive,
  predictFallbackTokens,
} from "@aura-adaptive/aura-ui-adaptor";

// Components
import {
  AdaptiveAlert,
  AdaptiveButton,
  AdaptiveCard,
  AdaptiveCheckbox,
  AdaptiveDialog,
  AdaptiveDrawer,
  AdaptiveDropdown,
  AdaptiveGrid,
  AdaptiveInput,
  AdaptiveList,
  AdaptiveMenu,
  AdaptiveNavbar,
  AdaptivePagination,
  AdaptiveSelect,
  AdaptiveSwitch,
  AdaptiveTable,
  AdaptiveText,
  AdaptiveTextarea,
  AdaptiveTooltip,
} from "@aura-adaptive/aura-ui-adaptor";
```

### Component Summary

| Component | Category | Description |
|-----------|----------|-------------|
| `AdaptiveText` | Data Display | Typography — headings, body, captions |
| `AdaptiveCard` | Data Display | Content card with adaptive padding |
| `AdaptiveTable` | Data Display | Accessible sortable data table |
| `AdaptiveList` | Data Display | Ordered / unordered list |
| `AdaptiveButton` | Forms | Adaptive call-to-action button |
| `AdaptiveInput` | Forms | Text input field |
| `AdaptiveTextarea` | Forms | Multi-line text input |
| `AdaptiveSelect` | Forms | Select / dropdown input |
| `AdaptiveCheckbox` | Forms | Accessible checkbox |
| `AdaptiveSwitch` | Forms | Toggle switch |
| `AdaptiveGrid` | Layout | Responsive adaptive grid |
| `AdaptiveNavbar` | Layout | Pre-built navigation bar |
| `AdaptiveMenu` | Navigation | Context / command menu |
| `AdaptiveDropdown` | Navigation | Button with dropdown actions |
| `AdaptivePagination` | Navigation | Page navigation controls |
| `AdaptiveAlert` | Feedback | Inline contextual alert banner |
| `AdaptiveDialog` | Overlay | Confirmation dialog |
| `AdaptiveDrawer` | Overlay | Side-panel drawer |
| `AdaptiveTooltip` | Overlay | Hover / focus tooltip |
