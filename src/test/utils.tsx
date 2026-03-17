import { render } from "@testing-library/react";
import type { ReactElement } from "react";

// Test utility to render components
export const renderWithProviders = (ui: ReactElement) => {
  return render(ui);
};

// Mock card data for testing
export const mockCard = {
  id: "test-card-1",
  cardholderName: "John Doe",
  cardNumber: "1234 5678 9012 3456",
  expiryDate: "12/26",
  cvv: "123",
  frozen: false,
  color: "#01D167",
};

export const mockFrozenCard = {
  ...mockCard,
  id: "test-card-2",
  frozen: true,
};
