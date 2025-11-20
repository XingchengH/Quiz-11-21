import { useCallback, useEffect, useState } from "react";

import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";

// TODO: Import the initial Products data

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
    setIsLoading(true);
    // TODO: POST initialProducts to: http://localhost:5000/api/init
    // await fetch("...", {...}), after that setIsloading to false

    // setIsLoading(false);
  };

  const loadAllProducts = useCallback(async () => {
    setIsLoading(true);

    // :TODO: Getting all products from backend, setProducts with the result, after that setIsLoading to false, and setInitialLoadDone to true
  }, []);

  const searchProducts = useCallback(
    async (query) => {
      if (!query.trim()) return loadAllProducts();
      setIsLoading(true);

      // TODO: Getting the search results from backend, setProducts with the result, then setIsLoading to false. Hint: use encodeURIComponent for the query param
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

      //TODO: Getting the category filter results from backend, setProducts with the result, then setIsLoading to false. Hint: use encodeURIComponent for the category param
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
