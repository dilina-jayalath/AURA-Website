# Getting Started

AURA is an **adaptive UI framework for React** that personalizes user interfaces based on **visual, motor, and literacy diversity**.

It combines:
- Adaptive React UI components
- A personalization profile system
- Optional ML-driven backend integration
- Safe WCAG-aligned defaults

AURA is designed to work **out of the box** with demo profiles and seamlessly scale to **real-time personalization** powered by your own backend or AURA’s ML engine.

---

## What AURA Solves

Traditional UIs assume a “one-size-fits-all” user.  
AURA adapts interfaces dynamically to better support users with:

- Visual challenges (contrast, font size, color clarity)
- Motor challenges (target size, spacing, reduced precision)
- Literacy & computer-skill differences (simplified layouts, assistive hints)

All adaptations are **non-intrusive**, **ethically designed**, and **reversible**.

---

## Core Concepts

Before using AURA, it helps to understand three core ideas:

### 1. Adaptive Components

AURA provides drop-in React components (buttons, forms, tables, layouts, etc.) that automatically adapt based on personalization data.

```jsx
import { AdaptiveButton } from "@aura-adaptive/aura-ui-adaptor";

<AdaptiveButton>
  Continue
</AdaptiveButton>
