export interface Beer {
  id: number;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export interface BeerResponse {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: { value: number; unit: string };
  boil_volume: { value: number; unit: string };
  method: { mash_temp: any; fermentation: [Object]; twist: null };
  ingredients: {
    malt: any;
    hops: any;
    yeast: string;
  };
  food_pairing: Array<string>;
  brewers_tips: string;
  contributed_by: string;
}
