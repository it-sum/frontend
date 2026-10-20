import { APP_ROUTES } from "./variables";

export * from "./variables";

export const NavLinks = {
  HOME: APP_ROUTES.HOME,
  RESOURCES: APP_ROUTES.RESOURCES,
  DEPARTMENTS: APP_ROUTES.DEPARTMENTS,
  ABOUT: APP_ROUTES.ABOUT,
  CONTACT: APP_ROUTES.CONTACT,
  LOGIN: APP_ROUTES.LOGIN,
} as const;

export const NavLinksArray = [
  { label: "Home", href: NavLinks.HOME },
  { label: "Departments", href: NavLinks.DEPARTMENTS },
  { label: "Resources", href: NavLinks.RESOURCES },
  { label: "About", href: NavLinks.ABOUT },
  { label: "Contact", href: NavLinks.CONTACT },
];
