import freezeIcon from "../../assets/Freeze card.svg";
import spendLimitIcon from "../../assets/Set spend limit.svg";
import gpayIcon from "../../assets/GPay.svg";
import replaceIcon from "../../assets/Replace card.svg";
import deactivateIcon from "../../assets/Deactivate card.svg";

interface Props {
  frozen: boolean;
  onFreeze: () => void;
}

const CardActions: React.FC<Props> = ({ frozen, onFreeze }) => {
  const actions = [
    {
      icon: freezeIcon,
      label: frozen ? "Unfreeze card" : "Freeze card",
      onClick: onFreeze,
      active: frozen,
    },
    {
      icon: spendLimitIcon,
      label: "Set spend limit",
      onClick: () => {},
      active: false,
    },
    {
      icon: gpayIcon,
      label: "Add to GPay",
      onClick: () => {},
      active: false,
    },
    {
      icon: replaceIcon,
      label: "Replace card",
      onClick: () => {},
      active: false,
    },
    {
      icon: deactivateIcon,
      label: "Cancel card",
      onClick: () => {},
      active: false,
    },
  ];

  return (
    <div className="flex justify-between items-start py-4 md:py-5 px-4 md:px-6 bg-[#EDF3FF] rounded-b-[12px] mt-[-8px]">
      {actions.map((action, i) => (
        <button
          key={i}
          onClick={action.onClick}
          className="flex flex-col items-center gap-1.5 md:gap-2 text-[11px] md:text-[13px] text-[#0C365A] hover:opacity-80 transition-opacity w-[54px] md:w-[64px]"
        >
          <div className="w-8 h-8 rounded-full bg-[#325BAF] flex items-center justify-center">
            <img
              src={action.icon}
              className="w-5 h-5 md:w-6 md:h-6"
              alt={action.label}
            />
          </div>
          <span className="text-center leading-tight">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CardActions;
