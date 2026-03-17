import {
  Sidebar,
  BottomNav,
  CardBalance,
  MyCardsSection,
  CompanyCardsPlaceholder,
  AddCardModal,
} from "../components";
import { useCardDashboard } from "../hooks";

const CardDashboard = () => {
  const {
    cards,
    freezeCard,
    unfreezeCard,
    activeTab,
    setActiveTab,
    showAddModal,
    openAddModal,
    closeAddModal,
  } = useCardDashboard();

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="main-content flex-1 bg-[#0C365A] md:bg-white min-h-screen md:h-screen overflow-y-auto pb-0 md:pb-0">
        <div className="p-0 md:p-15">
          <CardBalance
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onNewCard={openAddModal}
          />

          {activeTab === "my" ? (
            <MyCardsSection
              cards={cards}
              onFreeze={freezeCard}
              onUnfreeze={unfreezeCard}
            />
          ) : (
            <CompanyCardsPlaceholder />
          )}
        </div>
      </main>

      <BottomNav />

      {showAddModal && <AddCardModal onClose={closeAddModal} />}
    </div>
  );
};

export default CardDashboard;
