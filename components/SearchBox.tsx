import React from "react";
import styles from "../styles/search.module.css";
import { useRouter } from "next/router";

export default function SearchBox() {
  const router = useRouter();

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e.target[0].value);
    router.push(`/api/search?q=${e.target[0].value}`);
  }

  return (
    <form onSubmit={submitHandler} className={styles.searchbar}>
      <input type="search" name="query" pattern=".*\S.*" required />
      <button className={styles.searchbtn} type="submit">
        <span>Search</span>
      </button>
    </form>
  );
}
