import { useCallback, useEffect, useState } from "react";

import initialProducts from "./data/initialProducts";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const initializeBackend = async () => {
    await fetch("http://localhost:5000/api/init", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(initialProducts),
    });
  };

  const loadAllProducts = useCallback(async () => {
    if (initialLoadDone) {
      setProducts(initialProducts);
      return;
    }

    setIsLoading(true);

    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();

    setProducts(data);
    setIsLoading(false);
    setInitialLoadDone(true);
  }, [initialLoadDone]);

  const searchProducts = useCallback(
    async (query) => {
      if (!query.trim()) return loadAllProducts();

      setIsLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/products/search?query=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();

      setProducts(data);
      setIsLoading(false);
    },
    [loadAllProducts]
  );

  const filterByCategory = useCallback(
    async (category) => {
      if (category === "all") {
        loadAllProducts();
        return;
      }

      setIsLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/products/category/${encodeURIComponent(
          category
        )}`
      );
      const data = await res.json();

      setProducts(data);
      setIsLoading(false);
    },
    [loadAllProducts]
  );

  useEffect(() => {
    const start = async () => {
      await initializeBackend();
    };
    start();
  }, []);

  return (
    <div className="w-full h-screen p-2 bg-gray-100">
      <h1 className="mt-2 text-3xl font-bold mb-6 text-center">
        Mini Product Search
      </h1>

      <SearchBar
        initialLoadDone={initialLoadDone}
        onLoad={loadAllProducts}
        onSelect={filterByCategory}
        onSearch={searchProducts}
      />

      {isLoading && (
        <div className="text-center text-gray-500 my-4">Loading...</div>
      )}

      {!isLoading && <ProductList products={products} />}
    </div>
  );
}

export default App;
