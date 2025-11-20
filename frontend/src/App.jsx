import { useCallback, useState } from "react";

import initialProducts from "./data/initialProducts";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  // ============================
  //  TODO:
  //  Send initialProducts to backend on first load
  //  Implement this function so backend receives the initial data
  // ============================
  const initializeBackend = async () => {
    // TODO: POST initialProducts to: http://localhost:5000/api/init
    // await fetch("...", {...})
  };

  const loadAllProducts = useCallback(async () => {
    if (initialLoadDone) {
      setProducts(initialProducts);
      return;
    }

    setIsLoading(true);

    // :TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    setProducts(initialProducts);
    setIsLoading(false);
    setInitialLoadDone(true);
  }, [initialLoadDone]);

  const searchProducts = useCallback(
    async (query) => {
      if (!query.trim()) return loadAllProducts();

      // TODO: Replace with actual API call
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const filtered = initialProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );

      setProducts(filtered);
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

      //TODO: Replace with actual API call
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const filtered = initialProducts.filter(
        (product) => product.category === category
      );

      setProducts(filtered);
      setIsLoading(false);
    },
    [loadAllProducts]
  );

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
