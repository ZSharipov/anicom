import React, { useContext } from "react";
import Context from "../../context";
import "./Header.css";

export default function Header({ tabs }) {
  const { dispatch } = useContext(Context);
  const setActiveTab = (tab) => {
    dispatch({
      type: "activeTab",
      payload: tab,
    });
  }
  return (
    <header className="header">
      <nav className="nav-header">
        <ul className="ul-nav nav nav-tabs">
          <li className="nav-item" onClick={() => setActiveTab(0)} >
            <a className="nav-link" href="#">
              Все
            </a>
          </li>
          {tabs.map((item) => {
            return (
              <li className="nav-item" key={item.id_tab} onClick={() => setActiveTab(item.id_tab)}>
                <a className="nav-link" href={`#${item.id_tab}`}>
                  {item.tab_name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="dropdown">
        <button
          className="btn btn-light btn-sm dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Управление
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button
            onClick={() => {
              console.log("hidden");
              dispatch({
                type: "hiddenAddProduct",
                payload: false,
              });
            }}
            className="dropdown-item"
            href="#"
          >
            Добавить товар
          </button>
        </div>
      </div>
    </header>
  );
}
