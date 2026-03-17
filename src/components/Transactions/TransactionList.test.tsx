import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TransactionList from "./TransactionList";

describe("TransactionList Component", () => {
  describe("rendering", () => {
    it("should render transaction items", () => {
      render(<TransactionList />);

      // Check for merchant name (appears multiple times)
      const merchantElements = screen.getAllByText("Hamleys");
      expect(merchantElements.length).toBeGreaterThan(0);
    });

    it("should render transaction dates", () => {
      render(<TransactionList />);

      const dateElements = screen.getAllByText("20 May 2020");
      expect(dateElements.length).toBeGreaterThan(0);
    });

    it("should render credit transaction amount with plus sign", () => {
      render(<TransactionList />);

      expect(screen.getByText("+ S$ 150")).toBeInTheDocument();
    });

    it("should render debit transaction amounts with minus sign", () => {
      render(<TransactionList />);

      const debitAmounts = screen.getAllByText("- S$ 150");
      expect(debitAmounts.length).toBeGreaterThan(0);
    });

    it('should render "View all card transactions" button', () => {
      render(<TransactionList />);

      expect(
        screen.getByText("View all card transactions"),
      ).toBeInTheDocument();
    });

    it("should render transaction descriptions", () => {
      render(<TransactionList />);

      expect(screen.getByText("Refund on debit card")).toBeInTheDocument();
      expect(
        screen.getAllByText("Charged to debit card").length,
      ).toBeGreaterThan(0);
    });
  });

  describe("transaction count", () => {
    it("should render exactly 4 transaction items", () => {
      render(<TransactionList />);

      const merchantElements = screen.getAllByText("Hamleys");
      expect(merchantElements).toHaveLength(4);
    });
  });

  describe("transaction icons", () => {
    it("should render transaction icons", () => {
      const { container } = render(<TransactionList />);

      const icons = container.querySelectorAll("img");
      expect(icons.length).toBeGreaterThan(0);
    });
  });
});
