import React from "react";
import aspireLogo from "../../assets/Aspire Logo.svg";
import SidebarNavItem from "./SidebarNavItem";
import { sidebarItems } from "./sidebar.config";

const Sidebar: React.FC = () => {
  const activeItem = "Cards";

  return (
    <aside className="hidden md:flex w-[24.89vw] min-w-50 max-w-85 h-screen bg-[#0C365A] text-white py-12 flex-col sticky top-0 overflow-hidden shrink-0">
      <img
        src={aspireLogo}
        alt="Aspire"
        className="h-8.75 mx-12 mr-auto mb-5"
      />

      <p className="text-[15px] text-white/30 mx-12 leading-snug">
        Trusted way of banking for 3,000+ SMEs and startups in Singapore
      </p>

      <nav className="mt-25 flex flex-col gap-13">
        {sidebarItems.map((item) => (
          <SidebarNavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={activeItem === item.label}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
