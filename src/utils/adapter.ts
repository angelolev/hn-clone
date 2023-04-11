import { IHit } from "../types";

export const transformData = (data: IHit[]) => {
  return data.filter((hit: IHit) => hit.story_title);
};
