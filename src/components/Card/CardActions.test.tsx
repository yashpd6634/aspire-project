import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CardActions from "./CardActions";

describe("CardActions Component", () => {
  const mockOnFreeze = vi.fn();

  beforeEach(() => {
    mockOnFreeze.mockClear();
  });

  describe("rendering", () => {
    it("should render all action buttons", () => {
      render(<CardActions frozen={false} onFreeze={mockOnFreeze} />);

      expect(screen.getByAltText(/freeze/i)).toBeInTheDocument();
      expect(screen.getByAltText(/Set spend/i)).toBeInTheDocument();
      expect(screen.getByAltText(/Add to/i)).toBeInTheDocument();
      expect(screen.getByAltText(/Replace/i)).toBeInTheDocument();
      expect(screen.getByAltText(/Cancel/i)).toBeInTheDocument();
    });

    it('should show "Freeze card" when card is not frozen', () => {
      render(<CardActions frozen={false} onFreeze={mockOnFreeze} />);

      expect(screen.getByText(/Freeze/i)).toBeInTheDocument();
      expect(screen.queryByText(/Unfreeze/i)).not.toBeInTheDocument();
    });

    it('should show "Unfreeze card" when card is frozen', () => {
      render(<CardActions frozen={true} onFreeze={mockOnFreeze} />);

      expect(screen.getByText(/Unfreeze/i)).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("should call onFreeze when freeze button is clicked", () => {
      render(<CardActions frozen={false} onFreeze={mockOnFreeze} />);

      const freezeButton = screen.getByAltText(/freeze/i).closest("button");
      fireEvent.click(freezeButton!);

      expect(mockOnFreeze).toHaveBeenCalledTimes(1);
    });

    it("should call onFreeze when unfreeze button is clicked", () => {
      render(<CardActions frozen={true} onFreeze={mockOnFreeze} />);

      const unfreezeButton = screen.getByAltText(/unfreeze/i).closest("button");
      fireEvent.click(unfreezeButton!);

      expect(mockOnFreeze).toHaveBeenCalledTimes(1);
    });
  });

  describe("action buttons count", () => {
    it("should render exactly 5 action buttons", () => {
      render(<CardActions frozen={false} onFreeze={mockOnFreeze} />);

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(5);
    });
  });
});
