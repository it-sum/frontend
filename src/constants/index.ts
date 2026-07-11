export const NavLinks = {
  FEATURES: "/features",
  RESOURCES: "/resources",
  SOLUTIONS: "/solutions",
  COMMUNITY: "/community",
  PRICING: "/pricing",
  ABOUT: "/about",
  LOGIN: "/login",
  GET_STARTED: "/get-started",
} as const;

export const NavLinksArray = [
  { label: "Features", href: NavLinks.FEATURES },
  { label: "Resources", href: NavLinks.RESOURCES },
  { label: "Solutions", href: NavLinks.SOLUTIONS },
  { label: "Community", href: NavLinks.COMMUNITY },
  { label: "Pricing", href: NavLinks.PRICING },
  { label: "About", href: NavLinks.ABOUT },
];
