import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Accordion } from "./Accordion";

describe("Accordion Component", () => {
  const mockOnToggle = vi.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
  });

  describe("rendering", () => {
    it("should render accordion title", () => {
      render(
        <Accordion
          title="Test Accordion"
          isOpen={false}
          onToggle={mockOnToggle}
        >
          <div>Content</div>
        </Accordion>,
      );

      expect(screen.getByText("Test Accordion")).toBeInTheDocument();
    });

    it("should render icon when provided", () => {
      render(
        <Accordion
          title="Test Accordion"
          icon="/test-icon.svg"
          isOpen={false}
          onToggle={mockOnToggle}
        >
          <div>Content</div>
        </Accordion>,
      );

      expect(screen.getByAltText("Test Accordion")).toBeInTheDocument();
    });

    it("should render children when open", () => {
      render(
        <Accordion title="Test Accordion" isOpen={true} onToggle={mockOnToggle}>
          <div>Test Content</div>
        </Accordion>,
      );

      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("should hide children visually when closed (using grid-rows-0)", () => {
      const { container } = render(
        <Accordion
          title="Test Accordion"
          isOpen={false}
          onToggle={mockOnToggle}
        >
          <div>Test Content</div>
        </Accordion>,
      );

      const contentWrapper = container.querySelector(".grid");
      expect(contentWrapper?.className).toContain("grid-rows-[0fr]");
    });
  });

  describe("interactions", () => {
    it("should call onToggle when header is clicked", () => {
      render(
        <Accordion
          title="Test Accordion"
          isOpen={false}
          onToggle={mockOnToggle}
        >
          <div>Content</div>
        </Accordion>,
      );

      const header = screen.getByText("Test Accordion").closest("div");
      fireEvent.click(header!);

      expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe("expand/collapse icons", () => {
    it("should show expand icon when closed", () => {
      render(
        <Accordion
          title="Test Accordion"
          isOpen={false}
          onToggle={mockOnToggle}
        >
          <div>Content</div>
        </Accordion>,
      );

      expect(screen.getByAltText("expand")).toBeInTheDocument();
    });

    it("should show collapse icon when open", () => {
      render(
        <Accordion title="Test Accordion" isOpen={true} onToggle={mockOnToggle}>
          <div>Content</div>
        </Accordion>,
      );

      expect(screen.getByAltText("collapse")).toBeInTheDocument();
    });
  });

  describe("custom className", () => {
    it("should apply custom className", () => {
      const { container } = render(
        <Accordion
          title="Test Accordion"
          isOpen={false}
          onToggle={mockOnToggle}
          className="custom-class"
        >
          <div>Content</div>
        </Accordion>,
      );

      expect(container.firstChild).toHaveClass("custom-class");
    });
  });
});
