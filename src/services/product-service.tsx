import axios from "axios";
import api from "./api";
import type { Product, ProductsResponse, ProductsQueryParams } from "@/interface/product";

export async function getProducts(params: ProductsQueryParams): Promise<ProductsResponse> {
  const { limit = 12, skip = 0, category, search } = params;
  const trimmedSearch = search?.trim();
  
  const url = trimmedSearch
    ? "/products/search"
    : category
      ? `/products/category/${encodeURIComponent(category)}`
      : "/products";

  const { data } = await api.get<ProductsResponse>(url, {
    params: {
      limit,
      skip,
      ...(trimmedSearch ? { q: trimmedSearch } : {}),
    },
  });

  return data;
}

export async function getProductById(id: number | string): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
}

export async function getCategories(): Promise<string[]> {
  const { data } = await api.get<Array<string | { slug: string; name: string }>>(
    "/products/categories"
  );
  return data.map((item) => (typeof item === "string" ? item : item.slug));
}

export function getErrorMessage(e: unknown): string {
  if (axios.isAxiosError(e)) {
    if (e.response) {
      const status = e.response.status;
      const apiMessage = e.response.data?.message;
      if (status === 404) return apiMessage || "Produto não encontrado.";
      if (status >= 500) return "Erro no servidor. Tenta novamente mais tarde.";
      return apiMessage || "Não foi possível carregar os dados.";
    }
    if (e.code === "ECONNABORTED") return "A requisição demorou demasiado tempo.";
    return "Não foi possível ligar ao servidor.";
  }
  return "Ocorreu um erro inesperado.";
}