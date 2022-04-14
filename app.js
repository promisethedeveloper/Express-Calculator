const express = require("express");
const {
	calMean,
	calculateMedian,
	calculateMode,
	checkQuery,
} = require("./statistics");

const ExpressError = require("./expressErrors");
const { query } = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/mean", (req, res, next) => {
	try {
		if (query.nums === "") throw new ExpressError("nums are required", 400);
		const numsArray = checkQuery(req.query);
		const imprvdArray = numsArray.map((n) => parseInt(n));
		const mean = calMean(imprvdArray);
		return res.status(200).json({
			response: {
				operation: "mean",
				value: mean,
			},
		});
	} catch (error) {
		return next(error);
	}
});

app.get("/median", (req, res, next) => {
	try {
		const numsArray = checkQuery(req.query);
		const imprvdArray = numsArray.map((n) => parseInt(n));
		const median = calculateMedian(imprvdArray);
		return res.status(200).json({
			response: {
				operation: "median",
				value: median,
			},
		});
	} catch (error) {
		return next(error);
	}
});

app.get("/mode", (req, res, next) => {
	try {
		const numsArray = checkQuery(req.query);
		const imprvdArray = numsArray.map((n) => parseInt(n));
		const mode = calculateMode(imprvdArray);
		return res.status(200).json({
			response: {
				operation: "mode",
				value: mode,
			},
		});
	} catch (error) {
		return next(error);
	}
});

app.get("/all", (req, res, next) => {
	try {
		const numsArray = checkQuery(req.query);
		const imprvdArray = numsArray.map((n) => parseInt(n));
		const mean = calMean(imprvdArray);
		const median = calculateMedian(imprvdArray);
		const mode = calculateMode(imprvdArray);
		return res.status(200).json({
			response: {
				operation: "all",
				mean: mean,
				median: median,
				mode: mode,
			},
		});
	} catch (error) {
		return next(error);
	}
});
// 404 Error handler - this only runs if no route is matched
app.use((req, res, next) => {
	const notFound = new ExpressError("Not found", 404);
	return next(notFound);
});

// Global error handler
app.use((error, req, res, next) => {
	let status = error.status || 500;
	let message = error.message;
	return res.status(status).json({
		error: message,
	});
});

app.listen(3000, () => {
	console.log("Express server is running on port 3000");
});
