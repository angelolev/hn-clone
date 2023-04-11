import { IHit } from "../../types";
import React, { useState, useEffect, useRef } from "react";
import { timeSince } from "../../utils";
import styles from "../Hit/styles/Hit.module.scss";
import clock from "../../assets/clock.svg";
import favorite from "../../assets/favorite.svg";
import favoriteActive from "../../assets/favorite-active.svg";

const FavoriteHit: React.FC<IHit> = ({
  story_title,
  created_at,
  author,
  story_url,
  isFavorite,
  toggleFavorite,
}) => {
  const [isCurrrentlyFavorite, setIsCurrentlyFavorite] =
    useState<boolean>(isFavorite);

  const handleFavorite = () => {
    setIsCurrentlyFavorite(!isCurrrentlyFavorite);
    toggleFavorite();
  };

  const imageSrc = isCurrrentlyFavorite ? favoriteActive : favorite;

  return (
    <div className={styles.hit}>
      <div className={styles.hit__content}>
        <div className={styles.hit__heading}>
          <img src={clock} />
          <span>
            {timeSince(created_at)} by {author}
          </span>
        </div>

        <a target="_blank" href={`${story_url}`}>
          <h3>{story_title}</h3>
        </a>
      </div>
      <div className={styles.hit__actions}>
        <img src={imageSrc} onClick={handleFavorite} />
      </div>
    </div>
  );
};

export default FavoriteHit;
