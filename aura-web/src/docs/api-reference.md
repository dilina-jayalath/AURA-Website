# API Reference

Core exports from `@aura/aura-adaptor`.

## AuraProvider

```ts
type AuraProviderProps = {
  profile: Profile;
  tokens?: AuraTokens;
  children: React.ReactNode;
};
```

## useAura

```ts
type UseAura = {
  profile: Profile;
  setProfile: (next: Profile | ((prev: Profile) => Profile)) => void;
};
```

## Adaptive Components

All adaptive components accept:

- `intent`: visual emphasis
- `density`: spacing preset
- `disabled`: boolean

Examples:

```jsx
<AdaptiveButton intent="primary">Save</AdaptiveButton>
<AdaptiveCard density="relaxed" />
```
