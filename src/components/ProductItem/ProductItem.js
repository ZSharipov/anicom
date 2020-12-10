import React, { useContext } from "react";
import Context from "../../context";
import "./ProductItem.css";

const ProductItem = ({ item }) => {
  const { delProducts, fetchProducts } = useContext(Context);
  const onDelete = () => {
    const confirmDel = window.confirm("Удалить запись?");
    if (!confirmDel) return;
    delProducts([item.id_list])
      .then((res) => res.json())
      .then((res) => {
        alert(res.status);
        fetchProducts();
      })
      .catch((err) => {
        console.error(err);
        alert(`ошибка при удаление`);
        return;
      });
  };

  return (
    <li key={item.id_list} className="draggable" draggable>
      <div><img src={item.img} alt="" /></div>
      <div className="div-name">{item.product}</div>
      <div>{`${item.total} руб.`}</div>
      <div>{item.tab_name}</div>
      <div>{`${item.pcs} шт`}</div>
      <div>
        <button onClick={onDelete} className="btn btn-outline-danger btn-sm">
          Удалить
        </button>
      </div>
    </li>
  );
};

export default ProductItem;
