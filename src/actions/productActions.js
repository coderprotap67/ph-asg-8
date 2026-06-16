"use server";
import productsData from "@/data/products.json";
export async function getProducts(search, category, sort) {
  let filteredProducts = [...productsData];
  if (search) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (category && category !== "All") {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }
  if (sort === "low-to-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "high-to-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  return filteredProducts;
}
export async function getProductById(id) {
  const product = productsData.find(p => p.id === id);
  return product || null;
}