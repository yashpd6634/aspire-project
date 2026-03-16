import homeIcon from "../../assets/Home.svg";
import cardIcon from "../../assets/Card.svg";
import paymentsIcon from "../../assets/Payments.svg";
import creditIcon from "../../assets/Credit.svg";
import accountIcon from "../../assets/Account.svg";

export interface NavItem {
  label: string;
  icon: string;
  path: string;
}

export const sidebarItems: NavItem[] = [
  { label: "Home", icon: homeIcon, path: "/home" },
  { label: "Cards", icon: cardIcon, path: "/cards" },
  { label: "Payments", icon: paymentsIcon, path: "/payments" },
  { label: "Credit", icon: creditIcon, path: "/credit" },
  { label: "Settings", icon: accountIcon, path: "/settings" },
];
