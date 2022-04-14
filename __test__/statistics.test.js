const { calMean, calculateMedian, calculateMode } = require("../statistics");

describe("Calculate mean", () => {
	test("It should calculate mean", () => {
		const res = calMean([2, 2, 4, 4]);
		expect(res).toEqual(3);
	});
});

describe("Calculate median", () => {
	test("It should calculate median", () => {
		const res = calculateMedian([2, 2, 4, 4]);
		expect(res).toEqual(3);
	});
});

describe("Calculate mode", () => {
	test("It should calculate mode", () => {
		const res = calculateMode([2, 2, 2, 2, 2, 5, 8]);
		expect(res).toEqual(2);
	});
});
