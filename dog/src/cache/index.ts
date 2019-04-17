import { RedisClient } from "redis";
import { BeerResponse } from "../types/beer";

const ONE_HOUR_EXPIRY = 3600;

export interface CacheClient {
  getBeerFromCache: (id: string) => Promise<BeerResponse | false>;
  getPageFromCache: (id: number) => Promise<any>;
  setBeerInCache: (id: string, data: any) => boolean;
  setPageInCache: (page: number, data: any) => boolean;
}

export class RedisCache implements CacheClient {
  constructor(private client: RedisClient) {}

  public async getBeerFromCache(id: string) {
    return await this.getItem(`beer:${id}`);
  }

  public async getPageFromCache(page: number) {
    return await this.getItem(`page:${page}`);
  }

  public setBeerInCache(id: string, data: any) {
    return this.setItem(`beer:${id}`, data);
  }

  public setPageInCache(page: number, data: any) {
    return this.setItem(`page:${page}`, data);
  }

  private async getItem(key: string): Promise<BeerResponse | false> {
    return new Promise((res, rej) => {
      this.client.get(key, (e, cachedItem) => {
        if (e) {
          rej(e.message);
        }

        if (cachedItem) {
          res(JSON.parse(cachedItem));
        } else {
          res(false);
        }
      });
    });
  }

  private setItem(key: string, data: BeerResponse[]): boolean {
    return this.client.setex(key, ONE_HOUR_EXPIRY, JSON.stringify(data));
  }
}
