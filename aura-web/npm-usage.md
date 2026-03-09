# Agent Guide

This repo is the AURA Adaptor NPM package for adaptive UI components in React.

Project notes:

- Tokens and ML profile types live in `src/types.ts`.
- Tokens are derived in `src/utils.ts` via `deriveTokensFromProfile`.
- Adaptive components consume `useAdaptive()` from `src/AdaptiveProvider.tsx`.
- Spacing tokens are `gapX/gapY` and `padX/padY` (numbers in px). Avoid `spacing.base`.

Conventions:

- Avoid object spread when merging style objects; use the manual merge pattern in components.
- Keep components resilient to missing props and rely on `AdaptiveComponentProps`.

## NPM package exports (`@aura-adaptive/aura-ui-adaptor`)

### Runtime exports

- `AdaptiveProvider`
- `useAdaptive`
- `predictFallbackTokens`
- `AdaptiveButton`
- `AdaptiveText`
- `AdaptiveTable`
- `AdaptiveCard`
- `AdaptiveNavbar`
- `AdaptiveGrid`
- `AdaptiveInput`
- `AdaptiveSelect`
- `AdaptiveTextarea`
- `AdaptiveMenu`
- `AdaptiveDropdown`
- `AdaptiveList`
- `AdaptivePagination`
- `AdaptiveAlert`
- `AdaptiveTooltip`
- `AdaptiveDrawer`
- `AdaptiveCheckbox`
- `AdaptiveSwitch`
- `AdaptiveDialog`

### Type exports

- `AuraProfileV2`
- `AuraMlEnvelopeV2`
- `AuraTokens`
- `AdaptiveContextValue`

## Developer integration steps

### 1) Install the package

```bash
npm install @aura-adaptive/aura-ui-adaptor
```

If your app does not already include React peer deps:

```bash
npm install react react-dom
```

### 2) Wrap your app with `AdaptiveProvider`

Use `simulateExtensionInstalled={true}` for local development without the browser extension.

```jsx
import React from "react";
import { AdaptiveProvider } from "@aura-adaptive/aura-ui-adaptor";
import App from "./App";

export default function Root() {
  return (
    <AdaptiveProvider simulateExtensionInstalled={true}>
      <App />
    </AdaptiveProvider>
  );
}
```

### 3) Import adaptive components in your JSX file

```jsx
import React from "react";
import { AdaptiveCard, AdaptiveText, AdaptiveButton } from "@aura-adaptive/aura-ui-adaptor";
```

### 4) Create a simple adaptive card (image + title + text + action button)

```jsx
import React from "react";
import { AdaptiveCard, AdaptiveText, AdaptiveButton } from "@aura-adaptive/aura-ui-adaptor";

export default function ProductCard() {
  return (
    <AdaptiveCard
      imageUrl="https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80"
      imageAlt="Smart water bottle on a desk"
      content={
        <>
          <AdaptiveText as="h3" variant="h3">
            Smart Water Bottle
          </AdaptiveText>
          <AdaptiveText>
            Tracks hydration throughout the day and syncs with your phone.
          </AdaptiveText>
        </>
      }
      actions={
        <AdaptiveButton
          label="Buy now"
          variant="primary"
          onClick={() => alert("Action clicked")}
        />
      }
    />
  );
}
```

### Sample Form

```jsx
<AdaptiveCard variant="content" detailed>
  <AdaptiveCard.Body>
    {error ? (
      <AdaptiveAlert
        variant="error"
        title="Login failed"
        message={error}
        filled={true}
        emphasis="text"
        role="alert"
      />
    ) : null}

    <form
      onSubmit={handleSubmit}
      style={{ display: "grid", gap: Math.max(12, spacing.gapY) }}
    >
      <AdaptiveInput
        type="email"
        label="Email"
        placeholder="you@novacart.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        helperText="Use the email linked to your NovaCart account."
        labelMode="visible"
        fullWidth={true}
      />

      <AdaptiveInput
        type="password"
        label="Password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
        helperText="Minimum 8 characters."
        labelMode="visible"
        fullWidth={true}
      />

      <AdaptiveCheckbox
        label="Remember this device"
        checked={rememberDevice}
        onChange={(next) => setRememberDevice(next)}
      />

      <AdaptiveButton variant="primary" type="submit">
        Login
      </AdaptiveButton>

      <AdaptiveText variant="caption" muted>
        Do not have an account?{" "}
        <Link to="/signup" style={{ color: colors.primary }}>
          Sign up
        </Link>
      </AdaptiveText>

      <div style={{ marginTop: 8 }}>
        <AdaptiveText variant="caption" muted>
          Test credentials:
        </AdaptiveText>
        <AdaptiveText variant="caption" muted>
          Admin: admin@novacart.com / password123
        </AdaptiveText>
        <AdaptiveText variant="caption" muted>
          User: user@novacart.com / password123
        </AdaptiveText>
      </div>
    </form>
  </AdaptiveCard.Body>
</AdaptiveCard>
```

## Sample navbar

```jsx
<AdaptiveNavbar sticky bordered>
  <AdaptiveNavbar.Brand>
    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
      <AdaptiveText variant="h3">NovaCart</AdaptiveText>
    </Link>
  </AdaptiveNavbar.Brand>

  <AdaptiveNavbar.Nav>
    <AdaptiveNavbar.Item as="a" href="#shop">
      Shop
    </AdaptiveNavbar.Item>

    {isAuthenticated && user?.role === "admin" && (
      <Link to="/admin" style={{ textDecoration: "none" }}>
        <AdaptiveNavbar.Item as="button" active={false}>
          Admin
        </AdaptiveNavbar.Item>
      </Link>
    )}

    <Link to="/cart" style={{ textDecoration: "none" }}>
      <AdaptiveNavbar.Item as="button">
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <BsCart3 style={{ fontSize: 18 }} />
          <span>Cart</span>
          <span
            style={{
              minWidth: 26,
              padding: "2px 8px",
              borderRadius: 9999,
              backgroundColor: colors.primary,
              color: colors.onPrimary || "#000",
              fontSize: 12,
              textAlign: "center",
            }}
          >
            {totalQuantity}
          </span>
        </span>
      </AdaptiveNavbar.Item>
    </Link>
  </AdaptiveNavbar.Nav>

  <AdaptiveNavbar.Spacer />

  <AdaptiveNavbar.Actions maxVisible={2}>
    {isAuthenticated ? (
      <>
        <AdaptiveText variant="caption" muted>
          Hi, {user?.name}
        </AdaptiveText>
        <AdaptiveButton variant="secondary" onClick={handleLogout}>
          Logout
        </AdaptiveButton>
      </>
    ) : (
      <Link to="/login" style={{ textDecoration: "none" }}>
        <AdaptiveButton variant="primary">Login</AdaptiveButton>
      </Link>
    )}
  </AdaptiveNavbar.Actions>
</AdaptiveNavbar>
```

## Sample table

```jsx
const basicRows = useMemo(
    () => [
      { id: 1, name: "Dinithi", role: "Admin", score: 92, status: "Active" },
      { id: 2, name: "Alex", role: "Editor", score: 80, status: "Active" },
      { id: 3, name: "Maya", role: "Viewer", score: 74, status: "Inactive" },
      { id: 4, name: "Ravi", role: "Editor", score: 88, status: "Active" },
    ],
    []
  );

  const basicColumns = useMemo(
    () => [
      { id: "name", header: "Name", accessor: "name", sortable: true },
      { id: "role", header: "Role", accessor: "role", sortable: true },
      { id: "status", header: "Status", accessor: "status", sortable: true },
      { id: "score", header: "Score", accessor: "score", sortable: true, align: "right" },
    ],
    []
  );
<AdaptiveTable
  variant="zebra"
  caption="Zebra Table"
  columns={basicColumns}
  data={basicRows}
  rowKey="id"
/>
```

## Sample 

## Adaptive components (19)

### AdaptiveAlert

- Adaptations: variant icon + color, text sizing for low literacy/high contrast, icon/text emphasis, optional auto-dismiss extended for visual assist.
- Tokens: colors(primary/secondary/accent/onPrimary/onSecondary/onAccent/surface/text/background), typography(basePx/body/lineHeight), spacing(padX/padY/gapX/gapY), flags(highContrast/layoutSimplification/tooltipAssist/reducedMotion).

### AdaptiveButton

- Adaptations: size uses `controls.minTargetSize`, padding from `spacing.padX/padY`, variant colors, reduced-motion hover scaling.
- Tokens: colors(primary/secondary/accent/onPrimary/onSecondary/onAccent/border/background), typography(body/lineHeight), spacing(padX/padY), controls(minTargetSize), flags(reducedMotion).

### AdaptiveCard

- Adaptations: layout simplification hides media/actions, padding/gaps from spacing, media sizing from target size, optional divider, high-contrast shadow removal.
- Tokens: colors(border/surface/text/background), spacing(padX/padY/gapX/gapY), controls(minTargetSize), flags(layoutSimplification/highContrast).

### AdaptiveCheckbox

- Adaptations: hit area >= min target size, box size from typography, label sizing, high-contrast colors.
- Tokens: colors(text/background/border/primary/onPrimary), typography(basePx/lineHeight), spacing(gapX), controls(minTargetSize), flags(highContrast).

### AdaptiveDialog

- Adaptations: responsive max width, gap scale, button min height, focus trap, close on Esc/backdrop, high-contrast border.
- Tokens: colors(text/surface/background/border), typography(basePx/lineHeight), spacing(pagePaddingX/gapX/gapY), controls(minTargetSize), flags(highContrast/reducedMotion).

### AdaptiveDrawer

- Adaptations: adaptive width (layout simplification), item spacing, close button size, Esc/backdrop close, high-contrast border.
- Tokens: colors(text/surface/background/border), typography(h3/baseSize/basePx/lineHeight), spacing(pagePaddingX/gapX/gapY/padX), controls(minTargetSize), flags(layoutSimplification/highContrast/reducedMotion).

### AdaptiveDropdown

- Adaptations: trigger size from min target, menu spacing, icon-only -> text for low literacy, high-contrast focus ring.
- Tokens: colors(text/background/surface/border/primary), typography(basePx/body/lineHeight), spacing(padX/padY/gapX/gapY), controls(minTargetSize), flags(theme/highContrast/layoutSimplification/tooltipAssist/reducedMotion).

### AdaptiveGrid

- Adaptations: column count reduces for simplify/motor, responsive min column width, gap from spacing.
- Tokens: spacing(gapX/gapY), controls(minTargetSize), flags(layoutSimplification).

### AdaptiveInput

- Adaptations: label modes (visible/placeholder/hidden), input height from min target + typography, label gap, error visibility, focus ring.
- Tokens: colors(text/background/surface/border/primary/accent), typography(basePx/body/caption/lineHeight), spacing(padX/padY/gapY), controls(minTargetSize), flags(layoutSimplification/reducedMotion).

### AdaptiveList

- Adaptations: default avatar/icon markers, larger spacing for motor/low literacy, marker emphasis in high contrast, numbered variant uses native markers.
- Tokens: colors(text/border/surface/primary/onPrimary/secondary), typography(body/caption/basePx/lineHeight), spacing(legacy x/y/base/paddingY or current gapY/padY), controls(minTargetSize), flags(highContrast/layoutSimplification).

### AdaptiveMenu

- Adaptations: item height from target size, menu spacing, grouping/dividers, compact text in simplified mode, inline examples when tooltip assist is on.
- Tokens: colors(text/surface/border/primary/secondary/background), typography(body/caption/lineHeight), spacing(padX/padY/gapX/gapY), controls(minTargetSize), flags(layoutSimplification/tooltipAssist/highContrast/reducedMotion/theme).

### AdaptiveNavbar

- Adaptations: height from min target + spacing, simplified actions, nav spacing, high-contrast border.
- Tokens: colors(text/surface/border/background/primary), typography(h3/body/lineHeight), spacing(padX/padY/gapX/gapY), controls(minTargetSize), flags(layoutSimplification/highContrast/reducedMotion).

### AdaptivePagination

- Adaptations: button size from min target, spacing, optional page numbers/arrows/prev-next text, low literacy hides text by default, link or button rendering.
- Tokens: colors(primary/onPrimary/border/surface/text), typography(basePx/body/lineHeight), spacing(padX/padY/gapX), controls(minTargetSize), flags(layoutSimplification/tooltipAssist/highContrast/reducedMotion).

### AdaptiveSelect

- Adaptations: select height from min target, option spacing, placeholder clarity, label visibility, error visibility.
- Tokens: colors(text/background/surface/border/primary/accent), typography(basePx/body/caption/lineHeight), spacing(padX/padY/gapY), controls(minTargetSize), flags(theme/highContrast/reducedMotion).

### AdaptiveSwitch

- Adaptations: track/thumb sizing from typography + target size, large hit area, optional ON/OFF text, focus ring, high-contrast borders.
- Tokens: colors(primary/border/surface/background/text), typography(basePx/lineHeight), spacing(gapX/gapY), controls(minTargetSize), flags(highContrast/reducedMotion).

### AdaptiveTable

- Adaptations: density (compact/normal/spacious) based on spacing, sortable/paginated, image sizing from target size, zebra rows per theme.
- Tokens: colors(border/surface/text/background/primary/secondary), typography(body/caption/lineHeight), spacing(padX/padY/gapX/gapY), controls(minTargetSize), flags(highContrast/theme).

### AdaptiveText

- Adaptations: variant-based sizing, muted text in non-high-contrast, code block styling with spacing padding, truncation/clamp.
- Tokens: colors(text/secondary/surface), typography(basePx/baseSize/h1/h2/h3/body/caption/lineHeight), spacing(padX/padY), flags(highContrast).

### AdaptiveTextarea

- Adaptations: height/rows, line spacing, resize mode (motor friendly), inline example placeholders for low literacy, focus ring.
- Tokens: colors(text/background/surface/border/primary), typography(basePx/body/caption/lineHeight), spacing(padX/padY/gapY), controls(minTargetSize), flags(layoutSimplification/tooltipAssist/highContrast/reducedMotion).

### AdaptiveTooltip

- Adaptations: trigger auto (hover vs click), text size and delay by tooltip assist/reduced motion, placement top/bottom.
- Tokens: colors(text/background), typography(basePx/lineHeight), spacing(padX/padY), flags(tooltipAssist/layoutSimplification/reducedMotion/highContrast).
