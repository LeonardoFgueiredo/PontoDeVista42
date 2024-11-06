"use client";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import styles from "./styles.module.scss";
import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { GridLoader } from "react-spinners";

export type ImageProps = {
  id: number;
  href: string;
  imageSrc: string;
  name: string;
};

export default function Gallery({ images }: { images: ImageProps[] }) {
  const [initialLoad, setInitialLoad] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  return (
    <PhotoProvider>
      {initialLoad ? (
        <div className={styles.loaderContainer}>
          <GridLoader size={50} />
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.myMasonryGrid}
          columnClassName={styles.myMasonryGridColumn}
        >
          {images.map((image) => (
            <ImageContainer
              key={image.id}
              image={image}
              onLoad={handleImageLoad}
            />
          ))}
        </Masonry>
      )}
    </PhotoProvider>
  );
}

function ImageContainer({
  image,
  onLoad,
}: {
  image: ImageProps;
  onLoad: () => void;
}) {
  const [loading, setLoading] = useState(true);

  return (
    <div className={styles.imageContainer}>
      <PhotoView src={image.imageSrc}>
        <img
          src={image.imageSrc}
          alt={image.name}
          className={`${styles.image} ${loading ? styles.blur : ""}`}
          onLoad={() => {
            setLoading(false);
            onLoad();
          }}
        />
      </PhotoView>
    </div>
  );
}
