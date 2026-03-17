import downArrow from "../../assets/down-arrow.svg";
import upArrow from "../../assets/up-arrow.svg";

interface AccordionProps {
  title: string;
  icon?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
}

// Header sub-component - can be used standalone if needed
const AccordionHeader: React.FC<{
  title: string;
  icon?: string;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ title, icon, isOpen, onToggle }) => (
  <div
    onClick={onToggle}
    className="flex justify-between items-center px-4 md:px-6 py-4 md:py-5 bg-[#F5F9FF] border border-[#F5F5F5] cursor-pointer hover:bg-[#EDF3FF] transition-colors rounded-t-none md:rounded-t-[10px]"
  >
    <div className="flex items-center gap-3">
      {icon && (
        <img
          src={icon}
          className="w-5 h-5 md:w-6 md:h-6"
          alt={title}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}
      <span className="text-[#0C365A] text-[13px] md:text-[14px] font-semibold">
        {title}
      </span>
    </div>
    <img
      src={isOpen ? upArrow : downArrow}
      className="w-5 h-5"
      alt={isOpen ? "collapse" : "expand"}
    />
  </div>
);

// Full Accordion with content
const Accordion: React.FC<AccordionProps> = ({
  title,
  icon,
  isOpen,
  onToggle,
  children,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-none md:rounded-[10px] overflow-hidden shadow-sm ${className}`}
    >
      <AccordionHeader
        title={title}
        icon={icon}
        isOpen={isOpen}
        onToggle={onToggle}
      />
      {isOpen && children}
    </div>
  );
};

// Export both for flexibility
export { Accordion, AccordionHeader };
export default Accordion;
