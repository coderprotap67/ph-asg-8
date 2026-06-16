import { getProducts } from "@/actions/productActions";
import ProductCard from "@/components/ProductCard";

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const search = params.search || "";
  const category = params.category || "All";
  const sort = params.sort || "";

  const products = await getProducts(search, category, sort);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <form method="GET" className="w-full md:w-1/3">
          <input 
            type="text" 
            name="search" 
            defaultValue={search}
            placeholder="Search products..." 
            className="input input-bordered w-full rounded-xl"
          />
        </form>
        <div className="flex flex-wrap gap-4 w-full md:w-auto justify-end">
          <form method="GET" className="flex gap-4">
            <select name="category" defaultValue={category} className="select select-bordered rounded-xl">
              <option value="All">All Categories</option>
              <option value="Accessories">Accessories</option>
              <option value="Apparel">Apparel</option>
              <option value="Skincare">Skincare</option>
            </select>
            <select name="sort" defaultValue={sort} className="select select-bordered rounded-xl">
              <option value="">Sort By</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
            <button type="submit" className="btn btn-primary text-white rounded-xl px-6">Apply</button>
          </form>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
          <h3 className="text-xl font-bold text-slate-400">No matching summer essentials discovered.</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}