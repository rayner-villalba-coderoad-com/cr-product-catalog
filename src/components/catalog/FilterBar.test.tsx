// src/components/catalog/FilterBar.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterBar from "./FilterBar";
import { CatalogProvider } from "@/context/CatalogContext";

const renderWithProvider = () =>
  render(
    <CatalogProvider>
      <FilterBar />
    </CatalogProvider>
  );

describe("FilterBar", () => {
  it("renders all category options", () => {
    renderWithProvider();
    expect(screen.getByText("Tops")).toBeInTheDocument();
    expect(screen.getByText("Bottoms")).toBeInTheDocument();
    expect(screen.getByText("Outerwear")).toBeInTheDocument();
  });

  it("marks selected category as active", async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText("Tops"));
    expect(screen.getByLabelText("Tops")).toBeChecked();
  });

  it("shows Clear all button when a filter is active", async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText("Tops"));
    expect(screen.getByRole("button", { name: /clear all/i })).toBeInTheDocument();
  });

  it("clears active filter when Clear all is clicked", async () => {
    renderWithProvider();
    await userEvent.click(screen.getByText("Tops"));
    await userEvent.click(screen.getByRole("button", { name: /clear all/i }));
    expect(screen.queryByRole("button", { name: /clear all/i })).not.toBeInTheDocument();
  });
});