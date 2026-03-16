import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import Card from "./Card";
import type { Card as CardType } from "../../types/card";

interface Props {
  cards: CardType[];
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  showNumber?: boolean;
}

const CardCarousel: React.FC<Props> = ({
  cards,
  activeIndex,
  setActiveIndex,
  showNumber = false,
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
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {cards.map((card) => (
            <div key={card.id} className="flex-[0_0_100%]">
              <Card card={card} showNumber={showNumber} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-5 gap-2">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === activeIndex ? "bg-[#01D167]" : "bg-[#01D16730]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;
