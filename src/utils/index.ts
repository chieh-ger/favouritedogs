import { FilterPillProps } from "../components/DogsContainer";
import { FilterColors } from "../models/components/Dogs.model";

export const getUniqueList = (arr: any[]) => {
  return (
    arr
      // @ts-ignore
      .filter((a: string, index: number, b: string) => b.indexOf(a) === index)
  );
};

export const generateSelectOption = (name: string) => {
  return {
    value: name,
    label: name
      ? `${name.charAt(0).toUpperCase()}${name.slice(1)}`
      : "UNCATEGORISED",
  };
};

export const updateFilters = (
  arr: any[],
  filterType: string,
  updatedValue: string,
  filtersArr: FilterPillProps[],
  setHasFilter: (flag: boolean) => void,
  setFilter: (updatedFilters: FilterPillProps[]) => void
) => {
  const indexOfExistingBreedOption = arr.findIndex((filter) => filter.filterType === filterType);
  if(indexOfExistingBreedOption !== -1) {
    filtersArr.splice(indexOfExistingBreedOption, 1);
  }
  setHasFilter(true);
  setFilter([
    ...filtersArr,
    {
      filterName: updatedValue,
      colorClass: FilterColors[filterType as keyof typeof FilterColors],
      filterType: filterType,
    },
  ]);
};