import { useCardDashboard } from "../../hooks";
import CompanyCardsPlaceholder from "./CompanyCardsPlaceholder";
import MyCardsSection from "./MyCardsSection";

const TAB_CONTENT: Record<string, React.FC<any>> = {
  my: ({ cards, freezeCard, unfreezeCard }: any) => (
    <MyCardsSection
      cards={cards}
      onFreeze={freezeCard}
      onUnfreeze={unfreezeCard}
    />
  ),
  company: () => <CompanyCardsPlaceholder />,
  // Add more tab content mappings here as needed
};

const renderTabContent = (activeTab: string) => {
  const { cards, freezeCard, unfreezeCard } = useCardDashboard();

  const TabContent = TAB_CONTENT[activeTab];
  if (!TabContent) return null;
  // For tabs that need props, pass them; for others, just render
  if (activeTab === "my") {
    return (
      <TabContent
        cards={cards}
        freezeCard={freezeCard}
        unfreezeCard={unfreezeCard}
      />
    );
  }
  return <TabContent />;
};

export default renderTabContent;
