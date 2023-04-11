import { IHit } from "../types";

export const isHitFavorite = (hits: IHit[], hit: IHit) => {
  const isFavoriteValue = hits.findIndex(
    (favoriteHit: IHit) => favoriteHit.objectID === hit.objectID
  );

  return isFavoriteValue > -1;
};
