import { useState } from "react";
import {
  Sidebar,
  BottomNav,
  CardBalance,
  CardCarousel,
  CardActions,
  Accordion,
  TransactionList,
  AddCardModal,
} from "../components";

import { useCardStore } from "../store/cardStore";

const CardDashboard = () => {
  const cards = useCardStore((state) => state.cards);
  const freezeCard = useCardStore((state) => state.freezeCard);
  const unfreezeCard = useCardStore((state) => state.unfreezeCard);

  const [activeIndex, setActiveIndex] = useState(0);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [activeTab, setActiveTab] = useState("my");
  const [showAddModal, setShowAddModal] = useState(false);
  const [cardDetailsOpen, setCardDetailsOpen] = useState(false);
  const [transactionsOpen, setTransactionsOpen] = useState(true);

  const currentCard = cards[activeIndex];

  const handleFreeze = () => {
    if (!currentCard) return;
    if (currentCard.frozen) {
      unfreezeCard(currentCard.id);
    } else {
      freezeCard(currentCard.id);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Hidden on mobile */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 bg-[#0C365A] md:bg-white min-h-screen md:h-screen overflow-y-auto pb-20 md:pb-0">
        <div className="p-0 md:p-15">
          <CardBalance
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onNewCard={() => setShowAddModal(true)}
          />

          {activeTab === "my" ? (
            <div className="flex flex-col md:flex-row pt-0 pb-0 md:pt-10 md:pl-5 md:pr-5 md:pb-10 md:gap-7.5 bg-[#0C365A] md:bg-white rounded-lg card-container-shadow overflow-hidden">
              {/* Left Section - Card */}
              <div className="w-full md:flex-1 md:min-w-0">
                <CardCarousel
                  cards={cards}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  showNumber={showCardNumber}
                  onToggleShowNumber={() => setShowCardNumber(!showCardNumber)}
                />

                <CardActions
                  frozen={currentCard?.frozen ?? false}
                  onFreeze={handleFreeze}
                />
              </div>

              {/* Right Section - Details & Transactions */}
              <div className="w-full md:flex-1 md:min-w-0 bg-white px-4 pt-6 md:px-0 md:pt-0">
                {/* Card Details Accordion */}
                <Accordion
                  title="Card details"
                  icon="/icons/card.svg"
                  isOpen={cardDetailsOpen}
                  onToggle={() => setCardDetailsOpen(!cardDetailsOpen)}
                >
                  <div className="p-4 border-x border-b border-[#F0F0F0]">
                    <p className="text-[13px] text-[#222]">
                      Card details content here...
                    </p>
                  </div>
                </Accordion>

                {/* Recent Transactions Accordion */}
                <Accordion
                  title="Recent transactions"
                  icon="/icons/transaction.svg"
                  isOpen={transactionsOpen}
                  onToggle={() => setTransactionsOpen(!transactionsOpen)}
                  className="mt-4 md:mt-6"
                >
                  <TransactionList />
                </Accordion>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-20 md:py-32 bg-white rounded-lg card-container-shadow">
              <div className="text-center">
                <p className="text-[18px] font-semibold text-[#222222] mb-2">
                  Coming Soon
                </p>
                <p className="text-[14px] text-[#AAAAAA]">
                  All company cards feature is not available yet.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation - Mobile only */}
      <BottomNav />

      {/* Add Card Modal */}
      {showAddModal && <AddCardModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
};

export default CardDashboard;
