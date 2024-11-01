"use client";

import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import styles from "./styles.module.scss";
import React, { useState, Component } from "react";
import Masonry from "react-masonry-css";


type ImageProps = {
  id: number;
  href: string;
  imageSrc: string;
  name: string;
};

export default function Gallery({ images }: { images: ImageProps[] }) {

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <PhotoProvider>
      <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.myMasonryGrid}
      columnClassName={styles.myMasonryGridColumn}
      >
        {images.map((image) => (
          <ImageContainer key={image.id} image={image} />
        ))}
      </Masonry>
    </PhotoProvider>
  );
}

function ImageContainer({ image }: { image: ImageProps }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className={styles.imageContainer}>
      <PhotoView src={image.imageSrc}>
        <img
          src={image.imageSrc}
          alt={image.name}
          className={`${styles.image} ${loading ? styles.blur : ""}`}
          onLoad={() => setLoading(false)}
        />
      </PhotoView>
    </div>
  );
}
