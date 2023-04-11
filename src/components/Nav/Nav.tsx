import React from "react";
import styles from "./styles/Nav.module.scss";
export interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.container}>
        <h1>The Hacker News</h1>
      </div>
    </div>
  );
};

export default Nav;
