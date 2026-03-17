import homeIcon from "../assets/Home.svg";
import cardIcon from "../assets/Card.svg";
import paymentsIcon from "../assets/Payments.svg";
import creditIcon from "../assets/Credit.svg";
import accountIcon from "../assets/Account.svg";

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

// Bottom nav uses different label for last item
export const BOTTOM_NAV_ITEMS: NavItem[] = NAV_ITEMS.map((item) =>
  item.label === "Settings"
    ? { ...item, label: "Profile", path: "/profile" }
    : item,
);
