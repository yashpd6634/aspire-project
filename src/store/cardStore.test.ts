import { describe, it, expect, beforeEach } from "vitest";
import { useCardStore } from "./cardStore";

describe("cardStore", () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useCardStore.setState({
      cards: [
        {
          id: "test-card-1",
          cardholderName: "Test User",
          cardNumber: "1234 5678 9012 3456",
          expiryDate: "12/26",
          cvv: "123",
          frozen: false,
          color: "#01D167",
        },
      ],
    });
  });

  describe("initial state", () => {
    it("should have cards array", () => {
      const { cards } = useCardStore.getState();
      expect(Array.isArray(cards)).toBe(true);
    });

    it("should have at least one card", () => {
      const { cards } = useCardStore.getState();
      expect(cards.length).toBeGreaterThanOrEqual(1);
    });

    it("should have card with required properties", () => {
      const { cards } = useCardStore.getState();
      const card = cards[0];

      expect(card).toHaveProperty("id");
      expect(card).toHaveProperty("cardholderName");
      expect(card).toHaveProperty("cardNumber");
      expect(card).toHaveProperty("expiryDate");
      expect(card).toHaveProperty("cvv");
      expect(card).toHaveProperty("frozen");
      expect(card).toHaveProperty("color");
    });
  });

  describe("addCard", () => {
    it("should add a new card with provided name", () => {
      const { addCard, cards: initialCards } = useCardStore.getState();
      const initialCount = initialCards.length;

      addCard("John Doe");

      const { cards } = useCardStore.getState();
      expect(cards.length).toBe(initialCount + 1);
      expect(cards[cards.length - 1].cardholderName).toBe("John Doe");
    });

    it("should generate unique card number for new card", () => {
      const { addCard } = useCardStore.getState();

      addCard("Jane Doe");
      addCard("Bob Smith");

      const { cards } = useCardStore.getState();
      const lastTwoCards = cards.slice(-2);

      expect(lastTwoCards[0].cardNumber).not.toBe(lastTwoCards[1].cardNumber);
    });

    it("should set new card as not frozen", () => {
      const { addCard } = useCardStore.getState();

      addCard("New User");

      const { cards } = useCardStore.getState();
      const newCard = cards[cards.length - 1];

      expect(newCard.frozen).toBe(false);
    });

    it("should generate valid card number format (4 groups of 4 digits)", () => {
      const { addCard } = useCardStore.getState();

      addCard("Test Card");

      const { cards } = useCardStore.getState();
      const newCard = cards[cards.length - 1];

      expect(newCard.cardNumber).toMatch(/^\d{4} \d{4} \d{4} \d{4}$/);
    });

    it("should generate valid expiry date format (MM/YY)", () => {
      const { addCard } = useCardStore.getState();

      addCard("Test Card");

      const { cards } = useCardStore.getState();
      const newCard = cards[cards.length - 1];

      expect(newCard.expiryDate).toMatch(/^(0[1-9]|1[0-2])\/\d{2}$/);
    });

    it("should generate valid CVV (3 digits)", () => {
      const { addCard } = useCardStore.getState();

      addCard("Test Card");

      const { cards } = useCardStore.getState();
      const newCard = cards[cards.length - 1];

      expect(newCard.cvv).toMatch(/^\d{3}$/);
    });
  });

  describe("freezeCard", () => {
    it("should freeze a card by id", () => {
      const { freezeCard, cards } = useCardStore.getState();
      const cardId = cards[0].id;

      freezeCard(cardId);

      const { cards: updatedCards } = useCardStore.getState();
      const frozenCard = updatedCards.find((c) => c.id === cardId);

      expect(frozenCard?.frozen).toBe(true);
    });

    it("should not affect other cards when freezing one", () => {
      // Add another card first
      useCardStore.getState().addCard("Another User");

      const { cards } = useCardStore.getState();
      const cardToFreeze = cards[0];
      const otherCard = cards[1];

      useCardStore.getState().freezeCard(cardToFreeze.id);

      const { cards: updatedCards } = useCardStore.getState();
      const unchangedCard = updatedCards.find((c) => c.id === otherCard.id);

      expect(unchangedCard?.frozen).toBe(false);
    });

    it("should handle freezing non-existent card gracefully", () => {
      const { freezeCard, cards: initialCards } = useCardStore.getState();

      freezeCard("non-existent-id");

      const { cards } = useCardStore.getState();
      expect(cards).toEqual(initialCards);
    });
  });

  describe("unfreezeCard", () => {
    it("should unfreeze a frozen card", () => {
      const { freezeCard, unfreezeCard, cards } = useCardStore.getState();
      const cardId = cards[0].id;

      // First freeze the card
      freezeCard(cardId);
      expect(useCardStore.getState().cards[0].frozen).toBe(true);

      // Then unfreeze it
      unfreezeCard(cardId);

      const { cards: updatedCards } = useCardStore.getState();
      const unfrozenCard = updatedCards.find((c) => c.id === cardId);

      expect(unfrozenCard?.frozen).toBe(false);
    });

    it("should not affect already unfrozen cards", () => {
      const { unfreezeCard, cards } = useCardStore.getState();
      const cardId = cards[0].id;

      // Card is already unfrozen
      expect(cards[0].frozen).toBe(false);

      unfreezeCard(cardId);

      const { cards: updatedCards } = useCardStore.getState();
      const card = updatedCards.find((c) => c.id === cardId);

      expect(card?.frozen).toBe(false);
    });
  });
});
