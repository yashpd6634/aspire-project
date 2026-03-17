import { useState } from "react";
import { useCardStore } from "../store/cardStore";

export const useCardDashboard = () => {
  const cards = useCardStore((state) => state.cards);
  const freezeCard = useCardStore((state) => state.freezeCard);
  const unfreezeCard = useCardStore((state) => state.unfreezeCard);

  const [activeTab, setActiveTab] = useState("my");
  const [showAddModal, setShowAddModal] = useState(false);

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  return {
    // Card data & actions
    cards,
    freezeCard,
    unfreezeCard,

    // Tab state
    activeTab,
    setActiveTab,

    // Modal state
    showAddModal,
    openAddModal,
    closeAddModal,
  };
};
