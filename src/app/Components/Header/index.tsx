import Image from "next/image";
import styles from "./styles.module.scss";

import React from "react";
import { Link } from "phosphor-react";

export default function Header() {
  return (
    <div className={styles.header}>
      <section className={styles.image}>
        <img src="/assets/logo.png"/>
      </section>

      <section className={styles.links}>
        <span className={styles.icon}>
        <a href="https://www.instagram.com/pontodevista_42/" target="_blank">
        <i className="fa-brands fa-instagram"></i>
        </a>
        </span>
      </section>
    </div>
  );
}
