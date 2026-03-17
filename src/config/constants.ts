// Brand Colors
export const COLORS = {
  primary: "#01D167",
  primaryHover: "#00b858",
  primaryLight: "#EDFFF5",
  primaryLightHover: "#01D1671A",

  secondary: "#0C365A",
  secondaryLight: "#1a4a7a",

  accent: "#23CEFD",
  button: "#325BAF",

  // UI Colors
  background: "#F5F9FF",
  backgroundHover: "#EDF3FF",
  cardActions: "#EDF3FF",

  // Text Colors
  textPrimary: "#222222",
  textSecondary: "#AAAAAA",
  textMuted: "#666666",
  textDisabled: "#DDDDDD",

  // Border Colors
  border: "#F0F0F0",
  borderLight: "#F5F5F5",
  borderCard: "#FCFCFC",

  // Transaction icon backgrounds
  transactionBlue: "#009DFF1A",
  transactionGreen: "#00D6B51A",
  transactionPink: "#F251951A",

  // Status Colors
  error: "#EF4444",
  errorLight: "#FEE2E2",
  success: "#01D167",

  white: "#FFFFFF",
  black: "#000000",
} as const;

// Default card colors
export const CARD_COLORS = [
  "#01D167", // Green
  "#0C365A", // Dark Blue
  "#325BAF", // Button Blue
  "#23CEFD", // Accent Blue
] as const;

// Animation durations (in ms)
export const ANIMATION = {
  fast: 150,
  normal: 200,
  slow: 300,
} as const;

// Breakpoints (for reference - actual breakpoints in Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

// Z-index scale
export const Z_INDEX = {
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
} as const;

// Card number formatting
export const CARD_NUMBER_GROUP_SIZE = 4;
export const CARD_CVV_LENGTH = 3;

// Balance (hardcoded for now - would come from API)
export const DEFAULT_BALANCE = 3000;
export const CURRENCY_SYMBOL = "S$";
