import { useState, useEffect } from "react";
import { FavoriteHit } from "../components";
import { IHit } from "../types";
import { getLocalStorage, setLocalStorage } from "../utils";
import styles from "../components/Hit/styles/Hit.module.scss";

export default function Favorites() {
  const [favoriteHits, setFavoriteHits] = useState<IHit[]>([]);

  const toggleFavorite = (hit: IHit) => {
    const updatedHits = favoriteHits.filter(
      (favoriteHit: IHit) => favoriteHit.objectID !== hit.objectID
    );

    setFavoriteHits(updatedHits);
    setLocalStorage("favoriteHits", [...updatedHits]);
  };

  useEffect(() => {
    setFavoriteHits(getLocalStorage("favoriteHits"));
  }, []);

  if (!favoriteHits.length) {
    return (
      <div className={styles.hits__empty}>
        <h3>You don't have favorites yet</h3>
      </div>
    );
  }

  return (
    <div className={styles.hits}>
      {favoriteHits.map((hit: IHit) => (
        <FavoriteHit
          key={hit.objectID}
          {...hit}
          toggleFavorite={() => toggleFavorite(hit)}
          isFavorite
        />
      ))}
    </div>
  );
}
