import { IHit } from "./hit";

export interface DataState {
  loading: boolean;
  data: IHit[];
  error: string | null;
}

export interface Response {
  hits: IHit[];
  page: number;
}
