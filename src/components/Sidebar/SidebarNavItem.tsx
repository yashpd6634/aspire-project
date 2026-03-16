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
      className={clsx(
        "flex items-center px-12 py-4 cursor-pointer transition-colors",
        active ? "bg-[#0C365A]" : "hover:bg-white/5",
      )}
    >
      <img
        src={icon}
        alt={label}
        className={clsx(
          "w-6 h-6 mr-4",
          active &&
            "brightness-0 invert-[.45] sepia saturate-[20] hue-rotate-[100deg]",
        )}
      />

      <span
        className={clsx(
          "text-[16px] font-medium",
          active ? "text-[#01D167]" : "text-white",
        )}
      >
        {label}
      </span>
    </div>
  );
};

export default React.memo(SidebarNavItem);
