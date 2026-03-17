import addIcon from "../../assets/add.svg";
import addBlueIcon from "../../assets/box.svg";
import aspireMiniLogo from "../../assets/Logo1.svg";
import { CARD_TABS } from "../../config";
import CardTabs from "./CardTabs";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNewCard: () => void;
}

const CardBalance: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  onNewCard,
}) => {
  return (
    <div className="mb-4 md:mb-4">
      <MobileHeader onNewCard={onNewCard} />

      <DesktopHeader onNewCard={onNewCard} />

      <CardTabs
        tabs={CARD_TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
    </div>
  );
};

const MobileHeader = ({ onNewCard }: { onNewCard: () => void }) => (
  <div className="md:hidden bg-[#0C365A] px-6 pt-4 pb-4 mb-0">
    <div className="flex justify-end -mb-2.5">
      <img src={aspireMiniLogo} alt="Aspire" className="h-6" />
    </div>

    <div className="flex justify-between items-end">
      <div>
        <div className="text-[14px] text-white/60 mb-2">Account balance</div>
        <div className="flex items-center gap-2.5">
          <span className="text-[12px] bg-[#01D167] text-white px-3 py-1 rounded-sm font-bold">
            S$
          </span>
          <span className="text-[26px] font-bold text-white">3,000</span>
        </div>
      </div>

      <button
        onClick={onNewCard}
        className="flex cursor-pointer items-center pb-3 gap-1.5 text-[#23CEFD] text-[13px] font-semibold"
      >
        <img src={addBlueIcon} alt="add" className="w-4 h-4" />
        New card
      </button>
    </div>
  </div>
);

const DesktopHeader = ({ onNewCard }: { onNewCard: () => void }) => (
  <div className="hidden md:flex justify-between items-end mb-8 pr-5">
    <div>
      <div className="text-[14px] text-[#222222] mb-2.5">Available balance</div>
      <div className="flex items-center gap-2.5">
        <span className="text-[12px] bg-[#01D167] text-white px-3 py-1 rounded-sm font-bold">
          S$
        </span>
        <span className="text-[26px] font-bold text-[#222222]">3,000</span>
      </div>
    </div>

    <button
      onClick={onNewCard}
      className="flex items-center cursor-pointer gap-1.5 bg-[#325BAF] text-white text-[13px] font-semibold px-3 py-2 rounded-sm hover:bg-[#2A4C94] transition-colors"
    >
      <img src={addIcon} alt="add" className="w-4 h-4" />
      New card
    </button>
  </div>
);

export default CardBalance;
