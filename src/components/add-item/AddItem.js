import React, { useContext, useState, useEffect } from "react";
import Context from "../../context";
import "./AddItem.css";

export default function AddItem({ tabs }) {
  const { dispatch, fetchProducts } = useContext(Context);

  const [file, setFile] = useState(null);
  const [blob, setBlob] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (file) {
      setFileName(file.name);
      compressImg();
    }
  }, [file]);

  const [inputName, setInputName] = useState("");
  const onInputNameChange = (event) => setInputName(event.target.value);

  const [inputPrice, setInputPrice] = useState("");
  const onInputPriceChange = (event) => setInputPrice(event.target.value);

  const [inputPcs, setInputPcs] = useState("");
  const onInputPcsChange = (event) => setInputPcs(event.target.value);

  const [selectTab, setSelectTab] = useState(0);
  const onSelectTabChange = (event) =>
    setSelectTab(event.target[event.target.selectedIndex].value);

  const postItem = (data) => {
    fetch(`http://localhost:3210/products`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.status);
        fetchProducts();
      })
      .catch((err) => {
        console.error(err);
        alert(`ошибка при отправке`);
        return;
      });
  };
  
  function chooseFile(event) {
    let file = event.target.files[0];
    if (file.type.match(/image.*/)) {
      setFile(file);
    } else {
      alert("укажите только изображение");
    }
  }

  const onDivDragover = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const onDivDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    if (file.type.match(/image.*/)) {
      setFile(file);
    } else {
      alert("перетащите только изображение");
    }
  };

  const compressImg = (width = 50, height = 50) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const elem = document.createElement("canvas");
        elem.width = width;
        elem.height = height;
        const ctx = elem.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        setBlob(elem.toDataURL());
      };
      reader.onerror = (error) => console.log(error);
    };
  };

  const resetForm = () => {
    setInputName("");
    setInputPrice("");
    setInputPcs("");
    setSelectTab(0);
    setFileName("");
    setBlob(null);
    setFile(null);

    dispatch({
      type: "hiddenAddProduct",
      payload: true,
    });
  };
  const onSave = () => {
    if (!inputName) {
      alert("укажите название");
      return;
    }
    if (!inputPrice) {
      alert("укажите цену");
      return;
    }
    if (!inputPcs) {
      alert("укажите количество");
      return;
    }
    if (!selectTab) {
      alert("вы не выбрали вкладку");
      return;
    }
    postItem({
      img: blob,
      product: inputName,
      id_tab: selectTab,
      pcs: inputPcs,
      price: inputPrice,
    });

    resetForm();
  };
  return (
    <>         <div className="modal">
      <div className="modal-body">
        <h3>Добавить товар</h3>
        <label>Название</label>
        <div className="div-list">
          <input
            onChange={onInputNameChange}
            value={inputName}
            type="text"
            className="form-control"
          />
        </div>

        <label>Цена</label>
        <div className="div-list">
          <input
            onChange={onInputPriceChange}
            type="number"
            className="form-control"
            value={inputPrice}
          />
          <span>руб.</span>
        </div>

        <label>Количество</label>
        <div className="div-list">
          <input
            onChange={onInputPcsChange}
            type="number"
            className="form-control"
            value={inputPcs}
          />
          <span>шт.</span>
        </div>

        <label>Вкладка</label>
        <div className="div-list">
          <select
            onChange={onSelectTabChange}
            className="custom-select"
            id="inputGroupSelect01"
            value={selectTab}
          >
            <option>вкладка...</option>
            {tabs.map((item) => {
              return (
                <option key={item.id_tab} value={item.id_tab}>
                  {item.tab_name}
                </option>
              );
            })}
          </select>
        </div>
        <div
          className="div-file-choose"
          onDrop={onDivDrop}
          onDragOver={onDivDragover}
        >
          <label htmlFor="customFile">
            Кликните или перетащите сюда картинку
              </label>
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={chooseFile}
            accept="image/*"
          />
        </div>

        <label className="file-name-label">{fileName}</label>

        <div className="div-list">
          <button className="btn btn-outline-success" onClick={onSave}>
            Добавить
              </button>
          <button className="btn btn-outline-danger" onClick={resetForm}>
            Отмена
              </button>
        </div>
      </div>
    </div>
    </>
  );
}
