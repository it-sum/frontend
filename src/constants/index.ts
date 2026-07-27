export const NavLinks = {
  HOME: "/",
  RESOURCES: "/resources",
  DEPARTMENTS: "/departments",
  ABOUT: "/about",
  CONTACT: "/contact",
  LOGIN: "/login",
} as const;

export const NavLinksArray = [
  { label: "Home", href: NavLinks.HOME },
  { label: "Departments", href: NavLinks.DEPARTMENTS },
  { label: "Resources", href: NavLinks.RESOURCES },
  { label: "About", href: NavLinks.ABOUT },
  { label: "Contact", href: NavLinks.CONTACT },
];
