import homeIcon from "../assets/Home.svg";
import cardIcon from "../assets/Card.svg";
import paymentsIcon from "../assets/Payments.svg";
import creditIcon from "../assets/Credit.svg";
import accountIcon from "../assets/Account.svg";
import homeMobileIcon from "../assets/Logo_mb.svg";
import paymentsMobileIcon from "../assets/Payments_mb.svg";
import creditMobileIcon from "../assets/Credit_mb.svg";
import profileMobileIcon from "../assets/Account_mb.svg";

export interface NavItem {
  label: string;
  icon: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", icon: homeIcon, path: "/home" },
  { label: "Cards", icon: cardIcon, path: "/cards" },
  { label: "Payments", icon: paymentsIcon, path: "/payments" },
  { label: "Credit", icon: creditIcon, path: "/credit" },
  { label: "Settings", icon: accountIcon, path: "/settings" },
];

export const BOTTOM_NAV_ITEMS: NavItem[] = [
  { label: "Home", icon: homeMobileIcon, path: "/home" },
  { label: "Cards", icon: cardIcon, path: "/cards" },
  { label: "Payments", icon: paymentsMobileIcon, path: "/payments" },
  { label: "Credit", icon: creditMobileIcon, path: "/credit" },
  { label: "Profile", icon: profileMobileIcon, path: "/profile" },
];
