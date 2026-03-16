import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import Card from "./Card";
import type { Card as CardType } from "../../types/card";
import eyeIcon from "../../assets/remove_red_eye-24px.svg";

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

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi, setActiveIndex]);

  return (
    <div className="bg-[#0C365A] md:bg-transparent">
      {/* Carousel with padding */}
      <div className="px-6 md:px-5">
        {/* Show card number toggle - Vue style */}
        <div className="flex justify-end mb-3">
          <button
            onClick={onToggleShowNumber}
            className="flex items-center text-[#01D167] text-[12px] font-bold cursor-pointer"
          >
            <img src={eyeIcon} className="w-4 h-4 mr-1.5" alt="eye" />
            {showNumber ? "Hide card number" : "Show card number"}
          </button>
        </div>

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
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex
                  ? "w-4 bg-[#01D167]"
                  : "w-2 bg-[#01D167] opacity-20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;
