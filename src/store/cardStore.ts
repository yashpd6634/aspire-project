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
  return "12/26";
};

const defaultCard: Card = {
  id: uuid(),
  cardholderName: "Mark Henry",
  cardNumber: generateCardNumber(),
  expiryDate: generateExpiry(),
  cvv: "456",
  frozen: false,
  color: "#01D167",
};

export const useCardStore = create<CardState>()(
  persist(
    (set) => ({
      cards: [defaultCard],

      addCard: (name) =>
        set((state) => ({
          cards: [
            ...state.cards,
            {
              id: uuid(),
              cardholderName: name,
              cardNumber: generateCardNumber(),
              expiryDate: generateExpiry(),
              cvv: "123",
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
