import React from "react";
import clsx from "clsx";

interface Props {
  icon: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarNavItem: React.FC<Props> = ({ icon, label, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center px-12 py-2 mb-15 cursor-pointer transition-colors"
    >
      <img src={icon} alt={label} className="w-6 h-6 mr-4" />

      <span
        className={clsx(
          "text-[16px] font-medium",
          active ? "text-[#01D167]" : "text-white hover:text-[#01D167]",
        )}
      >
        {label}
      </span>
    </div>
  );
};

export default React.memo(SidebarNavItem);
