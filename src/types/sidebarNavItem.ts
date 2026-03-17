export interface SidebarNavItem {
  icon: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}