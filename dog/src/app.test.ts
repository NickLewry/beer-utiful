import redisMock from "redis-mock";
import request from "supertest";

import app from "./app";
import mockResponse from "./fixtures/mockBeersResponse";
import { RedisCache } from "./cache";

describe("app", () => {
  let mockRequest: any;
  let mockCache: any;

  beforeEach(() => {
    mockRequest = jest.fn();
    mockRequest.mockResolvedValue(mockResponse);
    mockCache = new RedisCache(redisMock.createClient());
  });

  describe("getBeers", () => {
    it("should return the page of results matching the id provided in the correct format", async () => {
      const response = await request(
        app(mockRequest, mockCache).callback()
      ).get("/beers?page=1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          description:
            "10 Heads High is loosely based on our awesome 2011 Prototype beer Hops Kill Nazis. This is an uncompromising 7.8% Imperial Red Ale loaded high with American Hops. Think of this as an Imperial India Red Ale, or a super-charged version of 5am Saint. Either way this is a seriously good beer!",
          id: 29,
          image: "https://images.punkapi.com/v2/29.png",
          name: "10 Heads High",
          tagline: "Imperial Red Ale."
        },
        {
          description:
            "wyvern ale is loosely based on our awesome 2011 Prototype beer Hops Kill Nazis. This is an uncompromising 7.8% Imperial Red Ale loaded high with American Hops. Think of this as an Imperial India Red Ale, or a super-charged version of 5am Saint. Either way this is a seriously good beer!",
          id: 30,
          image: "https://images.punkapi.com/v2/29.png",
          name: "wyvern ale",
          tagline: "Imperial dragon ale."
        }
      ]);
    });

    it("should store the page of results in the cache if not already cached", async () => {
      expect(await mockCache.getPageFromCache("1")).toBeFalsy;

      const response = await request(
        app(mockRequest, mockCache).callback()
      ).get("/beers?page=1");

      expect(response.status).toBe(200);
      expect(await mockCache.getPageFromCache("1")).toEqual(
        JSON.parse(mockResponse)
      );
    });

    it("should store each beer individually in the cache from the page of results ", async () => {
      expect(await mockCache.getBeerFromCache("29")).toBeFalsy;
      expect(await mockCache.getBeerFromCache("30")).toBeFalsy;

      const response = await request(
        app(mockRequest, mockCache).callback()
      ).get("/beers?page=1");

      expect(response.status).toBe(200);
      expect(await mockCache.getBeerFromCache("29")).toEqual(
        JSON.parse(mockResponse)[0]
      );
      expect(await mockCache.getBeerFromCache("30")).toEqual(
        JSON.parse(mockResponse)[1]
      );
    });
  });

  describe("getBeerById", () => {
    it("should return the beer matching the id provided in the correct format", async () => {
      const response = await request(
        app(mockRequest, mockCache).callback()
      ).get("/beers/29");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 29,
        name: "10 Heads High",
        tagline: "Imperial Red Ale.",
        image: "https://images.punkapi.com/v2/29.png",
        description:
          "10 Heads High is loosely based on our awesome 2011 Prototype beer Hops Kill Nazis. This is an uncompromising 7.8% Imperial Red Ale loaded high with American Hops. Think of this as an Imperial India Red Ale, or a super-charged version of 5am Saint. Either way this is a seriously good beer!"
      });
    });

    it("should store the beer in the cache if not already cached", async () => {
      expect(await mockCache.getBeerFromCache("29")).toBeFalsy;

      const response = await request(
        app(mockRequest, mockCache).callback()
      ).get("/beers/29");

      expect(response.status).toBe(200);
      expect(await mockCache.getBeerFromCache("29")).toEqual(
        JSON.parse(mockResponse)[0]
      );
    });
  });
});
