import React, { useEffect, useReducer, useState } from "react";
import ProductList from "./components/product-list/ProductList";
import Header from "./components/header/Header";
import Context from "./context";
import AddItem from "./components/add-item/AddItem";
import reducer from "./reducer";

function App() {
  const initialState = {
    tabs: [],
    products: [],
    hiddenAddProduct: true,
    activeTab: 0,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const [activeArr, setActiveArr] = useState(state.products);

  const fetchTabs = () => {
    fetch(`http://localhost:3210/tabs`)
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "setTabs",
          payload: res,
        });
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const fetchProducts = () => {
    fetch(`http://localhost:3210/products`)
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "setProducts",
          payload: res,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
    fetchTabs();
  }, []);

  useEffect(() => {
    if (state.activeTab === 0) setActiveArr(state.products);
    else
      setActiveArr(
        state.products.filter((item) => item.id_tab === state.activeTab)
      );
  }, [state.products, state.activeTab]);

  const delProducts = (delItem) =>
    fetch(`http://localhost:3210/products`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(delItem),
    });

  return (
    <Context.Provider value={{ delProducts, fetchProducts, dispatch }}>
      <div className="app">
        <div hidden={state.hiddenAddProduct}>
          <AddItem tabs={state.tabs} />
        </div>
        <Header tabs={state.tabs} />
        <ProductList data={activeArr} />
      </div>
    </Context.Provider>
  );
}

export default App;
