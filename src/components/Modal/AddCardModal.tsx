import React, { useState } from "react";
import { useCardStore } from "../../store/cardStore";

interface Props {
  onClose: () => void;
}

const AddCardModal: React.FC<Props> = ({ onClose }) => {
  const [cardholderName, setCardholderName] = useState("");
  const addCard = useCardStore((state) => state.addCard);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardholderName.trim()) return;

    addCard(cardholderName.trim());
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-[10px] w-[90%] max-w-100"
      >
        <h2 className="text-[#325BAF] text-[20px] mb-6 font-semibold">
          Add New Card
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Cardholder Name"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:border-[#325BAF]"
          />

          <button
            disabled={!cardholderName.trim()}
            className="w-full py-3 rounded-md bg-[#325BAF] text-white
            disabled:bg-gray-200 hover:bg-[#2A4C94]"
          >
            Add Card
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCardModal;
