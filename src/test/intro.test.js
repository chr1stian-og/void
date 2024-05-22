import { describe, test, it, expect } from "vitest";
import { max, fizzBuzz, calculateAverage, factorial } from "../intro.js";

describe("max", () => {
  it("Should return the first arg if it is greater", () => {
    //AAA
    //Arrange
    //Act
    //Assert

    //Arrange
    const a = 210;
    const b = 1;

    //Act
    const result = max(a, b);

    //Assert
    expect(result).toBe(a);

    //Or
    expect(max(2, 1)).toBe(2);
  });

  it("Should return the the second arg if it is greater", () => {
    //Or
    expect(max(2, 4)).toBe(4);
  });

  it("Should return the first args are equal", () => {
    //Or
    expect(max(2, 4)).toBe(4);
  });
});

describe("fizzbuzz", () => {
  it("Should return FizzBuzz if number is divisible by both 3 and 5", () => {
    const number = 15;

    const result = fizzBuzz(number);

    expect(result).toBe("FizzBuzz");
  });
  it("Should return Fizz if number is divisible by only 3", () => {
    expect(fizzBuzz(3)).toBe("Fizz");
  });
  it("Should return Buzz if number is divisible by only 5", () => {
    expect(fizzBuzz(5)).toBe("Buzz");
  });
  it("Should return the number in case it is not divisible by 3 or 5", () => {
    expect(fizzBuzz(16)).toBe(16);
  });
});

describe("calculateAverage", () => {
  it("Should return NaN if given empty array", () => {
    expect(calculateAverage([])).toBe(NaN);
  });

  it("Should calculate the average of an array with a single element", () => {
    expect(calculateAverage([1])).toBe(1);
  });

  it("Should calculate the average of an array with a two elements", () => {
    expect(calculateAverage([1, 2])).toBe(1.5);
  });

  it("Should calculate the average of an array with a three elements", () => {
    expect(calculateAverage([1, 2, 3])).toBe(2);
  });
});

describe("factorial", () => {
  it("Should return 1 if the number is 0", () => {
    expect(factorial(0)).toBe(1);
  });
  it("Should return 1 if the number is 1", () => {
    expect(factorial(1)).toBe(1);
  });
  it("Should return the factorial of the number if it is greater than 2", () => {
    expect(factorial(4)).toBe(24);
  });
  it("Should return the undefined if the number is negative", () => {
    expect(factorial(-1)).toBeUndefined();
  });
});
