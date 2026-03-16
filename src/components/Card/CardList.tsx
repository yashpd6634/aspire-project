import { useState } from "react";
import CardBalance from "./CardBalance";
import CardCarousel from "./CardCarousel";
import { useCardStore } from "../../store/cardStore";
import TransactionList from "../Transactions/TransactionList";
import AddCardModal from "../Modal/AddCardModal";

export const CardList = () => {
  const cards = useCardStore((state) => state.cards);

  const [activeIndex, setActiveIndex] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"my" | "company">("my");



  return (
    <div className="flex-1 bg-white min-h-screen min-w-256.5 p-15">
      <CardBalance
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewCard={() => setShowAddModal(true)}
      />

      <div className="flex gap-5 w-226.5 bg-white rounded-[14px] p-7.5 shadow-md">
        <CardCarousel
          cards={cards}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />

        <TransactionList />
      </div>

      {showAddModal && <AddCardModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
};
