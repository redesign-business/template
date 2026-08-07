const relumeTailwind = require("@relume_io/relume-tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [relumeTailwind],
  theme: {
    extend: {
      gradientColorStops: ({ theme }) => theme("colors"),
      fontSize: {
        h1: ["3.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h2: ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h3: ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h4: ["2rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        h5: ["1.5rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        h6: ["1.25rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        large: ["1.25rem", { lineHeight: "1.5" }],
        medium: ["1.125rem", { lineHeight: "1.5" }],
        regular: ["1rem", { lineHeight: "1.5" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        tiny: ["0.75rem", { lineHeight: "1.5" }],
      },
      colors: {
        scheme: {
          background: "var(--scheme-background)",
          foreground: "var(--scheme-foreground)",
          text: "var(--scheme-text)",
          border: "var(--scheme-border)",
          "btn-text": "var(--scheme-button-text)",
        },
      },
      borderRadius: {
        button: "0rem",
        card: "0rem",
        image: "0rem",
        form: "0rem",
        badge: "0rem",
        checkbox: "0rem",
        carousel: "0rem",
        dropdown: "0rem",
      },
    },
  },
};
