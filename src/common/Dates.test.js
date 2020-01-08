import { GetNextDayOfTheWeek } from "./Dates";

describe("GetNextDayOfTheWeek", () => {
  test("should return next monday", () => {
    const actual = GetNextDayOfTheWeek("Monday", new Date(2020, 0, 7)); // Jan 1, 2020
    expect(actual).toEqual(new Date(2020, 0, 13)); // Jan 13, 2020
  });
});
