import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Card } from "../types/card";
import { v4 as uuid } from "uuid";

interface CardState {
  cards: Card[];

  addCard: (name: string) => void;
  freezeCard: (id: string) => void;
  unfreezeCard: (id: string) => void;
}

const generateCardNumber = () => {
  const part1 = Math.floor(1000 + Math.random() * 9000);
  const part2 = Math.floor(1000 + Math.random() * 9000);
  const part3 = Math.floor(1000 + Math.random() * 9000);
  const part4 = Math.floor(1000 + Math.random() * 9000);
  return `${part1} ${part2} ${part3} ${part4}`;
};

const generateExpiry = () => {
  const month = Math.floor(1 + Math.random() * 12)
    .toString()
    .padStart(2, "0");
  const year = Math.floor(26 + Math.random() * 5); // 26-30
  return `${month}/${year}`;
};

const generateCVV = () => {
  return Math.floor(100 + Math.random() * 900).toString();
};

const createDefaultCard = (name: string, color: string): Card => ({
  id: uuid(),
  cardholderName: name,
  cardNumber: generateCardNumber(),
  expiryDate: generateExpiry(),
  cvv: generateCVV(),
  frozen: false,
  color,
});

const defaultCards: Card[] = [
  createDefaultCard("Mark Henry", "#01D167"),
  createDefaultCard("Jack Henry", "#0ff1dA"),
];

export const useCardStore = create<CardState>()(
  persist(
    (set) => ({
      cards: defaultCards,

      addCard: (name) =>
        set((state) => ({
          cards: [
            ...state.cards,
            {
              id: uuid(),
              cardholderName: name,
              cardNumber: generateCardNumber(),
              expiryDate: generateExpiry(),
              cvv: generateCVV(),
              frozen: false,
              color:
                "#" +
                ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
            },
          ],
        })),

      freezeCard: (id) =>
        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === id ? { ...c, frozen: true } : c,
          ),
        })),

      unfreezeCard: (id) =>
        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === id ? { ...c, frozen: false } : c,
          ),
        })),
    }),
    {
      name: "aspire-cards-storage",
    },
  ),
);
