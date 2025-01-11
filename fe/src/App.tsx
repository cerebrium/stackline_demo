import { useEffect } from "react";
import "./App.css";
import { useGetStacklineProductsQuery } from "./services/products/products";
import { Header } from "./components/header/header";
import { ProductDisplay } from "./components/product_display/product_display";
import { GraphicsContainer } from "./components/graphics/graphics_container";
import { useSelector } from "react-redux";
import { StacklineProductData } from "./features/products/productsSlics";

type StoreState = {
  stacklineProductData: StacklineProductData;
};

function App() {
  const { error } = useGetStacklineProductsQuery("");
  const { stacklineProductData, isLoading, shouldRerenderTable } = useSelector(
    (state: StoreState) => {
      return state.stacklineProductData;
    },
  );

  return (
    <main className="stackline_main">
      {isLoading ? (
        <section>Loading...</section>
      ) : error ? (
        <section>Error is fetching stacklineProductData</section>
      ) : (
        <>
          <Header />
          <ProductDisplay
            title={stacklineProductData![0].title}
            subtitle={stacklineProductData![0].subtitle}
            image={stacklineProductData![0].image}
            tags={stacklineProductData![0].tags}
          />
          <GraphicsContainer
            sales_data={
              stacklineProductData && stacklineProductData.length
                ? stacklineProductData![0].sales
                : []
            }
            shouldRerenderTable={shouldRerenderTable}
          />
        </>
      )}
    </main>
  );
}

export default App;
