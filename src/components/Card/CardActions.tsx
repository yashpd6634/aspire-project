import freezeIcon from "../../assets/Freeze card.svg";
import spendLimitIcon from "../../assets/Set spend limit.svg";
import gpayIcon from "../../assets/GPay.svg";
import replaceIcon from "../../assets/Replace card.svg";
import deactivateIcon from "../../assets/Deactivate card.svg";

interface Props {
  frozen: boolean;
  onFreeze: () => void;
}

// Individual action button component
const ActionButton: React.FC<{
  icon: string;
  label: string;
  onClick: () => void;
}> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center cursor-pointer text-center text-[13px] leading-[1.2] text-[#0C365A] hover:opacity-80 transition-opacity"
  >
    <img src={icon} className="w-8 h-8 mb-1.75" alt={label} />
    <span
      className="whitespace-pre-line"
      dangerouslySetInnerHTML={{ __html: label.replace(" ", "<br/>") }}
    />
  </button>
);

const CardActions: React.FC<Props> = ({ frozen, onFreeze }) => {
  const actions = [
    {
      icon: freezeIcon,
      label: frozen ? "Unfreeze card" : "Freeze card",
      onClick: onFreeze,
    },
    {
      icon: spendLimitIcon,
      label: "Set spend limit",
      onClick: () => {},
    },
    {
      icon: gpayIcon,
      label: "Add to GPay",
      onClick: () => {},
    },
    {
      icon: replaceIcon,
      label: "Replace card",
      onClick: () => {},
    },
    {
      icon: deactivateIcon,
      label: "Cancel card",
      onClick: () => {},
    },
  ];

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
