import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddCardModal from "./AddCardModal";
import { useCardStore } from "../../store/cardStore";

// Mock the store
vi.mock("../../store/cardStore", () => ({
  useCardStore: vi.fn(),
}));

describe("AddCardModal Component", () => {
  const mockOnClose = vi.fn();
  const mockAddCard = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockAddCard.mockClear();
    (useCardStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: (state: { addCard: typeof mockAddCard }) => unknown) =>
        selector({ addCard: mockAddCard }),
    );
  });

  describe("rendering", () => {
    it("should render modal header", () => {
      render(<AddCardModal onClose={mockOnClose} />);

      expect(screen.getByText("Add New Card")).toBeInTheDocument();
      expect(
        screen.getByText("Create a new virtual debit card"),
      ).toBeInTheDocument();
    });

    it("should render card preview", () => {
      render(<AddCardModal onClose={mockOnClose} />);

      expect(screen.getByText("Your Name")).toBeInTheDocument();
    });

    it("should render form with input field", () => {
      render(<AddCardModal onClose={mockOnClose} />);

      expect(
        screen.getByPlaceholderText("Enter your full name"),
      ).toBeInTheDocument();
    });

    it("should render cancel and create buttons", () => {
      render(<AddCardModal onClose={mockOnClose} />);

      expect(
        screen.getByRole("button", { name: /cancel/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /create card/i }),
      ).toBeInTheDocument();
    });

    it("should render info box", () => {
      render(<AddCardModal onClose={mockOnClose} />);

      expect(screen.getByText("Virtual Card Benefits")).toBeInTheDocument();
    });
  });

  describe("form validation", () => {
    it("should disable create button when input is empty", () => {
      render(<AddCardModal onClose={mockOnClose} />);

      const createButton = screen.getByRole("button", { name: /create card/i });
      expect(createButton).toBeDisabled();
    });

    it("should enable create button when valid name is entered", async () => {
      const user = userEvent.setup();
      render(<AddCardModal onClose={mockOnClose} />);

      const input = screen.getByPlaceholderText("Enter your full name");
      await user.type(input, "John Doe");

      const createButton = screen.getByRole("button", { name: /create card/i });
      await waitFor(() => {
        expect(createButton).not.toBeDisabled();
      });
    });

    it("should show error for name with numbers", async () => {
      const user = userEvent.setup();
      render(<AddCardModal onClose={mockOnClose} />);

      const input = screen.getByPlaceholderText("Enter your full name");
      await user.type(input, "John123");

      await waitFor(() => {
        expect(
          screen.getByText(/name can only contain letters and spaces/i),
        ).toBeInTheDocument();
      });
    });

    it("should show error for name with special characters", async () => {
      const user = userEvent.setup();
      render(<AddCardModal onClose={mockOnClose} />);

      const input = screen.getByPlaceholderText("Enter your full name");
      await user.type(input, "John@Doe");

      await waitFor(() => {
        expect(
          screen.getByText(/name can only contain letters and spaces/i),
        ).toBeInTheDocument();
      });
    });

    it("should show error for single character name", async () => {
      const user = userEvent.setup();
      render(<AddCardModal onClose={mockOnClose} />);

      const input = screen.getByPlaceholderText("Enter your full name");
      await user.type(input, "J");

      await waitFor(() => {
        expect(
          screen.getByText(/name must be at least 2 characters/i),
        ).toBeInTheDocument();
      });
    });
  });

  describe("card preview", () => {
    it("should update card preview as user types", async () => {
      const user = userEvent.setup();
      render(<AddCardModal onClose={mockOnClose} />);

      const input = screen.getByPlaceholderText("Enter your full name");
      await user.type(input, "Jane Smith");

      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  describe("form submission", () => {
    it("should call addCard with trimmed name on submit", async () => {
      const user = userEvent.setup();
      render(<AddCardModal onClose={mockOnClose} />);

      const input = screen.getByPlaceholderText("Enter your full name");
      await user.type(input, "  John Doe  ");

      const createButton = screen.getByRole("button", { name: /create card/i });
      await waitFor(() => {
        expect(createButton).not.toBeDisabled();
      });

      await user.click(createButton);

      await waitFor(() => {
        expect(mockAddCard).toHaveBeenCalledWith("John Doe");
      });
    });
  });

  describe("modal close", () => {
    it("should call onClose when cancel button is clicked", async () => {
      const user = userEvent.setup();
      render(<AddCardModal onClose={mockOnClose} />);

      const cancelButton = screen.getByRole("button", { name: /cancel/i });
      await user.click(cancelButton);

      await waitFor(
        () => {
          expect(mockOnClose).toHaveBeenCalled();
        },
        { timeout: 500 },
      );
    });

    it("should call onClose when clicking outside modal", async () => {
      const user = userEvent.setup();
      const { container } = render(<AddCardModal onClose={mockOnClose} />);

      // Click the backdrop (the outer div with fixed positioning)
      const backdrop = container.firstChild as HTMLElement;
      await user.click(backdrop);

      await waitFor(
        () => {
          expect(mockOnClose).toHaveBeenCalled();
        },
        { timeout: 500 },
      );
    });
  });
});
