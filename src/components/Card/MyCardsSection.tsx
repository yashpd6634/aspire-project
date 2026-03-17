import { useState } from "react";
import { CardCarousel, CardActions, Accordion, TransactionList } from "..";
import type { Card } from "../../types/card";

interface MyCardsSectionProps {
  cards: Card[];
  onFreeze: (cardId: string) => void;
  onUnfreeze: (cardId: string) => void;
}

const MyCardsSection: React.FC<MyCardsSectionProps> = ({
  cards,
  onFreeze,
  onUnfreeze,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [cardDetailsOpen, setCardDetailsOpen] = useState(false);
  const [transactionsOpen, setTransactionsOpen] = useState(true);

  const currentCard = cards[activeIndex];

  const handleFreeze = () => {
    if (!currentCard) return;
    if (currentCard.frozen) {
      onUnfreeze(currentCard.id);
    } else {
      onFreeze(currentCard.id);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-0 md:gap-7.5 pt-0 pb-0 md:pt-10 md:pl-5 md:pr-5 md:pb-10 bg-[#0C365A] md:bg-white rounded-lg card-container-shadow overflow-hidden">
      {/* Left Section - Card & Actions */}
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
      <div className="w-full md:flex-1 md:min-w-0 bg-white -mt-5 md:mt-0 px-0 pt-0 pb-24 md:pb-0">
        <Accordion
          title="Card details"
          icon="/icons/card.svg"
          isOpen={cardDetailsOpen}
          onToggle={() => setCardDetailsOpen(!cardDetailsOpen)}
        >
          <CardDetailsContent />
        </Accordion>

        <Accordion
          title="Recent transactions"
          icon="/icons/transaction.svg"
          isOpen={transactionsOpen}
          onToggle={() => setTransactionsOpen(!transactionsOpen)}
          className="mt-0 md:mt-6"
        >
          <TransactionList />
        </Accordion>
      </div>
    </div>
  );
};

const CardDetailsContent = () => (
  <div className="p-4 border-x border-b border-[#F0F0F0]">
    <p className="text-[13px] text-[#222]">Card details content here...</p>
  </div>
); 

export default MyCardsSection;
