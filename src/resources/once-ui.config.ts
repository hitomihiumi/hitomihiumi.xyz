// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL = "https://hitomihiumi.xyz";

// Import and set font for each variant
import { Inter, Lexend, Sora } from "next/font/google";
import { Geist_Mono } from "next/font/google";

const heading = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Lexend({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Inter({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

const style = {
  theme: "dark",
  brand: "pink",
  accent: "custom",
  neutral: "gray",
  border: "playful",
  solid: "contrast",
  solidStyle: "flat",
  surface: "filled",
  transition: "all",
  scaling: "100", // 90 | 95 | 100 | 105 | 110
};

const dataStyle = {
  variant: "gradient", // flat | gradient | outline
  mode: "categorical", // categorical | divergent | sequential
  height: 24, // default chart height
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

const effects = {
  mask: {
    cursor: false,
    x: 0,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: false,
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    tilt: 0,
    colorStart: "scheme-accent-500",
    colorEnd: "static-transparent",
    opacity: 60,
  },
  dots: {
    display: false,
    size: "2",
    color: "brand-on-background-weak",
    opacity: 40,
  },
  lines: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
    thickness: 1,
    angle: 45,
    size: "8",
  },
  grid: {
    display: true,
    color: "scheme-accent-500",
    opacity: 70,
    width: "1rem",
    height: "1rem",
  },
};

// metadata for pages
const meta = {
  home: {
    path: "/",
    title: "Hitomi Hiumi",
    description: "Just my website of another developer.",
    image: "/images/og/hiumi.png",
    canonical: "https://hitomihiumi.xyz",
    robots: "index,follow",
    alternates: [{ href: "https://hitomihiumi.xyz", hrefLang: "en" }],
  },
  // add more routes and reference them in page.tsx
};

// default schema data
const schema = {
  logo: "",
  type: "WebSite",
  name: "Hitomi Hiumi",
  description: meta.home.description,
};

const routes = {
  "/": true,
  "/gallery": true,
  "/steam": true,
};

export { baseURL, fonts, style, meta, schema, effects, dataStyle, routes };
