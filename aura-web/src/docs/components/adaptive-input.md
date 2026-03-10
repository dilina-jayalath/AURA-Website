# Form Components

Overview of all form input components in `@aura-adaptive/aura-ui-adaptor`. Every form component responds to motor and visual personalization profiles automatically.

---

## AdaptiveButton

The primary interactive element. Adapts size, padding, and focus indicators to the user's motor profile.

```jsx
import { AdaptiveButton } from "@aura-adaptive/aura-ui-adaptor";

<AdaptiveButton variant="primary" onClick={handleClick}>
  Save Changes
</AdaptiveButton>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"primary" \| "secondary" \| "ghost" \| "danger"` | `"primary"` | Visual style |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Base size (may be overridden by motor profile) |
| `disabled` | `boolean` | `false` | Disables the button |
| `onClick` | `function` | — | Click handler |
| `children` | `ReactNode` | — | Button label |

---

## AdaptiveInput

Adaptive text input. Scales height, font size, and padding based on visual and motor profiles.

```jsx
<AdaptiveInput
  type="text"
  label="Full Name"
  placeholder="Jane Doe"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `"text"` | HTML input type (`text`, `email`, `password`, etc.) |
| `label` | `string` | — | Visible label |
| `placeholder` | `string` | — | Placeholder text |
| `value` | `string` | — | Controlled value |
| `onChange` | `function` | — | Change handler |
| `disabled` | `boolean` | `false` | Disables the field |
| `error` | `string` | — | Inline error message |

---

## AdaptiveTextarea

Multi-line adaptive text input.

```jsx
<AdaptiveTextarea
  label="Message"
  placeholder="Type your message..."
  rows={4}
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>
```

---

## AdaptiveSelect

Adaptive select dropdown. Auto-expands touch target size for motor profiles.

```jsx
<AdaptiveSelect
  label="Country"
  options={[
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "in", label: "India" },
  ]}
  value={country}
  onChange={setCountry}
/>
```

---

## AdaptiveCheckbox

Accessible checkbox with adaptive target size.

```jsx
<AdaptiveCheckbox
  label="I agree to the terms and conditions"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>
```

---

## AdaptiveSwitch

Toggle switch — adapts size for motor profiles.

```jsx
<AdaptiveSwitch
  label="Enable notifications"
  checked={enabled}
  onChange={setEnabled}
/>
```

---

## Full Form Example

```jsx
import {
  AdaptiveProvider,
  AdaptiveInput,
  AdaptiveTextarea,
  AdaptiveSelect,
  AdaptiveCheckbox,
  AdaptiveButton,
} from "@aura-adaptive/aura-ui-adaptor";

function ContactForm() {
  return (
    <AdaptiveProvider>
      <form className="space-y-4">
        <AdaptiveInput label="Full Name" type="text" placeholder="Jane Doe" />
        <AdaptiveInput label="Email" type="email" placeholder="jane@example.com" />
        <AdaptiveTextarea label="Message" rows={4} />
        <AdaptiveSelect
          label="Topic"
          options={[
            { value: "support", label: "Support" },
            { value: "sales",   label: "Sales" },
          ]}
        />
        <AdaptiveCheckbox label="Subscribe to updates" />
        <AdaptiveButton variant="primary" type="submit">Send Message</AdaptiveButton>
      </form>
    </AdaptiveProvider>
  );
}
```

---

## Adaptive Behavior

| Profile | Form Adaptation |
|---------|----------------|
| Motor impairment | Larger inputs, increased touch targets, more spacing |
| Visual impairment | High-contrast borders, larger labels, prominent focus rings |
| Low literacy | Simplified placeholders, reduced visual clutter |
