import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "./Card";
import { mockCard, mockFrozenCard } from "../../test/utils";

describe("Card Component", () => {
  describe("rendering", () => {
    it("should render cardholder name", () => {
      render(<Card card={mockCard} showNumber={false} />);

      expect(screen.getByText(mockCard.cardholderName)).toBeInTheDocument();
    });

    it("should render expiry date", () => {
      render(<Card card={mockCard} showNumber={false} />);

      expect(screen.getByText(mockCard.expiryDate)).toBeInTheDocument();
    });

    it("should render Aspire logo", () => {
      render(<Card card={mockCard} showNumber={false} />);

      expect(screen.getByAltText("Aspire")).toBeInTheDocument();
    });

    it("should render Visa logo", () => {
      render(<Card card={mockCard} showNumber={false} />);

      expect(screen.getByAltText("Visa")).toBeInTheDocument();
    });
  });

  describe("card number visibility", () => {
    it("should hide CVV when showNumber is false", () => {
      render(<Card card={mockCard} showNumber={false} />);

      expect(screen.getByText("* * *")).toBeInTheDocument();
      expect(screen.queryByText(mockCard.cvv)).not.toBeInTheDocument();
    });

    it("should show CVV when showNumber is true", () => {
      render(<Card card={mockCard} showNumber={true} />);

      expect(screen.getByText(mockCard.cvv)).toBeInTheDocument();
      expect(screen.queryByText("* * *")).not.toBeInTheDocument();
    });
  });

  describe("frozen state", () => {
    it("should apply opacity when card is frozen", () => {
      const { container } = render(
        <Card card={mockFrozenCard} showNumber={false} />,
      );

      const cardDiv = container.firstChild as HTMLElement;
      expect(cardDiv.className).toContain("opacity-70");
      expect(cardDiv.className).toContain("grayscale");
    });

    it("should not apply grayscale when card is not frozen", () => {
      const { container } = render(<Card card={mockCard} showNumber={false} />);

      const cardDiv = container.firstChild as HTMLElement;
      expect(cardDiv.className).not.toContain("grayscale");
    });
  });

  describe("card color", () => {
    it("should apply card color as background", () => {
      const { container } = render(<Card card={mockCard} showNumber={false} />);

      const cardDiv = container.firstChild as HTMLElement;
      expect(cardDiv.style.backgroundColor).toBe("rgb(1, 209, 103)"); // #01D167
    });

    it("should apply custom color when provided", () => {
      const customCard = { ...mockCard, color: "#FF0000" };
      const { container } = render(
        <Card card={customCard} showNumber={false} />,
      );

      const cardDiv = container.firstChild as HTMLElement;
      expect(cardDiv.style.backgroundColor).toBe("rgb(255, 0, 0)");
    });
  });
});
