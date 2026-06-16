import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/actions/productActions";

export const revalidate = 3600; 

export default async function HomePage() {
  const allProducts = await getProducts();
  const popularProducts = allProducts.slice(0, 3);

  const tips = [
    { title: "Stay Hydrated", desc: "Consume at least 3L of fluid daily to balance out summer heat output thresholds." },
    { title: "Protect Your Skin", desc: "Layer broad-spectrum sun defense configurations consistently across outdoor activities." },
    { title: "Wear UV Protection", desc: "Equip protective lenses to secure standard optical structural vision profiles." }
  ];

  const brands = ["SunShade", "BeachLife", "AquaGlow", "SummerFit"];

  return (
    <div className="container mx-auto px-4 py-8 space-y-20 max-w-7xl">
      <HeroSlider />

      {/* Popular Products */}
      <section className="space-y-6">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-extrabold tracking-tight">Popular Products</h2>
          <p className="text-slate-400 text-sm mt-1">Our top-rated summer setups picked by our community.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Summer Care Tips */}
      <section className="space-y-6 bg-gradient-to-br from-amber-50 to-orange-50/60 rounded-3xl p-8 md:p-12 border border-orange-100/50">
        <h2 className="text-3xl font-extrabold text-center tracking-tight">Summer Care Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {tips.map((tip, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/60 shadow-sm space-y-2">
              <h3 className="text-lg font-bold text-neutral">{tip.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Brands */}
      <section className="space-y-6 text-center pb-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-400 uppercase">Top Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {brands.map((brand, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-xl font-bold text-lg shadow-sm text-slate-600 hover:text-primary transition-colors flex items-center justify-center">
              {brand}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}