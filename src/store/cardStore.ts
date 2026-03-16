import { create } from "zustand";
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

export const useCardStore = create<CardState>((set) => ({
  cards: [
    {
      id: uuid(),
      cardholderName: "Mark Henry",
      cardNumber: generateCardNumber(),
      expiryDate: generateExpiry(),
      cvv: "456",
      frozen: false,
    },
  ],

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
        },
      ],
    })),

  freezeCard: (id) =>
    set((state) => ({
      cards: state.cards.map((c) => (c.id === id ? { ...c, frozen: true } : c)),
    })),

  unfreezeCard: (id) =>
    set((state) => ({
      cards: state.cards.map((c) =>
        c.id === id ? { ...c, frozen: false } : c,
      ),
    })),
}));
