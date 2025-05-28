import type { Product } from "../types/Product";

const BASE_URL = "http://localhost:3001/products";

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }
  return res.json();
};

export const addProduct = async (product: Omit<Product, "id">) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Erro ao adicionar produto");
};

export const updateProduct = async (id: string, product: Omit<Product, "id">) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Erro ao atualizar produto");
};

export const deleteProduct = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao excluir produto");
};
