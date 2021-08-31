import "reflect-metadata";
import "module-alias/register";
import express from 'express'
import { InversifyExpressServer } from "inversify-express-utils";
import container from "@config/inversify";
import "@api/controllers";
import Database from "@config/database";
import { createConnection } from "typeorm";
import errorHandler from "@api/utils/error-handler";

const server = new InversifyExpressServer(container);
server.setConfig(app => {
	app.use(
		express.urlencoded({
			extended: true
		})
	);
	app.use(express.json());
	app.use (function (err: any, req: any, res: any, next: any){
		return errorHandler(err, res);
	});
});

const app = server.build();

const PORT = 3000

const start = async () => {
	try {
		Database.setConnection(await createConnection());
		app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
	} catch (err) {
		throw err
	}
};

start();

