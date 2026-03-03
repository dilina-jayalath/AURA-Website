import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AdaptiveProvider,
  AdaptiveNavbar,
  AdaptiveText,
  AdaptiveInput,
  AdaptiveTextarea,
  AdaptiveSelect,
  AdaptiveTooltip,
  AdaptiveCard,
  AdaptiveTable,
} from "@aura/aura-adaptor";
import auraTextLogo from "../../assets/images/image.jpg";

const USER_TYPES = ["Baseline", "Visual", "Motor", "Low literacy"];
const PREVIEW_COMPONENTS = [
  { value: "navbar", label: "Navbar" },
  { value: "form", label: "Form" },
  { value: "card", label: "Card" },
  { value: "table", label: "Table" },
];

const BASE_PROFILE = {
  font_size: 14,
  line_height: 1.4,
  contrast_mode: "normal",
  primary_color: "#2563eb",
  primary_color_content: "#ffffff",
  secondary_color: "#0ea5e9",
  secondary_color_content: "#ffffff",
  accent_color: "#f97316",
  accent_color_content: "#111111",
  theme: "light",
  element_spacing_x: 10,
  element_spacing_y: 10,
  element_padding_x: 12,
  element_padding_y: 10,
  reduced_motion: false,
  target_size: 24,
  tooltip_assist: false,
  layout_simplification: false,
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function buildProfile(type, severity) {
  const scale = clamp(severity, 0, 100) / 100;
  const profile = { ...BASE_PROFILE };

  if (type === "Visual") {
    profile.font_size = Math.round(14 + scale * 8);
    profile.line_height = 1.45 + 0.12 * scale;
    profile.contrast_mode = scale >= 0.35 ? "high" : "normal";
    profile.theme = scale >= 0.6 ? "dark" : "light";
    profile.tooltip_assist = scale >= 0.5;
  } else if (type === "Motor") {
    profile.target_size = Math.round(24 + scale * 28);
    profile.element_spacing_x = Math.round(10 + scale * 10);
    profile.element_spacing_y = Math.round(10 + scale * 12);
    profile.element_padding_x = Math.round(12 + scale * 12);
    profile.element_padding_y = Math.round(10 + scale * 10);
    profile.line_height = 1.42 + 0.08 * scale;
  } else if (type === "Low literacy") {
    profile.font_size = Math.round(14 + scale * 5);
    profile.line_height = 1.48 + 0.1 * scale;
    profile.layout_simplification = scale >= 0.25;
    profile.tooltip_assist = scale >= 0.2;
    profile.element_spacing_y = Math.round(10 + scale * 10);
    profile.target_size = Math.round(24 + scale * 10);
    profile.contrast_mode = scale >= 0.7 ? "high" : "normal";
  } else {
    profile.font_size = Math.round(14 + scale * 2);
    profile.line_height = 1.4 + 0.05 * scale;
    profile.target_size = Math.round(24 + scale * 4);
    profile.element_spacing_x = Math.round(10 + scale * 4);
    profile.element_spacing_y = Math.round(10 + scale * 4);
  }

  return profile;
}

function buildEnvelope(profile) {
  return {
    profile: {
      user_id: "sim_user",
      metadata: {
        origin: "category",
        created_at: new Date().toISOString(),
        confidence_overall: 0.76,
        version: 1,
      },
      profile,
    },
  };
}

function PreviewBlock({ title, children }) {
  return (
    <div className="rounded-2xl border border-primary/25 bg-base-100/70 p-4 shadow-sm">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
        {title}
      </p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function SimulationLab() {
  const [userType, setUserType] = useState("Baseline");
  const [severity, setSeverity] = useState(40);
  const [activePreview, setActivePreview] = useState("navbar");

  const profile = useMemo(() => buildProfile(userType, severity), [userType, severity]);
  const envelope = useMemo(() => buildEnvelope(profile), [profile]);

  const envelopeRef = useRef(envelope);
  useEffect(() => {
    envelopeRef.current = envelope;
  }, [envelope]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return undefined;
    const respond = (type, requestId, payload) => {
      if (!requestId) return;
      window.postMessage({ __aura: true, type, requestId, payload }, "*");
    };

    const onMessage = (event) => {
      const data = event?.data;
      if (!data || data.__aura !== true) return;

      if (data.type === "AURA_EXT_PING") {
        respond("AURA_EXT_PONG", data.requestId, { ok: true });
        return;
      }

      if (data.type === "AURA_EXT_GET_USER_ID") {
        respond("AURA_EXT_USER_ID", data.requestId, { userId: "sim_user" });
        return;
      }

      if (data.type === "AURA_EXT_GET_ML_PROFILE") {
        respond("AURA_EXT_ML_PROFILE", data.requestId, envelopeRef.current);
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.postMessage({ __aura: true, type: "AURA_EXT_PROFILE_CHANGED" }, "*");
  }, [userType, severity]);

  const tableRows = useMemo(
    () => [
      { id: 1, component: "Navbar", status: "Adjusted", priority: "High" },
      { id: 2, component: "Forms", status: "Review", priority: "Medium" },
      { id: 3, component: "Tables", status: "Adjusted", priority: "Low" },
    ],
    []
  );

  const tableColumns = useMemo(
    () => [
      { id: "component", header: "Component", accessor: "component", sortable: true },
      { id: "status", header: "Status", accessor: "status", sortable: true },
      {
        id: "priority",
        header: "Priority",
        accessor: "priority",
        sortable: true,
        align: "right",
      },
    ],
    []
  );

  const previewContent = useMemo(() => {
    if (activePreview === "form") {
      return (
        <PreviewBlock title="Adaptive Form">
          <AdaptiveCard variant="content" detailed>
            <AdaptiveCard.Body>
              <AdaptiveText variant="h4">Profile settings</AdaptiveText>
              <AdaptiveInput
                label="Profile name"
                placeholder="AURA demo profile"
                helperText="Visible to your dev team only."
              />
              <AdaptiveSelect
                label="Target category"
                options={USER_TYPES.map((type) => ({ value: type, label: type }))}
                helperText="Matches the simulation controls."
              />
              <AdaptiveTextarea
                label="Adaptation notes"
                placeholder="Explain the scenario"
                rows={3}
                helperText="Short, clear notes improve handoffs."
              />
              <AdaptiveTooltip text="Tooltip assistance appears for low literacy profiles.">
                <AdaptiveText as="span" variant="caption" muted>
                  See helper tips
                </AdaptiveText>
              </AdaptiveTooltip>
            </AdaptiveCard.Body>
          </AdaptiveCard>
        </PreviewBlock>
      );
    }

    if (activePreview === "card") {
      const imageFrameStyle = {
        padding: `${Math.max(8, Math.round(profile.element_padding_y * 0.6))}px`,
      };

      return (
        <PreviewBlock title="Adaptive Card">
          <AdaptiveCard variant="data" detailed>
            <AdaptiveCard.Body>
              <AdaptiveText variant="h4">Session summary</AdaptiveText>
              <AdaptiveText muted>
                3 critical contrast checks completed. 2 motor adjustments pending.
              </AdaptiveText>
              <div
                className={`mt-0 mx-40 rounded-xl border bg-base-100/10 `}
                style={imageFrameStyle}
              >
                <img
                  src={auraTextLogo}
                  alt="AURA adaptation preview"
                  className="h-36 w-full rounded-md object-contain"
                />
              </div>
              <AdaptiveCard.Divider />
              <AdaptiveText variant="caption" muted>
                Simplified layouts hide secondary details when needed.
              </AdaptiveText>
            </AdaptiveCard.Body>
            <AdaptiveCard.Actions maxVisible={2}>
              <AdaptiveText as="span" variant="caption" weight="semibold">
                Priority: High
              </AdaptiveText>
              <AdaptiveText as="span" variant="caption" muted>
                Review in Lab
              </AdaptiveText>
            </AdaptiveCard.Actions>
          </AdaptiveCard>
        </PreviewBlock>
      );
    }

    if (activePreview === "table") {
      return (
        <PreviewBlock title="Adaptive Table">
          <AdaptiveTable
            variant="zebra"
            caption="Component readiness"
            columns={tableColumns}
            data={tableRows}
            rowKey="id"
          />
        </PreviewBlock>
      );
    }

    return (
      <PreviewBlock title="Adaptive Navbar">
        <AdaptiveNavbar bordered>
          <AdaptiveNavbar.Brand>
            <AdaptiveText variant="h3">AURA Studio</AdaptiveText>
          </AdaptiveNavbar.Brand>
          <AdaptiveNavbar.Nav>
            <AdaptiveNavbar.Item as="a" href="#overview">
              Overview
            </AdaptiveNavbar.Item>
            <AdaptiveNavbar.Item as="a" href="#docs">
              Docs
            </AdaptiveNavbar.Item>
          </AdaptiveNavbar.Nav>
          <AdaptiveNavbar.Spacer />
          <AdaptiveNavbar.Actions maxVisible={2}>
            <AdaptiveText variant="caption" muted>
              Developer
            </AdaptiveText>
            <span className="rounded-full bg-primary/10 px-2 py-1 text-[11px] text-primary">
              Sandbox
            </span>
          </AdaptiveNavbar.Actions>
        </AdaptiveNavbar>
      </PreviewBlock>
    );
  }, [activePreview, profile, tableColumns, tableRows]);

  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-slate-200">Simulation Lab</p>
        <p className="text-xs text-slate-400">
          Preview how AURA adapts UI for each user type without real user data.
        </p>
      </div>

      <div className="grid gap-4">
        <div className="rounded-2xl border border-primary/30 bg-base-200/60 p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Controls
          </p>

          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-slate-200">
                View as user type
              </span>
              <select
                value={userType}
                onChange={(event) => setUserType(event.target.value)}
                className="mt-1.5 w-full rounded-lg border border-base-300 bg-base-100/70 px-3 py-2 text-sm text-slate-100"
              >
                {USER_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-200">
                Severity slider
              </span>
              <div className="mt-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={severity}
                  onChange={(event) => setSeverity(Number(event.target.value))}
                  className="range range-primary"
                />
                <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Testing knob only. No real user data is used here.
              </p>
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-primary/30 bg-base-200/60 p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Live preview
              </p>
              <p className="text-xs text-slate-400">
                Select a component to inspect adaptive changes.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={activePreview}
                onChange={(event) => setActivePreview(event.target.value)}
                className="rounded-lg border border-base-300 bg-base-100/70 px-3 py-2 text-xs text-slate-100"
              >
                {PREVIEW_COMPONENTS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                {userType} · {severity}%
              </span>
            </div>
          </div>

          <div className="mt-5">
            <AdaptiveProvider
              simulateExtensionInstalled={false}
              showExtensionPrompt={false}
            >
              {previewContent}
            </AdaptiveProvider>
          </div>
        </div>
      </div>
    </section>
  );
}
