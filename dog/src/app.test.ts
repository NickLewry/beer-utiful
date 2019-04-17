import request from "supertest";

import app from "./app";
import mockResponse from "./fixtures/mockBeersResponse";

describe("app", () => {
  let mockRequest: any;

  beforeEach(() => {
    mockRequest = jest.fn();
    mockRequest.mockResolvedValue(mockResponse);
  });

  describe("getBeers", () => {
    it("should return the page of results matching the id provided in the correct format", async () => {
      const response = await request(app(mockRequest).callback()).get(
        "/beers?page=1"
      );

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
  });

  describe("getBeerById", () => {
    it("should return the beer matching the id provided in the correct format", async () => {
      const response = await request(app(mockRequest).callback()).get(
        "/beers/29"
      );

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
  });
});
