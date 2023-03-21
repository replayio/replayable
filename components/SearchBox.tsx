import React from "react";
import styles from "../styles/search.module.css";

const SearchBox = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={submitHandler} className={styles.searchbar}>
      <input type="search" name="search" pattern=".*\S.*" required />
      <button className={styles.searchbtn} type="submit">
        <span>Search</span>
      </button>
    </form>
  );
};

export default SearchBox;
