export interface IHit {
  created_at: string;
  story_title: string;
  story_url: string;
  author: string;
  objectID: string;
  isFavorite: boolean;
  newLimit?: () => void;
  isLast?: boolean;
  toggleFavorite: () => void;
}
