import homeIcon from "../../assets/Home.svg";
import cardIcon from "../../assets/Card.svg";
import paymentsIcon from "../../assets/Payments.svg";
import creditIcon from "../../assets/Credit.svg";
import accountIcon from "../../assets/Account.svg";

const navItems = [
  { label: "Home", icon: homeIcon, path: "/home" },
  { label: "Cards", icon: cardIcon, path: "/cards" },
  { label: "Payments", icon: paymentsIcon, path: "/payments" },
  { label: "Credit", icon: creditIcon, path: "/credit" },
  { label: "Profile", icon: accountIcon, path: "/profile" },
];

const BottomNav = () => {
  const activeItem = "Cards";

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#F0F0F0] px-4 py-2 md:hidden z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activeItem === item.label;
          return (
            <button
              key={item.label}
              className="flex flex-col items-center gap-1 p-2 min-w-15"
            >
              <img
                src={item.icon}
                alt={item.label}
                className={`w-6 h-6 ${isActive ? "brightness-0 invert-[.45] sepia saturate-[20] hue-rotate-100" : "opacity-40"}`}
              />
              <span
                className={`text-[9px] font-semibold ${
                  isActive ? "text-[#01D167]" : "text-[#222222]/40"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
