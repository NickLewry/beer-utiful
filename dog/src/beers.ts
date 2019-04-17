import { CacheClient } from "./cache";
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

export async function getBeerById(
  request: any,
  cache: CacheClient,
  id: string
) {
  const cachedBeer = await cache.getBeerFromCache(id);

  if (cachedBeer) {
    return formatBeer(cachedBeer);
  }

  const result = await request(`https://api.punkapi.com/v2/beers/${id}`);
  const parsedResult: BeerResponse = JSON.parse(result)[0];

  cache.setBeerInCache(id, parsedResult);

  return formatBeer(parsedResult);
}

export async function getBeers(
  request: any,
  cache: CacheClient,
  page: number = 1
) {
  const cachedPage = await cache.getPageFromCache(page);

  if (cachedPage) {
    return cachedPage.map(formatBeer);
  }

  const result = await request(`https://api.punkapi.com/v2/beers?page=${page}`);
  const parsedResults: BeerResponse[] = JSON.parse(result);

  cache.setPageInCache(page, parsedResults);

  parsedResults.forEach((parsedResult: any) => {
    cache.setBeerInCache(parsedResult.id, parsedResult);
  });

  return parsedResults.map(formatBeer);
}
