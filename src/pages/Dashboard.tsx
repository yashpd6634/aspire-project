import { useState } from "react";
import {
  Sidebar,
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
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="main-content flex-1 bg-[#0C365A0A] h-screen overflow-y-auto">
        <div className="p-[60px]">
          <CardBalance
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onNewCard={() => setShowAddModal(true)}
          />

          <div className="flex gap-[30px]">
            {/* Left Section - Card */}
            <div className="w-[414px]">
              {/* Show card number toggle */}
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => setShowCardNumber(!showCardNumber)}
                  className="flex items-center gap-2 text-[#01D167] text-[12px] font-semibold"
                >
                  <img
                    src="/icons/eye.svg"
                    alt="eye"
                    className="w-4 h-4"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
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
            <div className="flex-1 max-w-[406px]">
              {/* Card Details Accordion */}
              <div className="bg-white rounded-t-[10px] overflow-hidden shadow-sm">
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
              <div className="bg-white rounded-b-[10px] overflow-hidden shadow-sm mt-6">
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

      {/* Add Card Modal */}
      {showAddModal && <AddCardModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
};

export default Dashboard;
