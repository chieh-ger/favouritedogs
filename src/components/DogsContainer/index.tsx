import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { getDogBreed, getFavourites } from "../../services/DogService";
import DogTile from "../DogTile";
import { Dog } from "../../models/components/Dogs.model";
import {
  getUniqueList,
  generateSelectOption,
  updateFilters,
} from "../../utils";
import { FavouriteDogs } from "../../models/services/DogService.model";

export type FilterPillProps = {
  filterName: string;
  colorClass?: string;
  filterType: string;
};

type SelectProps = {
  value: string;
  label: string;
};

const FilterPills = (props: FilterPillProps) => {
  const { colorClass, filterName } = props;
  const filterPillClasses = `ml-1 px-5 rounded-xl inline-block max-w-xs p-1 ${
    colorClass ?? "bg-orange-500"
  } text-white`;
  return <div className={filterPillClasses}>{filterName}</div>;
};

const DogsContainer = () => {
  const [hasFilters, setHasFilters] = useState(false);
  const [favOnly, setFavOnly] = useState(false);
  const [dogList, setDogList] = useState<Dog[]>([]);
  const [favouritesList, setFavouritesList] = useState<FavouriteDogs[]>([]);
  const [filteredList, setFilteredList] = useState<Dog[]>([]);
  const [breedOptions, setBreedOptions] = useState<SelectProps[]>([]);
  const [bredForOptions, setBredForOptions] = useState<SelectProps[]>([]);
  const [temperamentOptions, setTemperamentOptions] = useState<SelectProps[]>(
    []
  );
  const [selectedBreedOption, setSelectedBreedOption] = useState<string>("");
  const [selectedBredForOption, setSelectedBredForOption] =
    useState<string>("");
  const [selectedTemperamentOption, setSelectedTemperamentOption] =
    useState<any>("");
  const [filters, setFilters] = useState<FilterPillProps[]>([]);

  const {
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getDogBreeds"],
    queryFn: () => getDogBreed(),
    onSuccess: (data) => setDogList(data),
  });

  const { refetch } = useQuery({
    queryKey: ["getFavs"],
    queryFn: () => getFavourites(),
    onSuccess: (data) => setFavouritesList(data),
  });

  const clearAllFilters = () => {
    setSelectedBredForOption("");
    setSelectedBreedOption("");
    setFilters([]);
    setHasFilters(false);
  };

  const handleChange = (selected: any, action: any) => {
    if (action.name === "breed_group") {
      setSelectedBreedOption(selected.value);
    }
    if (action.name === "bred_for") {
      setSelectedBredForOption(selected.value);
    }
    if (action.name === "temperament") {
      setSelectedTemperamentOption(selected.value);
    }
  };

  const handleShowFavs = () => {
    if (favOnly) {
      setFilteredList(dogList);
      clearAllFilters();
      setFavOnly(false);
    } else {
      refetch();
      let favOnlyArr: Dog[] = [];
      favouritesList.forEach((fav: FavouriteDogs) => {
        favOnlyArr.push(
          dogList.filter((list) => list.image.id === fav.image_id)[0]
        );
      });
      setFilteredList(favOnlyArr);
      setFavOnly(true);
    }
  };

  useEffect(() => {
    const allBreeds = dogList.map((dog: Dog) => dog.breed_group);
    const allTemperaments = dogList
      .map((dog: Dog) => dog.temperament?.split(","))
      .flat();
    const allBredFor = dogList
      .map((dog: Dog) => dog.bred_for?.replaceAll(",and", ",").split(","))
      .flat();
    const uniqueBreedList = getUniqueList(allBreeds)
      .sort()
      .map((breed) => generateSelectOption(breed));
    const uniqueBredForList = getUniqueList(allBredFor)
      .sort()
      .map((bredFor) => generateSelectOption(bredFor));
    const uniqueTemperamentList = getUniqueList(allTemperaments)
      .sort()
      .map((temperament) => generateSelectOption(temperament));
    setBreedOptions(uniqueBreedList);
    setBredForOptions(uniqueBredForList);
    setTemperamentOptions(uniqueTemperamentList);
    setFilteredList(dogList);
  }, [dogList]);

  useEffect(() => {
    let filtersToUpdate = filters;
    if (selectedBreedOption !== "") {
      updateFilters(
        filters,
        "breed_group",
        selectedBreedOption,
        filtersToUpdate,
        setHasFilters,
        setFilters
      );
    }
  }, [selectedBreedOption]);

  useEffect(() => {
    let filtersToUpdate = filters;
    if (selectedBredForOption !== "") {
      updateFilters(
        filters,
        "bred_for",
        selectedBredForOption,
        filtersToUpdate,
        setHasFilters,
        setFilters
      );
    }
  }, [selectedBredForOption]);

  useEffect(() => {
    let filtersToUpdate = filters;
    if (selectedTemperamentOption !== "") {
      updateFilters(
        filters,
        "temperament",
        selectedTemperamentOption,
        filtersToUpdate,
        setHasFilters,
        setFilters
      );
    }
  }, [selectedTemperamentOption]);

  useEffect(() => {
    let listToBeFiltered = dogList;
    let filterObject = {};
    filters.forEach((filter) => {
      filterObject = {
        ...filterObject,
        [filter.filterType]: filter.filterName,
      };
    });
    Object.keys(filterObject).forEach((filterKey: any) => {
      if (filterKey === "temperament") {
        listToBeFiltered = listToBeFiltered.filter((listItem) =>
          // @ts-ignore
          listItem.temperament?.includes(filterObject[filterKey])
        );
      } else {
        listToBeFiltered = listToBeFiltered.filter(
          (listItem) =>
            // @ts-ignore
            listItem[filterKey as keyof Dog] === filterObject[filterKey]
        );
      }
    });
    setFilteredList(listToBeFiltered);
  }, [filters]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    //@ts-ignore
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="container mx-auto">
      <form>
        <div className="grid grid-cols-3 gap-4 mb-3">
          <div>
            <label htmlFor="select-breed">Breed</label>
            <Select
              name="breed_group"
              isSearchable
              inputId="select-breed"
              options={breedOptions}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="select-temperament">Temperament</label>
            <Select
              name="temperament"
              isSearchable
              inputId="select-temperament"
              options={temperamentOptions}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="select-bred-for">Bred For</label>
            <Select
              name="bred_for"
              isSearchable
              inputId="select-bred-for"
              options={bredForOptions}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="button"
              onClick={handleShowFavs}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white text-cyan-500 focus:ring-4 focus:outline-none focus:ring-cyan-200"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                {favOnly ? "Show All" : "Show Only Favourites"}
              </span>
            </button>
          </div>
        </div>
      </form>
      {hasFilters && (
        <div className="font-medium">
          Filters:
          {filters.length > 0 &&
            filters.map((filter) => (
              <FilterPills
                key={filter.filterName}
                filterName={filter.filterName}
                colorClass={filter.colorClass}
                filterType={filter.filterType}
              />
            ))}
          <button
            type="button"
            className="cursor-pointer ml-1 text-cyan-600"
            onClick={clearAllFilters}
          >
            Clear Filters
          </button>
        </div>
      )}
      <div className="grid grid-cols-4 gap-3 justify-items-center mt-3">
        {filteredList.map((dog: Dog) => (
          <DogTile key={dog.id} dogDetails={dog} />
        ))}
      </div>
    </div>
  );
};

export default DogsContainer;
