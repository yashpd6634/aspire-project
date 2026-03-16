import React from "react";
import visaLogo from "../../assets/Visa Logo.svg";
import aspireLogo from "../../assets/Aspire Logo (1).svg";
import type { Card as CardType } from "../../types/card";

interface Props {
  card: CardType;
  showNumber: boolean;
}

// Render individual digit - either as visible number or hidden dot
const CardDigit: React.FC<{
  digit: string;
  isHidden: boolean;
  isGroupEnd: boolean;
}> = ({ digit, isHidden, isGroupEnd }) => (
  <span
    className={`inline-block ${isGroupEnd ? "mr-6.75" : "mr-1.5"} ${
      isHidden ? "w-2.25 h-2.25 bg-white rounded-full text-[0px]" : ""
    }`}
  >
    {!isHidden && digit}
  </span>
);

const Card: React.FC<Props> = ({ card, showNumber }) => {
  // Split card number into individual digits
  const digits = card.cardNumber.replace(/\s+/g, "").split("");

  return (
    <div
      className={`w-full h-62 rounded-2xl p-6.75 text-white transition-all
      ${card.frozen ? "opacity-70 grayscale" : "opacity-100"}`}
      style={{ backgroundColor: card.color || "#01D167" }}
    >
      {/* Aspire Logo */}
      <div className="flex justify-end mb-6">
        <img src={aspireLogo} className="h-7.5" alt="Aspire" />
      </div>

      {/* Cardholder Name */}
      <div className="text-[24px] font-bold tracking-[0.58px] mb-5 capitalize">
        {card.cardholderName}
      </div>

      {/* Card Number */}
      <div className="flex items-center text-[14px] font-bold tracking-[3.46px] mb-3">
        {digits.map((digit, index) => {
          const isHidden = !showNumber && index < 12;
          const isGroupEnd = (index + 1) % 4 === 0 && index < digits.length - 1;
          return (
            <CardDigit
              key={index}
              digit={digit}
              isHidden={isHidden}
              isGroupEnd={isGroupEnd}
            />
          );
        })}
      </div>

      {/* Expiry & CVV */}
      <div className="flex items-center font-bold text-[14px] mb-2.25">
        <div className="flex mr-9">
          <span className="mr-1">Thru:</span>
          <span>{card.expiryDate}</span>
        </div>
        <div className="flex">
          <span className="mr-1">CVV:</span>
          <span>{showNumber ? card.cvv : "* * *"}</span>
        </div>
      </div>

      {/* Visa Logo */}
      <div className="flex justify-end">
        <img src={visaLogo} className="h-6.5" alt="Visa" />
      </div>
    </div>
  );
};

export default React.memo(Card);
