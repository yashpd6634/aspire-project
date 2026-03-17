import downArrow from "../../assets/down-arrow.svg";
import upArrow from "../../assets/up-arrow.svg";

interface Props {
  title: string;
  icon: string;
  isOpen?: boolean;
  onClick?: () => void;
}

const TransactionHeader: React.FC<Props> = ({
  title,
  icon,
  isOpen,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-between items-center px-4 md:px-6 py-4 md:py-5 bg-[#F5F9FF] border border-[#F5F5F5] cursor-pointer hover:bg-[#EDF3FF] transition-colors rounded-t-[10px]"
    >
      <div className="flex items-center gap-3">
        <img
          src={icon}
          className="w-5 h-5 md:w-6 md:h-6"
          alt={title}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
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
};

export default TransactionHeader;
