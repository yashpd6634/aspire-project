import { useState } from "react";
import {
  Sidebar,
  BottomNav,
  CardBalance,
  CardCarousel,
  CardActions,
  TransactionHeader,
  TransactionList,
  AddCardModal,
} from "../components";

import { useCardStore } from "../store/cardStore";

const Dashboard = () => {
  const cards = useCardStore((state) => state.cards);
  const freezeCard = useCardStore((state) => state.freezeCard);
  const unfreezeCard = useCardStore((state) => state.unfreezeCard);

  const [activeIndex, setActiveIndex] = useState(0);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [activeTab, setActiveTab] = useState<"my" | "company">("my");
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
      <main className="flex-1 bg-white min-h-screen md:h-screen overflow-y-auto pb-20 md:pb-0">
        <div className="p-6 md:p-15">
          <CardBalance
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onNewCard={() => setShowAddModal(true)}
          />

          <div
            className="flex flex-col md:flex-row gap-6 pt-10 pl-5 pr-5 pb-10 md:gap-7.5 bg-white rounded-lg"
            style={{ filter: "drop-shadow(0 2px 12px #00000014)" }}
          >
            {/* Left Section - Card */}
            <div className="w-full md:w-126.5">
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
            <div className="flex-1 md:max-w-126.5">
              {/* Card Details Accordion */}
              <div className="bg-white rounded-[10px] overflow-hidden shadow-sm">
                <TransactionHeader
                  title="Card details"
                  icon="/icons/card-details.svg"
                  isOpen={cardDetailsOpen}
                  onClick={() => setCardDetailsOpen(!cardDetailsOpen)}
                />
                {cardDetailsOpen && (
                  <div className="p-4 border-x border-b border-[#F0F0F0]">
                    <p className="text-[13px] text-[#222]">
                      Card details content here...
                    </p>
                  </div>
                )}
              </div>

              {/* Recent Transactions Accordion */}
              <div className="bg-white rounded-[10px] overflow-hidden shadow-sm mt-4 md:mt-6">
                <TransactionHeader
                  title="Recent transactions"
                  icon="/icons/transactions.svg"
                  isOpen={transactionsOpen}
                  onClick={() => setTransactionsOpen(!transactionsOpen)}
                />
                {transactionsOpen && <TransactionList />}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Mobile only */}
      <BottomNav />

      {/* Add Card Modal */}
      {showAddModal && <AddCardModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
};

export default Dashboard;
