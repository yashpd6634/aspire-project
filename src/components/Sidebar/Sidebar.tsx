import React from "react";
import aspireLogo from "../../assets/Aspire Logo.svg";
import SidebarNavItem from "./SidebarNavItem";
import { sidebarItems } from "./sidebar.config";

const Sidebar: React.FC = () => {
  const activeItem = "Cards";

  return (
    <aside className="w-[340px] min-w-[340px] h-screen bg-[#0C365A] text-white py-12 flex flex-col sticky top-0">
      <img src={aspireLogo} alt="Aspire" className="h-[35px] ml-12 mr-8 mb-5" />

      <p className="text-[15px] text-white/30 mx-12 leading-relaxed">
        Trusted way of banking for 3,000+ SMEs and startups in Singapore
      </p>

      <nav className="mt-16 flex-1">
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
