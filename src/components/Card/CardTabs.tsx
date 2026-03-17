interface Tab {
  id: string;
  label: string;
}

interface CardTabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

const CardTabs: React.FC<CardTabsProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex gap-6 px-6 md:px-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`pb-2 text-[13px] md:text-[14px] font-semibold border-b-2 transition-colors ${
            activeTab === tab.id
              ? "text-white md:text-[#222222] border-[#23CEFD]"
              : "text-white/30 md:text-[#222222]/30 border-transparent"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default CardTabs;
