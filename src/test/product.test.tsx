import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { GlobalContext } from "@/context/global-context";
import { useProduct } from "@/hooks/use-product";
import Product from "@/pages/product";

vi.mock("@/hooks/use-product");

const mockUseProduct = useProduct as ReturnType<typeof vi.fn>;

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

function renderWithProviders() {
  return render(
    <MemoryRouter initialEntries={["/product/1"]}>
      <GlobalContext.Provider value={baseGlobalValue}>
        <Product />
      </GlobalContext.Provider>
    </MemoryRouter>
  );
}

describe("Página de detalhe do produto", () => {
  it("mostra o skeleton enquanto carrega", () => {
    mockUseProduct.mockReturnValue({ product: null, isLoading: true });

    renderWithProviders();

    expect(document.querySelector('[data-slot="skeleton"]')).toBeInTheDocument();
  });

  it("renderiza os dados do produto com sucesso", () => {
    mockUseProduct.mockReturnValue({
      product: {
        id: 1,
        title: "Fone Bluetooth",
        description: "Som de qualidade",
        price: 199,
        category: "eletrônicos",
        rating: 4.5,
        stock: 10,
        thumbnail: "fone.jpg",
      },
      isLoading: false,
    });

    renderWithProviders();

    expect(screen.getByText("Fone Bluetooth")).toBeInTheDocument();
    expect(screen.getByText("Som de qualidade")).toBeInTheDocument();
  });

  it("mostra o estado vazio quando o produto não é encontrado", () => {
    mockUseProduct.mockReturnValue({ product: null, isLoading: false });

    renderWithProviders();

    expect(screen.getByText(/nenhum resultado encontrado/i)).toBeInTheDocument();
  });
});