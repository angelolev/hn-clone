import { IFilter } from "./filter";

export interface IDropdown {
  placeHolder: string;
  options: IFilter[];
  onChange: (value: IFilter[]) => void;
}
