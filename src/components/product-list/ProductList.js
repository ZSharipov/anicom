import React from "react";
import ProductItem from "../ProductItem/ProductItem";
import "./ProductList.css";
const ProducList = ({ data }) => {

    return (
    <ul className="ul-main" id="list">
      {data.map((item) => {
        return <ProductItem key={item.id_list} item={item} />;
      })}
    </ul>
  );
};

export default ProducList;
