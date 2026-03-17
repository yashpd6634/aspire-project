import React, { useMemo, memo } from "react";
import visaLogo from "../../assets/Visa Logo.svg";
import aspireLogo from "../../assets/Aspire Logo (1).svg";
import type { Card as CardType } from "../../types/card";
import { COLORS, CARD_NUMBER_GROUP_SIZE } from "../../config";

interface Props {
  card: CardType;
  showNumber: boolean;
}

interface CardDigitProps {
  digit: string;
  isHidden: boolean;
  isGroupEnd: boolean;
}

const CardDigit = memo<CardDigitProps>(({ digit, isHidden, isGroupEnd }) => (
  <span
    className={`inline-block ${isGroupEnd ? "mr-6.75" : "mr-1.5"} ${
      isHidden ? "w-2.25 h-2.25 bg-white rounded-full text-[0px]" : ""
    }`}
  >
    {!isHidden && digit}
  </span>
));

CardDigit.displayName = "CardDigit";

const Card: React.FC<Props> = ({ card, showNumber }) => {
  const digits = useMemo(
    () => card.cardNumber.replace(/\s+/g, "").split(""),
    [card.cardNumber],
  );

  return (
    <div
      className={`w-full h-62 rounded-2xl p-6.75 text-white transition-all
      ${card.frozen ? "opacity-70 grayscale" : "opacity-100"}`}
      style={{ backgroundColor: card.color || COLORS.primary }}
    >
      <div className="flex justify-end mb-6">
        <img src={aspireLogo} className="h-6" alt="Aspire" />
      </div>

      <div className="text-[24px] font-bold tracking-[0.58px] mb-5 capitalize">
        {card.cardholderName}
      </div>

      <div className="flex items-center text-[14px] font-bold tracking-[3.46px] mb-3">
        {digits.map((digit, index) => (
          <CardDigit
            key={index}
            digit={digit}
            isHidden={!showNumber && index < 12}
            isGroupEnd={
              (index + 1) % CARD_NUMBER_GROUP_SIZE === 0 &&
              index < digits.length - 1
            }
          />
        ))}
      </div>

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

      <div className="flex justify-end">
        <img src={visaLogo} className="h-6.5" alt="Visa" />
      </div>
    </div>
  );
};

export default React.memo(Card);
