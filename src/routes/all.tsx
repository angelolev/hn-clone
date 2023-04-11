import { useState, useEffect } from "react";
import { Dropdown, Hit } from "../components";
import { IFilter, IHit } from "../types";
import { HITS_FILTERS, getLocalStorage, setLocalStorage } from "../utils";
import styles from "../components/Hit/styles/Hit.module.scss";
import { useFetch } from "../hooks";

export default function All() {
  const [page, setPage] = useState<number>(0);
  const [favoriteHits, setFavoriteHits] = useState<IHit[]>([]);
  const [currentQuery, setCurrentQuery] = useState<string>("angular");

  const { hits } = useFetch(currentQuery, page);

  const toggleFavorite = (hit: IHit) => {
    if (isHitFavorite(hit)) {
      const updatedHits = favoriteHits.filter(
        (favoriteHit: IHit) => favoriteHit.objectID !== hit.objectID
      );

      setFavoriteHits(updatedHits);
      setLocalStorage("favoriteHits", [...updatedHits]);
    } else {
      setFavoriteHits([...favoriteHits, hit]);
      setLocalStorage("favoriteHits", [...favoriteHits, hit]);
    }
  };

  const isHitFavorite = (hit: IHit) => {
    const isFavoriteValue = favoriteHits.findIndex(
      (favoriteHit: IHit) => favoriteHit.objectID === hit.objectID
    );

    return isFavoriteValue > -1;
  };

  const onChange = (filters: IFilter[]) => {
    const params = filters.map((filter) => filter.value).join("+");
    setCurrentQuery(params);
    setPage(0);
  };

  useEffect(() => {
    setFavoriteHits(getLocalStorage("favoriteHits"));
  }, []);

  return (
    <>
      <div className={styles.hits__filters}>
        <Dropdown
          options={HITS_FILTERS}
          placeHolder="Select your news"
          onChange={(value) => onChange(value)}
        />
      </div>
      <div className={styles.hits}>
        {hits.map((hit: IHit, index) => (
          <Hit
            key={hit.objectID}
            {...hit}
            isLast={index === hits.length - 1}
            newLimit={() => setPage(page + 1)}
            toggleFavorite={() => toggleFavorite(hit)}
            isFavorite={isHitFavorite(hit)}
          />
        ))}
      </div>
    </>
  );
}
