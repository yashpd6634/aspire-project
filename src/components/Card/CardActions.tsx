import { useMemo, memo } from "react";
import freezeIcon from "../../assets/Freeze card.svg";
import spendLimitIcon from "../../assets/Set spend limit.svg";
import gpayIcon from "../../assets/GPay.svg";
import replaceIcon from "../../assets/Replace card.svg";
import deactivateIcon from "../../assets/Deactivate card.svg";
import { COLORS } from "../../config";

interface Props {
  frozen: boolean;
  onFreeze: () => void;
}

const ActionButton = memo<{
  icon: string;
  label: string;
  onClick: () => void;
}>(({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center cursor-pointer text-center text-[13px] leading-[1.2] text-[${COLORS.secondary}] hover:opacity-80 transition-opacity`}
  >
    <img src={icon} className="w-8 h-8 mb-1.75" alt={label} />
    <span className="whitespace-pre-line">{label}</span>
  </button>
));

ActionButton.displayName = "ActionButton";

const CardActions: React.FC<Props> = ({ frozen, onFreeze }) => {
  const actions = useMemo(
    () => [
      {
        icon: freezeIcon,
        label: frozen ? "Unfreeze\ncard" : "Freeze\ncard",
        onClick: onFreeze,
      },
      {
        icon: spendLimitIcon,
        label: "Set spend\nlimit",
        onClick: () => {},
      },
      {
        icon: gpayIcon,
        label: "Add to\nGPay",
        onClick: () => {},
      },
      {
        icon: replaceIcon,
        label: "Replace\ncard",
        onClick: () => {},
      },
      {
        icon: deactivateIcon,
        label: "Cancel\ncard",
        onClick: () => {},
      },
    ],
    [frozen, onFreeze],
  );

  return (
    <div className="flex justify-around items-center bg-[#EDF3FF] mx-0 md:mx-5 p-5 h-29 rounded-t-2xl rounded-b-none md:rounded-2xl">
      {actions.map((action, i) => (
        <ActionButton
          key={i}
          icon={action.icon}
          label={action.label}
          onClick={action.onClick}
        />
      ))}
    </div>
  );
};

export default CardActions;
