export type CanvasPalette = {
  foreground: string;
  foregroundSecondary: string;
  foregroundTertiary: string;
  foregroundQuaternary: string;
  editor: string;
  chrome: string;
  sidebar: string;
  elevated: string;
  fillPrimary: string;
  fillSecondary: string;
  fillTertiary: string;
  fillQuaternary: string;
  strokePrimary: string;
  strokeSecondary: string;
  strokeTertiary: string;
  strokeFocused: string;
  accent: string;
  buttonBackground: string;
  buttonForeground: string;
  buttonHoverBackground: string;
  link: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
};

export const paletteDark: CanvasPalette = {
  foreground: "#F0F0F0",
  foregroundSecondary: "#F0F0F0BD",
  foregroundTertiary: "#F0F0F099",
  foregroundQuaternary: "#F0F0F05C",
  editor: "#181818",
  chrome: "#141414",
  sidebar: "#1C1C1C",
  elevated: "#1E1E1E",
  fillPrimary: "#FFFFFF33",
  fillSecondary: "#FFFFFF24",
  fillTertiary: "#FFFFFF14",
  fillQuaternary: "#FFFFFF0F",
  strokePrimary: "#FFFFFF33",
  strokeSecondary: "#FFFFFF1F",
  strokeTertiary: "#FFFFFF14",
  strokeFocused: "#81A1C1",
  accent: "#81A1C1",
  buttonBackground: "#81A1C1",
  buttonForeground: "#141414",
  buttonHoverBackground: "#92B0CC",
  link: "#88C0D0",
  success: "#A3BE8C",
  warning: "#EBCB8B",
  danger: "#BF616A",
  info: "#88C0D0",
};

export const paletteLight: CanvasPalette = {
  foreground: "#141414",
  foregroundSecondary: "#141414BD",
  foregroundTertiary: "#14141499",
  foregroundQuaternary: "#1414145C",
  editor: "#FFFFFF",
  chrome: "#F3F3F3",
  sidebar: "#F7F7F7",
  elevated: "#FFFFFF",
  fillPrimary: "#14141433",
  fillSecondary: "#14141424",
  fillTertiary: "#14141414",
  fillQuaternary: "#1414140F",
  strokePrimary: "#14141433",
  strokeSecondary: "#1414141F",
  strokeTertiary: "#14141414",
  strokeFocused: "#3B6EA8",
  accent: "#3B6EA8",
  buttonBackground: "#3B6EA8",
  buttonForeground: "#FFFFFF",
  buttonHoverBackground: "#2F5A8A",
  link: "#2E79B5",
  success: "#2E7D4F",
  warning: "#9A6B12",
  danger: "#B42318",
  info: "#2E79B5",
};

export const typography = {
  fontFamily:
    '"IBM Plex Sans", "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
  monoFamily:
    '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  h1: { fontSize: "24px", lineHeight: "30px", fontWeight: 590 },
  h2: { fontSize: "18px", lineHeight: "24px", fontWeight: 590 },
  h3: { fontSize: "16px", lineHeight: "22px", fontWeight: 590 },
  body: { fontSize: "14px", lineHeight: "20px", fontWeight: 400 },
  small: { fontSize: "12px", lineHeight: "16px", fontWeight: 400 },
};
