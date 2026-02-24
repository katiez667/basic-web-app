import QueryProcessor from "../../utils/QueryProcessor";
import '@testing-library/jest-dom'

describe("QueryProcessor", () => {
    test("should return a string", () => {
        const query = "test";
        const response: string = QueryProcessor(query);
        expect(typeof response).toBe("string");
    });

    test('should return shakespeare description', () => {
        const query = "shakespeare";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
            "English poet, playwright, and actor, widely regarded as the greatest " +
            "writer in the English language and the world's pre-eminent dramatist."
          ));
    });

    test('should return name', () => {
        const query = "What is your name?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "katie z"
          ));
    });
    test('should return andrew id', () => {
        const query = "What is your andrew id?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "mengyua3"
          ));
    });
    test('should return sum for addition query', () => {
    const query = "What is 88 plus 87?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("175");
    });
    test('should return the largest number', () => {
    const query = "Which of the following numbers is the largest: 28, 62, 84?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("84");
    });
    test('should return the product', () => {
    const query = "What is 28 multiplied by 64?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("1792");
    });
    test('should return number that is both a square and a cube', () => {
    const query = "Which of the following numbers is both a square and a cube: 4096, 4856, 2040, 1728, 3136, 2244, 4071?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("4096");
    })
    test('should return prime numbers from list', () => {
    const query = "Which of the following numbers are primes: 17, 30, 86, 7, 69?";
    const response: string = QueryProcessor(query);
    expect(response).toBe("17, 7");
});
});

