import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GlobalContext } from "@/context/global-context";
import { useProducts } from "@/hooks/use-products";
import ProductGrid from "@/features/product/product-grid";
import { MemoryRouter } from "react-router";

vi.mock("@/hooks/use-products");

const mockUseProducts = useProducts as ReturnType<typeof vi.fn>;

const baseGlobalValue = {
  search: "",
  setSearch: vi.fn(),
  category: null,
  setCategory: vi.fn(),
  page: 1,
  setPage: vi.fn(),
  favoriteIds: [],
  isFavorite: () => false,
  toggleFavorite: vi.fn(),
  removeFavorite: vi.fn(),
};

function renderWithContext() {
  return render(
    <MemoryRouter>
      <GlobalContext.Provider value={baseGlobalValue}>
        <ProductGrid />
      </GlobalContext.Provider>
    </MemoryRouter>
  );
}

describe("ProductGrid", () => {
  it("mostra os skeletons enquanto carrega", () => {
    mockUseProducts.mockReturnValue({
      products: [],
      total: 0,
      isLoading: true,
      limit: 12,
    });

    renderWithContext();

    expect(screen.getAllByTestId("product-skeleton")).toHaveLength(6);
  });

  it("renderiza os produtos quando o carregamento termina com sucesso", () => {
    mockUseProducts.mockReturnValue({
      products: [
        { id: 1, title: "Camisa Azul", price: 49, category: "roupas", rating: 4.2, thumbnail: "x.jpg", description: "" },
      ],
      total: 1,
      isLoading: false,
      limit: 12,
    });

    renderWithContext();

    expect(screen.getByText("Camisa Azul")).toBeInTheDocument();
  });

  it("mostra o empty state quando não há produtos", () => {
    mockUseProducts.mockReturnValue({
      products: [],
      total: 0,
      isLoading: false,
      limit: 12,
    });

    renderWithContext();

    expect(screen.getByText(/Nenhum resultado encontrado/i)).toBeInTheDocument();
  });
});