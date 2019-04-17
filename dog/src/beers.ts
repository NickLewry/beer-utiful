import { BeerResponse, Beer } from "./types/beer";

const formatBeer = ({
  id,
  name,
  tagline,
  description,
  image_url
}: BeerResponse): Beer => ({
  id,
  name,
  tagline,
  description,
  image: image_url
});

export async function getBeers(request: any, page: number = 1) {
  const result = await request(`https://api.punkapi.com/v2/beers?page=${page}`);
  const parsedResults: BeerResponse[] = JSON.parse(result);

  return parsedResults.map(formatBeer);
}
