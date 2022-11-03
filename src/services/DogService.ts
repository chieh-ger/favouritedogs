import axios from "axios";
import { apiKey, apiEndpoint, userId } from "../constants";
import { GetBreedQueries, GetFavourites } from "../models/services/DogService.model";

const reqHeaders = {
  headers: {
    'x-api-key': apiKey
  }
}

export const getDogBreed = async (queryParams?: GetBreedQueries) => {
  const getDogBreedResponse = await axios.get(`${apiEndpoint}/breeds`, {
    params: queryParams,
  });
  return getDogBreedResponse.data;
};

export const saveAsFavourite = async (imageId: string) => {
  const reqBody = {
    image_id: imageId,
    sub_id: userId
  }
  const saveAsFavouriteResponse = await axios.post(`${apiEndpoint}/favourites`, reqBody, reqHeaders);
  return saveAsFavouriteResponse.data;
};

export const removeFavourite = async (favId: number) => {
  const removeFavouriteResponse = await axios.delete(`${apiEndpoint}/favourites/${favId}`, reqHeaders);
  return removeFavouriteResponse.data;
};

export const getFavourites = async (queryParams?: GetFavourites) => {
  const getFavouritesResponse = await axios.get(`${apiEndpoint}/favourites`, {
    params: queryParams,
    ...reqHeaders
  });
  return getFavouritesResponse.data;
};