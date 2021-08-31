import HttpException from "@core/Common/HttpException";
import { Response } from "express";

const errorHandler = (err: any, res: Response) => {

	if (err instanceof HttpException) {
		return res
			.status(err.status)
			.json({ status: err.status, error: err.message });
	}

	if (err instanceof Error) {
		return res
			.status(500)
			.json({ status: 500, error: "Internal Server error" });
	}

	return res.status(400).send({
		errors: [{ message: "Something went wrong" }]
	});
};

export default errorHandler
