# Personalization

AURA uses a profile object to adapt components. You can supply static data, update it in real time, or fetch it from a backend.

## Profile Shape

```js
const profile = {
  textScale: 1.2,
  contrast: "high",
  spacing: "relaxed",
  targetSize: "large",
  reduceMotion: true,
};
```

## Update on the Fly

```jsx
const { setProfile } = useAura();

setProfile((prev) => ({
  ...prev,
  contrast: "high",
}));
```

## Personalization Signals

You can map your own signals to AURA tokens:

| Signal | Example | Token |
| --- | --- | --- |
| Vision | prefers high contrast | `contrast` |
| Motor | low precision input | `targetSize` |
| Literacy | short attention | `density` |

## Safe Defaults

If a field is missing, AURA falls back to safe defaults that preserve accessibility.
