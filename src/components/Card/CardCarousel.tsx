import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";
import Card from "./Card";
import type { Card as CardType } from "../../types/card";
import eyeIcon from "../../assets/remove_red_eye-24px.svg";
import { COLORS } from "../../config";

interface Props {
  cards: CardType[];
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  showNumber?: boolean;
  onToggleShowNumber?: () => void;
}

const CardCarousel: React.FC<Props> = ({
  cards,
  activeIndex,
  setActiveIndex,
  showNumber = false,
  onToggleShowNumber,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setActiveIndex]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const handleDotClick = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  return (
    <div className="bg-[#0C365A] md:bg-transparent">
      {/* Carousel */}
      <div className="px-6 md:px-5">
        {/* Show card number toggle */}
        <div className="flex justify-end mb-3">
          <button
            onClick={onToggleShowNumber}
            className="flex items-center text-[#01D167] text-[12px] font-bold cursor-pointer"
          >
            <img src={eyeIcon} className="w-4 h-4 mr-1.5" alt="eye" />
            {showNumber ? "Hide card number" : "Show card number"}
          </button>
        </div>

        {/* Cards */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {cards.map((card) => (
              <div key={card.id} className="flex-[0_0_100%] min-w-0">
                <Card card={card} showNumber={showNumber} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center mt-4 mb-8 gap-1">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex
                  ? `w-4 bg-[${COLORS.primary}]`
                  : `w-2 bg-[${COLORS.primary}] opacity-20`
              }`}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;
