interface DogImage {
  id: string;
  width: number;
  height: number;
  url: string;
}

interface DogMeasurements {
  imperial: string;
  metric: string;
}

export interface Dog {
  id: number;
  name: string;
  temperament: string;
  life_span: string;
  bred_for: string;
  breed_group?: string;
  alt_names: string;
  wikipedia_url: string;
  image: DogImage;
  origin: string;
  country_code: string;
  weight: DogMeasurements;
  height: DogMeasurements;
}

export enum FilterColors {
  breed_group = 'bg-green-500',
  bred_for = 'bg-orange-500',
  temperament = 'bg-purple-500'
}