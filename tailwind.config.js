const relumeTailwind = require("@relume_io/relume-tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [relumeTailwind],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "480px",
        md: "768px",
        lg: "992px",
        xl: "1280px",
      },
    },
    extend: {
      gradientColorStops: ({ theme }) => theme("colors"),
      spacing: {
        16: "var(--space-section-sm)",
        24: "var(--space-section-md)",
        28: "var(--space-section-lg)",
      },
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
        background: {
          DEFAULT: "var(--color-background-primary)",
          primary: "var(--color-background-primary)",
          secondary: "var(--color-background-secondary)",
          tertiary: "var(--color-background-tertiary)",
          alternative: "var(--color-background-alternative)",
        },
        border: {
          DEFAULT: "var(--color-border-primary)",
          primary: "var(--color-border-primary)",
          secondary: "var(--color-border-secondary)",
          alternative: "var(--color-border-alternative)",
        },
        text: {
          DEFAULT: "var(--color-text-primary)",
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          alternative: "var(--color-text-alternative)",
        },
        link: {
          DEFAULT: "var(--color-text-primary)",
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          alternative: "var(--color-text-alternative)",
        },
        brand: {
          black: "var(--color-background-alternative)",
          white: "var(--color-text-alternative)",
        },
        scheme: {
          background: "var(--scheme-background)",
          foreground: "var(--scheme-foreground)",
          text: "var(--scheme-text)",
          border: "var(--scheme-border)",
          "btn-text": "var(--scheme-button-text)",
        },
      },
      fontFamily: {
        sans: "var(--font-sans)",
        display: "var(--font-display)",
      },
      borderRadius: {
        button: "var(--radius-button)",
        card: "var(--radius-card)",
        image: "var(--radius-image)",
        form: "var(--radius-form)",
        badge: "var(--radius-badge)",
        checkbox: "var(--radius-control)",
        carousel: "var(--radius-card)",
        dropdown: "var(--radius-control)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        small: "var(--shadow-card)",
        medium: "var(--shadow-card)",
        large: "var(--shadow-card)",
      },
    },
  },
};
