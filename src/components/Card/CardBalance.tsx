import addIcon from "../../assets/add.svg";

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
    <div className="mb-8">
      {/* Header with balance and new card button */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <div className="text-[14px] text-[#222222] mb-2.5">
            Available balance
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-[12px] bg-[#01D167] text-white px-3 py-1 rounded-[4px] font-bold">
              S$
            </span>
            <span className="text-[26px] font-bold text-[#222222]">3,000</span>
          </div>
        </div>

        <button
          onClick={onNewCard}
          className="flex items-center gap-1.5 bg-[#325BAF] text-white text-[13px] font-semibold px-4 py-2.5 rounded-[4px] hover:bg-[#2A4C94] transition-colors"
        >
          <img src={addIcon} alt="add" className="w-4 h-4" />
          New card
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-[#0000001A]">
        <button
          onClick={() => setActiveTab("my")}
          className={`pb-2 text-[14px] font-semibold border-b-2 transition-colors ${
            activeTab === "my"
              ? "text-[#222222] border-[#23CEFD]"
              : "text-[#222222]/30 border-transparent"
          }`}
        >
          My debit cards
        </button>
        <button
          onClick={() => setActiveTab("company")}
          className={`pb-2 text-[14px] font-semibold border-b-2 transition-colors ${
            activeTab === "company"
              ? "text-[#222222] border-[#23CEFD]"
              : "text-[#222222]/30 border-transparent"
          }`}
        >
          All company cards
        </button>
      </div>
    </div>
  );
};

export default CardBalance;
