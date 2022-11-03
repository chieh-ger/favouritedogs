export interface GetBreedQueries {
  limit?: number;
  attach_breed?: number;
  page?: number;
}

export interface GetFavourites {
  limit?: number;
  sub_id?: string;
  page?: number;
}

export interface FavouriteDogs {
  id: number;
  user_id: string;
  image_id: string;
  sub_id: string;
  created_at: string;
  image: {
    id?: string;
    url?: string;
  };
}
