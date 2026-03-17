import { useState, useCallback } from "react";
import { useCardStore } from "../store/cardStore";
import { useShallow } from "zustand/react/shallow";

export const useCardDashboard = () => {
  const { cards, freezeCard, unfreezeCard } = useCardStore(
    useShallow((state) => ({
      cards: state.cards,
      freezeCard: state.freezeCard,
      unfreezeCard: state.unfreezeCard,
    })),
  );

  const [activeTab, setActiveTab] = useState("my");
  const [showAddModal, setShowAddModal] = useState(false);

  // Memoize callbacks to prevent child re-renders
  const openAddModal = useCallback(() => setShowAddModal(true), []);
  const closeAddModal = useCallback(() => setShowAddModal(false), []);

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
