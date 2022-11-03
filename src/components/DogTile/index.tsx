import React, { useState, useEffect } from "react";
import { Dog } from "../../models/components/Dogs.model";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getFavourites,
  saveAsFavourite,
  removeFavourite,
} from "../../services/DogService";
import { FavouriteDogs } from "../../models/services/DogService.model";

type DogTileProps = {
  dogDetails: Dog;
};

type FavouriteIconProps = {
  fillColour?: string;
};

const FavouriteIcon = (props: FavouriteIconProps) => {
  const svgClasses = `${
    props.fillColour ?? "fill-white"
  } w-10 absolute top-0 left-2/4 -translate-x-1/2	-translate-y-1/2 hover:scale-150 transition duration-300`;
  return (
    <svg className={svgClasses} viewBox="0 0 32 29.6">
      <path
        stroke="red"
        d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
      />
    </svg>
  );
};

const DogTile = (props: DogTileProps) => {
  const { name, image, temperament } = props.dogDetails;
  const [favouriteDogs, setFavouriteDogs] = useState<FavouriteDogs[]>([]);
  const [favourited, setFavourited] = useState(false);

  useQuery({
    queryKey: ["getFavs"],
    queryFn: () => getFavourites(),
    onSuccess: (data) => setFavouriteDogs(data),
  });

  const saveFavMutation = useMutation({
    mutationFn: (imgId: string) => saveAsFavourite(imgId),
  });

  const removeFavMutation = useMutation({
    mutationFn: (favId: number) => removeFavourite(favId),
  });

  const handleClick = () => {
    const filterFav = favouriteDogs.filter(
      (fav: any) => fav.image_id === props.dogDetails.image.id
    );
    if (filterFav.length > 0) {
      removeFavMutation.mutate(filterFav[0].id);
      setFavourited(false);
    } else {
      saveFavMutation.mutate(props.dogDetails.image.id);
      setFavourited(true);
    }
  };

  useEffect(() => {
    if (
      favouriteDogs.filter(
        (fav: any) => fav.image_id === props.dogDetails.image.id
      ).length > 0
    ) {
      setFavourited(true);
    }
  }, [favouriteDogs]);

  // Alternate way to store favourites on localStorage for the sake of this exercise
  // const handleClickLocal = () => {
  //   setFavourited(!favourited);
  //   const localFavs = localStorage.getItem("favourites");
  //   if (localFavs && Array.isArray(JSON.parse(localFavs))) {
  //     const convertedFavs = JSON.parse(localFavs);
  //     const alreadyFavouritedIndex = convertedFavs.findIndex(
  //       (fav: Dog) => fav.id === props.dogDetails.id
  //     );
  //     if (alreadyFavouritedIndex !== -1) {
  //       convertedFavs.splice(alreadyFavouritedIndex, 1);
  //     } else {
  //       convertedFavs.push({
  //         ...props.dogDetails,
  //       });
  //     }
  //     localStorage.setItem("favourites", JSON.stringify(convertedFavs));
  //   } else {
  //     localStorage.setItem(
  //       "favourites",
  //       JSON.stringify([{ ...props.dogDetails }])
  //     );
  //   }
  // };

  // useEffect(() => {
  //   const localFavs = localStorage.getItem("favourites");
  //   if (localFavs && Array.isArray(JSON.parse(localFavs))) {
  //     const convertedFavs = JSON.parse(localFavs);
  //     if (
  //       convertedFavs.filter((fav: Dog) => fav.id === props.dogDetails.id)
  //         .length > 0
  //     ) {
  //       setFavourited(true);
  //     }
  //   }
  // }, []);

  return (
    <div
      className="relative sca group bg-gray-800 justify-center bg-left-top hover:bg-contain ease-in bg-cover transition-all duration-300 bg-no-repeat h-80 min-w-full rounded-md border border-gray-200 cursor-pointer"
      style={{ backgroundImage: `url("${image.url}")` }}
    >
      <div className="px-2 rounded-b-md h-16 min-w-full bg-gray-800 absolute bottom-0 group-hover:h-32 transition-all duration-300">
        <button onClick={handleClick}>
          <FavouriteIcon
            fillColour={favourited ? "fill-red-600" : "fill-white"}
          />
        </button>
        <div
          id="description"
          className="px-5 text-white text-l font-bold tracking-tight"
        >
          <span aria-label={name}>{name}</span>
          <p className="mb-3 font-normal text-sm text-gray-400 invisible group-hover:visible" aria-details={temperament}>
            {temperament}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DogTile;
