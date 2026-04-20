import { FaListUl } from "react-icons/fa";

import { createQueryObject } from "../helper/helper";

import styles from "./Sidebar.module.css"

function Sidebar({setQuery}) {

  const categoryHandler = (event) => {
    const { tagName } = event.target;
    const category = event.target.innerText.toLowerCase();

    if (tagName !== "LI") return;
    setQuery((query) => createQueryObject(query, { category }));
  };

  return (
    <div className={styles.sidebar}>
      <div>
        <FaListUl />
        <p>Categories</p>
      </div>
      <ul onClick={categoryHandler}>
        <li>All</li>
        <li>Electronics</li>
        <li>Jewelry</li>
        <li>Men's Clothing</li>
        <li>Woman's Clothing</li>
      </ul>
    </div>
  );
}

export default Sidebar;
