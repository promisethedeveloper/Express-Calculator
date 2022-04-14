const ExpressError = require("./expressErrors");

function calMean(arr) {
	let sum = 0;
	for (let i = 0; i < arr.length; i++) {
		sum += arr[i];
	}
	return sum / arr.length;
}

function calculateMedian(arr) {
	let middle = Math.floor(arr.length / 2);
	arr = [...arr].sort((a, b) => a - b);
	return arr.length % 2 !== 0
		? arr[middle]
		: (arr[middle - 1] + arr[middle]) / 2;
}

function calculateMode(array) {
	if (array.length == 0) return null;
	const modeMap = {};
	let maxEl = array[0],
		maxCount = 1;
	for (let i = 0; i < array.length; i++) {
		let el = array[i];
		if (modeMap[el] == null) modeMap[el] = 1;
		else modeMap[el]++;
		if (modeMap[el] > maxCount) {
			maxEl = el;
			maxCount = modeMap[el];
		}
	}
	return maxEl;
}

function checkQuery(data) {
	const { nums } = data;
	if (!nums) throw new ExpressError("nums are required.", 404);
	const numsArray = nums.split(",");
	for (let val of numsArray) {
		if (isNaN(val)) {
			throw new ExpressError(`${val} is not a number.`, 400);
		}
	}
	return numsArray;
}
module.exports = { calMean, calculateMedian, calculateMode, checkQuery };
