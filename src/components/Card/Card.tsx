import React from "react";
import visaLogo from "../../assets/Visa Logo.svg";
import aspireLogo from "../../assets/Aspire Logo.svg";
import type { Card as CardType } from "../../types/card";

interface Props {
  card: CardType;
  showNumber: boolean;
}

const Card: React.FC<Props> = ({ card, showNumber }) => {
  const formatCardNumber = (number: string) => {
    // Clean up the card number and split into groups of 4
    const cleaned = number.replace(/\s+/g, "");
    const groups = cleaned.match(/.{1,4}/g) || [];
    return groups.map((group, i) =>
      showNumber || i === groups.length - 1 ? group : "••••",
    );
  };

  return (
    <div
      className={`relative w-full aspect-[1.586/1] rounded-[12px] 
      bg-[#01D167] p-6 text-white transition-all shadow-lg
      ${card.frozen ? "opacity-70 grayscale" : "opacity-100"}`}
    >
      {/* Aspire Logo */}
      <div className="flex justify-end">
        <img src={aspireLogo} className="h-[21px]" alt="Aspire" />
      </div>

      {/* Cardholder Name */}
      <div className="mt-6 text-[22px] font-bold tracking-wide capitalize">
        {card.cardholderName}
      </div>

      {/* Card Number */}
      <div className="flex gap-6 mt-6 mb-4 font-semibold tracking-[3.5px] text-[14px]">
        {formatCardNumber(card.cardNumber).map((g, i) => (
          <span key={i}>{g}</span>
        ))}
      </div>

      {/* Expiry & CVV */}
      <div className="flex gap-[35px] text-[13px] tracking-wide">
        <div className="flex gap-2">
          <span className="opacity-80">Thru:</span>
          <span className="font-semibold">{card.expiryDate}</span>
        </div>

        <div className="flex gap-2">
          <span className="opacity-80">CVV:</span>
          <span className="font-bold tracking-wider">
            {showNumber ? card.cvv : "***"}
          </span>
        </div>
      </div>

      {/* Visa Logo */}
      <img
        src={visaLogo}
        className="absolute bottom-6 right-6 h-[20px]"
        alt="Visa"
      />
    </div>
  );
};

export default React.memo(Card);
