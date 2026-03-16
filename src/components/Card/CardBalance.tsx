import addIcon from "../../assets/add.svg";
import aspireLogo from "../../assets/Aspire Logo.svg";

interface Props {
  activeTab: "my" | "company";
  setActiveTab: (tab: "my" | "company") => void;
  onNewCard: () => void;
}

const CardBalance: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  onNewCard,
}) => {
  return (
    <div className="mb-4 md:mb-4">
      {/* Mobile Header - Dark Blue */}
      <div className="md:hidden bg-[#0C365A] px-6 pt-6 pb-4 mb-0">
        {/* Logo for mobile */}
        <div className="flex justify-end mb-6">
          <img src={aspireLogo} alt="Aspire" className="h-6" />
        </div>

        <div className="flex justify-between items-start">
          <div>
            <div className="text-[14px] text-white/60 mb-2">
              Account balance
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-[12px] bg-[#01D167] text-white px-3 py-1 rounded-sm font-bold">
                S$
              </span>
              <span className="text-[26px] font-bold text-white">3,000</span>
            </div>
          </div>

          <button
            onClick={onNewCard}
            className="flex items-center gap-1.5 text-[#23CEFD] text-[13px] font-semibold"
          >
            <img src={addIcon} alt="add" className="w-4 h-4" />
            New card
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex justify-between items-end mb-10 pr-5">
        <div>
          <div className="text-[14px] text-[#222222] mb-2.5">
            Available balance
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-[12px] bg-[#01D167] text-white px-3 py-1 rounded-sm font-bold">
              S$
            </span>
            <span className="text-[26px] font-bold text-[#222222]">3,000</span>
          </div>
        </div>

        <button
          onClick={onNewCard}
          className="flex items-center gap-1.5 bg-[#325BAF] text-white text-[13px] font-semibold px-3 py-2 rounded-sm hover:bg-[#2A4C94] transition-colors"
        >
          <img src={addIcon} alt="add" className="w-4 h-4" />
          New card
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 px-6 md:px-0 border-[#0000001A] md:border-[#0000001A]">
        <button
          onClick={() => setActiveTab("my")}
          className={`pb-2 text-[13px] md:text-[14px] font-semibold border-b-2 transition-colors ${
            activeTab === "my"
              ? "text-white md:text-[#222222] border-[#23CEFD]"
              : "text-white/30 md:text-[#222222]/30 border-transparent"
          }`}
        >
          My debit cards
        </button>
        <button
          onClick={() => setActiveTab("company")}
          className={`pb-2 text-[13px] md:text-[14px] font-semibold border-b-2 transition-colors ${
            activeTab === "company"
              ? "text-white md:text-[#222222] border-[#23CEFD]"
              : "text-white/30 md:text-[#222222]/30 border-transparent"
          }`}
        >
          All company cards
        </button>
      </div>
    </div>
  );
};

export default CardBalance;
