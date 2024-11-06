"use client";
import { CaretUp } from "phosphor-react";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

export default function ButtonTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button onClick={scrollToTop} className={styles.backToTopButton}>
        <CaretUp size={32} />
      </button>
    )
  );
}
