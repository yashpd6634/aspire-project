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
        <div className="p-6 md:p-[60px]">
          <CardBalance
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onNewCard={() => setShowAddModal(true)}
          />

          <div className="flex flex-col md:flex-row gap-6 pt-10 pl-5 pr-5 md:gap-[30px]">
            {/* Left Section - Card */}
            <div className="w-full md:w-[414px]">
              {/* Show card number toggle */}
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => setShowCardNumber(!showCardNumber)}
                  className="flex items-center gap-2 text-[#01D167] text-[12px] font-semibold bg-white px-3 py-1.5 rounded-md shadow-sm"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  {showCardNumber ? "Hide card number" : "Show card number"}
                </button>
              </div>

              <CardCarousel
                cards={cards}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                showNumber={showCardNumber}
              />

              <CardActions
                frozen={currentCard?.frozen ?? false}
                onFreeze={handleFreeze}
              />
            </div>

            {/* Right Section - Details & Transactions */}
            <div className="flex-1 md:max-w-[406px]">
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
