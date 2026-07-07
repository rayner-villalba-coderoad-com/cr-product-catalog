import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SortControls from "./SortControls";
import { CatalogProvider } from "@/context/CatalogContext";

describe("SortControls", () => {
  it("renders all sort options", () => {
    render(<CatalogProvider><SortControls /></CatalogProvider>);
    expect(screen.getByText("Default")).toBeInTheDocument();
    expect(screen.getByText("Price: Low to High")).toBeInTheDocument();
    expect(screen.getByText("Price: High to Low")).toBeInTheDocument();
  });

  it("marks selected sort option as active", async () => {
    render(<CatalogProvider><SortControls /></CatalogProvider>);
    await userEvent.click(screen.getByText("Price: Low to High"));
    expect(screen.getByRole("radio", { name: "Price: Low to High" })).toBeChecked();
  });

  it("Default option is active initially", () => {
    render(<CatalogProvider><SortControls /></CatalogProvider>);
    expect(screen.getByRole("radio", { name: "Default" })).toBeChecked();
  });
});